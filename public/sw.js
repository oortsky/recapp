if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const o=e=>n(e,a),r={module:{uri:a},exports:t,require:o};s[a]=Promise.all(c.map((e=>r[e]||o(e)))).then((e=>(i(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"0e8bbc98f69b11f4ba577e5f4255a2a2"},{url:"/_next/static/2f8cbVOXE3bzpNYJWv-qS/_buildManifest.js",revision:"50654c4134ba6f71b423498e9447ee91"},{url:"/_next/static/2f8cbVOXE3bzpNYJWv-qS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/2170a4aa-aa503a94497398ce.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/472-4a4d9db97ed3872f.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/699-0b76f1cc91b9c1d8.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/737-41d6f0136030ad7f.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/app/_not-found-77a6530beaf48779.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/app/items/page-4169fcf4b08732dd.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/app/layout-8bca9a8c69995c3a.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/app/loading-821d97324ecf6b3f.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/app/page-0f752b6b25dee071.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/app/recaps/page-b1c7b8ff47b94bb6.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/fd9d1056-16f14d1599bb12d9.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/framework-c5181c9431ddc45b.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/main-9c45b47b7231e65e.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/main-app-b7308425ec18c7fa.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/pages/_app-1534f180665c857f.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/pages/_error-b646007f40c4f0a8.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-077b7f29e18299e7.js",revision:"2f8cbVOXE3bzpNYJWv-qS"},{url:"/_next/static/css/a1b379f564df2f2d.css",revision:"a1b379f564df2f2d"},{url:"/_next/static/media/46c21389e888bf13-s.woff2",revision:"272930c09ba14c81bb294be1fe18b049"},{url:"/_next/static/media/eafabf029ad39a43-s.p.woff2",revision:"43751174b6b810eb169101a20d8c26f8"},{url:"/icons/icon-128x128.png",revision:"c8a916848a96f88a192ee81dbf40c26b"},{url:"/icons/icon-144x144.png",revision:"96bebe40655019f481e2ae20ec21c226"},{url:"/icons/icon-152x152.png",revision:"f1879b3614f488c2db57cee6c16ba7ea"},{url:"/icons/icon-192x192.png",revision:"e0cd85ce51066ece40727dd61aa87a97"},{url:"/icons/icon-384x384.png",revision:"6294b14982189ff9892a231a0982c231"},{url:"/icons/icon-512x512.png",revision:"83ee8928c54978ef90273c7b7877e26e"},{url:"/icons/icon-72x72.png",revision:"cac0513a52f6a086c07ebee6e63e3e46"},{url:"/icons/icon-96x96.png",revision:"19a1d431e75365abd7cf5cd9c336b2f9"},{url:"/manifest.json",revision:"2fd102c09536bc50240e4480e1ee3cdc"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
