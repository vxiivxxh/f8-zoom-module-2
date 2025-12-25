(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();var _e=/([:*])(\w+)/g,Le="([^/]+)",Pe=/\*/g,Ae="?(?:.*)",Te=/\/\?/g,Ce="/?([^/]+|)",Ie="(?:/^|^)",Oe="";function te(e){return e===void 0&&(e="/"),V()?location.pathname+location.search+location.hash:e}function v(e){return e.replace(/\/+$/,"").replace(/^\/+/,"")}function O(e){return typeof e=="string"}function Re(e){return typeof e=="function"}function R(e){return e&&e.indexOf("#")>=0&&e.split("#").pop()||""}function Be(e,t){return t.length===0||!e?null:e.slice(1,e.length).reduce(function(r,s,n){return r===null&&(r={}),r[t[n]]=decodeURIComponent(s),r},null)}function B(e){var t=v(e).split(/\?(.*)?$/);return[v(t[0]),t.slice(1).join("")]}function F(e){for(var t={},r=e.split("&"),s=0;s<r.length;s++){var n=r[s].split("=");if(n[0]!==""){var o=decodeURIComponent(n[0]);t[o]?(Array.isArray(t[o])||(t[o]=[t[o]]),t[o].push(decodeURIComponent(n[1]||""))):t[o]=decodeURIComponent(n[1]||"")}}return t}function re(e,t){var r=B(v(e.currentLocationPath)),s=r[0],n=r[1],o=n===""?null:F(n),a=[],c;if(O(t.path)){if(c=Ie+v(t.path).replace(_e,function(g,y,b){return a.push(b),Le}).replace(Pe,Ae).replace(Te,Ce)+"$",v(t.path)===""&&v(s)==="")return{url:s,queryString:n,hashString:R(e.to),route:t,data:null,params:o}}else c=t.path;var d=new RegExp(c,Oe),p=s.match(d);if(p){var f=O(t.path)?Be(p,a):p.groups?p.groups:p.slice(1);return{url:v(s.replace(new RegExp("^"+e.instance.root),"")),queryString:n,hashString:R(e.to),route:t,data:f,params:o}}return!1}function se(){return!!(typeof window<"u"&&window.history&&window.history.pushState)}function P(e,t){return typeof e[t]>"u"||e[t]===!0}function He(e){if(!e)return{};var t=e.split(","),r={},s;return t.forEach(function(n){var o=n.split(":").map(function(a){return a.replace(/(^ +| +$)/g,"")});switch(o[0]){case"historyAPIMethod":r.historyAPIMethod=o[1];break;case"resolveOptionsStrategy":s||(s={}),s.strategy=o[1];break;case"resolveOptionsHash":s||(s={}),s.hash=o[1]==="true";break;case"updateBrowserURL":case"callHandler":case"updateState":case"force":r[o[0]]=o[1]==="true";break}}),s&&(r.resolveOptions=s),r}function V(){return typeof window<"u"}function $e(e,t){return e===void 0&&(e=[]),t===void 0&&(t={}),e.filter(function(r){return r}).forEach(function(r){["before","after","already","leave"].forEach(function(s){r[s]&&(t[s]||(t[s]=[]),t[s].push(r[s]))})}),t}function w(e,t,r){var s=t||{},n=0;(function o(){if(!e[n]){r&&r(s);return}Array.isArray(e[n])?(e.splice.apply(e,[n,1].concat(e[n][0](s)?e[n][1]:e[n][2])),o()):e[n](s,function(a){typeof a>"u"||a===!0?(n+=1,o()):r&&r(s)})})()}w.if=function(e,t,r){return Array.isArray(t)||(t=[t]),Array.isArray(r)||(r=[r]),[e,t,r]};function W(e,t){typeof e.currentLocationPath>"u"&&(e.currentLocationPath=e.to=te(e.instance.root)),e.currentLocationPath=e.instance._checkForAHash(e.currentLocationPath),t()}function H(e,t){for(var r=0;r<e.instance.routes.length;r++){var s=e.instance.routes[r],n=re(e,s);if(n&&(e.matches||(e.matches=[]),e.matches.push(n),e.resolveOptions.strategy==="ONE")){t();return}}t()}function je(e,t){e.navigateOptions&&(typeof e.navigateOptions.shouldResolve<"u"&&console.warn('"shouldResolve" is deprecated. Please check the documentation.'),typeof e.navigateOptions.silent<"u"&&console.warn('"silent" is deprecated. Please check the documentation.')),t()}function qe(e,t){e.navigateOptions.force===!0?(e.instance._setCurrent([e.instance._pathToMatchObject(e.to)]),t(!1)):t()}var K=V(),ze=se();function Me(e,t){if(P(e.navigateOptions,"updateBrowserURL")){var r=("/"+e.to).replace(/\/\//g,"/"),s=K&&e.resolveOptions&&e.resolveOptions.hash===!0;ze?(history[e.navigateOptions.historyAPIMethod||"pushState"](e.navigateOptions.stateObj||{},e.navigateOptions.title||"",s?"#"+r:r),location&&location.hash&&(e.instance.__freezeListening=!0,setTimeout(function(){if(!s){var n=location.hash;location.hash="",location.hash=n}e.instance.__freezeListening=!1},1))):K&&(window.location.href=e.to)}t()}function ne(e,t){var r=e.instance;if(!r.lastResolved()){t();return}w(r.lastResolved().map(function(s){return function(n,o){if(!s.route.hooks||!s.route.hooks.leave){o();return}var a=!1,c=e.instance.matchLocation(s.route.path,e.currentLocationPath,!1);if(s.route.path!=="*")a=!c;else{var d=e.matches?e.matches.find(function(p){return s.route.path===p.route.path}):!1;a=!d}if(P(e.navigateOptions,"callHooks")&&a){w(s.route.hooks.leave.map(function(p){return function(f,g){return p(function(y){y===!1?e.instance.__markAsClean(e):g()},e.matches&&e.matches.length>0?e.matches.length===1?e.matches[0]:e.matches:void 0)}}).concat([function(){return o()}]));return}else o()}}),{},function(){return t()})}function Ne(e,t){e.match.route.hooks&&e.match.route.hooks.before&&P(e.navigateOptions,"callHooks")?w(e.match.route.hooks.before.map(function(r){return function(n,o){return r(function(a){a===!1?e.instance.__markAsClean(e):o()},e.match)}}).concat([function(){return t()}])):t()}function Fe(e,t){P(e.navigateOptions,"callHandler")&&e.match.route.handler(e.match),e.instance.updatePageLinks(),t()}function Ve(e,t){e.match.route.hooks&&e.match.route.hooks.after&&P(e.navigateOptions,"callHooks")&&e.match.route.hooks.after.forEach(function(r){return r(e.match)}),t()}function Ue(e,t){var r=e.instance.lastResolved();if(r&&r[0]&&r[0].route===e.match.route&&r[0].url===e.match.url&&r[0].queryString===e.match.queryString){r.forEach(function(s){s.route.hooks&&s.route.hooks.already&&P(e.navigateOptions,"callHooks")&&s.route.hooks.already.forEach(function(n){return n(e.match)})}),t(!1);return}t()}function De(e,t){var r=e.instance._notFoundRoute;if(r){e.notFoundHandled=!0;var s=B(e.currentLocationPath),n=s[0],o=s[1],a=R(e.to);r.path=v(n);var c={url:r.path,queryString:o,hashString:a,data:null,route:r,params:o!==""?F(o):null};e.matches=[c],e.match=c}t()}function Ge(e,t){(!e.resolveOptions||e.resolveOptions.noMatchWarning===!1||typeof e.resolveOptions.noMatchWarning>"u")&&console.warn('Navigo: "'+e.currentLocationPath+`" didn't match any of the registered routes.`),t()}function Ye(e,t){e.instance._setCurrent(null),t()}function ie(e,t){P(e.navigateOptions,"updateState")&&e.instance._setCurrent(e.matches),t()}var oe=[Ue,Ne,Fe,Ve],J=[ne,De,w.if(function(e){var t=e.notFoundHandled;return t},oe.concat([ie]),[Ge,Ye])];function M(){return M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},M.apply(this,arguments)}function Q(e,t){var r=0;function s(){if(r===e.matches.length){ie(e,t);return}w(oe,M({},e,{match:e.matches[r]}),function(){r+=1,s()})}ne(e,s)}function $(e){e.instance.__markAsClean(e)}function N(){return N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(e[s]=r[s])}return e},N.apply(this,arguments)}var Z="[data-navigo]";function Xe(e,t){var r=t||{strategy:"ONE",hash:!1,noMatchWarning:!1,linksSelector:Z},s=this,n="/",o=null,a=[],c=!1,d,p=se(),f=V();e?n=v(e):console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.');function g(i){return i.indexOf("#")>=0&&(r.hash===!0?i=i.split("#")[1]||"/":i=i.split("#")[0]),i}function y(i){return v(n+"/"+v(i))}function b(i,l,u,m){return i=O(i)?y(i):i,{name:m||v(String(i)),path:i,handler:l,hooks:$e(u)}}function _(i,l,u){var m=this;return typeof i=="object"&&!(i instanceof RegExp)?(Object.keys(i).forEach(function(h){if(typeof i[h]=="function")m.on(h,i[h]);else{var x=i[h],T=x.uses,Se=x.as,Ee=x.hooks;a.push(b(h,T,[d,Ee],Se))}}),this):(typeof i=="function"&&(u=l,l=i,i=n),a.push(b(i,l,[d,u])),this)}function C(i,l){if(s.__dirty){s.__waiting.push(function(){return s.resolve(i,l)});return}else s.__dirty=!0;i=i?v(n)+"/"+v(i):void 0;var u={instance:s,to:i,currentLocationPath:i,navigateOptions:{},resolveOptions:N({},r,l)};return w([W,H,w.if(function(m){var h=m.matches;return h&&h.length>0},Q,J)],u,$),u.matches?u.matches:!1}function U(i,l){if(s.__dirty){s.__waiting.push(function(){return s.navigate(i,l)});return}else s.__dirty=!0;i=v(n)+"/"+v(i);var u={instance:s,to:i,navigateOptions:l||{},resolveOptions:l&&l.resolveOptions?l.resolveOptions:r,currentLocationPath:g(i)};w([je,qe,H,w.if(function(m){var h=m.matches;return h&&h.length>0},Q,J),Me,$],u,$)}function ce(i,l,u){var m=G(i,l);return m!==null?(U(m.replace(new RegExp("^/?"+n),""),u),!0):!1}function ue(i){return this.routes=a=a.filter(function(l){return O(i)?v(l.path)!==v(i):Re(i)?i!==l.handler:String(l.path)!==String(i)}),this}function de(){p&&(this.__popstateListener=function(){s.__freezeListening||C()},window.addEventListener("popstate",this.__popstateListener))}function he(){this.routes=a=[],p&&window.removeEventListener("popstate",this.__popstateListener),this.destroyed=c=!0}function fe(i,l){return s._notFoundRoute=b("*",i,[d,l],"__NOT_FOUND__"),this}function D(){if(f)return pe().forEach(function(i){if(i.getAttribute("data-navigo")==="false"||i.getAttribute("target")==="_blank"){i.hasListenerAttached&&i.removeEventListener("click",i.navigoHandler);return}i.hasListenerAttached||(i.hasListenerAttached=!0,i.navigoHandler=function(l){if((l.ctrlKey||l.metaKey)&&l.target.tagName.toLowerCase()==="a")return!1;var u=i.getAttribute("href");if(typeof u>"u"||u===null)return!1;if(u.match(/^(http|https)/)&&typeof URL<"u")try{var m=new URL(u);u=m.pathname+m.search}catch{}var h=He(i.getAttribute("data-navigo-options"));c||(l.preventDefault(),l.stopPropagation(),s.navigate(v(u),h))},i.addEventListener("click",i.navigoHandler))}),s}function pe(){return f?[].slice.call(document.querySelectorAll(r.linksSelector||Z)):[]}function me(i){return"/"+n+"/"+v(i)}function ge(i){return d=i,this}function ve(){return o}function G(i,l,u){var m=a.find(function(T){return T.name===i}),h=null;if(m){if(h=m.path,l)for(var x in l)h=h.replace(":"+x,l[x]);h=h.match(/^\//)?h:"/"+h}return h&&u&&!u.includeRoot&&(h=h.replace(new RegExp("^/"+n),"")),h}function ye(i){return i.getAttribute("href")}function Y(i){var l=B(v(i)),u=l[0],m=l[1],h=m===""?null:F(m),x=R(i),T=b(u,function(){},[d],u);return{url:u,queryString:m,hashString:x,route:T,data:null,params:h}}function be(){return Y(v(te(n)).replace(new RegExp("^"+n),""))}function xe(i){var l={instance:s,currentLocationPath:i,to:i,resolveOptions:r};return H(l,function(){}),l.matches?l.matches:!1}function we(i,l,u){typeof l<"u"&&(typeof u>"u"||u)&&(l=y(l));var m={instance:s,to:l,currentLocationPath:l};W(m,function(){}),typeof i=="string"&&(i=typeof u>"u"||u?y(i):i);var h=re(m,{name:String(i),path:i,handler:function(){},hooks:{}});return h||!1}function I(i,l,u){return typeof l=="string"&&(l=X(l)),l?(l.hooks[i]||(l.hooks[i]=[]),l.hooks[i].push(u),function(){l.hooks[i]=l.hooks[i].filter(function(m){return m!==u})}):(console.warn("Route doesn't exists: "+l),function(){})}function X(i){return typeof i=="string"?a.find(function(l){return l.name===y(i)}):a.find(function(l){return l.handler===i})}function ke(i){i.instance.__dirty=!1,i.instance.__waiting.length>0&&i.instance.__waiting.shift()()}this.root=n,this.routes=a,this.destroyed=c,this.current=o,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=ke,this.on=_,this.off=ue,this.resolve=C,this.navigate=U,this.navigateByName=ce,this.destroy=he,this.notFound=fe,this.updatePageLinks=D,this.link=me,this.hooks=ge,this.extractGETParameters=function(i){return B(g(i))},this.lastResolved=ve,this.generate=G,this.getLinkPath=ye,this.match=xe,this.matchLocation=we,this.getCurrentLocation=be,this.addBeforeHook=I.bind(this,"before"),this.addAfterHook=I.bind(this,"after"),this.addAlreadyHook=I.bind(this,"already"),this.addLeaveHook=I.bind(this,"leave"),this.getRoute=X,this._pathToMatchObject=Y,this._clean=v,this._checkForAHash=g,this._setCurrent=function(i){return o=s.current=i},de.call(this),D.call(this)}const We="https://youtube-music.f8team.dev/api",L={async request(e,t={}){const r=`${We}${e}`,s={"Content-Type":"application/json",...t.headers},n=localStorage.getItem("accessToken");n&&(s.Authorization=`Bearer ${n}`);const o={...t,headers:s};try{const a=await fetch(r,o),c=await a.json();if(!a.ok)throw new Error(c.message||"API Error");return c}catch(a){throw console.error("API Request Failed:",a),a}},get(e,t={}){return this.request(e,{...t,method:"GET"})},post(e,t,r={}){return this.request(e,{...r,method:"POST",body:JSON.stringify(t)})},put(e,t,r={}){return this.request(e,{...r,method:"PUT",body:JSON.stringify(t)})},delete(e,t={}){return this.request(e,{...t,method:"DELETE"})}};class Ke{constructor(){this.state={user:null,isAuthenticated:!1,isLoading:!0},this.listeners=[],this.init()}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(r=>r!==t)}}notify(){this.listeners.forEach(t=>t(this.state))}async init(){if(localStorage.getItem("accessToken"))try{await this.fetchCurrentUser()}catch(r){console.error("Session expired or invalid:",r),this.logout()}else this.setState({isLoading:!1})}setState(t){this.state={...this.state,...t},this.notify()}async login(t,r){this.setState({isLoading:!0});try{const s=await L.post("/auth/login",{email:t,password:r}),{accessToken:n,refreshToken:o}=s.data||s;return localStorage.setItem("accessToken",n),localStorage.setItem("refreshToken",o),await this.fetchCurrentUser(),{success:!0}}catch(s){return this.setState({isLoading:!1}),{success:!1,error:s.message}}}async register(t,r,s,n){this.setState({isLoading:!0});try{return await L.post("/auth/register",{name:t,email:r,password:s,confirmPassword:n}),this.setState({isLoading:!1}),{success:!0}}catch(o){return this.setState({isLoading:!1}),{success:!1,error:o.message}}}async logout(){localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),this.setState({user:null,isAuthenticated:!1,isLoading:!1})}async fetchCurrentUser(){try{const t=await L.get("/auth/me");this.setState({user:t.data,isAuthenticated:!0,isLoading:!1})}catch(t){throw t}}get isAuthenticated(){return this.state.isAuthenticated}get user(){return this.state.user}}const S=new Ke,Je=e=>{const t=document.getElementById("app"),r=`
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
  `;t.innerHTML=r;const s=document.getElementById("login-form"),n=document.getElementById("error-message");s.addEventListener("submit",async o=>{o.preventDefault();const a=document.getElementById("email").value,c=document.getElementById("password").value;n.classList.add("hidden"),n.textContent="";const d=s.querySelector('button[type="submit"]'),p=d.textContent;d.disabled=!0,d.textContent="Đang đăng nhập...";const f=await S.login(a,c);f.success?e.navigate("/"):(n.textContent=f.error||"Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",n.classList.remove("hidden"),d.disabled=!1,d.textContent=p)})},Qe=e=>{const t=document.getElementById("app"),r=`
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
  `;t.innerHTML=r;const s=document.getElementById("register-form"),n=document.getElementById("error-message");s.addEventListener("submit",async o=>{o.preventDefault();const a=document.getElementById("name").value,c=document.getElementById("email").value,d=document.getElementById("password").value,p=document.getElementById("confirm-password").value;if(d!==p){n.textContent="Mật khẩu không khớp",n.classList.remove("hidden");return}n.classList.add("hidden"),n.textContent="";const f=s.querySelector('button[type="submit"]'),g=f.textContent;f.disabled=!0,f.textContent="Đang đăng ký...";const y=await S.register(a,c,d,p);y.success?e.navigate("/login"):(n.textContent=y.error||"Đăng ký thất bại.",n.classList.remove("hidden"),f.disabled=!1,f.textContent=g)})},Ze="modulepreload",et=function(e){return"/f8-zoom-module-2/"+e},ee={},ae=function(t,r,s){let n=Promise.resolve();if(r&&r.length>0){let p=function(f){return Promise.all(f.map(g=>Promise.resolve(g).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var a=p;document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");n=p(r.map(f=>{if(f=et(f),f in ee)return;ee[f]=!0;const g=f.endsWith(".css"),y=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${y}`))return;const b=document.createElement("link");if(b.rel=g?"stylesheet":Ze,g||(b.as="script"),b.crossOrigin="",b.href=f,d&&b.setAttribute("nonce",d),document.head.appendChild(b),g)return new Promise((_,C)=>{b.addEventListener("load",_),b.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${f}`)))})}))}function o(c){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=c,window.dispatchEvent(d),!d.defaultPrevented)throw c}return n.then(c=>{for(const d of c||[])d.status==="rejected"&&o(d.reason);return t().catch(o)})},tt=()=>`
    <aside class="fixed top-0 left-0 w-sidebar h-full bg-yt-sidebar text-yt-text-secondary flex flex-col pt-4 z-sidebar border-r border-gray-800">
      <div class="px-6 mb-6 flex items-center gap-1 cursor-pointer" onclick="window.history.pushState({}, '', '/f8-zoom-module-2/'); window.dispatchEvent(new PopStateEvent('popstate'));">
        <div class="flex items-center justify-center p-2">
           <img src="https://music.youtube.com/img/on_platform_logo_dark.svg" alt="YouTube Music" class="h-6">
        </div>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <a href="/f8-zoom-module-2/" class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-yt-text-primary transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span class="font-medium text-sm">Trang chủ</span>
        </a>
        <a href="/f8-zoom-module-2/explore" class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-yt-text-primary transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5 7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>
          <span class="font-medium text-sm">Khám phá</span>
        </a>
        <a href="/f8-zoom-module-2/library" class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-yt-text-primary transition-colors data-navigo" data-navigo>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>
          <span class="font-medium text-sm">Thư viện</span>
        </a>
        
        <div class="pt-6 border-t border-gray-700 mt-4">
           <!-- Placeholder for playlists or more items -->
           <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-yt-hover hover:text-yt-text-primary transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              <span class="font-medium text-sm">Nâng cấp (Demo)</span>
           </a>
        </div>
      </nav>
    </aside>
  `,rt=()=>{const e=S.user,t=e&&e.name?e.name.charAt(0).toUpperCase():"G";return`
    <header class="fixed top-0 left-sidebar right-0 h-header bg-yt-base/95 backdrop-blur-sm z-header flex items-center justify-between px-6 border-b border-gray-800">
      
      <!-- Search Bar -->
      <div class="flex items-center flex-1 max-w-xl">
        <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-yt-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
                type="text" 
                placeholder="Tìm kiếm bài hát, album, nghệ sĩ..." 
                class="block w-full p-2.5 pl-10 text-sm text-yt-text-primary bg-stone-900 border border-transparent rounded-lg focus:ring-white focus:border-white placeholder-gray-500"
            >
        </div>
      </div>

      <!-- User Profile -->
      <div class="flex items-center gap-4">
         ${e?`
            <div class="flex items-center gap-3 cursor-pointer group relative">
                <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    ${t}
                </div>
                <!-- Dropdown (Simple implementation) -->
                <div class="absolute right-0 top-10 w-48 bg-yt-player rounded shadow-lg py-1 hidden group-hover:block border border-gray-700">
                     <button id="header-logout-btn" class="block w-full text-left px-4 py-2 text-sm text-yt-text-primary hover:bg-gray-700">Đăng xuất</button>
                </div>
            </div>
         `:`
            <a href="/f8-zoom-module-2/login" class="text-sm font-medium text-yt-text-primary px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors" data-navigo>Đăng nhập</a>
         `}
      </div>
    </header>
  `},st=e=>{const t=document.getElementById("header-logout-btn");t&&t.addEventListener("click",async()=>{await S.logout(),e.navigate("/login")})};class nt{constructor(){this.state={isPlaying:!1,currentSong:null,queue:[],currentIndex:-1,volume:localStorage.getItem("yt_volume")?parseInt(localStorage.getItem("yt_volume")):100,currentTime:0,duration:0},this.listeners=[],this.player=null,this.initPlayer()}initPlayer(){const t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";const r=document.getElementsByTagName("script")[0];if(r.parentNode.insertBefore(t,r),window.onYouTubeIframeAPIReady=()=>{this.player=new window.YT.Player("yt-player-container",{height:"180",width:"320",playerVars:{autoplay:1,controls:0,disablekb:1,fs:0,iv_load_policy:3,modestbranding:1,playsinline:1,rel:0},events:{onReady:s=>{this.setVolume(this.state.volume),this.state.currentSong&&this.play(this.state.currentSong)},onStateChange:s=>{s.data===window.YT.PlayerState.PLAYING?(this.setState({isPlaying:!0}),this.startProgressLoop()):s.data===window.YT.PlayerState.PAUSED?(this.setState({isPlaying:!1}),this.stopProgressLoop()):s.data===window.YT.PlayerState.ENDED&&this.next()}}})},!document.getElementById("yt-player-container")){const s=document.createElement("div");s.id="yt-player-container",s.className="yt-video-container hidden-video",document.body.appendChild(s)}}startProgressLoop(){this.stopProgressLoop(),this.progressInterval=setInterval(()=>{if(this.player&&this.player.getCurrentTime){const t=this.player.getCurrentTime(),r=this.player.getDuration();this.setState({currentTime:t,duration:r})}},1e3)}stopProgressLoop(){this.progressInterval&&clearInterval(this.progressInterval)}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(r=>r!==t)}}notify(){this.listeners.forEach(t=>t(this.state))}setState(t){this.state={...this.state,...t},this.notify()}play(t){if(this.state.currentSong&&this.state.currentSong.id===t.id){this.player&&typeof this.player.playVideo=="function"&&this.player.playVideo(),this.setState({isPlaying:!0});return}if(this.setState({currentSong:t,isPlaying:!0,currentTime:0,duration:t.duration||0}),this.player&&typeof this.player.loadVideoById=="function"){const r=t.id;this.player.loadVideoById(r)}if(this.state.queue.length===0)this.state.queue=[t],this.state.currentIndex=0;else{const r=this.state.queue.findIndex(s=>s.id===t.id);r===-1?(this.state.queue.push(t),this.setState({currentIndex:this.state.queue.length-1})):this.setState({currentIndex:r})}}togglePlay(){this.state.isPlaying?this.player&&this.player.pauseVideo():this.player&&this.player.playVideo(),this.setState({isPlaying:!this.state.isPlaying})}next(){if(this.state.queue.length===0)return;const t=(this.state.currentIndex+1)%this.state.queue.length;this.play(this.state.queue[t])}prev(){if(this.state.queue.length===0)return;const t=(this.state.currentIndex-1+this.state.queue.length)%this.state.queue.length;this.play(this.state.queue[t])}setVolume(t){this.setState({volume:t}),localStorage.setItem("yt_volume",t),this.player&&typeof this.player.setVolume=="function"&&this.player.setVolume(t)}seek(t){this.player&&typeof this.player.seekTo=="function"&&(this.player.seekTo(t,!0),this.setState({currentTime:t}))}}const E=new nt,le=Object.freeze(Object.defineProperty({__proto__:null,playerStore:E},Symbol.toStringTag,{value:"Module"})),j=()=>{const{currentSong:e,isPlaying:t,volume:r}=E.state;if(!e)return"";const s=e.title||e.name||"Unknown Title",n=e.artists?e.artists.map(a=>a.name).join(", "):"Unknown Artist";return`
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
  `},q=()=>{const e=document.getElementById("player-play"),t=document.getElementById("player-next"),r=document.getElementById("player-prev"),s=document.getElementById("player-toggle-video");e&&(e.onclick=()=>E.togglePlay()),t&&(t.onclick=()=>E.next()),r&&(r.onclick=()=>E.prev()),s&&(s.onclick=()=>{const n=document.getElementById("yt-player-container");n&&(n.classList.toggle("hidden-video"),s.classList.toggle("text-white"),s.classList.toggle("text-yt-text-secondary"))})},A=(e,t)=>{const r=document.getElementById("app");(()=>{r.innerHTML=`
        <div class="flex h-screen w-screen bg-yt-base text-yt-text-primary overflow-hidden">
            ${tt()}
            
            <div class="flex flex-col flex-1 pl-sidebar ml-0 transition-all">
                ${rt()}
                
                <main class="flex-1 overflow-y-auto mt-header pb-player p-8 scroll-smooth">
                    ${e}
                </main>
            </div>
            
            ${E.state.currentSong?j():""}
        </div>
    `,st(t),E.state.currentSong&&q();const n=window.location.pathname;document.querySelectorAll("nav a").forEach(a=>{a.getAttribute("href")===n&&a.classList.add("bg-yt-hover","text-yt-text-primary")})})(),E.subscribe(n=>{const o=document.querySelector(".bg-yt-player.fixed.bottom-0");if(n.currentSong&&!o){const a=document.querySelector("#app > div");if(a){const c=document.createElement("div");c.innerHTML=j(),a.appendChild(c.firstElementChild),q()}}else if(n.currentSong&&o){const a=document.createElement("div");a.innerHTML=j(),o.replaceWith(a.firstElementChild),q()}})},it=async e=>{A(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,e);try{const[t,r,s]=await Promise.all([L.get("/home/albums-for-you"),L.get("/home/todays-hits"),L.get("/quick-picks")]),n=Array.isArray(t)?t:t.data||[],o=Array.isArray(r)?r:r.data||[],a=Array.isArray(s)?s:s.data||[],c=S.user,p=`
      <div class="space-y-10">
        <!-- Section: Welcome / Quick actions -->
        <div>
           <h1 class="text-3xl font-bold mb-2">${c?`Xin chào, ${c.name}`:"Xin chào"}</h1>
           ${c?"":'<p class="text-yt-text-secondary">Đăng nhập để xem lịch sử nghe nhạc và đề xuất riêng cho bạn.</p>'}
        </div>

        <!-- Section: Quick Picks -->
        ${a.length>0?`
        <section>
          <div class="flex items-center justify-between mb-4">
             <div>
                <p class="text-sm font-medium text-yt-text-secondary uppercase tracking-wider">Bắt đầu nhanh</p>
                <h2 class="text-2xl font-bold">Gợi ý nhanh</h2>
             </div>
             <!-- Optional Play All button or similar -->
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
             ${a.slice(0,6).map(g=>z(g)).join("")}
          </div>
        </section>
        `:""}

        <!-- Section 1: Albums for you -->
        <section>
          <div class="flex items-center justify-between mb-4">
             <h2 class="text-2xl font-bold">Gợi ý Album</h2>
             <button class="text-sm font-medium text-yt-text-secondary hover:text-white uppercase tracking-wider">Xem thêm</button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
             ${n.slice(0,6).map(g=>z(g)).join("")}
          </div>
        </section>

        <!-- Section 2: Today's Hits -->
        <section>
          <div class="flex items-center justify-between mb-4">
             <h2 class="text-2xl font-bold">Hit Hôm Nay</h2>
             <button class="text-sm font-medium text-yt-text-secondary hover:text-white uppercase tracking-wider">Xem thêm</button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
             ${o.slice(0,6).map(g=>z(g)).join("")}
          </div>
        </section>
      </div>
    `;A(p,e);const f=document.querySelector("main");f&&f.addEventListener("click",g=>{const y=g.target.closest(".song-card");if(y)try{const b=JSON.parse(y.dataset.song);ae(async()=>{const{playerStore:_}=await Promise.resolve().then(()=>le);return{playerStore:_}},void 0).then(({playerStore:_})=>{_.play(b)})}catch(b){console.error("Failed to play song",b)}})}catch(t){console.error("Home load error",t),A(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Đã có lỗi xảy ra</h3>
           <p>${t.message}</p>
           <button class="mt-4 px-4 py-2 bg-white text-black rounded-full" onclick="location.reload()">Thử lại</button>
       </div>
    `,e)}},z=e=>{const t=e.title||e.name||"Không có tiêu đề",r=Array.isArray(e.artists)?e.artists.map(n=>typeof n=="string"?n:n.name).join(", "):e.description||"",s=e.thumbnails&&e.thumbnails[0]||e.thumbnail||e.image||"https://via.placeholder.com/300";return`
      <div class="group cursor-pointer song-card" data-song='${JSON.stringify(e).replace(/'/g,"&#39;")}'>
         <div class="relative aspect-square mb-3 rounded overflow-hidden bg-gray-800">
            <img src="${s}" alt="${t}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </button>
            </div>
         </div>
         <h3 class="font-medium text-white truncate group-hover:underline" title="${t}">${t}</h3>
         <p class="text-sm text-yt-text-secondary truncate" title="${r}">${r}</p>
      </div>
    `},ot=async e=>{A(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,e);try{const[t]=await Promise.all([L.get("/explore/new-releases")]),r=t.items||t.data||[],n=`
       <div class="space-y-8">
         <!-- Chips Navigation -->
         <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            ${["Mới phát hành","Bảng xếp hạng","Tâm trạng","Pop","Rock","Hiphop v.v."].map((a,c)=>`
               <button class="px-4 py-2 bg-yt-hover rounded-lg text-sm font-medium whitespace-nowrap hover:bg-white/20 transition-colors ${c===0?"bg-white text-black hover:bg-gray-200":""}">
                  ${a}
               </button>
            `).join("")}
         </div>

         <!-- Section: New Releases -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Mới phát hành</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${r.slice(0,10).map(a=>at(a)).join("")}
            </div>
         </section>
       </div>
     `;A(n,e);const o=document.querySelector("main");o&&o.addEventListener("click",a=>{const c=a.target.closest(".song-card");if(c)try{const d=JSON.parse(c.dataset.song);ae(async()=>{const{playerStore:p}=await Promise.resolve().then(()=>le);return{playerStore:p}},void 0).then(({playerStore:p})=>{p.play(d)})}catch(d){console.error("Failed to play song",d)}})}catch(t){console.error("Explore load error",t),A(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${t.message}</p>
       </div>
    `,e)}},at=e=>{const t=e.title||e.name||"No Title",r=Array.isArray(e.artists)?e.artists.map(n=>typeof n=="string"?n:n.name).join(", "):"",s=e.thumbnails&&e.thumbnails[0]||e.thumbnail||e.image||"https://via.placeholder.com/300";return`
      <div class="group cursor-pointer song-card" data-song='${JSON.stringify(e).replace(/'/g,"&#39;")}'>
         <div class="relative aspect-square mb-3 rounded overflow-hidden bg-gray-800">
            <img src="${s}" alt="${t}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform">
                   <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </button>
            </div>
         </div>
         <h3 class="font-medium text-white truncate hover:underline">${t}</h3>
         <p class="text-sm text-yt-text-secondary truncate">${r}</p>
      </div>
    `},k=new Xe("/f8-zoom-module-2/");k.on({"/":()=>{it(k)},"/explore":()=>{ot(k)},"/login":()=>{S.isAuthenticated?k.navigate("/"):Je(k)},"/register":()=>{S.isAuthenticated?k.navigate("/"):Qe(k)}});k.hooks({before:async(e,t)=>{!S.isAuthenticated&&localStorage.getItem("accessToken")&&await S.init(),e()}});(async()=>(localStorage.getItem("accessToken"),k.resolve()))();
