Polymer({
  is: "things-app",

  properties: {
    /**
     * Domain App Object
     */
    domainAppObj: {
      type: Object,
      notify: true,
      observer: '_domainAppChanged'
    },

    /**
     * Theme
     */
    theme: {
      type: String,
      notify: true,
      observer: 'onThemeChange'
    },

    /**
     * ?
     */
    upgraded: {
      type: Boolean
    },

    /**
     * Menu Title
     */
    menuTitle: {
      type: String
    },

    /**
     * Storage
     */
    storage: {
      type: Object
    },

    /**
     * Fullscreen Target Element ID
     */
    target: {
      value: '#mainSection',
      type: String
    },

    /**
     * 프로파일에서 언어 설정을 보여줄 지 여부
     */
    showProfileLocale: {
      type: Boolean,
      value: false
    },

    /**
     * Recent page toggle 여부
     */
    showRecentPages: {
      type: Boolean,
      value: true
    },

    /**
     * Recent page 사용 여부
     */
    useRecentPages: {
      type: Boolean,
      observer: '_useRecentPagesChanged'
    },

    /**
     * Compute when drawer open
     */
    isDrawerShow: {
      type: Boolean,
      computed: "computeIsDrawerShow(menuGroup)"
    },

    /**
     * menuGroup초기화
     */
    menuGroup: {
      type: Array,
      value: []
    },

    recentPageHidden: {
      type: Boolean
    },

    blockRightClick: {
      type: Boolean,
      observer: '_blockRightClickChanged'
    }
  },

  behaviors: [
    Things.GlobalBehavior,
    Things.MsgBoxBehavior,
    Things.FullscreenBehavior
  ],

  observers: [
    '_computeRecentPage(globals.user)'
  ],  

  /**
   * Lifecycle - Ready
   */
  ready: function() {
    app = this;
    this.fire('upgraded');
    this.upgraded = true;
    document.addEventListener('things-show-toast', function(e) {
      this.showToast(e.detail.msg);
    }.bind(this));
  },

  /**
   * Lifecycle - Attached
   */
  attached: function() {
    this.storage = JSON.parse(localStorage.getItem(this.$.localStorage.name));

    if (this.storage) {
      if (this.storage.darkThemeEnabled) {
        this.changeTheme(this.storage.darkThemeEnabled);
      }

      if (this.storage.accentColor) {
        this.changeAccentColor(this.storage.accentColor);
      }
    }

    // delete older theme
    var oldTheme = Polymer.dom(this.root).querySelector('#theme');
    if (oldTheme) Polymer.dom(this.root).removeChild(oldTheme);

    var appTheme = document.createElement('style', 'custom-style');
    appTheme.setAttribute('id', 'theme');

    if (!this.globals.user || !this.globals.user.domain || !this.globals.user.domain.theme) {
      appTheme.setAttribute('include', 'anythings-theme');
    } else {
      appTheme.setAttribute('include', this.globals.user.domain.theme);
    }

    //set login and home image style
    if (this.globals.user && this.globals.user.domain && this.globals.user.domain.theme && this.globals.user.domain.homeImages) {
      this.customStyle['--things-home-image-url'] = this.globals.user.domain.homeImages;
      this.updateStyles();
    }

    if (this.globals.user && this.globals.user.domain && this.globals.user.domain.theme && this.globals.user.domain.homeImagesPosition) {
      this.customStyle['--things-home-image-position'] = this.globals.user.domain.homeImagesPosition;
      this.updateStyles();
    }

    Polymer.dom(this.root).appendChild(appTheme);
  },

  _blockRightClickChanged: function(blockRightClick) {
    if(blockRightClick) {
      document.body.oncontextmenu = function(e) {
        e.preventDefault();
      };
    } else {
      document.body.oncontextmenu = null;
    }
  },

  _computeRecentPage: function(user){
    this.set('recentPageHidden', user ? false : true);
  },  

  /**
   * Theme 변경시
   * *******
   * @param {Object} domainAppObj
   */
  _domainAppChanged: function(domainAppObj) {
    if (domainAppObj && domainAppObj.theme) {
      this.theme = domainAppObj.theme;
    }
  },

  /**
   * Theme 변경시
   * *******
   * @param {String} theme
   */
  onThemeChange: function(theme) {
    // delete older theme
    var oldTheme = Polymer.dom(this.root).querySelector('#theme');
    if (oldTheme) Polymer.dom(this.root).removeChild(oldTheme);

    // apply new theme
    var appTheme = document.createElement('style', 'custom-style');
    appTheme.setAttribute('id', 'theme');

    if (!theme) {
      appTheme.setAttribute('include', 'anythings-theme');
    } else { 
      appTheme.setAttribute('include', theme);
    }

    Polymer.dom(this.root).appendChild(appTheme);
  },

  /**
   * Initialize Default Storage
   */
  initializeDefaultStorage: function() {
    this.storage = {
      accentColor: null,
      darkThemeEnabled: null
    };
  },

  /**
   * Toast 정보 보여 주기
   * *******
   * @param {Object} msg
   */
  showToast: function(msg) {
    this.$.infoToast.text = msg;
    this.$.infoToast.show();
  },

  /**
   * Event를 통하여 showToast 정보 보여 주기
   * *******
   * @param {Object} e
   */
  showToastInfo: function(e) {
    this.$.infoToast.text = e.detail;
    this.$.infoToast.show();
  },

  /**
   * Event를 통하여 OK를 가진 showToast 정보 보여 주기
   * *******
   * @param {Object} e
   */
  showToastConfirm: function(e) {
    this.$.confirmToast.text = e.detail;
    this.$.confirmToast.show();
  },

  /**
   * Toggle 최근 사용 페이지
   */
  toggleRecentPages: function() {
    this.showRecentPages = !this.showRecentPages;
  },

  /**
   * 최근 사용 페이지 사용 여부 변경시
   * *******
   * @param {Boolean} useRecentPages
   */
  _useRecentPagesChanged: function(useRecentPages) {
    this.showRecentPages = useRecentPages;
  },

  /**
   * 로그아웃이 되면 menu정보 제거
   * *******
   * @param {Object} event
   */
  onThingsLogoutSuccess: function(event) {
    this.openInfoMsg({
      type: 'info',
      title: Things.DataGlobal.t('button.logout'),
      text: Things.DataGlobal.t('text.please_wait'),
      showConfirmButton: false
    });
    this.menuGroup = [];
    location.href = location.origin;
  },

  /**
   * Menu 정보가 있으면 drawer open
   * *******
   * @param {Array} menuGroup
   */
  computeIsDrawerShow: function(menuGroup) {
    if (menuGroup && menuGroup.length > 0) {
      this.$.paperDrawerPanel.forceNarrow = false;
    } else {
      this.$.paperDrawerPanel.forceNarrow = true;
    }

    return !this.$.paperDrawerPanel.forceNarrow;
  }
});
