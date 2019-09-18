# things-layout

## 이는 사이드바 메뉴를 구성하고 보여주고 숨기는 컨포넌트들의 집합이다.

# things-sidebar
### 1. things-routing-behavior.html을 사용하여 Routing을 등록 및 설정한다.
### 2. action에서 제공하는 Url로 Menu를 검색하여 Routing을 등록하고 화면 좌측에 메뉴를 제공한다.
### 3. Menu용이기 때문에, Drawer Attribute가 꼭 필요하다.

Example:

``` html
       <things-sidebar drawer class="layout vertical"
          title="MENU" screens="{{screens}}" action="menus.json?mode=auth">
       </things-sidebar>
```

# things-header, things-sidebar-toggle

## 사이드바 메뉴를 보여주고 숨기는 컨포넌트

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

element의 종속성은 [Bower](http://bower.io/)를 통해 관리되며, 아래의 방법을 통해 설치할 수 있다.

    npm install -g bower

그리고, 아래의 방법을 통해 실행할 수 있다.

    bower install

## Playing With Your Element

element를 독립적으로 처리하려면 [Polyserve](https://github.com/PolymerLabs/polyserve)를 사용하여 element의 bower 의존성을 유지하도록 하며, 이는 아래의 방법을 통해 설치할 수 있다.

    npm install -g polymer-cli

그리고, 아래의 방법을 통해 실행할 수 있다.

    polymer serve

element를 실행한 경우, `things-layout`이 디렉토리 이름으로 포함되어 있는 `http://localhost:8080/components/things-layout/`을 통해 이를 미리 확인할 수 있다.
