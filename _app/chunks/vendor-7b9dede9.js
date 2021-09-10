var t=Object.defineProperty,e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,r=(e,n,s)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[n]=s,i=(t,i)=>{for(var o in i||(i={}))n.call(i,o)&&r(t,o,i[o]);if(e)for(var o of e(i))s.call(i,o)&&r(t,o,i[o]);return t};function o(){}const c=t=>t;function a(t,e){for(const n in e)t[n]=e[n];return t}function l(t){return t()}function h(){return Object.create(null)}function u(t){t.forEach(l)}function d(t){return"function"==typeof t}function f(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function g(t,...e){if(null==t)return o;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function p(t,e,n){t.$$.on_destroy.push(g(e,n))}function m(t,e,n,s){if(t){const r=y(t,e,n,s);return t[0](r)}}function y(t,e,n,s){return t[1]&&s?a(n.ctx.slice(),t[1](s(e))):n.ctx}function _(t,e,n,s){if(t[2]&&s){const r=t[2](s(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let s=0;s<n;s+=1)t[s]=e.dirty[s]|r[s];return t}return e.dirty|r}return e.dirty}function x(t,e,n,s,r,i){if(r){const o=y(e,n,s,i);t.p(o,r)}}function $(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function M(t,e,n){return t.set(n),e}const v="undefined"!=typeof window;let b=v?()=>window.performance.now():()=>Date.now(),w=v?t=>requestAnimationFrame(t):o;const k=new Set;function L(t){k.forEach((e=>{e.c(t)||(k.delete(e),e.f())})),0!==k.size&&w(L)}let S,E=!1;function A(t,e,n,s){for(;t<e;){const r=t+(e-t>>1);n(r)<=s?t=r+1:e=r}return t}function I(t,e){t.appendChild(e)}function C(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e.host?e:document}function R(t){const e=T("style");return function(t,e){I(t.head||t,e)}(C(t),e),e}function O(t,e){if(E){for(!function(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if("HEAD"===t.nodeName){const t=[];for(let n=0;n<e.length;n++){const s=e[n];void 0!==s.claim_order&&t.push(s)}e=t}const n=new Int32Array(e.length+1),s=new Int32Array(e.length);n[0]=-1;let r=0;for(let a=0;a<e.length;a++){const t=e[a].claim_order,i=(r>0&&e[n[r]].claim_order<=t?r+1:A(1,r,(t=>e[n[t]].claim_order),t))-1;s[a]=n[i]+1;const o=i+1;n[o]=a,r=Math.max(o,r)}const i=[],o=[];let c=e.length-1;for(let a=n[r]+1;0!=a;a=s[a-1]){for(i.push(e[a-1]);c>=a;c--)o.push(e[c]);c--}for(;c>=0;c--)o.push(e[c]);i.reverse(),o.sort(((t,e)=>t.claim_order-e.claim_order));for(let a=0,l=0;a<o.length;a++){for(;l<i.length&&o[a].claim_order>=i[l].claim_order;)l++;const e=l<i.length?i[l]:null;t.insertBefore(o[a],e)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);null!==t.actual_end_child&&void 0===t.actual_end_child.claim_order;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?void 0===e.claim_order&&e.parentNode===t||t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else e.parentNode===t&&null===e.nextSibling||t.appendChild(e)}function N(t,e,n){E&&!n?O(t,e):e.parentNode===t&&e.nextSibling==n||t.insertBefore(e,n||null)}function j(t){t.parentNode.removeChild(t)}function F(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function T(t){return document.createElement(t)}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function P(t){return document.createTextNode(t)}function W(){return P(" ")}function H(){return P("")}function V(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function q(t){return function(e){return e.preventDefault(),t.call(this,e)}}function B(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function K(t,e,n){e in t?t[e]="boolean"==typeof t[e]&&""===n||n:B(t,e,n)}function D(t){return Array.from(t.childNodes)}function U(t,e,n,s,r=!1){!function(t){void 0===t.claim_info&&(t.claim_info={last_index:0,total_claimed:0})}(t);const i=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const i=t[s];if(e(i)){const e=n(i);return void 0===e?t.splice(s,1):t[s]=e,r||(t.claim_info.last_index=s),i}}for(let s=t.claim_info.last_index-1;s>=0;s--){const i=t[s];if(e(i)){const e=n(i);return void 0===e?t.splice(s,1):t[s]=e,r?void 0===e&&t.claim_info.last_index--:t.claim_info.last_index=s,i}}return s()})();return i.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,i}function J(t,e,n,s){return U(t,(t=>t.nodeName===e),(t=>{const e=[];for(let s=0;s<t.attributes.length;s++){const r=t.attributes[s];n[r.name]||e.push(r.name)}e.forEach((e=>t.removeAttribute(e)))}),(()=>s(e)))}function Q(t,e,n){return J(t,e,n,T)}function G(t,e,n){return J(t,e,n,z)}function X(t,e){return U(t,(t=>3===t.nodeType),(t=>{const n=""+e;if(t.data.startsWith(n)){if(t.data.length!==n.length)return t.splitText(n.length)}else t.data=n}),(()=>P(e)),!0)}function Y(t){return X(t," ")}function Z(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function tt(t,e){t.value=null==e?"":e}function et(t,e,n,s){t.style.setProperty(e,n,s?"important":"")}function nt(t,e){for(let n=0;n<t.options.length;n+=1){const s=t.options[n];if(s.__value===e)return void(s.selected=!0)}t.selectedIndex=-1}function st(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function rt(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=T("iframe");n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),n.setAttribute("aria-hidden","true"),n.tabIndex=-1;const s=function(){if(void 0===S){S=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){S=!0}}return S}();let r;return s?(n.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=V(window,"message",(t=>{t.source===n.contentWindow&&e()}))):(n.src="about:blank",n.onload=()=>{r=V(n.contentWindow,"resize",e)}),I(t,n),()=>{(s||r&&n.contentWindow)&&r(),j(n)}}const it=new Set;let ot,ct=0;function at(t,e,n,s,r,i,o,c=0){const a=16.666/s;let l="{\n";for(let m=0;m<=1;m+=a){const t=e+(n-e)*i(m);l+=100*m+`%{${o(t,1-t)}}\n`}const h=l+`100% {${o(n,1-n)}}\n}`,u=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(h)}_${c}`,d=C(t);it.add(d);const f=d.__svelte_stylesheet||(d.__svelte_stylesheet=R(t).sheet),g=d.__svelte_rules||(d.__svelte_rules={});g[u]||(g[u]=!0,f.insertRule(`@keyframes ${u} ${h}`,f.cssRules.length));const p=t.style.animation||"";return t.style.animation=`${p?`${p}, `:""}${u} ${s}ms linear ${r}ms 1 both`,ct+=1,u}function lt(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-s.length;r&&(t.style.animation=s.join(", "),ct-=r,ct||w((()=>{ct||(it.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),it.clear())})))}function ht(t){ot=t}function ut(){if(!ot)throw new Error("Function called outside component initialization");return ot}function dt(t){ut().$$.on_mount.push(t)}function ft(t){ut().$$.after_update.push(t)}function gt(t,e){ut().$$.context.set(t,e)}function pt(t){return ut().$$.context.get(t)}const mt=[],yt=[],_t=[],xt=[],$t=Promise.resolve();let Mt=!1;function vt(){Mt||(Mt=!0,$t.then(Et))}function bt(){return vt(),$t}function wt(t){_t.push(t)}function kt(t){xt.push(t)}let Lt=!1;const St=new Set;function Et(){if(!Lt){Lt=!0;do{for(let t=0;t<mt.length;t+=1){const e=mt[t];ht(e),At(e.$$)}for(ht(null),mt.length=0;yt.length;)yt.pop()();for(let t=0;t<_t.length;t+=1){const e=_t[t];St.has(e)||(St.add(e),e())}_t.length=0}while(mt.length);for(;xt.length;)xt.pop()();Mt=!1,Lt=!1,St.clear()}}function At(t){if(null!==t.fragment){t.update(),u(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(wt)}}let It;function Ct(t,e,n){t.dispatchEvent(function(t,e,n=!1){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,!1,e),s}(`${e?"intro":"outro"}${n}`))}const Rt=new Set;let Ot;function Nt(){Ot={r:0,c:[],p:Ot}}function jt(){Ot.r||u(Ot.c),Ot=Ot.p}function Ft(t,e){t&&t.i&&(Rt.delete(t),t.i(e))}function Tt(t,e,n,s){if(t&&t.o){if(Rt.has(t))return;Rt.add(t),Ot.c.push((()=>{Rt.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}}const zt={duration:0};function Pt(t,e,n,s){let r=e(t,n),i=s?0:1,a=null,l=null,h=null;function f(){h&&lt(t,h)}function g(t,e){const n=t.b-i;return e*=Math.abs(n),{a:i,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function p(e){const{delay:n=0,duration:s=300,easing:d=c,tick:p=o,css:m}=r||zt,y={start:b()+n,b:e};e||(y.group=Ot,Ot.r+=1),a||l?l=y:(m&&(f(),h=at(t,i,e,s,n,d,m)),e&&p(0,1),a=g(y,s),wt((()=>Ct(t,e,"start"))),function(t){let e;0===k.size&&w(L),new Promise((n=>{k.add(e={c:t,f:n})}))}((e=>{if(l&&e>l.start&&(a=g(l,s),l=null,Ct(t,a.b,"start"),m&&(f(),h=at(t,i,a.b,a.duration,0,d,r.css))),a)if(e>=a.end)p(i=a.b,1-i),Ct(t,a.b,"end"),l||(a.b?f():--a.group.r||u(a.group.c)),a=null;else if(e>=a.start){const t=e-a.start;i=a.a+a.d*d(t/a.duration),p(i,1-i)}return!(!a&&!l)})))}return{run(t){d(r)?(It||(It=Promise.resolve(),It.then((()=>{It=null}))),It).then((()=>{r=r(),p(t)})):p(t)},end(){f(),a=l=null}}}function Wt(t,e){t.d(1),e.delete(t.key)}function Ht(t,e){Tt(t,1,1,(()=>{e.delete(t.key)}))}function Vt(t,e,n,s,r,i,o,c,a,l,h,u){let d=t.length,f=i.length,g=d;const p={};for(;g--;)p[t[g].key]=g;const m=[],y=new Map,_=new Map;for(g=f;g--;){const t=u(r,i,g),c=n(t);let a=o.get(c);a?s&&a.p(t,e):(a=l(c,t),a.c()),y.set(c,m[g]=a),c in p&&_.set(c,Math.abs(g-p[c]))}const x=new Set,$=new Set;function M(t){Ft(t,1),t.m(c,h),o.set(t.key,t),h=t.first,f--}for(;d&&f;){const e=m[f-1],n=t[d-1],s=e.key,r=n.key;e===n?(h=e.first,d--,f--):y.has(r)?!o.has(s)||x.has(s)?M(e):$.has(r)?d--:_.get(s)>_.get(r)?($.add(s),M(e)):(x.add(r),d--):(a(n,o),d--)}for(;d--;){const e=t[d];y.has(e.key)||a(e,o)}for(;f;)M(m[f-1]);return m}function qt(t,e){const n={},s={},r={$$scope:1};let i=t.length;for(;i--;){const o=t[i],c=e[i];if(c){for(const t in o)t in c||(s[t]=1);for(const t in c)r[t]||(n[t]=c[t],r[t]=1);t[i]=c}else for(const t in o)r[t]=1}for(const o in s)o in n||(n[o]=void 0);return n}function Bt(t){return"object"==typeof t&&null!==t?t:{}}function Kt(t,e,n){const s=t.$$.props[e];void 0!==s&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}function Dt(t){t&&t.c()}function Ut(t,e){t&&t.l(e)}function Jt(t,e,n,s){const{fragment:r,on_mount:i,on_destroy:o,after_update:c}=t.$$;r&&r.m(e,n),s||wt((()=>{const e=i.map(l).filter(d);o?o.push(...e):u(e),t.$$.on_mount=[]})),c.forEach(wt)}function Qt(t,e){const n=t.$$;null!==n.fragment&&(u(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Gt(t,e,n,s,r,i,c,a=[-1]){const l=ot;ht(t);const d=t.$$={fragment:null,ctx:null,props:i,update:o,not_equal:r,bound:h(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:e.context||[]),callbacks:h(),dirty:a,skip_bound:!1,root:e.target||l.$$.root};c&&c(d.root);let f=!1;if(d.ctx=n?n(t,e.props||{},((e,n,...s)=>{const i=s.length?s[0]:n;return d.ctx&&r(d.ctx[e],d.ctx[e]=i)&&(!d.skip_bound&&d.bound[e]&&d.bound[e](i),f&&function(t,e){-1===t.$$.dirty[0]&&(mt.push(t),vt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(t,e)),n})):[],d.update(),f=!0,u(d.before_update),d.fragment=!!s&&s(d.ctx),e.target){if(e.hydrate){E=!0;const t=D(e.target);d.fragment&&d.fragment.l(t),t.forEach(j)}else d.fragment&&d.fragment.c();e.intro&&Ft(t.$$.fragment),Jt(t,e.target,e.anchor,e.customElement),E=!1,Et()}ht(l)}class Xt{$destroy(){Qt(this,1),this.$destroy=o}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Yt=[];function Zt(t,e=o){let n;const s=new Set;function r(e){if(f(t,e)&&(t=e,n)){const e=!Yt.length;for(const n of s)n[1](),Yt.push(n,t);if(e){for(let t=0;t<Yt.length;t+=2)Yt[t][0](Yt[t+1]);Yt.length=0}}}return{set:r,update:function(e){r(e(t))},subscribe:function(i,c=o){const a=[i,c];return s.add(a),1===s.size&&(n=e(r)||o),i(t),()=>{s.delete(a),0===s.size&&(n(),n=null)}}}}function te(t,e,n){const s=!Array.isArray(t),r=s?[t]:t,i=e.length<2;return{subscribe:Zt(n,(t=>{let n=!1;const c=[];let a=0,l=o;const h=()=>{if(a)return;l();const n=e(s?c[0]:c,t);i?t(n):l=d(n)?n:o},f=r.map(((t,e)=>g(t,(t=>{c[e]=t,a&=~(1<<e),n&&h()}),(()=>{a|=1<<e}))));return n=!0,h(),function(){u(f),l()}})).subscribe}}function ee(t){return Array.isArray?Array.isArray(t):"[object Array]"===ae(t)}function ne(t){return"string"==typeof t}function se(t){return"number"==typeof t}function re(t){return!0===t||!1===t||function(t){return ie(t)&&null!==t}(t)&&"[object Boolean]"==ae(t)}function ie(t){return"object"==typeof t}function oe(t){return null!=t}function ce(t){return!t.trim().length}function ae(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const le=Object.prototype.hasOwnProperty;class he{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach((t=>{let n=ue(t);e+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,e+=n.weight})),this._keys.forEach((t=>{t.weight/=e}))}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function ue(t){let e=null,n=null,s=null,r=1;if(ne(t)||ee(t))s=t,e=de(t),n=fe(t);else{if(!le.call(t,"name"))throw new Error((t=>`Missing ${t} property in key`)("name"));const i=t.name;if(s=i,le.call(t,"weight")&&(r=t.weight,r<=0))throw new Error((t=>`Property 'weight' in key '${t}' must be a positive integer`)(i));e=de(i),n=fe(i)}return{path:e,id:n,weight:r,src:s}}function de(t){return ee(t)?t:t.split(".")}function fe(t){return ee(t)?t.join("."):t}const ge={useExtendedSearch:!1,getFn:function(t,e){let n=[],s=!1;const r=(t,e,i)=>{if(oe(t))if(e[i]){const o=t[e[i]];if(!oe(o))return;if(i===e.length-1&&(ne(o)||se(o)||re(o)))n.push(function(t){return null==t?"":function(t){if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-1/0?"-0":e}(t)}(o));else if(ee(o)){s=!0;for(let t=0,n=o.length;t<n;t+=1)r(o[t],e,i+1)}else e.length&&r(o,e,i+1)}else n.push(t)};return r(t,ne(e)?e.split("."):e,0),s?n:n[0]},ignoreLocation:!1,ignoreFieldNorm:!1};var pe=i(i(i(i({},{isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1}),{includeMatches:!1,findAllMatches:!1,minMatchCharLength:1}),{location:0,threshold:.6,distance:100}),ge);const me=/[^ ]+/g;class ye{constructor({getFn:t=pe.getFn}={}){this.norm=function(t=3){const e=new Map,n=Math.pow(10,t);return{get(t){const s=t.match(me).length;if(e.has(s))return e.get(s);const r=1/Math.sqrt(s),i=parseFloat(Math.round(r*n)/n);return e.set(s,i),i},clear(){e.clear()}}}(3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach(((t,e)=>{this._keysMap[t.id]=e}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,ne(this.docs[0])?this.docs.forEach(((t,e)=>{this._addString(t,e)})):this.docs.forEach(((t,e)=>{this._addObject(t,e)})),this.norm.clear())}add(t){const e=this.size();ne(t)?this._addString(t,e):this._addObject(t,e)}removeAt(t){this.records.splice(t,1);for(let e=t,n=this.size();e<n;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!oe(t)||ce(t))return;let n={v:t,i:e,n:this.norm.get(t)};this.records.push(n)}_addObject(t,e){let n={i:e,$:{}};this.keys.forEach(((e,s)=>{let r=this.getFn(t,e.path);if(oe(r))if(ee(r)){let t=[];const e=[{nestedArrIndex:-1,value:r}];for(;e.length;){const{nestedArrIndex:n,value:s}=e.pop();if(oe(s))if(ne(s)&&!ce(s)){let e={v:s,i:n,n:this.norm.get(s)};t.push(e)}else ee(s)&&s.forEach(((t,n)=>{e.push({nestedArrIndex:n,value:t})}))}n.$[s]=t}else if(!ce(r)){let t={v:r,n:this.norm.get(r)};n.$[s]=t}})),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function _e(t,e,{getFn:n=pe.getFn}={}){const s=new ye({getFn:n});return s.setKeys(t.map(ue)),s.setSources(e),s.create(),s}function xe(t,{errors:e=0,currentLocation:n=0,expectedLocation:s=0,distance:r=pe.distance,ignoreLocation:i=pe.ignoreLocation}={}){const o=e/t.length;if(i)return o;const c=Math.abs(s-n);return r?o+c/r:c?1:o}function $e(t,e,n,{location:s=pe.location,distance:r=pe.distance,threshold:i=pe.threshold,findAllMatches:o=pe.findAllMatches,minMatchCharLength:c=pe.minMatchCharLength,includeMatches:a=pe.includeMatches,ignoreLocation:l=pe.ignoreLocation}={}){if(e.length>32)throw new Error(`Pattern length exceeds max of ${32}.`);const h=e.length,u=t.length,d=Math.max(0,Math.min(s,u));let f=i,g=d;const p=c>1||a,m=p?Array(u):[];let y;for(;(y=t.indexOf(e,g))>-1;){let t=xe(e,{currentLocation:y,expectedLocation:d,distance:r,ignoreLocation:l});if(f=Math.min(t,f),g=y+h,p){let t=0;for(;t<h;)m[y+t]=1,t+=1}}g=-1;let _=[],x=1,$=h+u;const M=1<<h-1;for(let b=0;b<h;b+=1){let s=0,i=$;for(;s<i;){xe(e,{errors:b,currentLocation:d+i,expectedLocation:d,distance:r,ignoreLocation:l})<=f?s=i:$=i,i=Math.floor(($-s)/2+s)}$=i;let c=Math.max(1,d-i+1),a=o?u:Math.min(d+i,u)+h,y=Array(a+2);y[a+1]=(1<<b)-1;for(let o=a;o>=c;o-=1){let s=o-1,i=n[t.charAt(s)];if(p&&(m[s]=+!!i),y[o]=(y[o+1]<<1|1)&i,b&&(y[o]|=(_[o+1]|_[o])<<1|1|_[o+1]),y[o]&M&&(x=xe(e,{errors:b,currentLocation:s,expectedLocation:d,distance:r,ignoreLocation:l}),x<=f)){if(f=x,g=s,g<=d)break;c=Math.max(1,2*d-g)}}if(xe(e,{errors:b+1,currentLocation:d,expectedLocation:d,distance:r,ignoreLocation:l})>f)break;_=y}const v={isMatch:g>=0,score:Math.max(.001,x)};if(p){const t=function(t=[],e=pe.minMatchCharLength){let n=[],s=-1,r=-1,i=0;for(let o=t.length;i<o;i+=1){let o=t[i];o&&-1===s?s=i:o||-1===s||(r=i-1,r-s+1>=e&&n.push([s,r]),s=-1)}return t[i-1]&&i-s>=e&&n.push([s,i-1]),n}(m,c);t.length?a&&(v.indices=t):v.isMatch=!1}return v}function Me(t){let e={};for(let n=0,s=t.length;n<s;n+=1){const r=t.charAt(n);e[r]=(e[r]||0)|1<<s-n-1}return e}class ve{constructor(t,{location:e=pe.location,threshold:n=pe.threshold,distance:s=pe.distance,includeMatches:r=pe.includeMatches,findAllMatches:i=pe.findAllMatches,minMatchCharLength:o=pe.minMatchCharLength,isCaseSensitive:c=pe.isCaseSensitive,ignoreLocation:a=pe.ignoreLocation}={}){if(this.options={location:e,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:c,ignoreLocation:a},this.pattern=c?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(t,e)=>{this.chunks.push({pattern:t,alphabet:Me(t),startIndex:e})},h=this.pattern.length;if(h>32){let t=0;const e=h%32,n=h-e;for(;t<n;)l(this.pattern.substr(t,32),t),t+=32;if(e){const t=h-32;l(this.pattern.substr(t),t)}}else l(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:n}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return n&&(e.indices=[[0,t.length-1]]),e}const{location:s,distance:r,threshold:i,findAllMatches:o,minMatchCharLength:c,ignoreLocation:a}=this.options;let l=[],h=0,u=!1;this.chunks.forEach((({pattern:e,alphabet:d,startIndex:f})=>{const{isMatch:g,score:p,indices:m}=$e(t,e,d,{location:s+f,distance:r,threshold:i,findAllMatches:o,minMatchCharLength:c,includeMatches:n,ignoreLocation:a});g&&(u=!0),h+=p,g&&m&&(l=[...l,...m])}));let d={isMatch:u,score:u?h/this.chunks.length:1};return u&&n&&(d.indices=l),d}}class be{constructor(t){this.pattern=t}static isMultiMatch(t){return we(t,this.multiRegex)}static isSingleMatch(t){return we(t,this.singleRegex)}search(){}}function we(t,e){const n=t.match(e);return n?n[1]:null}class ke extends be{constructor(t,{location:e=pe.location,threshold:n=pe.threshold,distance:s=pe.distance,includeMatches:r=pe.includeMatches,findAllMatches:i=pe.findAllMatches,minMatchCharLength:o=pe.minMatchCharLength,isCaseSensitive:c=pe.isCaseSensitive,ignoreLocation:a=pe.ignoreLocation}={}){super(t),this._bitapSearch=new ve(t,{location:e,threshold:n,distance:s,includeMatches:r,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:c,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class Le extends be{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,n=0;const s=[],r=this.pattern.length;for(;(e=t.indexOf(this.pattern,n))>-1;)n=e+r,s.push([e,n-1]);const i=!!s.length;return{isMatch:i,score:i?0:1,indices:s}}}const Se=[class extends be{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},Le,class extends be{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},class extends be{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends be{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends be{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}},class extends be{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=-1===t.indexOf(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},ke],Ee=Se.length,Ae=/ +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;const Ie=new Set([ke.type,Le.type]);class Ce{constructor(t,{isCaseSensitive:e=pe.isCaseSensitive,includeMatches:n=pe.includeMatches,minMatchCharLength:s=pe.minMatchCharLength,ignoreLocation:r=pe.ignoreLocation,findAllMatches:i=pe.findAllMatches,location:o=pe.location,threshold:c=pe.threshold,distance:a=pe.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:n,minMatchCharLength:s,findAllMatches:i,ignoreLocation:r,location:o,threshold:c,distance:a},this.pattern=e?t:t.toLowerCase(),this.query=function(t,e={}){return t.split("|").map((t=>{let n=t.trim().split(Ae).filter((t=>t&&!!t.trim())),s=[];for(let r=0,i=n.length;r<i;r+=1){const t=n[r];let i=!1,o=-1;for(;!i&&++o<Ee;){const n=Se[o];let r=n.isMultiMatch(t);r&&(s.push(new n(r,e)),i=!0)}if(!i)for(o=-1;++o<Ee;){const n=Se[o];let r=n.isSingleMatch(t);if(r){s.push(new n(r,e));break}}}return s}))}(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:s}=this.options;t=s?t:t.toLowerCase();let r=0,i=[],o=0;for(let c=0,a=e.length;c<a;c+=1){const s=e[c];i.length=0,r=0;for(let e=0,c=s.length;e<c;e+=1){const c=s[e],{isMatch:a,indices:l,score:h}=c.search(t);if(!a){o=0,r=0,i.length=0;break}if(r+=1,o+=h,n){const t=c.constructor.type;Ie.has(t)?i=[...i,...l]:i.push(l)}}if(r){let t={isMatch:!0,score:o/r};return n&&(t.indices=i),t}}return{isMatch:!1,score:1}}}const Re=[];function Oe(t,e){for(let n=0,s=Re.length;n<s;n+=1){let s=Re[n];if(s.condition(t,e))return new s(t,e)}return new ve(t,e)}const Ne="$and",je="$or",Fe="$path",Te="$val",ze=t=>!(!t[Ne]&&!t[je]),Pe=t=>({[Ne]:Object.keys(t).map((e=>({[e]:t[e]})))});function We(t,e,{auto:n=!0}={}){const s=t=>{let r=Object.keys(t);const i=(t=>!!t[Fe])(t);if(!i&&r.length>1&&!ze(t))return s(Pe(t));if((t=>!ee(t)&&ie(t)&&!ze(t))(t)){const s=i?t[Fe]:r[0],o=i?t[Te]:t[s];if(!ne(o))throw new Error((t=>`Invalid value for key ${t}`)(s));const c={keyId:fe(s),pattern:o};return n&&(c.searcher=Oe(o,e)),c}let o={children:[],operator:r[0]};return r.forEach((e=>{const n=t[e];ee(n)&&n.forEach((t=>{o.children.push(s(t))}))})),o};return ze(t)||(t=Pe(t)),s(t)}function He(t,e){const n=t.matches;e.matches=[],oe(n)&&n.forEach((t=>{if(!oe(t.indices)||!t.indices.length)return;const{indices:n,value:s}=t;let r={indices:n,value:s};t.key&&(r.key=t.key.src),t.idx>-1&&(r.refIndex=t.idx),e.matches.push(r)}))}function Ve(t,e){e.score=t.score}class qe{constructor(t,e={},n){this.options=i(i({},pe),e),this.options.useExtendedSearch,this._keyStore=new he(this.options.keys),this.setCollection(t,n)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof ye))throw new Error("Incorrect 'index' type");this._myIndex=e||_e(this.options.keys,this._docs,{getFn:this.options.getFn})}add(t){oe(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=(()=>!1)){const e=[];for(let n=0,s=this._docs.length;n<s;n+=1){const r=this._docs[n];t(r,n)&&(this.removeAt(n),n-=1,s-=1,e.push(r))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:e=-1}={}){const{includeMatches:n,includeScore:s,shouldSort:r,sortFn:i,ignoreFieldNorm:o}=this.options;let c=ne(t)?ne(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return function(t,{ignoreFieldNorm:e=pe.ignoreFieldNorm}){t.forEach((t=>{let n=1;t.matches.forEach((({key:t,norm:s,score:r})=>{const i=t?t.weight:null;n*=Math.pow(0===r&&i?Number.EPSILON:r,(i||1)*(e?1:s))})),t.score=n}))}(c,{ignoreFieldNorm:o}),r&&c.sort(i),se(e)&&e>-1&&(c=c.slice(0,e)),function(t,e,{includeMatches:n=pe.includeMatches,includeScore:s=pe.includeScore}={}){const r=[];return n&&r.push(He),s&&r.push(Ve),t.map((t=>{const{idx:n}=t,s={item:e[n],refIndex:n};return r.length&&r.forEach((e=>{e(t,s)})),s}))}(c,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(t){const e=Oe(t,this.options),{records:n}=this._myIndex,s=[];return n.forEach((({v:t,i:n,n:r})=>{if(!oe(t))return;const{isMatch:i,score:o,indices:c}=e.searchIn(t);i&&s.push({item:t,idx:n,matches:[{score:o,value:t,norm:r,indices:c}]})})),s}_searchLogical(t){const e=We(t,this.options),n=(t,e,s)=>{if(!t.children){const{keyId:n,searcher:r}=t,i=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(e,n),searcher:r});return i&&i.length?[{idx:s,item:e,matches:i}]:[]}switch(t.operator){case Ne:{const r=[];for(let i=0,o=t.children.length;i<o;i+=1){const o=t.children[i],c=n(o,e,s);if(!c.length)return[];r.push(...c)}return r}case je:{const r=[];for(let i=0,o=t.children.length;i<o;i+=1){const o=t.children[i],c=n(o,e,s);if(c.length){r.push(...c);break}}return r}}},s=this._myIndex.records,r={},i=[];return s.forEach((({$:t,i:s})=>{if(oe(t)){let o=n(e,t,s);o.length&&(r[s]||(r[s]={idx:s,item:t,matches:[]},i.push(r[s])),o.forEach((({matches:t})=>{r[s].matches.push(...t)})))}})),i}_searchObjectList(t){const e=Oe(t,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach((({$:t,i:s})=>{if(!oe(t))return;let i=[];n.forEach(((n,s)=>{i.push(...this._findMatches({key:n,value:t[s],searcher:e}))})),i.length&&r.push({idx:s,item:t,matches:i})})),r}_findMatches({key:t,value:e,searcher:n}){if(!oe(e))return[];let s=[];if(ee(e))e.forEach((({v:e,i:r,n:i})=>{if(!oe(e))return;const{isMatch:o,score:c,indices:a}=n.searchIn(e);o&&s.push({score:c,key:t,value:e,idx:r,norm:i,indices:a})}));else{const{v:r,n:i}=e,{isMatch:o,score:c,indices:a}=n.searchIn(r);o&&s.push({score:c,key:t,value:r,norm:i,indices:a})}return s}}function Be(t,{delay:e=0,duration:n=400,easing:s=c}={}){const r=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:s,css:t=>"opacity: "+t*r}}qe.version="6.4.6",qe.createIndex=_e,qe.parseIndex=function(t,{getFn:e=pe.getFn}={}){const{keys:n,records:s}=t,r=new ye({getFn:e});return r.setKeys(n),r.setIndexRecords(s),r},qe.config=pe,qe.parseQuery=We,function(...t){Re.push(...t)}(Ce);function Ke(t,e,n){const s=t.slice();return s[23]=e[n],s}const De=t=>({item:16&t}),Ue=t=>({item:t[23].data});function Je(t,e){let n,s,r;const i=e[14].default,o=m(i,e,e[13],Ue),c=o||function(t){let e;return{c(){e=P("Missing template")},l(t){e=X(t,"Missing template")},m(t,n){N(t,e,n)},d(t){t&&j(e)}}}();return{key:t,first:null,c(){n=T("svelte-virtual-list-row"),c&&c.c(),s=W(),this.h()},l(t){n=Q(t,"SVELTE-VIRTUAL-LIST-ROW",{class:!0});var e=D(n);c&&c.l(e),s=Y(e),e.forEach(j),this.h()},h(){K(n,"class","svelte-1kdxoed"),this.first=n},m(t,e){N(t,n,e),c&&c.m(n,null),O(n,s),r=!0},p(t,n){e=t,o&&o.p&&(!r||8208&n)&&x(o,i,e,e[13],r?_(i,e[13],n,De):$(e[13]),Ue)},i(t){r||(Ft(c,t),r=!0)},o(t){Tt(c,t),r=!1},d(t){t&&j(n),c&&c.d(t)}}}function Qe(t){let e,n,s,r,i,o,c=[],a=new Map,l=t[4];const h=t=>t[23].index;for(let u=0;u<l.length;u+=1){let e=Ke(t,l,u),n=h(e);a.set(n,c[u]=Je(n,e))}return{c(){e=T("svelte-virtual-list-viewport"),n=T("svelte-virtual-list-contents");for(let t=0;t<c.length;t+=1)c[t].c();this.h()},l(t){e=Q(t,"SVELTE-VIRTUAL-LIST-VIEWPORT",{style:!0,class:!0});var s=D(e);n=Q(s,"SVELTE-VIRTUAL-LIST-CONTENTS",{style:!0,class:!0});var r=D(n);for(let e=0;e<c.length;e+=1)c[e].l(r);r.forEach(j),s.forEach(j),this.h()},h(){et(n,"padding-top",t[5]+"px"),et(n,"padding-bottom",t[6]+"px"),K(n,"class","svelte-1kdxoed"),et(e,"height",t[0]),K(e,"class","svelte-1kdxoed"),wt((()=>t[17].call(e)))},m(a,l){N(a,e,l),O(e,n);for(let t=0;t<c.length;t+=1)c[t].m(n,null);t[15](n),t[16](e),s=rt(e,t[17].bind(e)),r=!0,i||(o=V(e,"scroll",t[7]),i=!0)},p(t,[s]){8208&s&&(l=t[4],Nt(),c=Vt(c,s,h,1,t,l,a,n,Ht,Je,null,Ke),jt()),(!r||32&s)&&et(n,"padding-top",t[5]+"px"),(!r||64&s)&&et(n,"padding-bottom",t[6]+"px"),(!r||1&s)&&et(e,"height",t[0])},i(t){if(!r){for(let t=0;t<l.length;t+=1)Ft(c[t]);r=!0}},o(t){for(let e=0;e<c.length;e+=1)Tt(c[e]);r=!1},d(n){n&&j(e);for(let t=0;t<c.length;t+=1)c[t].d();t[15](null),t[16](null),s(),i=!1,o()}}}function Ge(t,e,n){let s,r,i,o,c,a,{$$slots:l={},$$scope:h}=e,{items:u}=e,{height:d="100%"}=e,{itemHeight:f}=e,{start:g=0}=e,{end:p=0}=e,m=[],y=0,_=0,x=0;return dt((()=>{s=i.getElementsByTagName("svelte-virtual-list-row"),n(12,c=!0)})),t.$$set=t=>{"items"in t&&n(10,u=t.items),"height"in t&&n(0,d=t.height),"itemHeight"in t&&n(11,f=t.itemHeight),"start"in t&&n(8,g=t.start),"end"in t&&n(9,p=t.end),"$$scope"in t&&n(13,h=t.$$scope)},t.$$.update=()=>{1792&t.$$.dirty&&n(4,o=u.slice(g,p).map(((t,e)=>({index:e+g,data:t})))),7170&t.$$.dirty&&c&&async function(t,e,i){const{scrollTop:o}=r;await bt();let c=_-o,l=g;for(;c<e&&l<t.length;){let t=s[l-g];t||(n(9,p=l+1),await bt(),t=s[l-g]),c+=m[l]=i||t.offsetHeight,l+=1}n(9,p=l);const h=t.length-p;a=(_+c)/p,n(6,x=h*a),m.length=t.length}(u,y,f)},[d,y,r,i,o,_,x,async function(){const{scrollTop:t}=r,e=g;for(let n=0;n<s.length;n+=1)m[g+n]=f||s[n].offsetHeight;let i=0,o=0;for(;i<u.length;){const e=m[i]||a;if(o+e>t){n(8,g=i),n(5,_=o);break}o+=e,i+=1}for(;i<u.length&&(o+=m[i]||a,i+=1,!(o>t+y)););n(9,p=i);const c=u.length-p;for(a=o/p;i<u.length;)m[i++]=a;if(n(6,x=c*a),g<e){await bt();let n=0,i=0;for(let t=g;t<e;t+=1)s[t-g]&&(n+=m[t],i+=f||s[t-g].offsetHeight);const o=i-n;r.scrollTo(0,t+o)}},g,p,u,f,c,h,l,function(t){yt[t?"unshift":"push"]((()=>{i=t,n(3,i)}))},function(t){yt[t?"unshift":"push"]((()=>{r=t,n(2,r)}))},function(){y=this.offsetHeight,n(1,y)}]}class Xe extends Xt{constructor(t){super(),Gt(this,t,Ge,Qe,f,{items:10,height:0,itemHeight:11,start:8,end:9})}}export{te as $,dt as A,a as B,Zt as C,z as D,G as E,O as F,o as G,tt as H,V as I,q as J,u as K,p as L,wt as M,Pt as N,nt as O,Vt as P,M as Q,Be as R,Xt as S,Wt as T,st as U,m as V,x as W,$ as X,_ as Y,pt as Z,qe as _,D as a,F as a0,Xe as a1,yt as a2,Kt as a3,kt as a4,B as b,Q as c,j as d,T as e,N as f,X as g,Z as h,Gt as i,Dt as j,W as k,H as l,Ut as m,Y as n,Jt as o,qt as p,Bt as q,Nt as r,f as s,P as t,Tt as u,Qt as v,jt as w,Ft as x,gt as y,ft as z};