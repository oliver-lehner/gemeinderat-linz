import{S as e,i as t,s,e as r,j as a,k as l,c as n,a as o,m as c,d as i,n as m,b as g,f as d,o as u,x as h,u as f,v as p,r as v,w as $,t as b,g as w,F as x,h as y,a0 as E,l as D,I}from"./vendor-7b9dede9.js";import{a as z,P as V}from"./pie-2f59c1db.js";function k(e){let t,s,v,$,b,w,x,y,E;return s=new V({props:{parties:e[1]||void 0,type:"pro"}}),b=new V({props:{parties:e[3]||void 0,type:"contra"}}),y=new V({props:{parties:e[2]||void 0,type:"withheld"}}),{c(){t=r("div"),a(s.$$.fragment),v=l(),$=r("div"),a(b.$$.fragment),w=l(),x=r("div"),a(y.$$.fragment),this.h()},l(e){t=n(e,"DIV",{class:!0});var r=o(t);c(s.$$.fragment,r),r.forEach(i),v=m(e),$=n(e,"DIV",{class:!0});var a=o($);c(b.$$.fragment,a),a.forEach(i),w=m(e),x=n(e,"DIV",{class:!0});var l=o(x);c(y.$$.fragment,l),l.forEach(i),this.h()},h(){g(t,"class","pie-container pro svelte-1x2szr8"),g($,"class","pie-container contra svelte-1x2szr8"),g(x,"class","pie-container wh svelte-1x2szr8")},m(e,r){d(e,t,r),u(s,t,null),d(e,v,r),d(e,$,r),u(b,$,null),d(e,w,r),d(e,x,r),u(y,x,null),E=!0},p(e,t){const r={};2&t&&(r.parties=e[1]||void 0),s.$set(r);const a={};8&t&&(a.parties=e[3]||void 0),b.$set(a);const l={};4&t&&(l.parties=e[2]||void 0),y.$set(l)},i(e){E||(h(s.$$.fragment,e),h(b.$$.fragment,e),h(y.$$.fragment,e),E=!0)},o(e){f(s.$$.fragment,e),f(b.$$.fragment,e),f(y.$$.fragment,e),E=!1},d(e){e&&i(t),p(s),e&&i(v),e&&i($),p(b),e&&i(w),e&&i(x),p(y)}}}function G(e){let t,s,a,l=e[0]&&k(e);return{c(){t=r("div"),l&&l.c(),this.h()},l(e){t=n(e,"DIV",{class:!0,style:!0});var s=o(t);l&&l.l(s),s.forEach(i),this.h()},h(){g(t,"class","chart svelte-1x2szr8"),g(t,"style",s=`background-color: var(${e[4]})`)},m(e,s){d(e,t,s),l&&l.m(t,null),a=!0},p(e,[r]){e[0]?l?(l.p(e,r),1&r&&h(l,1)):(l=k(e),l.c(),h(l,1),l.m(t,null)):l&&(v(),f(l,1,1,(()=>{l=null})),$()),(!a||16&r&&s!==(s=`background-color: var(${e[4]})`))&&g(t,"style",s)},i(e){a||(h(l),a=!0)},o(e){f(l),a=!1},d(e){e&&i(t),l&&l.d()}}}function P(e,t,s){let r,a,l,n,{vote:o,submitter:c}=t;return e.$$set=e=>{"vote"in e&&s(0,o=e.vote),"submitter"in e&&s(5,c=e.submitter)},e.$$.update=()=>{32&e.$$.dirty&&s(4,r=z(c).color||"--accent-color"),1&e.$$.dirty&&s(3,({contra:a,withheld:l,pro:n}=o),a,(s(2,l),s(0,o)),(s(1,n),s(0,o)))},[o,n,l,a,r,c]}class S extends e{constructor(e){super(),t(this,e,P,G,s,{vote:0,submitter:5})}}function A(e,t,s){const r=e.slice();return r[2]=t[s],r}function j(e){let t,s,v,$,D,I,z,V,k,G,P=e[0].subject+"";v=new S({props:{vote:e[0],submitter:e[1]}});let j=e[0].meta,N=[];for(let r=0;r<j.length;r+=1)N[r]=T(A(e,j,r));return{c(){t=r("div"),s=r("div"),a(v.$$.fragment),$=l(),D=r("div"),I=l(),z=r("h3"),V=b(P),k=l();for(let e=0;e<N.length;e+=1)N[e].c();this.h()},l(e){t=n(e,"DIV",{class:!0});var r=o(t);s=n(r,"DIV",{class:!0});var a=o(s);c(v.$$.fragment,a),$=m(a),D=n(a,"DIV",{class:!0}),o(D).forEach(i),a.forEach(i),I=m(r),z=n(r,"H3",{class:!0});var l=o(z);V=w(l,P),l.forEach(i),k=m(r);for(let t=0;t<N.length;t+=1)N[t].l(r);r.forEach(i),this.h()},h(){g(D,"class","absolute inset-0 z-10 bg-transparent shadow-inner"),g(s,"class","h-24 w-24 sm:w-36 sm:h-36 border-2 row-span-2 border-white shadow-md relative justify-self-center sm:order-2"),g(z,"class","line-clamp-2 col-span-2 leading-5 sm:h-10 overflow-hidden text-gray-700 sm:order-0"),g(t,"class","w-full p-2 grid gap-x-2 grid-cols-3 sm:grid-cols-1 items-center sm:justify-items-center bg-gray-200 shadow-inner border-4 border-white")},m(e,r){d(e,t,r),x(t,s),u(v,s,null),x(s,$),x(s,D),x(t,I),x(t,z),x(z,V),x(t,k);for(let s=0;s<N.length;s+=1)N[s].m(t,null);G=!0},p(e,s){const r={};if(1&s&&(r.vote=e[0]),2&s&&(r.submitter=e[1]),v.$set(r),(!G||1&s)&&P!==(P=e[0].subject+"")&&y(V,P),1&s){let r;for(j=e[0].meta,r=0;r<j.length;r+=1){const a=A(e,j,r);N[r]?N[r].p(a,s):(N[r]=T(a),N[r].c(),N[r].m(t,null))}for(;r<N.length;r+=1)N[r].d(1);N.length=j.length}},i(e){G||(h(v.$$.fragment,e),G=!0)},o(e){f(v.$$.fragment,e),G=!1},d(e){e&&i(t),p(v),E(N,e)}}}function T(e){let t,s,a,c,u,h=e[2]+"";return{c(){t=r("div"),s=r("p"),a=b(h),c=l(),this.h()},l(e){t=n(e,"DIV",{class:!0});var r=o(t);s=n(r,"P",{class:!0});var l=o(s);a=w(l,h),l.forEach(i),c=m(r),r.forEach(i),this.h()},h(){g(s,"class","text-sm text-white hyphens-auto"),g(t,"class",u=(e[2].includes("angenommen")||e[2].includes("zugewiesen")?"bg-green-500":e[2].includes("abgelehnt")?"bg-red-500":"bg-gray-500")+" w-full rounded p-2 col-start-2 col-span-2 sm:col-start-1 shadow-md sm:mt-2 order-2")},m(e,r){d(e,t,r),x(t,s),x(s,a),x(t,c)},p(e,s){1&s&&h!==(h=e[2]+"")&&y(a,h),1&s&&u!==(u=(e[2].includes("angenommen")||e[2].includes("zugewiesen")?"bg-green-500":e[2].includes("abgelehnt")?"bg-red-500":"bg-gray-500")+" w-full rounded p-2 col-start-2 col-span-2 sm:col-start-1 shadow-md sm:mt-2 order-2")&&g(t,"class",u)},d(e){e&&i(t)}}}function N(e){let t,s,r=e[0]&&j(e);return{c(){r&&r.c(),t=D()},l(e){r&&r.l(e),t=D()},m(e,a){r&&r.m(e,a),d(e,t,a),s=!0},p(e,[s]){e[0]?r?(r.p(e,s),1&s&&h(r,1)):(r=j(e),r.c(),h(r,1),r.m(t.parentNode,t)):r&&(v(),f(r,1,1,(()=>{r=null})),$())},i(e){s||(h(r),s=!0)},o(e){f(r),s=!1},d(e){r&&r.d(e),e&&i(t)}}}function R(e,t,s){let{vote:r,submitter:a}=t;return e.$$set=e=>{"vote"in e&&s(0,r=e.vote),"submitter"in e&&s(1,a=e.submitter)},[r,a]}class B extends e{constructor(e){super(),t(this,e,R,N,s,{vote:0,submitter:1})}}function C(e,t,s){const r=e.slice();return r[4]=t[s],r[6]=s,r}function H(e){let t,s,E,D,I,z,V,k,G,P,S,A,j,T,N,R,C,H,F,U,J,K,M,Q,W,X,Y=`#${e[0].meta.meetingNo}`,Z=`${new Date(e[0].meta.date).toLocaleDateString("de-AT")} `,ee=e[0].meta.agendaText+"",te=e[0].title+"";J=new B({props:{vote:e[0].votes[0],submitter:e[0].submitter}});let se=e[1]&&L(e),re=e[0].votes.length>1&&O(e);return{c(){t=r("div"),s=r("div"),E=r("div"),D=r("p"),I=b(Y),z=l(),V=b(Z),k=l(),G=r("div"),P=r("p"),S=b(ee),j=l(),T=r("div"),N=r("a"),R=r("h2"),C=b(te),F=l(),U=r("div"),a(J.$$.fragment),K=l(),se&&se.c(),M=l(),re&&re.c(),this.h()},l(e){t=n(e,"DIV",{class:!0});var r=o(t);s=n(r,"DIV",{class:!0});var a=o(s);E=n(a,"DIV",{class:!0});var l=o(E);D=n(l,"P",{class:!0});var g=o(D);I=w(g,Y),z=m(g),V=w(g,Z),g.forEach(i),l.forEach(i),k=m(a),G=n(a,"DIV",{class:!0});var d=o(G);P=n(d,"P",{class:!0});var u=o(P);S=w(u,ee),u.forEach(i),d.forEach(i),a.forEach(i),j=m(r),T=n(r,"DIV",{class:!0});var h=o(T);N=n(h,"A",{href:!0,target:!0});var f=o(N);R=n(f,"H2",{class:!0});var p=o(R);C=w(p,te),p.forEach(i),f.forEach(i),h.forEach(i),F=m(r),U=n(r,"DIV",{class:!0});var v=o(U);c(J.$$.fragment,v),K=m(v),se&&se.l(v),M=m(v),re&&re.l(v),v.forEach(i),r.forEach(i),this.h()},h(){g(D,"class","text-currentcolor"),g(E,"class","w-1/3 pl-2 sm:pl-4 whitespace-nowrap sm:whitespace-normal"),g(P,"class","line-clamp-2 text-gray-600 "),g(G,"class",A="sm:w-2/3 pr-4 pl-1 py-0 "+q(e[0].meta.agendaItem)),g(s,"class","bg-gray-300 text-gray-700 -mx-2 -mt-2 sm:-mx-4 sm:-mt-4 sm:h-10 text-sm leading-4 rounded-t flex flex-col sm:flex-row shadow-md hyphens-auto"),g(R,"class","hover:text-blue-200 active:text-blue-300 hyphens-auto"),g(N,"href",H=_(e[0].url)),g(N,"target","_blank"),g(T,"class","sm:line-clamp-6 sm:h-24 my-4 sm:my-2"),g(U,"class",Q="relative "+(e[1]?"grid grid-cols-1 gap-2":"")),g(t,"class",W="m-1 p-2 sm:m-2 sm:p-4 flex flex-col bg-gray-700 ring-1 ring-gray-300 rounded shadow-lg "+(e[1]?"row-span-2":""))},m(e,r){d(e,t,r),x(t,s),x(s,E),x(E,D),x(D,I),x(D,z),x(D,V),x(s,k),x(s,G),x(G,P),x(P,S),x(t,j),x(t,T),x(T,N),x(N,R),x(R,C),x(t,F),x(t,U),u(J,U,null),x(U,K),se&&se.m(U,null),x(U,M),re&&re.m(U,null),X=!0},p(e,s){(!X||1&s)&&Y!==(Y=`#${e[0].meta.meetingNo}`)&&y(I,Y),(!X||1&s)&&Z!==(Z=`${new Date(e[0].meta.date).toLocaleDateString("de-AT")} `)&&y(V,Z),(!X||1&s)&&ee!==(ee=e[0].meta.agendaText+"")&&y(S,ee),(!X||1&s&&A!==(A="sm:w-2/3 pr-4 pl-1 py-0 "+q(e[0].meta.agendaItem)))&&g(G,"class",A),(!X||1&s)&&te!==(te=e[0].title+"")&&y(C,te),(!X||1&s&&H!==(H=_(e[0].url)))&&g(N,"href",H);const r={};1&s&&(r.vote=e[0].votes[0]),1&s&&(r.submitter=e[0].submitter),J.$set(r),e[1]?se?(se.p(e,s),2&s&&h(se,1)):(se=L(e),se.c(),h(se,1),se.m(U,M)):se&&(v(),f(se,1,1,(()=>{se=null})),$()),e[0].votes.length>1?re?re.p(e,s):(re=O(e),re.c(),re.m(U,null)):re&&(re.d(1),re=null),(!X||2&s&&Q!==(Q="relative "+(e[1]?"grid grid-cols-1 gap-2":"")))&&g(U,"class",Q),(!X||2&s&&W!==(W="m-1 p-2 sm:m-2 sm:p-4 flex flex-col bg-gray-700 ring-1 ring-gray-300 rounded shadow-lg "+(e[1]?"row-span-2":"")))&&g(t,"class",W)},i(e){X||(h(J.$$.fragment,e),h(se),X=!0)},o(e){f(J.$$.fragment,e),f(se),X=!1},d(e){e&&i(t),p(J),se&&se.d(),re&&re.d()}}}function L(e){let t,s,r=e[0].votes,a=[];for(let n=0;n<r.length;n+=1)a[n]=F(C(e,r,n));const l=e=>f(a[e],1,1,(()=>{a[e]=null}));return{c(){for(let e=0;e<a.length;e+=1)a[e].c();t=D()},l(e){for(let t=0;t<a.length;t+=1)a[t].l(e);t=D()},m(e,r){for(let t=0;t<a.length;t+=1)a[t].m(e,r);d(e,t,r),s=!0},p(e,s){if(1&s){let n;for(r=e[0].votes,n=0;n<r.length;n+=1){const l=C(e,r,n);a[n]?(a[n].p(l,s),h(a[n],1)):(a[n]=F(l),a[n].c(),h(a[n],1),a[n].m(t.parentNode,t))}for(v(),n=r.length;n<a.length;n+=1)l(n);$()}},i(e){if(!s){for(let e=0;e<r.length;e+=1)h(a[e]);s=!0}},o(e){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)f(a[t]);s=!1},d(e){E(a,e),e&&i(t)}}}function F(e){let t,s,r=e[6]>0&&function(e){let t,s;return t=new B({props:{vote:e[4],submitter:e[0].submitter}}),{c(){a(t.$$.fragment)},l(e){c(t.$$.fragment,e)},m(e,r){u(t,e,r),s=!0},p(e,s){const r={};1&s&&(r.vote=e[4]),1&s&&(r.submitter=e[0].submitter),t.$set(r)},i(e){s||(h(t.$$.fragment,e),s=!0)},o(e){f(t.$$.fragment,e),s=!1},d(e){p(t,e)}}}(e);return{c(){r&&r.c(),t=D()},l(e){r&&r.l(e),t=D()},m(e,a){r&&r.m(e,a),d(e,t,a),s=!0},p(e,t){e[6]>0&&r.p(e,t)},i(e){s||(h(r),s=!0)},o(e){f(r),s=!1},d(e){r&&r.d(e),e&&i(t)}}}function O(e){let t,s,a,l,c,m;return{c(){t=r("button"),s=r("p"),a=b("+"),this.h()},l(e){t=n(e,"BUTTON",{class:!0});var r=o(t);s=n(r,"P",{class:!0});var l=o(s);a=w(l,"+"),l.forEach(i),r.forEach(i),this.h()},h(){g(s,"class",l="flex-1 pb-1 text-green-500 "+(e[1]?"rotate-45":"")),g(t,"class","w-full h-8 z-10 hover:border-gray-300 border-green-500 border-4 border-double text-2xl leading-5 inline-flex place-items-center")},m(r,l){d(r,t,l),x(t,s),x(s,a),c||(m=I(t,"click",e[2]),c=!0)},p(e,t){2&t&&l!==(l="flex-1 pb-1 text-green-500 "+(e[1]?"rotate-45":""))&&g(s,"class",l)},d(e){e&&i(t),c=!1,m()}}}function U(e){let t,s,r=e[0]&&H(e);return{c(){r&&r.c(),t=D()},l(e){r&&r.l(e),t=D()},m(e,a){r&&r.m(e,a),d(e,t,a),s=!0},p(e,[s]){e[0]?r?(r.p(e,s),1&s&&h(r,1)):(r=H(e),r.c(),h(r,1),r.m(t.parentNode,t)):r&&(v(),f(r,1,1,(()=>{r=null})),$())},i(e){s||(h(r),s=!0)},o(e){f(r),s=!1},d(e){r&&r.d(e),e&&i(t)}}}function _(e){return e.includes("TopId")?"https://www.linz.at/Politik/GRSitzungen/GPSearch/ResultDetail?"+e:e.includes("GrId")?"https://www.linz.at/Politik/GRSitzungen/GrSitzungen/GrDetail?"+e:e.includes("AnfrageAntragId")?"https://www.linz.at/Politik/GRSitzungen/GrSitzungen/GetAnfrageAntrag?"+e:void 0}function q(e){return["bg-rose-300","bg-pink-300","bg-purple-300","bg-indigo-300","bg-blue-300","bg-sky-300","bg-cyan-300","bg-teal-300","bg-emerald-300","bg-green-300","bg-lime-300","bg-yellow-300","bg-amber-300","bg-orange-300","bg-red-300"][e.charCodeAt(0)-66]}function J(e,t,s){let{motion:r}=t,a=!1;return e.$$set=e=>{"motion"in e&&s(0,r=e.motion)},[r,a,()=>{s(1,a=!a)}]}class K extends e{constructor(e){super(),t(this,e,J,U,s,{motion:0})}}export{K as C};
