(function(t){function e(e){for(var o,a,r=e[0],l=e[1],c=e[2],u=0,f=[];u<r.length;u++)a=r[u],s[a]&&f.push(s[a][0]),s[a]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],o=!0,a=1;a<n.length;a++){var r=n[a];0!==s[r]&&(o=!1)}o&&(i.splice(e--,1),t=l(l.s=n[0]))}return t}var o={},a={app:0},s={app:0},i=[];function r(t){return l.p+"music/js/"+({about:"about"}[t]||t)+"."+{about:"04b5f69a","chunk-1817":"b8cb7747","chunk-1a1e":"59805429","chunk-8dbe":"3945fbdf"}[t]+".js"}function l(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(t){var e=[],n={"chunk-1817":1,"chunk-1a1e":1,"chunk-8dbe":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise(function(e,n){for(var o="music/css/"+({about:"about"}[t]||t)+"."+{about:"31d6cfe0","chunk-1817":"f6a46f06","chunk-1a1e":"b8308174","chunk-8dbe":"b4a8dc63"}[t]+".css",a=l.p+o,s=document.getElementsByTagName("link"),i=0;i<s.length;i++){var r=s[i],c=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(c===o||c===a))return e()}var u=document.getElementsByTagName("style");for(i=0;i<u.length;i++){r=u[i],c=r.getAttribute("data-href");if(c===o||c===a)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var o=e&&e.target&&e.target.src||a,s=new Error("Loading CSS chunk "+t+" failed.\n("+o+")");s.request=o,n(s)},f.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(f)}).then(function(){a[t]=0}));var o=s[t];if(0!==o)if(o)e.push(o[2]);else{var i=new Promise(function(e,n){o=s[t]=[e,n]});e.push(o[2]=i);var c,u=document.getElementsByTagName("head")[0],f=document.createElement("script");f.charset="utf-8",f.timeout=120,l.nc&&f.setAttribute("nonce",l.nc),f.src=r(t),c=function(e){f.onerror=f.onload=null,clearTimeout(d);var n=s[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+o+": "+a+")");i.type=o,i.request=a,n[1](i)}s[t]=void 0}};var d=setTimeout(function(){c({type:"timeout",target:f})},12e4);f.onerror=f.onload=c,u.appendChild(f)}return Promise.all(e)},l.m=t,l.c=o,l.d=function(t,e,n){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)l.d(n,o,function(e){return t[e]}.bind(null,o));return n},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var f=0;f<c.length;f++)e(c[f]);var d=u;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0db1":function(t,e,n){"use strict";var o=n("1231"),a=n.n(o);a.a},"106f":function(t,e,n){},1231:function(t,e,n){},4274:function(t,e,n){"use strict";var o=n("f689"),a=n.n(o);a.a},"42e1":function(t,e,n){"use strict";n("c5f6");var o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;t=Number(t||0);var o=.499999999;return Number((t+n*o).toFixed(e))};e["a"]=o},"502d":function(t,e,n){"use strict";var o=n("ca32"),a=n.n(o);a.a},"524c":function(t,e,n){"use strict";var o=n("6313"),a=n.n(o);a.a},"56d7":function(t,e,n){"use strict";n.r(e);var o=n("8afe"),a=(n("cadf"),n("551c"),n("097d"),n("2b0e")),s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("img",{staticClass:"app-bg",attrs:{src:n("6e0e"),alt:""}}),o("div",{staticClass:"main-container"},[o("router-view"),o("Player")],1)])},i=[],r=(n("28a5"),n("aa67")),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"player-container"},[n("div",[n("div",{staticClass:"control-btn"},[n("div",{staticClass:"inline-block"},[n("i",{staticClass:"icon-shangyishou1 iconfont",on:{click:function(e){t.cutSong("playPrev")}}})]),t.playing?t._e():n("div",{staticClass:"inline-block"},[n("i",{staticClass:"iconfont icon-bofang",on:{click:function(e){t.updatePlayingStatus(!0)}}})]),t.playing?n("div",{staticClass:"inline-block"},[n("i",{staticClass:"iconfont icon-zanting1",staticStyle:{"font-size":"34px"},on:{click:function(e){t.updatePlayingStatus(!1)}}})]):t._e(),n("div",{staticClass:"inline-block"},[n("i",{staticClass:"icon-xiayishou1 iconfont",on:{click:function(e){t.cutSong("playNext")}}})])]),n("div",{staticClass:"inline-block progress-container"},[n("div",{staticClass:"song-info"},[t.loading||t.downloading?n("i",{staticClass:"el-icon-loading mr_10"}):t._e(),n("span",[t._v(t._s(t.playNow.title))]),n("span",{staticStyle:{"padding-left":"30px"}},[t._v(t._s(t.playNow.artist))])]),n("div",{staticClass:"play-time"},[n("span",[t._v("\n          "+t._s(t.formatTooltip(t.currentTime))+"\n          /\n          "+t._s(t.formatTooltip(t.playerInfo.duration))+"\n        ")])]),n("div",{staticClass:"progress",attrs:{id:"player-progress"}},[n("el-slider",{attrs:{"format-tooltip":t.formatTooltip,max:t.playerInfo.duration||1},on:{change:function(e){return t.playerDom.currentTime=e}},model:{value:t.currentTime,callback:function(e){t.currentTime=e},expression:"currentTime"}})],1)]),n("div",{staticClass:"other-control inline-block"},[n("div",{class:"volume-control "+(!t.showVolume&&"hide-slider"),on:{mouseout:function(e){t.showVolume=!1}}},[n("div",{staticClass:"volume-slider-container",on:{mouseout:function(e){t.showVolume=!1},mouseover:function(e){t.showVolume=!0}}},[n("div",{staticClass:"volume-slider"},[n("el-slider",{attrs:{vertical:!0,height:"80px",max:100},on:{change:t.changeVolume},model:{value:t.volume,callback:function(e){t.volume=e},expression:"volume"}})],1)]),n("i",{staticClass:"iconfont icon-volume",on:{mouseover:function(e){t.showVolume=!0}}})]),n("div",{class:"order-control "+(!t.showOrder&&"hide-order"),on:{mouseout:function(e){t.showOrder=!1}}},[n("div",{staticClass:"order-list-container",on:{mouseout:function(e){t.showOrder=!1},mouseover:function(e){t.showOrder=!0}}},[n("div",{staticClass:"order-list"},t._l(t.orderList,function(e){return t.orderType!==e?n("div",{key:"order-"+e,on:{click:function(n){t.changeOrderType(e)}}},[n("i",{class:"iconfont icon-"+e})]):t._e()}))]),n("div",{staticClass:"now-order-type",on:{mouseover:function(e){t.showOrder=!0}}},[n("i",{class:"iconfont icon-"+t.orderType})])])])]),n("audio",{attrs:{id:"m-player",src:t.playNow.url,controls:""}})])},c=[],u=(n("c5f6"),n("c93e")),f=n("42e1"),d=n("2f62"),g={name:"PlayerPage",data:function(){return{playerDom:null,currentTime:0,volume:0,stopUpdateCurrent:!1,showVolume:!1,showOrder:!1,orderList:["suiji","danquxunhuan","liebiao"],orderType:r["a"].get("orderType")}},computed:Object(u["a"])({},Object(d["b"])({playNow:"getPlaying",playing:"isPlaying",downloading:"isDownloading",playerInfo:"getPlayerInfo",loading:"isLoading"})),watch:{playNow:function(t){var e=this;this.currentTime=0;var n=this.$store.dispatch;if(!t.url){var o=t.objectId;n("setLoading",!0),this.getMusicInfo(o,function(t){e.playNow.objectId===t.objectId&&(n("updatePlayNow",t),n("setLoading",!1)),n("updateSongDetail",{info:t,index:o})})}}},mounted:function(){var t=this;this.playerDom=document.getElementById("m-player"),this.playerDom.volume=r["a"].get("volume")||1,this.volume=100*(r["a"].get("volume")||1);var e=this.playerDom,n=document.getElementsByClassName("el-slider__button el-tooltip")[0],o=this.$store.dispatch;e.oncanplaythrough=function(){t.playing&&t.playNow.url===e.src&&e.play(),o("setDownLoading",!1),o("updatePlayerInfo",{duration:e.duration})},e.onwaiting=function(){o("setDownLoading",!0)},e.onended=function(){"danquxunhuan"!==t.orderType?o("playNext"):e.play()},e.ontimeupdate=function(){t.stopUpdateCurrent||(t.currentTime=t.playNow.url?e.currentTime:0)},n.onmousedown=function(){t.stopUpdateCurrent=!0}},methods:{getMusicInfo:function(t,e){r["a"].queryBmob("MusicSongs",function(e){return e.equalTo("objectId",t),e},e,function(){alert("down不下来")})},formatTooltip:function(t){return"".concat(Object(f["a"])(t/60,0,-1),":").concat(Object(f["a"])(t%60,0)<10?"0".concat(Object(f["a"])(t%60,0)):Object(f["a"])(t%60,0))},changeVolume:function(t){this.playerDom.volume=t/100,r["a"].set("volume",t/100)},changeOrderType:function(t){this.orderType=t,r["a"].set("orderType",t),this.$store.dispatch("updateRandomHistory")},updatePlayingStatus:function(t){this.playerDom[["pause","play"][Number(t)]](),this.$store.dispatch("updatePlayingStatus",t)},cutSong:function(t){this.playerDom.pause(),this.$store.dispatch(t)}}},p=g,m=(n("74c9"),n("2877")),v=Object(m["a"])(p,l,c,!1,null,null,null);v.options.__file="Player.vue";var h=v.exports,y={name:"App",components:{Player:h},data:function(){return{defaultActive:"/"}},created:function(){var t=this;r["a"].get("orderType")||r["a"].set("orderType","liebiao"),this.defaultActive=window.location.hash.split("/")[1],r["a"].queryBmob("MusicTag",function(t){return t.equalTo("userId","a605fbce83"),t},function(e){return t.$store.dispatch("setSysTag",e)}),r["a"].queryBmob("MusicSongs",function(t){return t.select("artist","album","title","search"),t.limit(1e3),t},function(e){return t.$store.dispatch("setAllSongs",e)},null,"find")}},b=y,_=(n("5c0b"),Object(m["a"])(b,s,i,!1,null,null,null));_.options.__file="App.vue";var w=_.exports,S=n("8c4f"),O=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"home"},[o("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),o("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},j=[],T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._m(0),n("h3",[t._v("Installed CLI Plugins")]),t._m(1),n("h3",[t._v("Essential Links")]),t._m(2),n("h3",[t._v("Ecosystem")]),t._m(3)])},I=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("\n    For guide and recipes on how to configure / customize this project,"),n("br"),t._v("\n    check out the\n    "),n("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("vue-cli documentation")]),t._v(".\n  ")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[t._v("babel")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",target:"_blank",rel:"noopener"}},[t._v("eslint")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Core Docs")])]),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Forum")])]),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("Community Chat")])]),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[t._v("Twitter")])]),n("li",[n("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("News")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("vue-router")])]),n("li",[n("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("vuex")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[t._v("vue-devtools")])]),n("li",[n("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[t._v("vue-loader")])]),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[t._v("awesome-vue")])])])}],L={name:"HelloWorld",props:{msg:String}},C=L,k=(n("524c"),Object(m["a"])(C,T,I,!1,null,"b6a59770",null));k.options.__file="HelloWorld.vue";var x=k.exports,N={name:"home",components:{HelloWorld:x}},P=N,E=Object(m["a"])(P,O,j,!1,null,null,null);E.options.__file="Home.vue";E.exports;var A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"inline-block"},[n("div",{staticClass:"pd_20"},[n("Cd")],1),n("SongInfo")],1),n("div",{staticClass:"song-container"},[n("div",[n("TagList"),n("div",{staticClass:"inline-block"},[n("Search"),n("SongList",{attrs:{isSys:"系统"===t.tagOwner,tag:t.tag}})],1)],1)])])},$=[],B=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:"play-cd-container playing-"+t.$store.state.playing+" loading-"+t.$store.state.loading},[n("div",{staticClass:"cd-bg"},[t.playNow.cover?n("img",{attrs:{src:t.playNow.cover}}):t._e()])])},D=[],H={name:"Cd",computed:{playNow:function(){return this.$store.getters.getPlaying},playing:function(){return this.$store.getters.isPlaying},loading:function(){return this.$store.getters.isLoading}}},M=H,U=(n("7dd7"),Object(m["a"])(M,B,D,!1,null,null,null));U.options.__file="Cd.vue";var q=U.exports,V=n("6fcc"),Q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"song-info-container"},[n("div",{staticClass:"info-row"},[n("span",{staticClass:"info-key"},[t._v("歌名：")]),n("span",[t._v(t._s(t.playNow.title))])]),n("div",{staticClass:"info-row"},[n("span",{staticClass:"info-key"},[t._v("歌手：")]),n("span",[t._v(t._s(t.playNow.artist))])]),n("div",{staticClass:"info-row"},[n("span",{staticClass:"info-key"},[t._v("专辑：")]),n("span",[t._v(t._s(t.playNow.album))])]),n("div",{staticClass:"info-row"},[n("span",{staticClass:"info-key"},[t._v("标签：")]),n("span",[t._v(t._s(t.$store.state.nPSTags.join("、")))])])])},G=[],J={name:"SongInfo",computed:{playNow:function(){return this.$store.getters.getPlaying}}},R=J,W=(n("0db1"),Object(m["a"])(R,Q,G,!1,null,null,null));W.options.__file="SongInfo.vue";var Y=W.exports,F=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mb_20"},[n("el-radio-group",{model:{value:t.sOpt,callback:function(e){t.sOpt=e},expression:"sOpt"}},[n("el-radio-button",{attrs:{label:"列表内"}}),n("el-radio-button",{attrs:{label:"站内"}})],1),n("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"search-input",attrs:{type:"text",placeholder:"找点什么吧"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}})],1)},z=[],X=(n("386d"),n("a481"),{name:"Search",data:function(){return{sOpt:"列表内",search:""}},watch:{search:function(t){if("QQ音乐"!==this.sOpt){var e={search:t.replace(/\s|,|，|\//g,""),isAll:"站内"===this.sOpt};this.$store.dispatch("searchMusic",e)}},sOpt:function(t){if("QQ音乐"!==t){var e={search:this.search.replace(/\s|,|，|\//g,""),isAll:"站内"===t};this.$store.dispatch("searchMusic",e)}}}}),K=X,Z=(n("e589"),Object(m["a"])(K,F,z,!1,null,null,null));Z.options.__file="Search.vue";var tt=Z.exports,et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:"tag-list-container "+(t.showList?"show-list":"hide-list"),on:{mouseover:function(e){t.showList=!0},mouseout:function(e){t.showList=!1}}},[n("i",{staticClass:"iconfont icon-arrow-left show-tag-btn",on:{mouseover:function(e){t.showList=!0}}}),n("div",{staticClass:"tag-list"},[n("div",{class:"tag-item\n      "+(t.tagInfo.isSys&&""===t.tagInfo.selected&&"selected")+"\n      "+(""===t.tagInfo.playing&&"playing"),on:{click:function(e){t.$store.dispatch("updateSelectedTag","")}}},[t._v("全部")]),t._l(t.sysTagList,function(e,o){return n("div",{key:"tag-"+e+"-"+o,class:"tag-item\n      "+(t.tagInfo.isSys&&t.tagInfo.selected===e&&"selected")+"\n      "+(t.tagInfo.playing===e&&"playing"),on:{click:function(n){t.$store.dispatch("updateSelectedTag",e)}}},[t._v(t._s(e)+"\n    ")])})],2)])},nt=[],ot={name:"TagList",data:function(){return{showList:!1,tagType:"sys"}},computed:{sysTagList:function(){return this.$store.getters.getTagList()},tagInfo:function(){return this.$store.getters.getTagInfo}}},at=ot,st=(n("502d"),Object(m["a"])(at,et,nt,!1,null,null,null));st.options.__file="TagList.vue";var it=st.exports,rt={name:"playerpage",components:{Cd:q,SongList:V["a"],SongInfo:Y,Search:tt,TagList:it},data:function(){return{tag:"",tags:[],tagOwner:"系统"}},mounted:function(){this.getTags()},methods:{getTags:function(){this.$store.state.sysTags.length||setTimeout(this.getTags,100),this.tags=this.$store.state.sysTags},selectTag:function(t){this.tag=t},changeOwner:function(){"系统"===this.tagOwner?this.tags=this.$store.state.sysTags:this.tags=[],this.tag=""}}},lt=rt,ct=(n("d524"),Object(m["a"])(lt,A,$,!1,null,null,null));ct.options.__file="PlayerPage.vue";var ut=ct.exports,ft=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a",{attrs:{href:"#/me/upload"}},[n("el-button",[t._v("自己上传一哈")])],1)])},dt=[],gt={name:"Me"},pt=gt,mt=(n("cee3"),Object(m["a"])(pt,ft,dt,!1,null,"070c8cc1",null));mt.options.__file="Me.vue";var vt=mt.exports;a["default"].use(S["a"]);var ht=new S["a"]({routes:[{path:"/",name:"player",component:ut,meta:{title:"音乐哟"}},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/me/upload",name:"upload",meta:{title:"上传"},component:function(){return n.e("chunk-8dbe").then(n.bind(null,"2679"))}},{path:"/me",name:"me",meta:{title:"我的歌单"},component:vt},{path:"/storehouse",name:"storehouse",component:function(){return n.e("chunk-1a1e").then(n.bind(null,"bb6c"))},meta:{title:"曲库"}},{path:"/development",name:"development",component:function(){return n.e("chunk-1817").then(n.bind(null,"e440"))},meta:{title:"大后门"}}]});ht.beforeEach(function(t,e,n){t.meta.title&&(document.title=t.meta.title),n()});var yt,bt=ht,_t=(n("0fae"),n("5c96")),wt=n.n(_t),St=["722fd36cfde950349f5533aabbd33439","dc6d4b8254a412fb5896c1348fab2f5f"],Ot=(n("8aa9"),{sysTags:[],allSongs:{},playNow:{cover:""},playing:!1,playingList:[],playerInfo:{duration:0,current:0,paused:!0},nPSTags:[],loading:!1,showList:[],history:[],randomHistory:{list:[],index:-1},tagInfo:{isSys:!0,selected:"",playing:""},sysSongs:{"安静":[]},downloading:!1}),jt=n("a322"),Tt=(n("456d"),n("4917"),n("3b2b"),n("ac6a"),n("8615"),"SEARCH_MUSIC"),It="UPDATE_SELECTED_TAG",Lt="UPDATE_RANDOM_HISTORY",Ct="UPDATE_PLAYER_INFO",kt="SET_DOWNLOADING",xt="UPDATE_SONG_DETAIL",Nt="SET_LOADING",Pt="PLAY_NEXT",Et="PLAY_PREV",At="UPDATE_PLAYING_STATUS",$t="CHANGE_SHOW_LIST",Bt="SET_SYS_TAG",Dt="SET_ALL_SONGS",Ht="UPDATE_PLAY_NOW",Mt=(yt={},Object(jt["a"])(yt,Tt,function(t,e){var n=e.search,o=e.isAll,a=t.sysSongs[t.tagInfo.selected]?t.sysSongs[t.tagInfo.selected].map(function(e){return t.allSongs[e]}):Object.values(t.allSongs);o&&(a=Object.values(t.allSongs));var s=new RegExp(n,"i");t.showList=a.filter(function(t){return t.title.match(s)||t.artist.match(s)||t.album.match(s)||t.search.match(s)})}),Object(jt["a"])(yt,It,function(t,e){t.tagInfo.selected=e,t.showList=e?t.sysSongs[e].map(function(e){return t.allSongs[e]}):Object.values(t.allSongs)}),Object(jt["a"])(yt,Et,function(t){t.loading=!1;var e=r["a"].get("orderType"),n=0,o=t.playNow.objectId;if("suiji"===e){var a=t.randomHistory.list,s=t.randomHistory.index;s>0?(n=t.playingList.indexOf(a[s-1]),t.randomHistory.index-=1):(n=Object(f["a"])(Math.random()*(t.playingList.length-1)),a.unshift(t.playingList[n]),t.randomHistory.index=0)}else n=t.playingList.indexOf(o)-1,n<0&&(n=t.playingList.length-1);t.playerInfo.duration=0,t.playNow=t.allSongs[t.playingList[n]]}),Object(jt["a"])(yt,Pt,function(t){var e=r["a"].get("orderType")||"liebiao",n=t.playNow.objectId;t.loading=!1;var o=0;if("suiji"===e){var a=t.randomHistory.list,s=t.randomHistory.index;a.length-1===s?(o=Object(f["a"])(Math.random()*(t.playingList.length-1)),a.push(t.playingList[o])):o=t.playingList.indexOf(a[s]),t.randomHistory.index+=1}else o=t.playingList.indexOf(n)+1,o===t.playingList.length&&(o=0);t.playerInfo.duration=0,t.playNow=t.allSongs[t.playingList[o]]}),Object(jt["a"])(yt,Lt,function(t,e){t.randomHistory=e||{list:[],index:-1}}),Object(jt["a"])(yt,Ct,function(t,e){t.playerInfo=e}),Object(jt["a"])(yt,kt,function(t,e){t.downloading=e}),Object(jt["a"])(yt,xt,function(t,e){var n=e.info,o=e.index;t.allSongs[o]=n}),Object(jt["a"])(yt,At,function(t,e){t.playing=e}),Object(jt["a"])(yt,Ht,function(t,e){var n=t.randomHistory.list;t.playNow=e,t.loading=!1,t.tagInfo.playing!==t.tagInfo.selected&&(n.length=0,t.tagInfo.playing=t.tagInfo.selected),t.tagInfo.playing?t.playingList=t.sysSongs[t.tagInfo.playing]:t.playingList=Object.keys(t.allSongs),"suiji"===r["a"].get("orderType")&&n[n.length-1]!==e.objectId&&(n.push(e.objectId),t.randomHistory.index=n.length-1),t.tagInfo.playing=t.tagInfo.selected,t.playerInfo.duration=0}),Object(jt["a"])(yt,Bt,function(t,e){t.sysObjectId=e.objectId,t.sysSongs=e.tags,t.sysTags=Object.keys(e.tags)}),Object(jt["a"])(yt,Dt,function(t,e){t.allSongs=e}),Object(jt["a"])(yt,$t,function(t,e){t.showList=e.map(function(e){return t.allSongs[e.objectId]})}),Object(jt["a"])(yt,Nt,function(t,e){t.loading=e}),yt),Ut={getTagList:function(t){return function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return e?t.sysTags:[]}},getTagInfo:function(t){return t.tagInfo},getAllSongs:function(t){return t.allSongs},getShowList:function(t){return t.showList},getPlayerInfo:function(t){return t.playerInfo},isDownloading:function(t){return t.downloading},getPlaying:function(t){return t.playNow},isPlaying:function(t){return t.playing},isLoading:function(t){return t.loading}},qt={searchMusic:function(t,e){var n=t.commit;n(Tt,e)},updateSelectedTag:function(t,e){var n=t.commit;n(It,e)},updateRandomHistory:function(t,e){var n=t.commit;n(Lt,e)},updatePlayerInfo:function(t,e){var n=t.commit;n(Ct,e)},setDownLoading:function(t,e){var n=t.commit;n(kt,e)},updateSongDetail:function(t,e){var n=t.commit;n(xt,e)},setLoading:function(t,e){var n=t.commit;n(Nt,e)},playPrev:function(t){var e=t.commit;e(Et)},playNext:function(t){var e=t.commit;e(Pt)},updatePlayNow:function(t,e){var n=t.commit;n(Ht,e)},setSysTag:function(t,e){var n=t.commit;n(Bt,e)},setAllSongs:function(t,e){var n=t.commit,o={};e.forEach(function(t){return o[t.objectId]=t}),n(Dt,o),n($t,Object.values(o)),n(Ht,e[Object(f["a"])(Math.random()*(e.length-1))])},updatePlayingStatus:function(t,e){var n=t.commit;n(At,e)}};a["default"].use(d["a"]);var Vt,Qt=new d["a"].Store({state:Ot,mutations:Mt,getters:Ut,actions:qt});(Vt=Bmob).initialize.apply(Vt,Object(o["a"])(St)),a["default"].use(wt.a,{size:"small"}),new a["default"]({router:bt,store:Qt,render:function(t){return t(w)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var o=n("106f"),a=n.n(o);a.a},6313:function(t,e,n){},"6e0e":function(t,e,n){t.exports=n.p+"music/img/bg-1.f8d895b2.png"},"6fcc":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"song-list"},[t._l(t.showList,function(e,o){return n("div",{key:e.objectId,class:t.playNow.objectId===e.objectId?"song-item playing":"song-item",on:{click:function(n){t.playMusic(e.objectId)}}},[n("span",{staticClass:"song-order"},[t._v(t._s(o+1))]),n("span",{staticClass:"song-title"},[t._v(t._s(e.title))]),n("span",{staticClass:"song-artist"},[t._v(t._s(e.artist))])])}),0===t.showList.length?n("div",{staticClass:"empty-status"},[t._v("空空如也！")]):t._e()],2)},a=[],s=n("c93e"),i=(n("cadf"),n("551c"),n("097d"),n("2f62")),r={name:"SongList",props:{isSys:Boolean,tag:String,hideHeader:Boolean},computed:Object(s["a"])({},Object(i["b"])({playNow:"getPlaying",showList:"getShowList",allSongs:"getAllSongs"})),methods:{playMusic:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.$store.dispatch;e&&n("updatePlayingStatus",!0),n("updatePlayNow",this.allSongs[t])}}},l=r,c=(n("4274"),n("2877")),u=Object(c["a"])(l,o,a,!1,null,null,null);u.options.__file="SongList.vue";e["a"]=u.exports},"74c9":function(t,e,n){"use strict";var o=n("dba3"),a=n.n(o);a.a},"7dc5":function(t,e,n){},"7dd7":function(t,e,n){"use strict";var o=n("d604"),a=n.n(o);a.a},"8aa9":function(t,e,n){},aa67:function(t,e,n){"use strict";n("7f7f"),n("28a5");var o=n("8afe"),a=(n("456d"),n("ac6a"),n("5c96")),s=window.localStorage,i=function(t,e,n){t.save(null,{success:function(t){return e&&e(t)},error:function(t){return n&&n(t)}})},r=function(t,e){return Object.keys(e).forEach(function(n){t.set(n,e[n])}),t},l=function(t,e){var n=Bmob.Object.extend(t),o=new Bmob.Query(n);return e?e(o):o},c={get:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=s.getItem(t)||n;return e&&(o=JSON.parse(o)),o},set:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=e;n&&(o=JSON.stringify(o)),s.setItem(t,o)},getBmob:function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(t){return t},a=arguments.length>4?arguments[4]:void 0,s=Bmob.Object.extend(t),i=new Bmob.Query(s);i.get(e,{success:function(t){return o(n?t[n]:t)},error:function(t){return a&&a(t)}})},setBmob:function(t,e,n,o,a){var s=function(t){i(r(t,n),o,a)};this.getBmob(t,e,null,s,a)},createBmob:function(t,e,n,o){var a=Bmob.Object.extend(t),s=new a;i(r(s,e),n,o)},delBmob:function(t,e,n,o){var a=function(t){t.destroy({success:function(t){return n&&n(t)},error:function(t){return o&&o(t)}})};this.getBmob(t,e,null,a,o)},delBmobs:function(t,e,n,o){l(t,e).destroyAll({success:function(t){return n&&n(t)},error:function(t){return o&&o(t)}})},queryBmob:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t},n=arguments.length>2?arguments[2]:void 0,o=arguments.length>3?arguments[3]:void 0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"first",s=l(t,e);s[a]({success:function(t){return n&&n(t&&JSON.parse(JSON.stringify(t)))},error:function(t){return o&&o(t)}})},queryBmobOr:function(t,e,n,a,s){var i,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"find",c=e.map(function(e){return l(t,e)}),u=n((i=Bmob.Query).or.apply(i,Object(o["a"])(c)));u.limit=1e3,u[r]({success:function(t){return a&&a(t&&JSON.parse(JSON.stringify(t)))},error:function(t){return s&&s(t)}})},singUp:function(t,e,n){var o=new Bmob.User;o.set("username",t),o.set("password",e),o.signUp(null,{success:n,error:function(){a["message"].error("注册失败了 = =||")}})},logIn:function(t,e){if(!t){var n=c.get("user");if(!n)return;t={username:n.split("-")[0],password:n.split("-")[1].split("").reverse().join("")}}var o=t,s=o.username,i=o.password;Bmob.User.logIn(s,i,{success:e,error:function(){a["message"].error("登录失败了 TAT")}})},updateUser:function(t,e){var n=Bmob.User.current();Object.keys(t).forEach(function(e){n.set(e,t[e])}),n.save(null,{success:function(){a["message"].success("修改成功(*^▽^*)");var n=c.get("user");n="".concat(t.username,"-").concat(n.split("-")[1]),c.set("user",n),e()},error:function(){a["message"].warning("保存失败了 QAQ")}})},saveFile:function(t,e,n){var o=new Bmob.File(t.name,t);o.save(function(n){e({url:n._url,name:t.name})},n)}};e["a"]=c},ca32:function(t,e,n){},cee3:function(t,e,n){"use strict";var o=n("dba4"),a=n.n(o);a.a},cf05:function(t,e,n){t.exports=n.p+"music/img/logo.82b9c7a5.png"},d416:function(t,e,n){},d524:function(t,e,n){"use strict";var o=n("7dc5"),a=n.n(o);a.a},d604:function(t,e,n){},dba3:function(t,e,n){},dba4:function(t,e,n){},e589:function(t,e,n){"use strict";var o=n("d416"),a=n.n(o);a.a},f689:function(t,e,n){}});
//# sourceMappingURL=app.438321ed.js.map