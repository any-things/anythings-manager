(function(document) {
  'use strict';

  var app = document.querySelector('#app');
  var domBind = document.querySelector('#domBind');
  var thingsApp = false;
  var thingsOiApp = false;

  var webComponentsSupported = ('registerElement' in document &&
    'import' in document.createElement('link') &&
    'content' in document.createElement('template'));

  function finishLazyLoading() {
    var onImportLoaded = function() {
      if (webComponentsSupported) {
        // Emulate WebComponentsReady event for browsers supporting Web Components natively (Chrome, Opera, Vivaldi)
        document.dispatchEvent(
          new CustomEvent('WebComponentsReady', {
            bubbles: true
          })
        );
      }
    };

    // var elementsBaseBundle = document.getElementById('elementsBaseBundle');
    // Go if the async Import loaded quickly. Otherwise wait for it.
    // crbug.com/504944 - readyState never goes to complete until Chrome 46.
    // crbug.com/505279 - Resource Timing API is not available until Chrome 46.
    if (elementsBaseBundle.import && elementsBaseBundle.import.readyState === 'complete') {
      onImportLoaded();
    } else {
      elementsBaseBundle.addEventListener('load', onImportLoaded);
    }
  }

  if (!webComponentsSupported) {
    console.log('Web Components aren\'t supported!');
  } else {
    var script = document.createElement('script');
    script.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
    finishLazyLoading();
  }

  document.addEventListener('WebComponentsReady', function() {
    if (!app && window.location.pathname == '/index_oi.html') {
      thingsOiApp = true;
    } else if (!app) {
      thingsApp = true;
    }

    window.Things.componentsReady = true;
  })

  document.addEventListener('things-i18n-ready', function() {
  })

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  window.addEventListener('paper-header-transform', function(e) {
    var appName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
    var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
    var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);

    // appName max size when condensed. The smaller the number the smaller the condensed size.
    var maxMiddleScale = 0.50;
    var auxHeight = heightDiff - detail.y;
    var auxScale = heightDiff / (1 - maxMiddleScale);
    var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });
})(document);
