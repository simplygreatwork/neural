var te=Object.defineProperty;var d=p=>t=>{var s=p[t];if(s)return s();throw new Error("Module not found in bundle: "+t)};var e=(p,t)=>()=>(p&&(t=p(p=0)),t);var a=(p,t)=>{for(var s in t)te(p,s,{get:t[s],enumerable:!0})};var B={};a(B,{default:()=>ee});var ee,G=e(()=>{ee=[{type:"cmnt",match:/(;|#).*/gm},{expand:"str"},{expand:"num"},{type:"num",match:/\$[\da-fA-F]*\b/g},{type:"kwd",match:/^[a-z]+\s+[a-z.]+\b/gm,sub:[{type:"func",match:/^[a-z]+/g}]},{type:"kwd",match:/^\t*[a-z][a-z\d]*\b/gm},{match:/%|\$/g,type:"oper"}]});var H={};a(H,{default:()=>I});var k,I,N=e(()=>{k={type:"var",match:/\$\w+|\${[^}]*}|\$\([^)]*\)/g},I=[{sub:"todo",match:/#.*/g},{type:"str",match:/(["'])((?!\1)[^\r\n\\]|\\[^])*\1?/g,sub:[k]},{type:"oper",match:/(?<=\s|^)\.*\/[a-z/_.-]+/gi},{type:"kwd",match:/\s-[a-zA-Z]+|$<|[&|;]+|\b(unset|readonly|shift|export|if|fi|else|elif|while|do|done|for|until|case|esac|break|continue|exit|return|trap|wait|eval|exec|then|declare|enable|local|select|typeset|time|add|remove|install|update|delete)(?=\s|$)/g},{expand:"num"},{type:"func",match:/(?<=(^|\||\&\&|\;)\s*)[a-z_.-]+(?=\s|$)/gmi},{type:"bool",match:/(?<=\s|^)(true|false)(?=\s|$)/g},{type:"oper",match:/[=(){}<>!]+/g},{type:"var",match:/(?<=\s|^)[\w_]+(?=\s*=)/g},k]});var z={};a(z,{default:()=>ae});var ae,_=e(()=>{ae=[{match:/[^\[\->+.<\]\s].*/g,sub:"todo"},{type:"func",match:/\.+/g},{type:"kwd",match:/[<>]+/g},{type:"oper",match:/[+-]+/g}]});var Y={};a(Y,{default:()=>pe});var pe,Z=e(()=>{pe=[{match:/\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,sub:"todo"},{expand:"str"},{expand:"num"},{type:"kwd",match:/#\s*include (<.*>|".*")/g,sub:[{type:"str",match:/(<|").*/g}]},{match:/asm\s*{[^}]*}/g,sub:[{type:"kwd",match:/^asm/g},{match:/[^{}]*(?=}$)/g,sub:"asm"}]},{type:"kwd",match:/\*|&|#[a-z]+\b|\b(asm|auto|double|int|struct|break|else|long|switch|case|enum|register|typedef|char|extern|return|union|const|float|short|unsigned|continue|for|signed|void|default|goto|sizeof|volatile|do|if|static|while)\b/g},{type:"oper",match:/[/*+:?&|%^~=!,<>.^-]+/g},{type:"func",match:/[a-zA-Z_][\w_]*(?=\s*\()/g},{type:"class",match:/\b[A-Z][\w_]*\b/g}]});var X={};a(X,{default:()=>ne});var ne,W=e(()=>{ne=[{match:/\/\*((?!\*\/)[^])*(\*\/)?/g,sub:"todo"},{expand:"str"},{type:"kwd",match:/@\w+\b|\b(and|not|only|or)\b|\b[a-z-]+(?=[^{}]*{)/g},{type:"var",match:/\b[\w-]+(?=\s*:)|(::?|\.)[\w-]+(?=[^{}]*{)/g},{type:"func",match:/#[\w-]+(?=[^{}]*{)/g},{type:"num",match:/#[\da-f]{3,8}/g},{type:"num",match:/\d+(\.\d+)?(cm|mm|in|px|pt|pc|em|ex|ch|rem|vm|vh|vmin|vmax|%)?/g,sub:[{type:"var",match:/[a-z]+|%/g}]},{match:/url\([^)]*\)/g,sub:[{type:"func",match:/url(?=\()/g},{type:"str",match:/[^()]+/g}]},{type:"func",match:/\b[a-zA-Z]\w*(?=\s*\()/g},{type:"num",match:/\b[a-z-]+\b/g}]});var j={};a(j,{default:()=>se});var se,K=e(()=>{se=[{expand:"strDouble"},{type:"oper",match:/,/g}]});var V={};a(V,{default:()=>A});var A,R=e(()=>{A=[{type:"deleted",match:/^[-<].*/gm},{type:"insert",match:/^[+>].*/gm},{type:"kwd",match:/!.*/gm},{type:"section",match:/^@@.*@@$|^\d.*|^([*-+])\1\1.*/gm}]});var q={};a(q,{default:()=>re});var re,Q=e(()=>{N();re=[{type:"kwd",match:/^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gmi},...I]});var J={};a(J,{default:()=>ce});var ce,tt=e(()=>{R();ce=[{match:/^#.*/gm,sub:"todo"},{expand:"str"},...A,{type:"func",match:/^(\$ )?git(\s.*)?$/gm},{type:"kwd",match:/^commit \w+$/gm}]});var et={};a(et,{default:()=>me});var me,at=e(()=>{me=[{match:/\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,sub:"todo"},{expand:"str"},{expand:"num"},{type:"kwd",match:/\*|&|\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go|goto|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g},{type:"func",match:/[a-zA-Z_][\w_]*(?=\s*\()/g},{type:"class",match:/\b[A-Z][\w_]*\b/g},{type:"oper",match:/[+\-*\/%&|^~=!<>.^-]+/g}]});var nt={};a(nt,{default:()=>O,name:()=>u,properties:()=>E,xmlElement:()=>l});var pt,oe,u,E,l,O,x=e(()=>{pt=":A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",oe=pt+"\\-\\.0-9\xB7\u0300-\u036F\u203F-\u2040",u=`[${pt}][${oe}]*`,E=`\\s*(\\s+${u}\\s*(=\\s*([^"']\\S*|("|')(\\\\[^]|(?!\\4)[^])*\\4?)?)?\\s*)*`,l={match:RegExp(`<[/!?]?${u}${E}[/!?]?>`,"g"),sub:[{type:"var",match:RegExp(`^<[/!?]?${u}`,"g"),sub:[{type:"oper",match:/^<[\/!?]?/g}]},{type:"str",match:/=\s*([^"']\S*|("|')(\\[^]|(?!\2)[^])*\2?)/g,sub:[{type:"oper",match:/^=/g}]},{type:"oper",match:/[\/!?]?>/g},{type:"class",match:RegExp(u,"g")}]},O=[{match:/<!--((?!-->)[^])*-->/g,sub:"todo"},{type:"class",match:/<!\[CDATA\[[\s\S]*?\]\]>/gi},l,{type:"str",match:RegExp(`<\\?${u}([^?]|\\?[^?>])*\\?+>`,"g"),sub:[{type:"var",match:RegExp(`^<\\?${u}`,"g"),sub:[{type:"oper",match:/^<\?/g}]},{type:"oper",match:/\?+>$/g}]},{type:"var",match:/&(#x?)?[\da-z]{1,8};/gi}]});var st={};a(st,{default:()=>le});var le,rt=e(()=>{x();le=[{type:"class",match:/<!DOCTYPE("[^"]*"|'[^']*'|[^"'>])*>/gi,sub:[{type:"str",match:/"[^"]*"|'[^']*'/g},{type:"oper",match:/^<!|>$/g},{type:"var",match:/DOCTYPE/gi}]},{match:RegExp(`<style${E}>((?!</style>)[^])*</style\\s*>`,"g"),sub:[{match:RegExp(`^<style${E}>`,"g"),sub:l.sub},{match:RegExp(`${l.match}|[^]*(?=</style\\s*>$)`,"g"),sub:"css"},l]},{match:RegExp(`<script${E}>((?!<\/script>)[^])*<\/script\\s*>`,"g"),sub:[{match:RegExp(`^<script${E}>`,"g"),sub:l.sub},{match:RegExp(`${l.match}|[^]*(?=<\/script\\s*>$)`,"g"),sub:"js"},l]},...O]});var ue,i,b=e(()=>{ue=[["bash",[/#!(\/usr)?\/bin\/bash/g,500],[/\b(if|elif|then|fi|echo)\b|\$/g,10]],["html",[/<\/?[a-z-]+[^\n>]*>/g,10],[/^\s+<!DOCTYPE\s+html/g,500]],["http",[/^(GET|HEAD|POST|PUT|DELETE|PATCH|HTTP)\b/g,500]],["js",[/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require)\b/g,10]],["ts",[/\b(console|await|async|function|export|import|this|class|for|let|const|map|join|require|implements|interface|namespace)\b/g,10]],["py",[/\b(def|print|class|and|or|lambda)\b/g,10]],["sql",[/\b(SELECT|INSERT|FROM)\b/g,50]],["pl",[/#!(\/usr)?\/bin\/perl/g,500],[/\b(use|print)\b|\$/g,10]],["lua",[/#!(\/usr)?\/bin\/lua/g,500]],["make",[/\b(ifneq|endif|if|elif|then|fi|echo|.PHONY|^[a-z]+ ?:$)\b|\$/gm,10]],["uri",[/https?:|mailto:|tel:|ftp:/g,30]],["css",[/^(@import|@page|@media|(\.|#)[a-z]+)/gm,20]],["diff",[/^[+><-]/gm,10],[/^@@ ?[-+,0-9 ]+ ?@@/gm,25]],["md",[/^(>|\t\*|\t\d+.)/gm,10],[/\[.*\](.*)/g,10]],["docker",[/^(FROM|ENTRYPOINT|RUN)/gm,500]],["xml",[/<\/?[a-z-]+[^\n>]*>/g,10],[/^<\?xml/g,500]],["c",[/#include\b|\bprintf\s+\(/g,100]],["rs",[/^\s+(use|fn|mut|match)\b/gm,100]],["go",[/\b(func|fmt|package)\b/g,100]],["java",[/^import\s+java/gm,500]],["asm",[/^(section|global main|extern|\t(call|mov|ret))/gm,100]],["css",[/^(@import|@page|@media|(\.|#)[a-z]+)/gm,20]],["json",[/\b(true|false|null|\{})\b|\"[^"]+\":/g,10]],["yaml",[/^(\s+)?[a-z][a-z0-9]*:/gmi,10]]],i=p=>ue.map(([t,...s])=>[t,s.reduce((r,[m,c])=>r+[...p.matchAll(m)].length*c,0)]).filter(([t,s])=>s>20).sort((t,s)=>s[1]-t[1])[0]?.[0]||"plain"});var ct={};a(ct,{default:()=>Ee});var Ee,mt=e(()=>{b();Ee=[{type:"kwd",match:/^(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\b/gm},{expand:"str"},{type:"section",match:/\bHTTP\/[\d.]+\b/g},{expand:"num"},{type:"oper",match:/[,;:=]/g},{type:"var",match:/[a-zA-Z][\w-]*(?=:)/g},{match:/\n\n[^]*/g,sub:i}]});var ot={};a(ot,{default:()=>ie});var ie,lt=e(()=>{ie=[{match:/(^[ \f\t\v]*)[#;].*/gm,sub:"todo"},{type:"str",match:/.*/g},{type:"var",match:/.*(?==)/g},{type:"section",match:/^\s*\[.+\]\s*$/gm},{type:"oper",match:/=/g}]});var ut={};a(ut,{default:()=>he});var he,Et=e(()=>{he=[{match:/\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,sub:"todo"},{expand:"str"},{expand:"num"},{type:"kwd",match:/\b(abstract|assert|boolean|break|byte|case|catch|char|class|continue|const|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|package|private|protected|public|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while)\b/g},{type:"oper",match:/[/*+:?&|%^~=!,<>.^-]+/g},{type:"func",match:/[a-zA-Z_][\w_]*(?=\s*\()/g},{type:"class",match:/\b[A-Z][\w_]*\b/g}]});var it={};a(it,{default:()=>L});var L,S=e(()=>{L=[{match:/\/\*\*((?!\*\/)[^])*(\*\/)?/g,sub:"jsdoc"},{match:/\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,sub:"todo"},{expand:"str"},{match:/`((?!`)[^]|\\[^])*`?/g,sub:"js_template_literals"},{type:"kwd",match:/=>|\b(this|set|get|as|async|await|break|case|catch|class|const|constructor|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|if|implements|import|in|instanceof|interface|let|var|of|new|package|private|protected|public|return|static|super|switch|throw|throws|try|typeof|void|while|with|yield)\b/g},{match:/\/((?!\/)[^\r\n\\]|\\.)+\/[dgimsuy]*/g,sub:"regex"},{expand:"num"},{type:"num",match:/\b(NaN|null|undefined|[A-Z][A-Z_]*)\b/g},{type:"bool",match:/\b(true|false)\b/g},{type:"oper",match:/[/*+:?&|%^~=!,<>.^-]+/g},{type:"class",match:/\b[A-Z][\w_]*\b/g},{type:"func",match:/[a-zA-Z$_][\w$_]*(?=\s*((\?\.)?\s*\(|=\s*(\(?[\w,{}\[\])]+\)? =>|function\b)))/g}]});var ht={};a(ht,{default:()=>ge,type:()=>de});var ge,de,gt=e(()=>{ge=[{match:new class{exec(p){let t=this.lastIndex,s,r=m=>{for(;++t<p.length-2;)if(p[t]=="{")r();else if(p[t]=="}")return};for(;t<p.length;++t)if(p[t-1]!="\\"&&p[t]=="$"&&p[t+1]=="{")return s=t++,r(t),this.lastIndex=t+1,{index:s,0:p.slice(s,t+1)};return null}},sub:[{type:"kwd",match:/^\${|}$/g},{match:/(?!^\$|{)[^]+(?=}$)/g,sub:"js"}]}],de="str"});var dt={};a(dt,{default:()=>C,type:()=>be});var C,be,D=e(()=>{C=[{type:"err",match:/\b(TODO|FIXME|DEBUG|OPTIMIZE|WARNING|XXX|BUG)\b/g},{type:"class",match:/\bIDEA\b/g},{type:"insert",match:/\b(CHANGED|FIX|CHANGE)\b/g},{type:"oper",match:/\bQUESTION\b/g}],be="cmnt"});var bt={};a(bt,{default:()=>ye,type:()=>Te});var ye,Te,yt=e(()=>{D();ye=[{type:"kwd",match:/@\w+/g},{type:"class",match:/{[\w\s|<>,.@\[\]]+}/g},{type:"var",match:/\[[\w\s="']+\]/g},...C],Te="cmnt"});var Tt={};a(Tt,{default:()=>fe});var fe,ft=e(()=>{fe=[{type:"var",match:/("|')?[a-zA-Z]\w*\1(?=\s*:)/g},{expand:"str"},{expand:"num"},{type:"num",match:/\bnull\b/g},{type:"bool",match:/\b(true|false)\b/g}]});var It={};a(It,{default:()=>w});var w,U=e(()=>{b();w=[{type:"cmnt",match:/^>.*|(=|-)\1+/gm},{type:"class",match:/\*\*((?!\*\*).)*\*\*/g},{match:/```((?!```)[^])*\n```/g,sub:p=>({type:"kwd",sub:[{match:/\n[^]*(?=```)/g,sub:p.split(`
`)[0].slice(3)||i(p)}]})},{type:"str",match:/`[^`]*`/g},{type:"var",match:/~~((?!~~).)*~~/g},{type:"kwd",match:/_[^_]*_|\*[^*]*\*/g},{type:"kwd",match:/^\s*(\*|\d+\.)\s/gm},{type:"oper",match:/\[[^\]]*]/g},{type:"func",match:/\([^)]*\)/g}]});var Nt={};a(Nt,{default:()=>Ie});var Ie,At=e(()=>{U();b();Ie=[{type:"insert",match:/(leanpub-start-insert)((?!leanpub-end-insert)[^])*(leanpub-end-insert)?/g,sub:[{type:"insert",match:/leanpub-(start|end)-insert/g},{match:/(?!leanpub-start-insert)((?!leanpub-end-insert)[^])*/g,sub:i}]},{type:"deleted",match:/(leanpub-start-delete)((?!leanpub-end-delete)[^])*(leanpub-end-delete)?/g,sub:[{type:"deleted",match:/leanpub-(start|end)-delete/g},{match:/(?!leanpub-start-delete)((?!leanpub-end-delete)[^])*/g,sub:i}]},...w]});var Rt={};a(Rt,{default:()=>Ne});var Ne,Ot=e(()=>{Ne=[{type:"cmnt",match:/^#.*/gm},{expand:"strDouble"},{expand:"num"},{type:"err",match:/\b(err(or)?|[a-z_-]*exception|warn|warning|failed|ko|invalid|not ?found|alert|fatal)\b/gi},{type:"num",match:/\b(null|undefined)\b/gi},{type:"bool",match:/\b(false|true|yes|no)\b/gi},{type:"oper",match:/\.|,/g}]});var xt={};a(xt,{default:()=>Ae});var Ae,Lt=e(()=>{Ae=[{match:/^#!.*|--(\[(=*)\[((?!--\]\2\])[^])*--\]\2\]|.*)/g,sub:"todo"},{expand:"str"},{type:"kwd",match:/\b(and|break|do|else|elseif|end|for|function|if|in|local|not|or|repeat|return|then|until|while)\b/g},{type:"bool",match:/\b(true|false|nil)\b/g},{type:"oper",match:/[+*/%^#=~<>:,.-]+/g},{expand:"num"},{type:"func",match:/[a-z_]+(?=\s*[({])/g}]});var St={};a(St,{default:()=>Re});var Re,Ct=e(()=>{Re=[{match:/^\s*#.*/gm,sub:"todo"},{expand:"str"},{type:"oper",match:/[${}()]+/g},{type:"class",match:/.PHONY:/gm},{type:"section",match:/^[\w.]+:/gm},{type:"kwd",match:/\b(ifneq|endif)\b/g},{expand:"num"},{type:"var",match:/[A-Z_]+(?=\s*=)/g},{match:/^.*$/gm,sub:"bash"}]});var Dt={};a(Dt,{default:()=>Oe});var Oe,wt=e(()=>{Oe=[{match:/#.*/g,sub:"todo"},{type:"str",match:/(["'])(\\[^]|(?!\1)[^])*\1?/g},{expand:"num"},{type:"kwd",match:/\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while|not|and|or|xor)\b/g},{type:"oper",match:/[-+*/%~!&<>|=?,]+/g},{type:"func",match:/[a-z_]+(?=\s*\()/g}]});var Ut={};a(Ut,{default:()=>xe});var xe,Pt=e(()=>{xe=[{expand:"strDouble"}]});var Ft={};a(Ft,{default:()=>Le});var Le,Mt=e(()=>{Le=[{match:/#.*/g,sub:"todo"},{match:/("""|''')(\\[^]|(?!\1)[^])*\1?/g,sub:"todo"},{type:"str",match:/f("|')(\\[^]|(?!\1).)*\1?|f((["'])\4\4)(\\[^]|(?!\3)[^])*\3?/gi,sub:[{type:"var",match:/{[^{}]*}/g,sub:[{match:/(?!^{)[^]*(?=}$)/g,sub:"py"}]}]},{expand:"str"},{type:"kwd",match:/\b(and|as|assert|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g},{type:"bool",match:/\b(False|True|None)\b/g},{expand:"num"},{type:"func",match:/[a-z_]+(?=\s*\()/g},{type:"oper",match:/[-/*+<>,=!&|^%]+/g},{type:"class",match:/\b[A-Z][\w_]*\b/g}]});var $t={};a($t,{default:()=>Se,type:()=>Ce});var Se,Ce,vt=e(()=>{Se=[{match:/^(?!\/).*/gm,sub:"todo"},{type:"num",match:/\[((?!\])[^\\]|\\.)*\]/g},{type:"kwd",match:/\||\^|\$|\\.|\w+($|\r|\n)/g},{type:"var",match:/\*|\+|\{\d+,\d+\}/g}],Ce="oper"});var Bt={};a(Bt,{default:()=>De});var De,Gt=e(()=>{De=[{match:/\/\/.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,sub:"todo"},{expand:"str"},{expand:"num"},{type:"kwd",match:/\b(as|break|const|continue|crate|else|enum|extern|false|fn|for|if|impl|in|let|loop|match|mod|move|mut|pub|ref|return|self|Self|static|struct|super|trait|true|type|unsafe|use|where|while|async|await|dyn|abstract|become|box|do|final|macro|override|priv|typeof|unsized|virtual|yield|try)\b/g},{type:"oper",match:/[/*+:?&|%^~=!,<>.^-]+/g},{type:"class",match:/\b[A-Z][\w_]*\b/g},{type:"func",match:/[a-zA-Z_][\w_]*(?=\s*!?\s*\()/g}]});var kt={};a(kt,{default:()=>we});var we,Ht=e(()=>{we=[{match:/--.*\n?|\/\*((?!\*\/)[^])*(\*\/)?/g,sub:"todo"},{expand:"str"},{type:"func",match:/\b(AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/g},{type:"kwd",match:/\b(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|kwdS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/g},{type:"num",match:/\.?\d[\d.oxa-fA-F-]*|\bNULL\b/g},{type:"bool",match:/\b(TRUE|FALSE)\b/g},{type:"oper",match:/[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/g},{type:"var",match:/@\S+/g}]});var zt={};a(zt,{default:()=>Ue});var Ue,_t=e(()=>{Ue=[{match:/#.*/g,sub:"todo"},{type:"str",match:/("""|''')((?!\1)[^]|\\[^])*\1?/g},{expand:"str"},{type:"section",match:/^\[.+\]\s*$/gm},{type:"num",match:/\b(inf|nan)\b|\d[\d:ZT.-]*/g},{expand:"num"},{type:"bool",match:/\b(true|false)\b/g},{type:"oper",match:/[+,.=-]/g},{type:"var",match:/\w+(?= \=)/g}]});var Yt={};a(Yt,{default:()=>Pe});var Pe,Zt=e(()=>{S();Pe=[{type:"type",match:/:\s*(any|void|number|boolean|string|object|never|enum)\b/g},{type:"kwd",match:/\b(type|namespace|typedef|interface|public|private|protected|implements|declare|abstract|readonly)\b/g},...L]});var Xt={};a(Xt,{default:()=>Fe});var Fe,Wt=e(()=>{Fe=[{match:/^#.*/gm,sub:"todo"},{type:"class",match:/^\w+(?=:?)/gm},{type:"num",match:/:\d+/g},{type:"oper",match:/[:/&?]|\w+=/g},{type:"func",match:/[.\w]+@|#[\w]+$/gm},{type:"var",match:/\w+\.\w+(\.\w+)*/g}]});var jt={};a(jt,{default:()=>Me});var Me,Kt=e(()=>{Me=[{match:/#.*/g,sub:"todo"},{expand:"str"},{type:"str",match:/(>|\|)\r?\n((\s[^\n]*)?(\r?\n|$))*/g},{type:"type",match:/!![a-z]+/g},{type:"bool",match:/\b(Yes|No)\b/g},{type:"oper",match:/[+:-]/g},{expand:"num"},{type:"var",match:/[a-zA-Z]\w*(?=:)/g}]});var Vt={};a(Vt,{default:()=>n});var n,y=e(()=>{n={black:"\x1B[30m",red:"\x1B[31m",green:"\x1B[32m",gray:"\x1B[90m",yellow:"\x1B[33m",blue:"\x1B[34m",magenta:"\x1B[35m",cyan:"\x1B[36m",white:"\x1B[37m"}});var qt={};a(qt,{default:()=>ve});var ve,Qt=e(()=>{y();ve={deleted:n.red,var:n.red,err:n.red,kwd:n.magenta,num:n.yellow,class:n.yellow,cmnt:n.gray,insert:n.green,str:n.green,bool:n.cyan,type:n.blue,oper:n.blue,section:n.magenta,func:n.blue}});var M={};a(M,{default:()=>Be});var Be,$=e(()=>{y();Be={deleted:n.red,var:n.red,err:n.red,kwd:n.red,num:n.yellow,class:n.yellow,cmnt:n.gray,insert:n.green,str:n.green,bool:n.cyan,type:n.blue,oper:n.blue,section:n.magenta,func:n.magenta}});var v={num:{type:"num",match:/(\.e?|\b)\d(e-|[\d.oxa-fA-F_])*(\.|\b)/g},str:{type:"str",match:/(["'])(\\[^]|(?!\1)[^\r\n\\])*\1?/g},strDouble:{type:"str",match:/"((?!")[^\r\n\\]|\\[^])*"?/g}};var $e=d({"./languages/asm.js":()=>Promise.resolve().then(()=>(G(),B)),"./languages/bash.js":()=>Promise.resolve().then(()=>(N(),H)),"./languages/bf.js":()=>Promise.resolve().then(()=>(_(),z)),"./languages/c.js":()=>Promise.resolve().then(()=>(Z(),Y)),"./languages/css.js":()=>Promise.resolve().then(()=>(W(),X)),"./languages/csv.js":()=>Promise.resolve().then(()=>(K(),j)),"./languages/diff.js":()=>Promise.resolve().then(()=>(R(),V)),"./languages/docker.js":()=>Promise.resolve().then(()=>(Q(),q)),"./languages/git.js":()=>Promise.resolve().then(()=>(tt(),J)),"./languages/go.js":()=>Promise.resolve().then(()=>(at(),et)),"./languages/html.js":()=>Promise.resolve().then(()=>(rt(),st)),"./languages/http.js":()=>Promise.resolve().then(()=>(mt(),ct)),"./languages/ini.js":()=>Promise.resolve().then(()=>(lt(),ot)),"./languages/java.js":()=>Promise.resolve().then(()=>(Et(),ut)),"./languages/js.js":()=>Promise.resolve().then(()=>(S(),it)),"./languages/js_template_literals.js":()=>Promise.resolve().then(()=>(gt(),ht)),"./languages/jsdoc.js":()=>Promise.resolve().then(()=>(yt(),bt)),"./languages/json.js":()=>Promise.resolve().then(()=>(ft(),Tt)),"./languages/leanpub-md.js":()=>Promise.resolve().then(()=>(At(),Nt)),"./languages/log.js":()=>Promise.resolve().then(()=>(Ot(),Rt)),"./languages/lua.js":()=>Promise.resolve().then(()=>(Lt(),xt)),"./languages/make.js":()=>Promise.resolve().then(()=>(Ct(),St)),"./languages/md.js":()=>Promise.resolve().then(()=>(U(),It)),"./languages/pl.js":()=>Promise.resolve().then(()=>(wt(),Dt)),"./languages/plain.js":()=>Promise.resolve().then(()=>(Pt(),Ut)),"./languages/py.js":()=>Promise.resolve().then(()=>(Mt(),Ft)),"./languages/regex.js":()=>Promise.resolve().then(()=>(vt(),$t)),"./languages/rs.js":()=>Promise.resolve().then(()=>(Gt(),Bt)),"./languages/sql.js":()=>Promise.resolve().then(()=>(Ht(),kt)),"./languages/todo.js":()=>Promise.resolve().then(()=>(D(),dt)),"./languages/toml.js":()=>Promise.resolve().then(()=>(_t(),zt)),"./languages/ts.js":()=>Promise.resolve().then(()=>(Zt(),Yt)),"./languages/uri.js":()=>Promise.resolve().then(()=>(Wt(),Xt)),"./languages/xml.js":()=>Promise.resolve().then(()=>(x(),nt)),"./languages/yaml.js":()=>Promise.resolve().then(()=>(Kt(),jt))});var P={};async function F(p,t,s){try{let r,m,c={},T,o=[],h=0,f=typeof t=="string"?await(P[t]??(P[t]=$e(`./languages/${t}.js`))):t,g=[...typeof t=="string"?f.default:t.sub];for(;h<p.length;){for(c.index=null,r=g.length;r-- >0;){if(m=g[r].expand?v[g[r].expand]:g[r],o[r]===void 0||o[r].match.index<h){if(m.match.lastIndex=h,T=m.match.exec(p),T===null){g.splice(r,1),o.splice(r,1);continue}o[r]={match:T,lastIndex:m.match.lastIndex}}o[r].match[0]&&(o[r].match.index<=c.index||c.index===null)&&(c={part:m,index:o[r].match.index,match:o[r].match[0],end:o[r].lastIndex})}if(c.index===null)break;s(p.slice(h,c.index),f.type),h=c.end,c.part.sub?await F(c.match,typeof c.part.sub=="string"?c.part.sub:typeof c.part.sub=="function"?c.part.sub(c.match):c.part,s):s(c.match,c.part.type)}s(p.slice(h,p.length),f.type)}catch{s(p)}}var Ge=d({"./themes/atom-dark.js":()=>Promise.resolve().then(()=>(Qt(),qt)),"./themes/default.js":()=>Promise.resolve().then(()=>($(),M)),"./themes/termcolor.js":()=>Promise.resolve().then(()=>(y(),Vt))});var Jt=Promise.resolve().then(()=>($(),M)),ke=async(p,t)=>{let s="",r=(await Jt).default;return await F(p,t,(m,c)=>s+=c?`${r[c]??""}${m}\x1B[0m`:m),s},la=async(p,t)=>console.log(await ke(p,t)),ua=async p=>Jt=Ge(`./themes/${p}.js`);export{ke as highlightText,la as printHighlight,ua as setTheme};