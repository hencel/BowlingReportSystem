!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/build",t(t.s=0)}([function(e,n,t){"use strict";var r=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();document.addEventListener("DOMContentLoaded",function(){(new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return r(e,[{key:"bowlingScoresReceiver",value:function(){var e=[],n=[],t=[],r=document.createElement("input");r.classList.add("fileInput"),r.setAttribute("type","file"),r.setAttribute("accept",".txt"),document.getElementById("app").appendChild(r),r.innerHTML="Wybierz plik",document.querySelector(".fileInput").addEventListener("change",function(r){var o=r.target.files[0],u=new FileReader;u.onload=function(r){var o=r.target.result;0===(t=o.split(/\n/))[t.length-1].length&&t.pop(),console.log(t);for(var u=0;u<t.length;u++)u%2==0?e.push(t[u]):n.push(t[u]);t.length=0,n.forEach(function(e){t.push(e.split(", "))}),n.length=0,n=t,function(){var t=document.createElement("table"),r=document.createElement("tr"),o=document.createElement("th");o.innerHTML="Person",r.appendChild(o),(o=document.createElement("th")).innerHTML="Sum",r.appendChild(o);for(var u=n.reduce(function(e,n){return e.length>n.length?e:n}),i=1;i<u.length+1;i++){var l=document.createElement("th");l.innerHTML=i,r.appendChild(l)}t.appendChild(r);for(var a=0;a<e.length;a++){var c=document.createElement("tr"),d=document.createElement("td");d.innerHTML=e[a],c.appendChild(d),(d=document.createElement("td")).innerHTML=n[a].reduce(function(e,n){return parseFloat(e)+parseFloat(n)}),c.appendChild(d);for(var p=0;p<n[a].length;p++){var f=document.createElement("td");void 0===n[a][p]?f.innerHTML=null:f.innerHTML=n[a][p],c.appendChild(f)}t.appendChild(c)}document.getElementById("app").appendChild(t)}()},u.readAsText(o)})}}]),e}())).bowlingScoresReceiver()})}]);