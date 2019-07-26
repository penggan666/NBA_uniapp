(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/t-table/t-td"],{"17fd":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return i})},"8abf":function(t,e,n){"use strict";var r=n("c9ad"),i=n.n(r);i.a},"8b25":function(t,e,n){"use strict";n.r(e);var r=n("db53"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);e["default"]=i.a},"968f":function(t,e,n){"use strict";n.r(e);var r=n("17fd"),i=n("8b25");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("8abf");var o=n("2877"),c=Object(o["a"])(i["default"],r["a"],r["b"],!1,null,null,null);e["default"]=c.exports},c9ad:function(t,e,n){},db53:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{align:String},data:function(){return{thBorder:"1",borderColor:"#d0dee5",fontSize:"14",color:"#555c60",tdAlign:"center"}},inject:["table","tr"],created:function(){this.thBorder=this.table.border,this.borderColor=this.table.borderColor,this.fontSize=this.tr.fontSize,this.color=this.tr.color,this.align?this.tdAlign=this.align:this.tdAlign=this.tr.align},computed:{tdAlignCpd:function(){var t="";switch(this.tdAlign){case"left":t="flex-start";break;case"center":t="center";break;case"right":t="flex-end";break;default:t="center";break}return t}}};e.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/t-table/t-td-create-component',
    {
        'components/t-table/t-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("968f"))
        })
    },
    [['components/t-table/t-td-create-component']]
]);                
