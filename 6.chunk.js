webpackJsonp([6],{"./app/components/AADetail/Record.js":function(module,__webpack_exports__,__webpack_require__){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var __WEBPACK_IMPORTED_MODULE_0_react__=__webpack_require__("./node_modules/react/index.js"),__WEBPACK_IMPORTED_MODULE_0_react___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__),__WEBPACK_IMPORTED_MODULE_1_prop_types__=__webpack_require__("./node_modules/prop-types/index.js"),__WEBPACK_IMPORTED_MODULE_1_prop_types___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__),__WEBPACK_IMPORTED_MODULE_2_antd__=__webpack_require__("./node_modules/antd/lib/index.js"),__WEBPACK_IMPORTED_MODULE_2_antd___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd__),__WEBPACK_IMPORTED_MODULE_3__utils_timer__=__webpack_require__("./app/utils/timer.js"),__WEBPACK_IMPORTED_MODULE_4__utils_num__=__webpack_require__("./app/utils/num.js"),_jsx=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,o){var i=t&&t.defaultProps,a=arguments.length-3;if(n||0===a||(n={}),n&&i)for(var s in i)void 0===n[s]&&(n[s]=i[s]);else n||(n=i||{});if(1===a)n.children=o;else if(a>1){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),_createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_ref=_jsx("div",{className:"record-left"},void 0,"支出总计："),_ref2=_jsx("hr",{}),Record=function(_React$Component){function Record(e){_classCallCheck(this,Record);var t=_possibleConstructorReturn(this,(Record.__proto__||Object.getPrototypeOf(Record)).call(this,e));return t.state={newInfo:{desc:"",num:""},totalCost:0},t}return _inherits(Record,_React$Component),_createClass(Record,[{key:"componentWillMount",value:function(){this.getTotalCost(this.props)}},{key:"componentWillReceiveProps",value:function(e){this.getTotalCost(e)}},{key:"getTotalCost",value:function(e){var t=e.info,n=0;t.list.forEach(function(e){n+=e.num}),this.setState({totalCost:n})}},{key:"inputNew",value:function(e,t){var n=this.state.newInfo;n[t]=e,this.setState({newInfo:n})}},{key:"addRecord",value:function addRecord(transfer){var _state=this.state,newInfo=_state.newInfo,totalCost=_state.totalCost,_props=this.props,info=_props.info,transferFun=_props.transferFun,num=newInfo.num,desc=newInfo.desc;if(!newInfo.desc)return void __WEBPACK_IMPORTED_MODULE_2_antd__.message.warning("么有描述");if(!newInfo.num)return void __WEBPACK_IMPORTED_MODULE_2_antd__.message.warning("么有金额");if(isNaN(Number(num)))try{num=eval(num),newInfo.desc+="【"+newInfo.num+"】"}catch(e){return void __WEBPACK_IMPORTED_MODULE_2_antd__.message.warning("金额你写的啥呀")}else num=Number(num);transfer&&(transferFun(newInfo.desc,info.name,-num),desc="转账给"+newInfo.desc),num=Math.round(100*num)/100,info.list.unshift({time:Object(__WEBPACK_IMPORTED_MODULE_3__utils_timer__.a)().time,desc:desc,num:num}),this.setState({newInfo:{desc:"",num:""},totalCost:totalCost+num}),this.props.updateFun(info.list)}},{key:"delRecord",value:function(e,t){var n=this,r=this.props.info,o=this.state.totalCost;__WEBPACK_IMPORTED_MODULE_2_antd__.Modal.confirm({content:"不要了？",okText:"嗯",cancelText:"没",onOk:function(){r.list=r.list.filter(function(t){return t.time!==e}),n.props.updateFun(r.list),n.setState({totalCost:o-t})}})}},{key:"transfer",value:function(){var e=this,t=this.props,n=t.users,r=t.info,o=n.find(function(e){return e!==r.name});this.inputNew(o,"desc"),__WEBPACK_IMPORTED_MODULE_2_antd__.Modal.confirm({iconType:"null",content:_jsx("div",{},void 0,"转账给",_jsx(__WEBPACK_IMPORTED_MODULE_2_antd__.Select,{className:"w_100",defaultValue:o,onChange:function(t){return e.inputNew(t,"desc")}},void 0,n.map(function(e){return e!==r.name&&_jsx(__WEBPACK_IMPORTED_MODULE_2_antd__.Select.Option,{value:e},e,e)})),_jsx(__WEBPACK_IMPORTED_MODULE_2_antd__.Input,{className:"w_100",onChange:function(t){return e.inputNew(t.target.value,"num")}})),onOk:function(){e.addRecord(!0)},onCancel:function(){e.setState({newInfo:{desc:"",num:""}})}})}},{key:"render",value:function(){var e=this,t=this.props,n=t.info,r=t.total,o=this.state,i=o.totalCost,a=o.newInfo;return _jsx("div",{className:"record-item",style:{width:100/r+"%"}},void 0,_jsx("div",{className:"record-name"},void 0,n.name,_jsx("span",{className:"transfer-btn",onClick:function(){return e.transfer()}},void 0,"转账")),_jsx("div",{className:"record-total"},void 0,_ref,_jsx("div",{className:"record-right"},void 0,Object(__WEBPACK_IMPORTED_MODULE_4__utils_num__.b)(i,2))),_ref2,_jsx("div",{className:"record-list"},void 0,_jsx("div",{className:"record-detail"},void 0,_jsx("div",{className:"record-left"},void 0,_jsx(__WEBPACK_IMPORTED_MODULE_2_antd__.Input,{placeholder:"花在哪儿啦",value:a.desc,onChange:function(t){return e.inputNew(t.target.value,"desc")},onPressEnter:function(){return e.addRecord()}})),_jsx("div",{className:"record-right"},void 0,_jsx(__WEBPACK_IMPORTED_MODULE_2_antd__.Input,{placeholder:"多少钱？（支持加减乘除）",value:a.num,onChange:function(t){return e.inputNew(t.target.value,"num")},onPressEnter:function(){return e.addRecord()}}))),n.list.map(function(t){return _jsx("div",{className:"record-detail"},""+t.time,_jsx("div",{className:"record-left"},void 0,_jsx(__WEBPACK_IMPORTED_MODULE_2_antd__.Icon,{type:"delete",className:"del-btn",onClick:function(){return e.delRecord(t.time,t.num)}}),t.desc),_jsx("div",{className:"record-right"},void 0,t.num))})))}}]),Record}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);__webpack_exports__.a=Record},"./app/containers/AACash/index.js":function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments[1];switch(t.type){case M:return e;case I:return e.set("list",Object(D.fromJS)(t.data));case R:return e.set("detail",Object(D.fromJS)(t.data));default:return e}}function o(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},S,this)}function i(e){return{type:I,data:e}}function a(e){return{type:R,data:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function f(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function h(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function v(e){return{queryAllList:function(t){return e(i(t))},getAADetail:function(t){return e(a(t))}}}Object.defineProperty(t,"__esModule",{value:!0});var b=n("./node_modules/react/index.js"),y=n.n(b),A=(n("./node_modules/prop-types/index.js"),n("./node_modules/react-redux/es/index.js")),g=n("./node_modules/react-helmet/lib/Helmet.js"),w=n("./node_modules/reselect/es/index.js"),O=n("./node_modules/redux/es/index.js"),j=n("./app/utils/injectSaga.js"),E=n("./app/utils/injectReducer.js"),C=function(e){return e.get("aacash")},x=function(){return Object(w.a)(C,function(e){return e.toJS()})},k=x,P=n("./app/containers/App/selectors.js"),D=n("./node_modules/immutable/dist/immutable.js"),M="app/Aacash/DEFAULT_ACTION",I="app/AACash/GET_AA_LIST",R="app/AACash/GET_AA_DETAIL",T=Object(D.fromJS)({list:[],detail:{}}),N=r,S=regeneratorRuntime.mark(o),L=n("./app/components/AADetail/Record.js"),B=n("./app/utils/timer.js"),U=n("./node_modules/antd/lib/index.js"),W=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,o){var i=t&&t.defaultProps,a=arguments.length-3;if(n||0===a||(n={}),n&&i)for(var s in i)void 0===n[s]&&(n[s]=i[s]);else n||(n=i||{});if(1===a)n.children=o;else if(a>1){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),K=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),F=W("a",{href:"#/kit/aa"},void 0,W(U.Icon,{type:"arrow-left",className:"pointer ft_20 mr_20 mt_5 vat"})),q=function(e){function t(){return s(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),K(t,[{key:"componentWillMount",value:function(){this.props.getDetail()}},{key:"updateFun",value:function(e,t){var n=this.props.detail;n.info[t].list=e,this.props.updateFun(n)}},{key:"transferRecord",value:function(e,t,n){var r=this.props.detail,o=r.info.find(function(t){return t.name===e});o.list.unshift({time:Object(B.a)().time,desc:"收到"+t+"的转账",num:n}),this.updateFun(o.list,r.users.indexOf(e))}},{key:"render",value:function(){var e=this,t=this.props.detail;return W("div",{className:"aa-detail"},void 0,F,W("h2",{className:"title fc_666 inline-block"},void 0,t.title),W("div",{className:"record-container"},void 0,t.info&&t.info.map(function(n,r){return W(L.a,{users:t.users,updateFun:function(t){return e.updateFun(t,r)},total:t.info.length,info:n,transferFun:function(t,n,r){return e.transferRecord(t,n,r)}},"record-"+r)})))}}]),t}(y.a.PureComponent),$=q,H=n("./app/utils/arrayHelper.js"),Y=n("./app/utils/stringHelper.js"),J=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,o){var i=t&&t.defaultProps,a=arguments.length-3;if(n||0===a||(n={}),n&&i)for(var s in i)void 0===n[s]&&(n[s]=i[s]);else n||(n=i||{});if(1===a)n.children=o;else if(a>1){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),z=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),G=J("a",{href:"#/kit/"},void 0,J(U.Icon,{type:"arrow-left",className:"pointer ft_20 mr_20 mt_5 vat"})),V=J("div",{className:"mt_20 ml_10"},void 0,"空空如也"),Q=J(U.Icon,{type:"delete"}),X=function(e){function t(e){d(this,t);var n=_(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={create:{show:!1,users:["",""],usersCount:2,title:""}},n}return f(t,e),z(t,[{key:"showCreateAA",value:function(){var e=this.state.create;e.show=!0,this.setState({create:e})}},{key:"changeCount",value:function(e){var t=this.state.create;t.usersCount=e,e<t.users.length?t.users=t.users.slice(0,e):t.users=[].concat(l(t.users),l(new Array(e-t.users.length).fill(""))),this.setState({create:t})}},{key:"changeUserName",value:function(e,t){var n=this.state.create;n.users[t]=e.trim(),this.setState({create:n})}},{key:"clearCreate",value:function(){this.setState({create:{show:!1,users:["",""],usersCount:2,title:""}})}},{key:"inputTitle",value:function(e){var t=this.state.create;t.title=e,this.setState({create:t})}},{key:"createAA",value:function(){var e=this.state.create,t=this.props.createFun;return e.title?e.users.indexOf("")>-1?void U.message.warning("谁的名字忘写了"):H.a.delDuplicate(e.users).length<e.users.length?void U.message.warning("名字不能有重复的"):(t(e.users,e.title),void this.clearCreate()):void U.message.warning("还没有名字呢")}},{key:"delAA",value:function(e){var t=this;U.Modal.confirm({content:"确定不要了？",okText:"是的",cancelText:"先别",onOk:function(){t.props.delFun(e)}})}},{key:"render",value:function(){var e=this,t=this.props.list,n=this.state.create;return J("div",{},void 0,J("div",{},void 0,G,J(U.Button,{type:"primary",onClick:function(){return e.showCreateAA()}},void 0,"新建一个AA账单")),0===t.length?V:J("div",{className:"aa-list"},void 0,t.map(function(t,n){return J("div",{className:"aa-list-item"},"aa-list-"+n,J("a",{href:"#/kit/aa/?id="+t.objectId},void 0,J("div",{className:"aa-list-item-title",style:{overflow:"hidden"}},void 0,t.title)),J("div",{className:"aa-list-item-user"},void 0,J("span",{className:"fc_999 pr_10"},void 0,Object(Y.d)(t.users.join("、"),12)),t.users.length,"个人的账本"),J("div",{className:"delete-btn",onClick:function(){return e.delAA(t.objectId)}},void 0,Q))})),J(U.Modal,{visible:n.show,onCancel:function(){return e.clearCreate()},onOk:function(){return e.createAA()}},void 0,J("div",{},void 0,J(U.Input,{className:"w_100",value:n.title,placeholder:"起个名字",onChange:function(t){return e.inputTitle(t.target.value)}}),J("span",{},void 0,"要添加",J(U.InputNumber,{defaultValue:2,min:2,precision:0,onChange:function(t){return e.changeCount(t)}}),"个人（添加完后不能修改）")),J("div",{},void 0,n.users.map(function(t,n){return J(U.Input,{className:"mt_20",value:t,onChange:function(t){return e.changeUserName(t.target.value,n)}},"input-"+n)}))))}}]),t}(y.a.Component),Z=X,ee=n("./app/utils/Storage.js"),te=n("./app/containers/App/index.js"),ne=(n("./app/containers/AACash/index.scss"),n("./app/utils/recentlyUsed.js"));n.d(t,"Aacash",function(){return ae});var re=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,r,o){var i=t&&t.defaultProps,a=arguments.length-3;if(n||0===a||(n={}),n&&i)for(var s in i)void 0===n[s]&&(n[s]=i[s]);else n||(n=i||{});if(1===a)n.children=o;else if(a>1){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),oe=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),ie=re(g.Helmet,{},void 0,re("title",{},void 0,"AA记账"),re("meta",{name:"soso",content:"AA记账"})),ae=function(e){function t(){return p(this,t),m(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return h(t,e),oe(t,[{key:"componentWillMount",value:function(){Object(te.a)("AA对账")&&(this.getAAList(),ne.a.set("AA对账","kit",this.props.user.username))}},{key:"getAAList",value:function(){var e=this.props,t=e.user,n=e.queryAllList;ee.a.queryBmob("AACash",function(e){return e.equalTo("username",t.username),e.select("updatedAt","title","users"),e},function(e){e.sort(function(e,t){return Object(B.a)(e.updatedAt,"YYYY-MM-DD HH:mm:ss").time<Object(B.a)(t.updatedAt,"YYYY-MM-DD HH:mm:ss")}),n(e)},null,"find")}},{key:"delAA",value:function(e){var t=this;ee.a.delBmob("AACash",e,function(){U.message.success("删掉了～"),t.getAAList()})}},{key:"getAADetail",value:function(){var e=this;ee.a.queryBmob("AACash",function(e){return e.equalTo("objectId",Object(Y.b)("id")),e},function(t){e.props.getAADetail(t)})}},{key:"updateAA",value:function(e){var t=this;ee.a.setBmob("AACash",e.objectId,e,function(){t.getAADetail()})}},{key:"createAA",value:function(e,t){var n=this,r=this.props.user,o=[];e.forEach(function(e){o.push({name:e,list:[]})}),ee.a.createBmob("AACash",{title:t,info:o,users:e,username:r.username},function(e){n.getAAList(),Object(Y.a)({id:e.id})})}},{key:"render",value:function(){var e=this,t=Object(Y.b)("id"),n=this.props.aacash;return re("div",{},void 0,ie,re("div",{},void 0,t?re($,{detail:n.detail,getDetail:function(t){return e.getAADetail(t)},updateFun:function(t){return e.updateAA(t)}}):re(Z,{list:n.list,delFun:function(t){return e.delAA(t)},createFun:function(t,n){return e.createAA(t,n)}})))}}]),t}(y.a.PureComponent),se=Object(w.b)({aacash:k(),user:Object(P.b)()}),ce=Object(A.b)(se,v),ue=Object(E.a)({key:"aacash",reducer:N}),le=Object(j.a)({key:"aacash",saga:o});t.default=Object(O.c)(ue,le,ce)(ae)},"./app/containers/AACash/index.scss":function(e,t,n){var r=n("./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/containers/AACash/index.scss");"string"==typeof r&&(r=[[e.i,r,""]]);var o={};o.transform=void 0;n("./node_modules/style-loader/lib/addStyles.js")(r,o);r.locals&&(e.exports=r.locals)},"./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app/containers/AACash/index.scss":function(e,t,n){t=e.exports=n("./node_modules/css-loader/lib/css-base.js")(void 0),t.push([e.i,".aa-list{margin-top:20px}.aa-list .aa-list-item{width:570px;height:35px;transition:.5s;line-height:35px;background:#fff;padding:0 20px}.aa-list .aa-list-item:hover{background:#efe8ff}.aa-list .aa-list-item:hover .delete-btn{opacity:1}.aa-list .aa-list-item>div{vertical-align:middle}.aa-list .aa-list-item .aa-list-item-title{width:250px;display:inline-block;cursor:pointer;overflow:hidden}.aa-list .aa-list-item .delete-btn{margin-left:15px;opacity:0;cursor:pointer;display:inline-block;transition:.3s;vertical-align:top}.aa-list .aa-list-item .aa-list-item-user{display:inline-block;text-align:right;vertical-align:top;width:250px}.record-container{width:100%;margin-top:20px;border:1px solid #ccc;border-radius:10px;min-height:500px;overflow-x:auto;white-space:nowrap;word-break:break-all}.record-container .record-item{min-width:320px;min-height:500px;display:inline-block;padding:20px;vertical-align:top}.record-container .record-item hr{border:none;border-top:1px solid #ccc;margin:10px 0}.record-container .record-item .record-name{font-size:16px;font-weight:900;color:#666;margin-bottom:5px;white-space:normal}.record-container .record-item .record-name .transfer-btn{display:inline-block;color:#1890ff;font-size:14px;margin-left:10px;cursor:pointer}.record-container .record-item .record-total{font-size:16px}.record-container .record-item .record-total .record-right{color:#1890ff}.record-container .record-item .record-right{display:inline-block;width:37%;text-align:right;font-weight:900;vertical-align:top;white-space:normal;line-height:25px}.record-container .record-item .record-left{line-height:25px;display:inline-block;width:62%;vertical-align:top;white-space:normal}.record-container .record-item .record-left .del-btn{color:#f23c3c;margin-right:10px;cursor:pointer}.record-container::-webkit-scrollbar{width:8px;height:8px;background-color:#f5f5f5}.record-container::-webkit-scrollbar-track{border-radius:10px;background-color:#f5f5f5}.record-container::-webkit-scrollbar-thumb{border-radius:10px;background-color:#ccc}",""])}});