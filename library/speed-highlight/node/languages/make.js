var c=Object.defineProperty;var s=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var d=(a,t)=>{for(var m in t)c(a,m,{get:t[m],enumerable:!0})},n=(a,t,m,p)=>{if(t&&typeof t=="object"||typeof t=="function")for(let e of h(t))!g.call(a,e)&&e!==m&&c(a,e,{get:()=>t[e],enumerable:!(p=s(t,e))||p.enumerable});return a};var b=a=>n(c({},"__esModule",{value:!0}),a);var y={};d(y,{default:()=>o});module.exports=b(y);var o=[{match:/^\s*#.*/gm,sub:"todo"},{expand:"str"},{type:"oper",match:/[${}()]+/g},{type:"class",match:/.PHONY:/gm},{type:"section",match:/^[\w.]+:/gm},{type:"kwd",match:/\b(ifneq|endif)\b/g},{expand:"num"},{type:"var",match:/[A-Z_]+(?=\s*=)/g},{match:/^.*$/gm,sub:"bash"}];