var t=Object.defineProperty;var n=Object.getOwnPropertyDescriptor;var o=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var d=(l,r)=>{for(var a in r)t(l,a,{get:r[a],enumerable:!0})},c=(l,r,a,b)=>{if(r&&typeof r=="object"||typeof r=="function")for(let m of o(r))!x.call(l,m)&&m!==a&&t(l,m,{get:()=>r[m],enumerable:!(b=n(r,m))||b.enumerable});return l};var g=l=>c(t({},"__esModule",{value:!0}),l);var u={};d(u,{default:()=>y});module.exports=g(u);var e={black:"\x1B[30m",red:"\x1B[31m",green:"\x1B[32m",gray:"\x1B[90m",yellow:"\x1B[33m",blue:"\x1B[34m",magenta:"\x1B[35m",cyan:"\x1B[36m",white:"\x1B[37m"};var y={deleted:e.red,var:e.red,err:e.red,kwd:e.red,num:e.yellow,class:e.yellow,cmnt:e.gray,insert:e.green,str:e.green,bool:e.cyan,type:e.blue,oper:e.blue,section:e.magenta,func:e.magenta};
