if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(i[a])return;let c={};const d=e=>n(e,a),b={module:{uri:a},exports:c,require:d};i[a]=Promise.all(r.map((e=>b[e]||d(e)))).then((e=>(s(...e),c)))}}define(["./workbox-9a84fccb"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"app.bundle.js",revision:"cecd01d57f632472de989ad08c25d9f4"},{url:"app.bundle.js.LICENSE.txt",revision:"dbf2126849ae58e8b4c2f5431f093c51"},{url:"c3bc0a354b16c5873b6e.png",revision:null},{url:"cacab11471dbf1d596c4.png",revision:null},{url:"data/cultureDb.js",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"data/dummy.json",revision:"ba5e0339782aeb2706cebd64498c188e"},{url:"fb9add636aa7735c7e7f.png",revision:null},{url:"images/culture.png",revision:"e581199409406ece5d6c6b297f7a3fe3"},{url:"images/home.png",revision:"c4c7b3f7bf0837061e1d58b94379581b"},{url:"images/indonesia.png",revision:"e6833776b735ce427c7b49ea8fb92f35"},{url:"images/landing1.png",revision:"f59bb738b1b3108216214a4aee90e1b6"},{url:"images/landing2.png",revision:"af7a7fd1263cbbcb5df000fb55718455"},{url:"images/login.png",revision:"15b6d19477fddf43f07dbf5aa7150303"},{url:"images/map.png",revision:"658265e91bf0066257eaf8f9ba748cf9"},{url:"images/review.png",revision:"8162f2bc198dd337b2cdcf890f4a31e3"},{url:"images/search.png",revision:"2a758a88e9ed9e6b1a7c0c781d3b64b3"},{url:"images/signup.png",revision:"2ac495c32b8d4e34345527d6da01483c"},{url:"images/upphoto.png",revision:"7beebd279019a9aad58efea48a447712"},{url:"index.html",revision:"846fceb168bd588d06f983b8524c71f3"}],{})}));
//# sourceMappingURL=sw.bundle.js.map
