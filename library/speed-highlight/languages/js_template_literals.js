var h=[{match:new class{exec(l){let e=this.lastIndex,t,n=i=>{for(;++e<l.length-2;)if(l[e]=="{")n();else if(l[e]=="}")return};for(;e<l.length;++e)if(l[e-1]!="\\"&&l[e]=="$"&&l[e+1]=="{")return t=e++,n(e),this.lastIndex=e+1,{index:t,0:l.slice(t,e+1)};return null}},sub:[{type:"kwd",match:/^\${|}$/g},{match:/(?!^\$|{)[^]+(?=}$)/g,sub:"js"}]}],a="str";export{h as default,a as type};