webpackJsonp([15],{"./app/containers/Header/index.js":function(e,t,r){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){return{dispatch:e}}Object.defineProperty(t,"__esModule",{value:!0});var c=r("./node_modules/_react@16.2.0@react/index.js"),p=r.n(c),u=(r("./node_modules/_prop-types@15.5.10@prop-types/index.js"),r("./node_modules/_react-redux@5.0.5@react-redux/es/index.js")),h=r("./node_modules/_redux@3.6.0@redux/es/index.js"),f=r("./node_modules/_reselect@3.0.1@reselect/es/index.js"),v=r("./app/containers/App/selectors.js"),x=r("./node_modules/_antd@3.5.2@antd/lib/index.js"),m=(r("./app/containers/Header/index.scss"),function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,r,o,a){var n=t&&t.defaultProps,i=arguments.length-3;if(r||0===i||(r={}),r&&n)for(var s in n)void 0===r[s]&&(r[s]=n[s]);else r||(r=n||{});if(1===i)r.children=a;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];r.children=d}return{$$typeof:e,type:t,key:void 0===o?null:""+o,ref:null,props:r,_owner:null}}}()),b=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),y=m("div",{},void 0,m("a",{className:"user-link",href:"#/user/info"},void 0,"用户中心")),g=m("div",{},void 0,m("a",{className:"user-link",href:"#/user/notice"},void 0,"消息中心")),w=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),b(t,[{key:"render",value:function(){var e=this,t=this.props.user;return m("div",{className:"header-avatar",style:t.avatar?{background:"none"}:{}},void 0,t.avatar&&m("img",{src:t.avatar,className:"header-avatar-img"}),m("div",{className:"avatar-content",onClick:function(){return window.location="#/user/info"}},void 0,!t.login&&m(x.Icon,{style:{fontSize:"22px"},type:"user"}),t.login&&!t.avatar&&t.username&&t.username.substring(0,1)),t.login&&m("div",{className:"user-info-operation"},void 0,m("div",{className:"content"},void 0,y,g,m("div",{className:"user-link user-link-out",onClick:function(){return e.props.logOut()}},void 0,"退出登录"))))}}]),t}(p.a.PureComponent),_=w;r.d(t,"Header",function(){return I});var k=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,r,o,a){var n=t&&t.defaultProps,i=arguments.length-3;if(r||0===i||(r={}),r&&n)for(var s in n)void 0===r[s]&&(r[s]=n[s]);else r||(r=n||{});if(1===i)r.children=a;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];r.children=d}return{$$typeof:e,type:t,key:void 0===o?null:""+o,ref:null,props:r,_owner:null}}}(),j=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),N=k("h1",{className:"header-item"},void 0,k(x.Icon,{type:"home"}),k("span",{className:"header-title-txt"},void 0,"首页")),O=k("h1",{className:"header-item"},void 0,k(x.Icon,{type:"edit"}),k("span",{className:"header-title-txt"},void 0,"随性的文字")),S=k("h1",{className:"header-item"},void 0,k(x.Icon,{type:"appstore"}),k("span",{className:"header-title-txt"},void 0,"没用的工具")),P=k("span",{className:"header-title-txt"},void 0,"随便听听歌"),z=k("a",{href:"//github.com/jsososo",className:"header-link",target:"_blank"},void 0,k("h1",{className:"header-item"},void 0,k(x.Icon,{type:"github"}),k("span",{className:"header-title-txt"},void 0,"同性交友网"))),I=function(e){function t(e){i(this,t);var r=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={pathname:window.location.hash},r}return d(t,e),j(t,[{key:"componentDidMount",value:function(){var e=this;window.onhashchange=function(){e.setState({pathname:window.location.hash})}}},{key:"render",value:function(){var e=this.state.pathname;return k("div",{className:"header-box"},void 0,k("div",{className:"header"},void 0,k("a",{href:"#/",className:"header-link "+("#/"===e?"hover":"")},void 0,N),k("a",{href:"#/article",className:"header-link "+(0===e.indexOf("#/article")?"hover":"")},void 0,O),k("a",{href:"#/kit",className:"header-link "+(0===e.indexOf("#/kit")?"hover":"")},void 0,S),k("a",{href:"//music.jsososo.com",className:"header-link",target:"_blank"},void 0,k("h1",{className:"header-item"},void 0,k("i",{className:"iconfont icon-1",style:{fontSize:"30px"}}),P)),z),k(x.Input.Search,{className:"header-search",onSearch:function(e){window.location="#/search?search="+encodeURI(e)}}),k(_,{logOut:this.props.logOut,user:this.props.user}))}}]),t}(p.a.Component),C=Object(f.b)({user:Object(v.c)()}),E=Object(u.b)(C,l);t.default=Object(h.c)(E)(I)},"./app/containers/Header/index.scss":function(e,t,r){var o=r("./node_modules/_css-loader@0.28.4@css-loader/index.js!./node_modules/_sass-loader@6.0.7@sass-loader/lib/loader.js!./app/containers/Header/index.scss");"string"==typeof o&&(o=[[e.i,o,""]]);var a={};a.transform=void 0;r("./node_modules/_style-loader@0.18.1@style-loader/lib/addStyles.js")(o,a);o.locals&&(e.exports=o.locals)},"./node_modules/_css-loader@0.28.4@css-loader/index.js!./node_modules/_sass-loader@6.0.7@sass-loader/lib/loader.js!./app/containers/Header/index.scss":function(e,t,r){t=e.exports=r("./node_modules/_css-loader@0.28.4@css-loader/lib/css-base.js")(void 0),t.push([e.i,".header-box{box-shadow:0 5px 5px #ccc;background:#fff;position:fixed;z-index:999;width:100%;height:66px;top:0;left:0;min-width:1000px}.header{padding-top:15px;width:100%;display:flex;text-align:center;overflow:hidden;padding-left:70px}.header .header-link{transition:.3s;margin-right:20px;width:80px}.header .header-link.hover .header-item{color:#1890ff!important}.header .header-link i{opacity:1;transition:.3s}.header .header-link:hover .header-title-txt{opacity:1!important}.header .header-link:hover i{opacity:0}.header .header-link .header-item{transition:.3s;color:#666;position:relative}.header .header-link .header-item .header-title-txt{opacity:0;top:0;left:0;width:80px;position:absolute;text-align:center;font-size:15px;padding-top:10px;transition:.3s}.header .header-link .header-item:hover{color:#999}.ant-input-search.ant-input-affix-wrapper.header-search{width:100px;height:30px;position:absolute;top:20px;right:270px;color:#555;z-index:1000}.ant-input-search.ant-input-affix-wrapper.header-search :focus{width:180px}.ant-input-search.ant-input-affix-wrapper.header-search .ant-input{border-radius:15px;padding-left:30px;padding-right:10px;font-size:14px;overflow:hidden}.ant-input-search.ant-input-affix-wrapper.header-search .ant-input-suffix{font-size:18px;position:absolute;left:10px;width:18px}.header-avatar{right:120px;top:10px;vertical-align:top;background:rgba(24,144,255,.7);font-size:18px;line-height:45px;color:#fff;text-align:center;font-weight:900}.header-avatar,.header-avatar img{position:absolute;width:45px;height:45px;border-radius:50%}.header-avatar img{left:0}.header-avatar .avatar-content{position:absolute;z-index:999;width:45px;height:45px;cursor:pointer;border-radius:50%;border:1px solid rgba(24,144,255,.7)}.header-avatar:hover .user-info-operation{height:130px}.header-avatar .user-info-operation{transition:.5s;height:0;overflow:hidden;position:absolute;width:100px;left:-30px;top:20px;padding-top:30px}.header-avatar .user-info-operation .content{transition:.3s;color:#000;font-size:14px;line-height:30px;width:100px;background:#fff;border:1px solid #ccc;font-weight:300;border-radius:5px}.header-avatar .user-info-operation .content .user-link{transition:.3s;color:#000}.header-avatar .user-info-operation .content .user-link-out{cursor:pointer;color:#666}.header-avatar .user-info-operation .content .user-link-out:hover{color:#f23c3c}",""])}});