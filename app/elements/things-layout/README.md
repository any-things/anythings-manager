# things-layout

## This is a collection of components that configure, show and hide sidebar menu.

# things-sidebar
### 1. Register and set up routing using things-routing-behavior.html.
### 2. Search the Menu with the Url provided in the action, register the Routing, and provide the menu on the left side of the screen.
### 3. Drawer Attribute is necessary since it is for menu.

Example:

``` html
       <things-sidebar drawer class="layout vertical"
          title="MENU" screens="{{screens}}" action="menus.json?mode=auth">
       </things-sidebar>
```

# things-header, things-sidebar-toggle

## Components that show and hide sidebar menu.

Example: 
```html
        <!-- Layout Header -->
        <things-header id="thingsHeader" drawer-id='paperDrawerPanel' brand-image-id="[[domainAppObj.brand_image]]">
        </things-header>
```

*****

</br></br>
``

## Dependencies

Element dependencies are managed via [Bower](http://bower.io/). You can install that via:

    npm install -g bower

Then, go ahead and download the element's dependencies:

    bower install

## Playing With Your Element

If you wish to work on your element in isolation, we recommend that you use
[Polyserve](https://github.com/PolymerLabs/polyserve) to keep your element's
bower dependencies in line. You can install it via:

    npm install -g polymer-cli

And you can run it via:

    polymer serve

Once running, you can preview your element at
`http://localhost:8080/components/things-layout/`, where `things-layout` is the name of the directory containing it.
