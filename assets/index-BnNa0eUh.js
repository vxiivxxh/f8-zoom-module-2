(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();var Te=/([:*])(\w+)/g,Be="([^/]+)",Ie=/\*/g,$e="?(?:.*)",Oe=/\/\?/g,Re="/?([^/]+|)",Me="(?:/^|^)",He="";function ae(e){return e===void 0&&(e="/"),Y()?location.pathname+location.search+location.hash:e}function y(e){return e.replace(/\/+$/,"").replace(/^\/+/,"")}function M(e){return typeof e=="string"}function ze(e){return typeof e=="function"}function H(e){return e&&e.indexOf("#")>=0&&e.split("#").pop()||""}function je(e,t){return t.length===0||!e?null:e.slice(1,e.length).reduce(function(r,s,n){return r===null&&(r={}),r[t[n]]=decodeURIComponent(s),r},null)}function z(e){var t=y(e).split(/\?(.*)?$/);return[y(t[0]),t.slice(1).join("")]}function W(e){for(var t={},r=e.split("&"),s=0;s<r.length;s++){var n=r[s].split("=");if(n[0]!==""){var o=decodeURIComponent(n[0]);t[o]?(Array.isArray(t[o])||(t[o]=[t[o]]),t[o].push(decodeURIComponent(n[1]||""))):t[o]=decodeURIComponent(n[1]||"")}}return t}function le(e,t){var r=z(y(e.currentLocationPath)),s=r[0],n=r[1],o=n===""?null:W(n),a=[],c;if(M(t.path)){if(c=Me+y(t.path).replace(Te,function(m,v,b){return a.push(b),Be}).replace(Ie,$e).replace(Oe,Re)+"$",y(t.path)===""&&y(s)==="")return{url:s,queryString:n,hashString:H(e.to),route:t,data:null,params:o}}else c=t.path;var d=new RegExp(c,He),h=s.match(d);if(h){var u=M(t.path)?je(h,a):h.groups?h.groups:h.slice(1);return{url:y(s.replace(new RegExp("^"+e.instance.root),"")),queryString:n,hashString:H(e.to),route:t,data:u,params:o}}return!1}function ce(){return!!(typeof window<"u"&&window.history&&window.history.pushState)}function B(e,t){return typeof e[t]>"u"||e[t]===!0}function qe(e){if(!e)return{};var t=e.split(","),r={},s;return t.forEach(function(n){var o=n.split(":").map(function(a){return a.replace(/(^ +| +$)/g,"")});switch(o[0]){case"historyAPIMethod":r.historyAPIMethod=o[1];break;case"resolveOptionsStrategy":s||(s={}),s.strategy=o[1];break;case"resolveOptionsHash":s||(s={}),s.hash=o[1]==="true";break;case"updateBrowserURL":case"callHandler":case"updateState":case"force":r[o[0]]=o[1]==="true";break}}),s&&(r.resolveOptions=s),r}function Y(){return typeof window<"u"}function Ne(e,t){return e===void 0&&(e=[]),t===void 0&&(t={}),e.filter(function(r){return r}).forEach(function(r){["before","after","already","leave"].forEach(function(s){r[s]&&(t[s]||(t[s]=[]),t[s].push(r[s]))})}),t}function L(e,t,r){var s=t||{},n=0;(function o(){if(!e[n]){r&&r(s);return}Array.isArray(e[n])?(e.splice.apply(e,[n,1].concat(e[n][0](s)?e[n][1]:e[n][2])),o()):e[n](s,function(a){typeof a>"u"||a===!0?(n+=1,o()):r&&r(s)})})()}L.if=function(e,t,r){return Array.isArray(t)||(t=[t]),Array.isArray(r)||(r=[r]),[e,t,r]};function Z(e,t){typeof e.currentLocationPath>"u"&&(e.currentLocationPath=e.to=ae(e.instance.root)),e.currentLocationPath=e.instance._checkForAHash(e.currentLocationPath),t()}function q(e,t){for(var r=0;r<e.instance.routes.length;r++){var s=e.instance.routes[r],n=le(e,s);if(n&&(e.matches||(e.matches=[]),e.matches.push(n),e.resolveOptions.strategy==="ONE")){t();return}}t()}function Ve(e,t){e.navigateOptions&&(typeof e.navigateOptions.shouldResolve<"u"&&console.warn('"shouldResolve" is deprecated. Please check the documentation.'),typeof e.navigateOptions.silent<"u"&&console.warn('"silent" is deprecated. Please check the documentation.')),t()}function De(e,t){e.navigateOptions.force===!0?(e.instance._setCurrent([e.instance._pathToMatchObject(e.to)]),t(!1)):t()}var ee=Y(),Fe=ce();function Ue(e,t){if(B(e.navigateOptions,"updateBrowserURL")){var r=("/"+e.to).replace(/\/\//g,"/"),s=ee&&e.resolveOptions&&e.resolveOptions.hash===!0;Fe?(history[e.navigateOptions.historyAPIMethod||"pushState"](e.navigateOptions.stateObj||{},e.navigateOptions.title||"",s?"#"+r:r),location&&location.hash&&(e.instance.__freezeListening=!0,setTimeout(function(){if(!s){var n=location.hash;location.hash="",location.hash=n}e.instance.__freezeListening=!1},1))):ee&&(window.location.href=e.to)}t()}function de(e,t){var r=e.instance;if(!r.lastResolved()){t();return}L(r.lastResolved().map(function(s){return function(n,o){if(!s.route.hooks||!s.route.hooks.leave){o();return}var a=!1,c=e.instance.matchLocation(s.route.path,e.currentLocationPath,!1);if(s.route.path!=="*")a=!c;else{var d=e.matches?e.matches.find(function(h){return s.route.path===h.route.path}):!1;a=!d}if(B(e.navigateOptions,"callHooks")&&a){L(s.route.hooks.leave.map(function(h){return function(u,m){return h(function(v){v===!1?e.instance.__markAsClean(e):m()},e.matches&&e.matches.length>0?e.matches.length===1?e.matches[0]:e.matches:void 0)}}).concat([function(){return o()}]));return}else o()}}),{},function(){return t()})}function Ge(e,t){e.match.route.hooks&&e.match.route.hooks.before&&B(e.navigateOptions,"callHooks")?L(e.match.route.hooks.before.map(function(r){return function(n,o){return r(function(a){a===!1?e.instance.__markAsClean(e):o()},e.match)}}).concat([function(){return t()}])):t()}function We(e,t){B(e.navigateOptions,"callHandler")&&e.match.route.handler(e.match),e.instance.updatePageLinks(),t()}function Ye(e,t){e.match.route.hooks&&e.match.route.hooks.after&&B(e.navigateOptions,"callHooks")&&e.match.route.hooks.after.forEach(function(r){return r(e.match)}),t()}function Xe(e,t){var r=e.instance.lastResolved();if(r&&r[0]&&r[0].route===e.match.route&&r[0].url===e.match.url&&r[0].queryString===e.match.queryString){r.forEach(function(s){s.route.hooks&&s.route.hooks.already&&B(e.navigateOptions,"callHooks")&&s.route.hooks.already.forEach(function(n){return n(e.match)})}),t(!1);return}t()}function Ke(e,t){var r=e.instance._notFoundRoute;if(r){e.notFoundHandled=!0;var s=z(e.currentLocationPath),n=s[0],o=s[1],a=H(e.to);r.path=y(n);var c={url:r.path,queryString:o,hashString:a,data:null,route:r,params:o!==""?W(o):null};e.matches=[c],e.match=c}t()}function Je(e,t){(!e.resolveOptions||e.resolveOptions.noMatchWarning===!1||typeof e.resolveOptions.noMatchWarning>"u")&&console.warn('Navigo: "'+e.currentLocationPath+`" didn't match any of the registered routes.`),t()}function Qe(e,t){e.instance._setCurrent(null),t()}function ue(e,t){B(e.navigateOptions,"updateState")&&e.instance._setCurrent(e.matches),t()}var he=[Xe,Ge,We,Ye],te=[de,Ke,L.if(function(e){var t=e.notFoundHandled;return t},he.concat([ue]),[Je,Qe])];function U(){return U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},U.apply(this,arguments)}function re(e,t){var r=0;function s(){if(r===e.matches.length){ue(e,t);return}L(he,U({},e,{match:e.matches[r]}),function(){r+=1,s()})}de(e,s)}function N(e){e.instance.__markAsClean(e)}function G(){return G=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},G.apply(this,arguments)}var se="[data-navigo]";function Ze(e,t){var r=t||{strategy:"ONE",hash:!1,noMatchWarning:!1,linksSelector:se},s=this,n="/",o=null,a=[],c=!1,d,h=ce(),u=Y();e?n=y(e):console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.');function m(i){return i.indexOf("#")>=0&&(r.hash===!0?i=i.split("#")[1]||"/":i=i.split("#")[0]),i}function v(i){return y(n+"/"+y(i))}function b(i,l,f,g){return i=M(i)?v(i):i,{name:g||y(String(i)),path:i,handler:l,hooks:Ne(f)}}function x(i,l,f){var g=this;return typeof i=="object"&&!(i instanceof RegExp)?(Object.keys(i).forEach(function(p){if(typeof i[p]=="function")g.on(p,i[p]);else{var k=i[p],$=k.uses,Pe=k.as,Ae=k.hooks;a.push(b(p,$,[d,Ae],Pe))}}),this):(typeof i=="function"&&(f=l,l=i,i=n),a.push(b(i,l,[d,f])),this)}function w(i,l){if(s.__dirty){s.__waiting.push(function(){return s.resolve(i,l)});return}else s.__dirty=!0;i=i?y(n)+"/"+y(i):void 0;var f={instance:s,to:i,currentLocationPath:i,navigateOptions:{},resolveOptions:G({},r,l)};return L([Z,q,L.if(function(g){var p=g.matches;return p&&p.length>0},re,te)],f,N),f.matches?f.matches:!1}function _(i,l){if(s.__dirty){s.__waiting.push(function(){return s.navigate(i,l)});return}else s.__dirty=!0;i=y(n)+"/"+y(i);var f={instance:s,to:i,navigateOptions:l||{},resolveOptions:l&&l.resolveOptions?l.resolveOptions:r,currentLocationPath:m(i)};L([Ve,De,q,L.if(function(g){var p=g.matches;return p&&p.length>0},re,te),Ue,N],f,N)}function A(i,l,f){var g=K(i,l);return g!==null?(_(g.replace(new RegExp("^/?"+n),""),f),!0):!1}function I(i){return this.routes=a=a.filter(function(l){return M(i)?y(l.path)!==y(i):ze(i)?i!==l.handler:String(l.path)!==String(i)}),this}function O(){h&&(this.__popstateListener=function(){s.__freezeListening||w()},window.addEventListener("popstate",this.__popstateListener))}function ve(){this.routes=a=[],h&&window.removeEventListener("popstate",this.__popstateListener),this.destroyed=c=!0}function ye(i,l){return s._notFoundRoute=b("*",i,[d,l],"__NOT_FOUND__"),this}function X(){if(u)return be().forEach(function(i){if(i.getAttribute("data-navigo")==="false"||i.getAttribute("target")==="_blank"){i.hasListenerAttached&&i.removeEventListener("click",i.navigoHandler);return}i.hasListenerAttached||(i.hasListenerAttached=!0,i.navigoHandler=function(l){if((l.ctrlKey||l.metaKey)&&l.target.tagName.toLowerCase()==="a")return!1;var f=i.getAttribute("href");if(typeof f>"u"||f===null)return!1;if(f.match(/^(http|https)/)&&typeof URL<"u")try{var g=new URL(f);f=g.pathname+g.search}catch{}var p=qe(i.getAttribute("data-navigo-options"));c||(l.preventDefault(),l.stopPropagation(),s.navigate(y(f),p))},i.addEventListener("click",i.navigoHandler))}),s}function be(){return u?[].slice.call(document.querySelectorAll(r.linksSelector||se)):[]}function xe(i){return"/"+n+"/"+y(i)}function we(i){return d=i,this}function ke(){return o}function K(i,l,f){var g=a.find(function($){return $.name===i}),p=null;if(g){if(p=g.path,l)for(var k in l)p=p.replace(":"+k,l[k]);p=p.match(/^\//)?p:"/"+p}return p&&f&&!f.includeRoot&&(p=p.replace(new RegExp("^/"+n),"")),p}function Se(i){return i.getAttribute("href")}function J(i){var l=z(y(i)),f=l[0],g=l[1],p=g===""?null:W(g),k=H(i),$=b(f,function(){},[d],f);return{url:f,queryString:g,hashString:k,route:$,data:null,params:p}}function Le(){return J(y(ae(n)).replace(new RegExp("^"+n),""))}function Ee(i){var l={instance:s,currentLocationPath:i,to:i,resolveOptions:r};return q(l,function(){}),l.matches?l.matches:!1}function _e(i,l,f){typeof l<"u"&&(typeof f>"u"||f)&&(l=v(l));var g={instance:s,to:l,currentLocationPath:l};Z(g,function(){}),typeof i=="string"&&(i=typeof f>"u"||f?v(i):i);var p=le(g,{name:String(i),path:i,handler:function(){},hooks:{}});return p||!1}function R(i,l,f){return typeof l=="string"&&(l=Q(l)),l?(l.hooks[i]||(l.hooks[i]=[]),l.hooks[i].push(f),function(){l.hooks[i]=l.hooks[i].filter(function(g){return g!==f})}):(console.warn("Route doesn't exists: "+l),function(){})}function Q(i){return typeof i=="string"?a.find(function(l){return l.name===v(i)}):a.find(function(l){return l.handler===i})}function Ce(i){i.instance.__dirty=!1,i.instance.__waiting.length>0&&i.instance.__waiting.shift()()}this.root=n,this.routes=a,this.destroyed=c,this.current=o,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=Ce,this.on=x,this.off=I,this.resolve=w,this.navigate=_,this.navigateByName=A,this.destroy=ve,this.notFound=ye,this.updatePageLinks=X,this.link=xe,this.hooks=we,this.extractGETParameters=function(i){return z(m(i))},this.lastResolved=ke,this.generate=K,this.getLinkPath=Se,this.match=Ee,this.matchLocation=_e,this.getCurrentLocation=Le,this.addBeforeHook=R.bind(this,"before"),this.addAfterHook=R.bind(this,"after"),this.addAlreadyHook=R.bind(this,"already"),this.addLeaveHook=R.bind(this,"leave"),this.getRoute=Q,this._pathToMatchObject=J,this._clean=y,this._checkForAHash=m,this._setCurrent=function(i){return o=s.current=i},O.call(this),X.call(this)}const et="https://youtube-music.f8team.dev/api",C={async request(e,t={}){const r=`${et}${e}`,s={"Content-Type":"application/json",...t.headers},n=localStorage.getItem("accessToken");n&&(s.Authorization=`Bearer ${n}`);const o={...t,headers:s};try{const a=await fetch(r,o),c=await a.json();if(!a.ok)throw new Error(c.message||"Lỗi API");return c}catch(a){throw console.error("Yêu cầu API thất bại:",a),a}},get(e,t={}){return this.request(e,{...t,method:"GET"})},post(e,t,r={}){return this.request(e,{...r,method:"POST",body:JSON.stringify(t)})},put(e,t,r={}){return this.request(e,{...r,method:"PUT",body:JSON.stringify(t)})},delete(e,t={}){return this.request(e,{...t,method:"DELETE"})}};class tt{constructor(){this.state={user:null,isAuthenticated:!1,isLoading:!0},this.listeners=[],this.init()}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(r=>r!==t)}}notify(){this.listeners.forEach(t=>t(this.state))}async init(){if(localStorage.getItem("accessToken"))try{await this.fetchCurrentUser()}catch(r){console.error("Session hết hạn hoặc không hợp lệ:",r),this.logout()}else this.setState({isLoading:!1})}setState(t){this.state={...this.state,...t},this.notify()}async login(t,r){this.setState({isLoading:!0});try{const s=await C.post("/auth/login",{email:t,password:r}),{access_token:n,refresh_token:o}=s.data||s,a=n,c=o;if(!a)throw new Error("No access token received");return localStorage.setItem("accessToken",a),localStorage.setItem("refreshToken",c),await this.fetchCurrentUser(),{success:!0}}catch(s){return this.setState({isLoading:!1}),{success:!1,error:s.message}}}async register(t,r,s,n){this.setState({isLoading:!0});try{const o=await C.post("/auth/register",{name:t,email:r,password:s,confirmPassword:n}),{access_token:a,refresh_token:c,user:d}=o.data||o,h=a,u=c;return h?(localStorage.setItem("accessToken",h),localStorage.setItem("refreshToken",u),d?this.setState({user:d,isAuthenticated:!0,isLoading:!1}):await this.fetchCurrentUser()):this.setState({isLoading:!1}),{success:!0}}catch(o){return this.setState({isLoading:!1}),{success:!1,error:o.message}}}async logout(){localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),this.setState({user:null,isAuthenticated:!1,isLoading:!1})}async fetchCurrentUser(){try{const t=await C.get("/auth/me"),r=t.data||t;this.setState({user:r,isAuthenticated:!0,isLoading:!1})}catch(t){throw t}}get isAuthenticated(){return this.state.isAuthenticated}get user(){return this.state.user}}const E=new tt,fe=e=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(e).toLowerCase()),pe=e=>e&&e.length>=6,rt=e=>e&&e.trim().length>=2,st=e=>{const t=document.getElementById("app"),r=`
    <div class="flex items-center justify-center min-h-screen bg-yt-black font-sans">
      <div class="w-full max-w-md p-8 rounded-lg bg-yt-player shadow-2xl">
        <div class="flex justify-center mb-8">
          <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" class="h-8">
        </div>
        
        <h2 class="text-2xl font-bold text-center text-yt-text-primary mb-2">Đăng nhập F8 Music</h2>
        <p class="text-center text-yt-text-secondary mb-8">Tiếp tục đến YouTube Music Clone</p>

        <form id="login-form" class="space-y-6">
          <div id="error-message" class="hidden p-3 text-sm text-red-500 bg-red-900/20 rounded border border-red-500/50"></div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-yt-text-secondary mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              required
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="Nhập email của bạn"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-yt-text-secondary mb-1">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              required
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="Nhập mật khẩu"
            >
          </div>

          <button 
            type="submit" 
            class="w-full py-2.5 px-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-yt-black"
          >
            Đăng Nhập
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-yt-text-secondary">
          Chưa có tài khoản? 
          <a href="/f8-zoom-module-2/register" class="text-blue-400 hover:text-blue-300 transition-colors" data-navigo>Tạo tài khoản</a>
        </div>
      </div>
    </div>
  `;t.innerHTML=r;const s=document.getElementById("login-form"),n=document.getElementById("error-message");s.addEventListener("submit",async o=>{o.preventDefault();const a=document.getElementById("email").value,c=document.getElementById("password").value;if(n.classList.add("hidden"),n.textContent="",!fe(a)){n.textContent="Email không hợp lệ. Vui lòng kiểm tra lại.",n.classList.remove("hidden");return}if(!pe(c)){n.textContent="Mật khẩu phải có ít nhất 6 ký tự.",n.classList.remove("hidden");return}const d=s.querySelector('button[type="submit"]'),h=d.textContent;d.disabled=!0,d.textContent="Đang đăng nhập...";const u=await E.login(a,c);u.success?e.navigate("/"):(n.textContent=u.error||"Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",n.classList.remove("hidden"),d.disabled=!1,d.textContent=h)})},nt=e=>{const t=document.getElementById("app"),r=`
    <div class="flex items-center justify-center min-h-screen bg-yt-black font-sans">
      <div class="w-full max-w-md p-8 rounded-lg bg-yt-player shadow-2xl">
        <div class="flex justify-center mb-8">
          <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" class="h-8">
        </div>
        
        <h2 class="text-2xl font-bold text-center text-yt-text-primary mb-2">Tạo tài khoản</h2>
        <p class="text-center text-yt-text-secondary mb-8">Tham gia YouTube Music Clone</p>

        <form id="register-form" class="space-y-4">
          <div id="error-message" class="hidden p-3 text-sm text-red-500 bg-red-900/20 rounded border border-red-500/50"></div>
          
          <div>
            <label for="name" class="block text-sm font-medium text-yt-text-secondary mb-1">Họ và tên</label>
            <input 
              type="text" 
              id="name" 
              required
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="Tên của bạn"
            >
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-yt-text-secondary mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              required
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="name@example.com"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-yt-text-secondary mb-1">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              required
              minlength="6"
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="• • • • • •"
            >
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-yt-text-secondary mb-1">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              id="confirm-password" 
              required
              minlength="6"
              class="w-full px-4 py-2 bg-yt-black border border-gray-700 rounded focus:outline-none focus:border-yt-text-primary text-yt-text-primary placeholder-gray-600 transition-colors"
              placeholder="• • • • • •"
            >
          </div>

          <button 
            type="submit" 
            class="w-full py-2.5 px-4 mt-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-yt-black"
          >
            Đăng Ký
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-yt-text-secondary">
          Đã có tài khoản? 
          <a href="/f8-zoom-module-2/login" class="text-blue-400 hover:text-blue-300 transition-colors" data-navigo>Đăng nhập</a>
        </div>
      </div>
    </div>
  `;t.innerHTML=r;const s=document.getElementById("register-form"),n=document.getElementById("error-message");s.addEventListener("submit",async o=>{o.preventDefault();const a=document.getElementById("name").value,c=document.getElementById("email").value,d=document.getElementById("password").value,h=document.getElementById("confirm-password").value;let u=!0,m="";if(rt(a)?fe(c)?pe(d)?d!==h&&(m="Mật khẩu không khớp.",u=!1):(m="Mật khẩu phải có ít nhất 6 ký tự.",u=!1):(m="Email không hợp lệ.",u=!1):(m="Tên phải có ít nhất 2 ký tự.",u=!1),!u){n.textContent=m,n.classList.remove("hidden");return}n.classList.add("hidden"),n.textContent="";const v=s.querySelector('button[type="submit"]'),b=v.textContent;v.disabled=!0,v.textContent="Đang đăng ký & đăng nhập...";const x=await E.register(a,c,d,h);x.success?e.navigate("/"):(n.textContent=x.error||"Đăng ký thất bại.",n.classList.remove("hidden"),v.disabled=!1,v.textContent=b)})},it="modulepreload",ot=function(e){return"/f8-zoom-module-2/"+e},ne={},ge=function(t,r,s){let n=Promise.resolve();if(r&&r.length>0){let h=function(u){return Promise.all(u.map(m=>Promise.resolve(m).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var a=h;document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");n=h(r.map(u=>{if(u=ot(u),u in ne)return;ne[u]=!0;const m=u.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${v}`))return;const b=document.createElement("link");if(b.rel=m?"stylesheet":it,m||(b.as="script"),b.crossOrigin="",b.href=u,d&&b.setAttribute("nonce",d),document.head.appendChild(b),m)return new Promise((x,w)=>{b.addEventListener("load",x),b.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return n.then(c=>{for(const d of c||[])d.status==="rejected"&&o(d.reason);return t().catch(o)})},j=e=>typeof e!="string"?e:e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),at=()=>`
    <aside class="w-sidebar h-full bg-yt-sidebar text-yt-text-secondary flex flex-col pt-2 z-sidebar border-r border-gray-800 transition-all duration-300 flex-shrink-0">
      
      <!-- Top: Hamburger & Logo -->
      <div class="flex items-center gap-4 px-4 pl-6 mb-2 h-16 shrink-0">
        <button id="sidebar-toggle" class="p-2 -ml-2 text-yt-text-primary hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        </button>
        <a href="/f8-zoom-module-2/" class="flex items-center justify-center p-2 logo-container shrink-0" data-navigo>
           <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" class="h-6">
        </a>
      </div>

      <nav class="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
        
        <!-- Primary Navigation -->
        <a href="/f8-zoom-module-2/" class="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-white transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span class="font-medium text-sm">Trang chủ</span>
        </a>
        <a href="/f8-zoom-module-2/explore" class="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-white transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5 7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>
          <span class="font-medium text-sm">Khám phá</span>
        </a>
        <a href="/f8-zoom-module-2/library" class="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-white transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
          <span class="font-medium text-sm">Thư viện</span>
        </a>
        <a href="#" class="flex items-center gap-5 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          <span class="font-medium text-sm">Nâng cấp</span>
        </a>

        <!-- Divider -->
        <div class="my-6 mx-4 border-t border-gray-700"></div>

        <!-- New Playlist Button -->
        <div class="px-0 mb-4 mt-2 hide-on-collapse">
             <button class="flex items-center justify-center gap-2 w-full bg-[#212121] hover:bg-[#303030] text-white font-medium rounded-3xl py-2 transition-colors border border-white/10">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                <span class="text-sm">Danh sách phát mới</span>
            </button>
        </div>

        <!-- Auto Playlists -->
        <div class="space-y-1 hide-on-collapse">
             <a href="#" class="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-yt-hover hover:text-white transition-colors group">
                 <!-- Make sure icon aligns nicely -->
                 <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.4 16.6L12 18l-3.4-1.4 3.4-8.1 3.4 8.1M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                 </div>
                 <div class="flex-1 min-w-0 flex flex-col">
                    <span class="font-medium text-sm truncate text-white">Bài hát đã thích</span>
                    <div class="flex items-center gap-1 text-xs text-yt-text-secondary">
                        <svg class="w-3 h-3 transform rotate-45" fill="currentColor" viewBox="0 0 24 24"><path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"/></svg>
                        <span class="truncate">Danh sách tự động</span>
                    </div>
                 </div>
             </a>

             <a href="#" class="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-yt-hover hover:text-white transition-colors group">
                 <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
                 </div>
                 <div class="flex-1 min-w-0 flex flex-col">
                    <span class="font-medium text-sm truncate text-white">Xem sau</span>
                    <div class="flex items-center gap-1 text-xs text-yt-text-secondary">
                        <span class="truncate">Danh sách tự động</span>
                    </div>
                 </div>
             </a>
        </div>
      </nav>
    </aside>
  `;class lt{constructor(){this.state={isSidebarCollapsed:localStorage.getItem("sidebarCollapsed")==="true"},this.listeners=[],this.init()}init(){this.applyState()}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(r=>r!==t)}}notify(){this.listeners.forEach(t=>t(this.state))}toggleSidebar(){this.state.isSidebarCollapsed=!this.state.isSidebarCollapsed,localStorage.setItem("sidebarCollapsed",this.state.isSidebarCollapsed),this.applyState(),this.notify()}applyState(){this.state.isSidebarCollapsed?document.body.classList.add("sidebar-collapsed"):document.body.classList.remove("sidebar-collapsed")}get isSidebarCollapsed(){return this.state.isSidebarCollapsed}}const ct=new lt,ie=()=>{const e=E.user,t=e&&e.name?e.name.charAt(0).toUpperCase():"G";return`
    <header class="sticky top-0 h-16 bg-transparent z-header flex items-center justify-between px-8 mb-4">
      <!-- Center: Search Bar -->
      <div class="flex items-center flex-1 max-w-xl">
        <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-yt-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
                type="text" 
                placeholder="Tìm kiếm bài hát, album, nghệ sĩ..." 
                class="block w-full p-2.5 pl-10 text-sm text-yt-text-primary bg-white/10 border border-transparent rounded-lg focus:ring-white focus:border-white placeholder-gray-400"
            >
        </div>
      </div>

      <!-- Right Side Icons -->
      <div class="flex items-center gap-4">
          <!-- Cast Button -->
          <button class="p-2 text-yt-text-primary hover:bg-white/10 rounded-full transition-colors" title="Cast to device">
             <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.92-11-11-11z"/></svg>
          </button>

          <!-- User Profile -->
         ${e?`
            <div id="profile-trigger" class="flex items-center gap-3 cursor-pointer relative select-none">
                <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    ${t}
                </div>
                <!-- Dropdown -->
                <div id="profile-dropdown" class="absolute right-0 top-10 w-48 bg-yt-player rounded shadow-lg py-1 hidden border border-gray-700">
                     <div class="px-4 py-3 border-b border-gray-700">
                        <p class="text-sm text-white font-medium truncate">${e.name}</p>
                        <p class="text-xs text-gray-400 truncate">${e.email}</p>
                     </div>
                     <button id="header-logout-btn" class="block w-full text-left px-4 py-2 text-sm text-yt-text-primary hover:bg-gray-700">Đăng xuất</button>
                </div>
            </div>
         `:`
            <a href="/f8-zoom-module-2/login" class="text-sm font-medium text-yt-text-primary px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors" data-navigo>Đăng nhập</a>
         `}
      </div>
    </header>
  `},oe=e=>{const t=document.getElementById("sidebar-toggle");t&&t.addEventListener("click",o=>{ct.toggleSidebar()});const r=document.getElementById("header-logout-btn");r&&r.addEventListener("click",async()=>{const o=document.getElementById("profile-dropdown");o&&o.classList.add("hidden"),await E.logout(),e.navigate("/login")});const s=document.getElementById("profile-trigger"),n=document.getElementById("profile-dropdown");if(s&&n){s.addEventListener("click",a=>{a.stopPropagation(),n.classList.toggle("hidden")});const o=a=>{!s.contains(a.target)&&!n.contains(a.target)&&n.classList.add("hidden")};document._headerClickOutside&&document.removeEventListener("click",document._headerClickOutside),document._headerClickOutside=o,document.addEventListener("click",o)}};class dt{constructor(){this.state={isPlaying:!1,currentSong:null,queue:[],currentIndex:-1,volume:localStorage.getItem("yt_volume")?parseInt(localStorage.getItem("yt_volume")):100,currentTime:0,duration:0},this.listeners=[],this.player=null,this.initPlayer()}initPlayer(){const t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";const r=document.getElementsByTagName("script")[0];if(r.parentNode.insertBefore(t,r),window.onYouTubeIframeAPIReady=()=>{this.player=new window.YT.Player("yt-player-container",{height:"180",width:"320",playerVars:{autoplay:1,controls:0,disablekb:1,fs:0,iv_load_policy:3,modestbranding:1,playsinline:1,rel:0},events:{onReady:s=>{this.setVolume(this.state.volume),this.state.currentSong&&this.play(this.state.currentSong)},onStateChange:s=>{s.data===window.YT.PlayerState.PLAYING?(this.setState({isPlaying:!0}),this.startProgressLoop()):s.data===window.YT.PlayerState.PAUSED?(this.setState({isPlaying:!1}),this.stopProgressLoop()):s.data===window.YT.PlayerState.ENDED&&this.next()}}})},!document.getElementById("yt-player-container")){const s=document.createElement("div");s.id="yt-player-container",s.className="yt-video-container hidden-video",document.body.appendChild(s)}}startProgressLoop(){this.stopProgressLoop(),this.progressInterval=setInterval(()=>{if(this.player&&this.player.getCurrentTime){const t=this.player.getCurrentTime(),r=this.player.getDuration();this.setState({currentTime:t,duration:r})}},1e3)}stopProgressLoop(){this.progressInterval&&clearInterval(this.progressInterval)}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(r=>r!==t)}}notify(){this.listeners.forEach(t=>t(this.state))}setState(t){this.state={...this.state,...t},this.notify()}play(t){if(this.state.currentSong&&this.state.currentSong.id===t.id){this.player&&typeof this.player.playVideo=="function"&&this.player.playVideo(),this.setState({isPlaying:!0});return}if(this.setState({currentSong:t,isPlaying:!0,currentTime:0,duration:t.duration||0}),this.player&&typeof this.player.loadVideoById=="function"){const r=t.id;this.player.loadVideoById(r)}if(this.state.queue.length===0)this.state.queue=[t],this.state.currentIndex=0;else{const r=this.state.queue.findIndex(s=>s.id===t.id);r===-1?(this.state.queue.push(t),this.setState({currentIndex:this.state.queue.length-1})):this.setState({currentIndex:r})}}togglePlay(){this.state.isPlaying?this.player&&this.player.pauseVideo():this.player&&this.player.playVideo(),this.setState({isPlaying:!this.state.isPlaying})}next(){if(this.state.queue.length===0)return;const t=(this.state.currentIndex+1)%this.state.queue.length;this.play(this.state.queue[t])}prev(){if(this.state.queue.length===0)return;const t=(this.state.currentIndex-1+this.state.queue.length)%this.state.queue.length;this.play(this.state.queue[t])}setVolume(t){this.setState({volume:t}),localStorage.setItem("yt_volume",t),this.player&&typeof this.player.setVolume=="function"&&this.player.setVolume(t)}seek(t){this.player&&typeof this.player.seekTo=="function"&&(this.player.seekTo(t,!0),this.setState({currentTime:t}))}}const P=new dt,me=Object.freeze(Object.defineProperty({__proto__:null,playerStore:P},Symbol.toStringTag,{value:"Module"})),V=()=>{const{currentSong:e,isPlaying:t,volume:r}=P.state;if(!e)return"";const s=e.title||e.name||"Unknown Title",n=e.artists?e.artists.map(a=>a.name).join(", "):"Unknown Artist";return`
    <div class="fixed bottom-0 left-0 right-0 h-player bg-yt-player border-t border-gray-800 flex items-center justify-between px-4 z-player">
      
      <!-- Left: Song Info -->
      <div class="flex items-center w-1/4 min-w-[180px]">
        <img src="${e.thumbnail||e.image||"https://via.placeholder.com/60"}" alt="${s}" class="w-12 h-12 rounded bg-gray-700 object-cover mr-4">
        <div class="overflow-hidden">
           <h3 class="text-white font-medium truncate text-sm">${s}</h3>
           <p class="text-yt-text-secondary truncate text-xs">${n}</p>
        </div>
        <button class="ml-4 text-yt-text-secondary hover:text-white hidden md:block">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
      </div>

      <!-- Center: Controls -->
      <div class="flex flex-col items-center flex-1 max-w-2xl px-4">
         <div class="flex items-center gap-6 mb-1">
            <button id="player-prev" class="text-yt-text-secondary hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
            </button>
            <button id="player-play" class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                ${t?'<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>':'<svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'}
            </button>
            <button id="player-next" class="text-yt-text-secondary hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
         </div>
         <div class="w-full flex items-center gap-3 text-xs text-yt-text-secondary font-mono">
            <span>0:00</span>
            <div class="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group">
                <div class="absolute h-full bg-red-600 rounded-full group-hover:bg-red-500" style="width: 0%"></div>
            </div>
            <span>3:45</span>
         </div>
      </div>

      <!-- Right: Volume/Extra -->
      <div class="flex items-center justify-end w-1/4 min-w-[180px] gap-3">
         <button id="player-toggle-video" class="text-yt-text-secondary hover:text-white" title="Toggle Video">
             <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/></svg>
         </button>
         <button class="text-yt-text-secondary hover:text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
         </button>
         <input type="range" min="0" max="100" value="${r}" class="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white">
      </div>

    </div>
  `},D=()=>{const e=document.getElementById("player-play"),t=document.getElementById("player-next"),r=document.getElementById("player-prev"),s=document.getElementById("player-toggle-video");e&&(e.onclick=()=>P.togglePlay()),t&&(t.onclick=()=>P.next()),r&&(r.onclick=()=>P.prev()),s&&(s.onclick=()=>{const n=document.getElementById("yt-player-container");n&&(n.classList.toggle("hidden-video"),s.classList.toggle("text-white"),s.classList.toggle("text-yt-text-secondary"))})},T=(e,t)=>{const r=document.getElementById("app");(()=>{r.innerHTML=`
        <div class="flex h-screen w-full bg-yt-base text-yt-text-primary overflow-hidden relative">
            <div class="aurora-bg"></div>
            
            <!-- Sidebar is now a flex item, not fixed -->
            ${at()}
            
            <!-- Main Content Wrapper: Flex column, takes remaining space -->
            <div class="flex flex-col flex-1 min-w-0 transition-all relative z-10">
                ${ie()}
                
                <main class="flex-1 overflow-y-auto pb-player px-8 scroll-smooth scrollbar-none">
                    ${e}
                </main>
            </div>
            
            ${P.state.currentSong?V():""}
        </div>
    `,oe(t),P.state.currentSong&&D();const n=window.location.pathname;document.querySelectorAll("nav a").forEach(a=>{a.getAttribute("href")===n&&a.classList.add("bg-yt-hover","text-yt-text-primary")})})(),P.subscribe(n=>{const o=document.querySelector(".bg-yt-player.fixed.bottom-0");if(n.currentSong&&!o){const a=document.querySelector("#app > div");if(a){const c=document.createElement("div");c.innerHTML=V(),a.appendChild(c.firstElementChild),D()}}else if(n.currentSong&&o){const a=document.createElement("div");a.innerHTML=V(),o.replaceWith(a.firstElementChild),D()}}),E.subscribe(n=>{const o=document.querySelector("header");if(o){const a=document.createElement("div");a.innerHTML=ie();const c=a.firstElementChild;o.replaceWith(c),oe(t)}})},ut=async e=>{T(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,e);try{const[t,r,s,n]=await Promise.all([C.get("/home/albums-for-you"),C.get("/home/todays-hits"),C.get("/quick-picks"),C.get("/moods")]),o=Array.isArray(t)?t:t.data||[],a=Array.isArray(r)?r:r.data||[],c=Array.isArray(s)?s:s.data||[],d=n&&n.items?n.items:Array.isArray(n)?n:[],h=E.user,m=`
      <div class="space-y-10">
        <!-- Section: Welcome / Quick actions -->
        <div class="mb-6">
           <h1 class="text-3xl font-bold mb-2">${h?`Xin chào, ${h.name}`:"Xin chào"}</h1>
           ${h?"":'<p class="text-yt-text-secondary">Đăng nhập để xem lịch sử nghe nhạc và đề xuất riêng cho bạn.</p>'}
        </div>

        <!-- Section: Moods / Categories -->
        ${d.length>0?`
        <div class="flex overflow-x-auto gap-3 pb-2 scrollbar-none -mx-8 px-8 mb-8 bg-transparent py-2 transition-all">
            ${d.map(b=>`
                <a href="/f8-zoom-module-2/explore?category=${b.slug}" class="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors whitespace-nowrap border border-white/5" data-navigo>
                    ${b.name}
                </a>
            `).join("")}
        </div>
        `:""}

        <!-- Section: Quick Picks -->
        ${c.length>0?F("Gợi ý nhanh",c,"quick-picks","Bắt đầu nhanh"):""}

        <!-- Section 1: Albums for you -->
        ${F("Gợi ý Album",o,"albums")}

        <!-- Section 2: Today's Hits -->
        ${F("Hit Hôm Nay",a,"hits")}
      </div>
    `;T(m,e);const v=document.querySelector("main");v&&(v.addEventListener("click",x=>{const w=x.target.closest(".song-card");if(w)try{const _=JSON.parse(w.dataset.song);ge(async()=>{const{playerStore:A}=await Promise.resolve().then(()=>me);return{playerStore:A}},void 0).then(({playerStore:A})=>{A.play(_)})}catch(_){console.error("Failed to play song",_)}}),v.querySelectorAll("[data-scroll]").forEach(x=>{x.addEventListener("click",w=>{const _=w.currentTarget.dataset.scroll,A=w.currentTarget.dataset.target,I=document.getElementById(A);if(I){const O=I.clientWidth*.75;_==="left"?I.scrollBy({left:-O,behavior:"smooth"}):I.scrollBy({left:O,behavior:"smooth"})}})}))}catch(t){console.error("Home load error",t),T(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Đã có lỗi xảy ra</h3>
           <p>${t.message}</p>
           <button class="mt-4 px-4 py-2 bg-white text-black rounded-full" onclick="location.reload()">Thử lại</button>
       </div>
    `,e)}},F=(e,t,r,s="")=>{const n=t.slice(0,12);return`
    <section>
        <div class="flex items-end justify-between mb-4">
            <div>
                ${s?`<p class="text-sm font-medium text-yt-text-secondary uppercase tracking-wider mb-1">${s}</p>`:""}
                <h2 class="text-2xl font-bold leading-tight">${e}</h2>
            </div>
            <div class="flex items-center gap-2">
                <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white disabled:opacity-50" 
                    data-scroll="left" data-target="${r}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white disabled:opacity-50" 
                    data-scroll="right" data-target="${r}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
        <div id="${r}" class="flex overflow-x-auto scroll-smooth gap-6 scrollbar-none pb-4 snap-x">
            ${n.map((o,a)=>{let c="";return a>2&&(c="hidden sm:block"),a>3&&(c="hidden md:block"),a>4&&(c="hidden lg:block"),`<div class="${c}">${ht(o)}</div>`}).join("")}
        </div>
    </section>
    `},ht=e=>{const t=e.title||e.name||"Không có tiêu đề",r=j(t),s=Array.isArray(e.artists)?e.artists.map(a=>typeof a=="string"?a:a.name).join(", "):e.description||"",n=j(s),o=e.thumbnails&&e.thumbnails[0]||e.thumbnail||e.image||"https://via.placeholder.com/300";return`
      <div class="flex-shrink-0 w-48 group cursor-pointer song-card snap-start" data-song='${JSON.stringify(e).replace(/'/g,"&#39;")}'>
         <div class="relative aspect-square mb-3 rounded overflow-hidden bg-gray-800">
            <img src="${o}" alt="${r}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </button>
            </div>
         </div>
         <h3 class="font-medium text-white truncate group-hover:underline" title="${r}">${r}</h3>
         <p class="text-sm text-yt-text-secondary truncate" title="${n}">${n}</p>
      </div>
    `},ft=async e=>{T(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,e);try{const[t]=await Promise.all([C.get("/explore/new-releases")]),r=t.items||t.data||[],n=`
       <div class="space-y-8">
         <!-- Chips Navigation -->
         <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            ${["Mới phát hành","Bảng xếp hạng","Tâm trạng","Pop","Rock","Hiphop v.v."].map((a,c)=>`
               <button 
                  class="category-chip px-4 py-2 bg-yt-hover rounded-lg text-sm font-medium whitespace-nowrap hover:bg-white/20 transition-colors ${c===0?"bg-white text-black hover:bg-gray-200":""}"
                  data-category="${a}"
               >
                  ${a}
               </button>
            `).join("")}
         </div>

         <!-- Section: Mới phát hành -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Mới phát hành</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${r.slice(0,10).map(a=>pt(a)).join("")}
            </div>
         </section>
       </div>
     `;T(n,e);const o=document.querySelector("main");o&&o.addEventListener("click",a=>{const c=a.target.closest(".song-card");if(c)try{const h=JSON.parse(c.dataset.song);ge(async()=>{const{playerStore:u}=await Promise.resolve().then(()=>me);return{playerStore:u}},void 0).then(({playerStore:u})=>{u.play(h)})}catch(h){console.error("Failed to play song",h)}const d=a.target.closest(".category-chip");if(d){const h=d.dataset.category;document.querySelectorAll(".category-chip").forEach(m=>{m.classList.remove("bg-white","text-black","hover:bg-gray-200"),m.classList.add("bg-yt-hover","text-white")}),d.classList.remove("bg-yt-hover","text-white"),d.classList.add("bg-white","text-black","hover:bg-gray-200");const u=document.querySelector("h2");u&&(h==="Mới phát hành"?u.textContent="Mới phát hành":u.textContent=`${h} (Demo)`)}})}catch(t){console.error("Explore load error",t),T(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${t.message}</p>
       </div>
    `,e)}},pt=e=>{const t=e.title||e.name||"No Title",r=j(t),s=Array.isArray(e.artists)?e.artists.map(a=>typeof a=="string"?a:a.name).join(", "):"",n=j(s),o=e.thumbnails&&e.thumbnails[0]||e.thumbnail||e.thumb||e.image||"https://via.placeholder.com/300";return`
      <div class="group cursor-pointer song-card" data-song='${JSON.stringify(e).replace(/'/g,"&#39;")}'>
         <div class="relative aspect-square mb-3 rounded overflow-hidden bg-gray-800">
            <img src="${o}" alt="${r}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform">
                   <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </button>
            </div>
         </div>
         <h3 class="font-medium text-white truncate hover:underline" title="${r}">${r}</h3>
         <p class="text-sm text-yt-text-secondary truncate" title="${n}">${n}</p>
      </div>
    `},gt=e=>{T(`
    <div class="px-8 py-4">
      <!-- Categories Filter (Chips) -->
      <div class="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        <button class="px-3 py-1.5 bg-white text-black font-medium text-sm rounded-lg whitespace-nowrap">Tất cả</button>
        <button class="px-3 py-1.5 bg-white/10 text-white font-medium text-sm rounded-lg hover:bg-white/20 whitespace-nowrap transition-colors">Danh sách phát</button>
        <button class="px-3 py-1.5 bg-white/10 text-white font-medium text-sm rounded-lg hover:bg-white/20 whitespace-nowrap transition-colors">Bài hát</button>
        <button class="px-3 py-1.5 bg-white/10 text-white font-medium text-sm rounded-lg hover:bg-white/20 whitespace-nowrap transition-colors">Album</button>
        <button class="px-3 py-1.5 bg-white/10 text-white font-medium text-sm rounded-lg hover:bg-white/20 whitespace-nowrap transition-colors">Nghệ sĩ</button>
      </div>

      <!-- Recent Activity / Library Grid -->
      <div class="mt-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          
          <!-- Liked Songs (Auto Playlist) -->
          <div class="group cursor-pointer">
            <div class="relative aspect-square rounded-md overflow-hidden mb-3 bg-gradient-to-br from-indigo-800 to-purple-800 flex items-center justify-center">
               <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
               <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </div>
            </div>
            <h3 class="font-bold text-white text-base truncate">Bài hát đã thích</h3>
            <p class="text-yt-text-secondary text-sm truncate">Tự động tạo • 0 bài hát</p>
          </div>

          <!-- New Playlist Button -->
          <div class="group cursor-pointer">
            <div class="relative aspect-square rounded-full border-2 border-dashed border-gray-600 mb-3 flex items-center justify-center hover:border-white transition-colors">
               <svg class="w-10 h-10 text-yt-text-secondary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </div>
            <h3 class="font-bold text-white text-base truncate text-center">Tạo danh sách phát mới</h3>
          </div>

        </div>
      </div>
    </div>
  `,e)},S=new Ze("/f8-zoom-module-2/");S.on({"/":()=>{ut(S)},"/explore":()=>{ft(S)},"/library":()=>{gt(S)},"/login":()=>{E.isAuthenticated?S.navigate("/"):st(S)},"/register":()=>{E.isAuthenticated?S.navigate("/"):nt(S)}});S.hooks({before:async(e,t)=>{!E.isAuthenticated&&localStorage.getItem("accessToken")&&await E.init(),e()}});(async()=>(localStorage.getItem("accessToken"),S.resolve()))();
