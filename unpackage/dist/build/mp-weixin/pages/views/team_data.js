(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/views/team_data"],{"00b3":function(t,n,e){"use strict";e.r(n);var u=e("fc6e"),o=e("82f5");for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);var r=e("2877"),l=Object(r["a"])(o["default"],u["a"],u["b"],!1,null,null,null);n["default"]=l.exports},4105:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=o(e("9856"));function o(t){return t&&t.__esModule?t:{default:t}}var a=function(){return e.e("components/t-table/t-table").then(e.bind(null,"a555"))},r=function(){return e.e("components/t-table/t-th").then(e.bind(null,"5ec2"))},l=function(){return e.e("components/t-table/t-tr").then(e.bind(null,"d268"))},c=function(){return e.e("components/t-table/t-td").then(e.bind(null,"968f"))},f={components:{tTable:a,tTh:r,tTr:l,tTd:c},data:function(){return{tableList:[]}},onLoad:function(){this.getinfo()},methods:{getinfo:function(){var n=this;t.request({url:u.default.BASE+"/getTeam_data",success:function(t){console.log(t.data),n.tableList=t.data}})}}};n.default=f}).call(this,e("543d")["default"])},"82f5":function(t,n,e){"use strict";e.r(n);var u=e("4105"),o=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);n["default"]=o.a},fc6e:function(t,n,e){"use strict";var u=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return u}),e.d(n,"b",function(){return o})}},[["f529","common/runtime","common/vendor"]]]);