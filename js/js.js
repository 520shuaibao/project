function $(d){ 
return document.getElementById(d); 
} 
// 设置或获取当前显示风格的div
function dsp(d,v){ 
if(v==undefined){ 
return d.style.display; 
}else{ 
d.style.display=v; 
} 
} 
// 设置或获取一个div的高度
function sh(d,v){ 
// 如果你得到高度显示必须阻止返回绝对高度
if(v==undefined){ 
if(dsp(d)!='none'&& dsp(d)!=''){ 
return d.offsetHeight; 
} 
viz = d.style.visibility; 
d.style.visibility = 'hidden'; 
o = dsp(d); 
dsp(d,'block'); 
r = parseInt(d.offsetHeight); 
dsp(d,o); 
d.style.visibility = viz; 
return r; 
}else{ 
d.style.height=v; 
} 
} 
/* 
* 变量S定义accordian的速度
* 变量“T”定义accordian的刷新率
*/ 
s=7; 
t=10; 
//崩溃定时器触发的setInterval减少高度div成倍增长。
function ct(d){ 
d = $(d); 
if(sh(d)>0){ 
v = Math.round(sh(d)/d.s); 
v = (v<1) ? 1 :v ; 
v = (sh(d)-v); 
sh(d,v+'px'); 
d.style.opacity = (v/d.maxh); 
d.style.filter= 'alpha(opacity='+(v*100/d.maxh)+');'; 
}else{ 
sh(d,0); 
dsp(d,'none'); 
clearInterval(d.t); 
} 
} 
//扩大定时器触发的setInterval增加高度div成倍增长。
function et(d){ 
d = $(d); 
if(sh(d)<d.maxh){ 
v = Math.round((d.maxh-sh(d))/d.s); 
v = (v<1) ? 1 :v ; 
v = (sh(d)+v); 
sh(d,v+'px'); 
d.style.opacity = (v/d.maxh); 
d.style.filter= 'alpha(opacity='+(v*100/d.maxh)+');'; 
}else{ 
sh(d,d.maxh); 
clearInterval(d.t); 
} 
} 
// 初始化程序崩溃
function cl(d){ 
if(dsp(d)=='block'){ 
clearInterval(d.t); 
d.t=setInterval('ct("'+d.id+'")',t); 
} 
} 
//扩大初始化
function ex(d){ 
if(dsp(d)=='none'){ 
dsp(d,'block'); 
d.style.height='0px'; 
clearInterval(d.t); 
d.t=setInterval('et("'+d.id+'")',t); 
} 
} 
//删除名称从给定的div。
function cc(n,v){ 
s=n.className.split(/s+/); 
for(p=0;p<s.length;p++){ 
if(s[p]==v+n.tc){ 
s.splice(p,1); 
n.className=s.join(' '); 
break; 
} 
} 
} 
//Accordian初始化
function Accordian(d,s,tc){ 
// 把所有的元素id作为内容
l=$(d).getElementsByTagName('div'); 
c=[]; 
for(i=0;i<l.length;i++){ 
h=l[i].id; 
if(h.substr(h.indexOf('-')+1,h.length)=='content'){c.push(h);} 
} 
sel=null; 
//然后搜索标题
for(i=0;i<l.length;i++){ 
h=l[i].id; 
if(h.substr(h.indexOf('-')+1,h.length)=='header'){ 
d=$(h.substr(0,h.indexOf('-'))+'-content'); 
d.style.display='none'; 
d.style.overflow='hidden'; 
d.maxh =sh(d); 
d.s=(s==undefined)? 7 : s; 
h=$(h); 
h.tc=tc; 
h.c=c; 
// 设置为每个头onclick功能。
h.onclick = function(){ 
for(i=0;i<this.c.length;i++){ 
cn=this.c[i]; 
n=cn.substr(0,cn.indexOf('-')); 
if((n+'-header')==this.id){ 
ex($(n+'-content')); 
n=$(n+'-header'); 
cc(n,'__'); 
n.className=n.className+' '+n.tc; 
}else{ 
cl($(n+'-content')); 
cc($(n+'-header'),''); 
} 
} 
} 
if(h.className.match(/selected+/)!=undefined){ sel=h;} 
} 
} 
if(sel!=undefined){sel.onClick();} 
} 