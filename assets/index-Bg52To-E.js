(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();var Be=/([:*])(\w+)/g,Ie="([^/]+)",$e=/\*/g,Re="?(?:.*)",ze=/\/\?/g,Me="/?([^/]+|)",Oe="(?:/^|^)",He="";function he(e){return e===void 0&&(e="/"),Z()?location.pathname+location.search+location.hash:e}function b(e){return e.replace(/\/+$/,"").replace(/^\/+/,"")}function D(e){return typeof e=="string"}function je(e){return typeof e=="function"}function U(e){return e&&e.indexOf("#")>=0&&e.split("#").pop()||""}function qe(e,t){return t.length===0||!e?null:e.slice(1,e.length).reduce(function(s,r,n){return s===null&&(s={}),s[t[n]]=decodeURIComponent(r),s},null)}function F(e){var t=b(e).split(/\?(.*)?$/);return[b(t[0]),t.slice(1).join("")]}function Q(e){for(var t={},s=e.split("&"),r=0;r<s.length;r++){var n=s[r].split("=");if(n[0]!==""){var i=decodeURIComponent(n[0]);t[i]?(Array.isArray(t[i])||(t[i]=[t[i]]),t[i].push(decodeURIComponent(n[1]||""))):t[i]=decodeURIComponent(n[1]||"")}}return t}function fe(e,t){var s=F(b(e.currentLocationPath)),r=s[0],n=s[1],i=n===""?null:Q(n),a=[],c;if(D(t.path)){if(c=Oe+b(t.path).replace(Be,function(v,d,m){return a.push(m),Ie}).replace($e,Re).replace(ze,Me)+"$",b(t.path)===""&&b(r)==="")return{url:r,queryString:n,hashString:U(e.to),route:t,data:null,params:i}}else c=t.path;var u=new RegExp(c,He),f=r.match(u);if(f){var p=D(t.path)?qe(f,a):f.groups?f.groups:f.slice(1);return{url:b(r.replace(new RegExp("^"+e.instance.root),"")),queryString:n,hashString:U(e.to),route:t,data:p,params:i}}return!1}function pe(){return!!(typeof window<"u"&&window.history&&window.history.pushState)}function R(e,t){return typeof e[t]>"u"||e[t]===!0}function Ne(e){if(!e)return{};var t=e.split(","),s={},r;return t.forEach(function(n){var i=n.split(":").map(function(a){return a.replace(/(^ +| +$)/g,"")});switch(i[0]){case"historyAPIMethod":s.historyAPIMethod=i[1];break;case"resolveOptionsStrategy":r||(r={}),r.strategy=i[1];break;case"resolveOptionsHash":r||(r={}),r.hash=i[1]==="true";break;case"updateBrowserURL":case"callHandler":case"updateState":case"force":s[i[0]]=i[1]==="true";break}}),r&&(s.resolveOptions=r),s}function Z(){return typeof window<"u"}function Ve(e,t){return e===void 0&&(e=[]),t===void 0&&(t={}),e.filter(function(s){return s}).forEach(function(s){["before","after","already","leave"].forEach(function(r){s[r]&&(t[r]||(t[r]=[]),t[r].push(s[r]))})}),t}function C(e,t,s){var r=t||{},n=0;(function i(){if(!e[n]){s&&s(r);return}Array.isArray(e[n])?(e.splice.apply(e,[n,1].concat(e[n][0](r)?e[n][1]:e[n][2])),i()):e[n](r,function(a){typeof a>"u"||a===!0?(n+=1,i()):s&&s(r)})})()}C.if=function(e,t,s){return Array.isArray(t)||(t=[t]),Array.isArray(s)||(s=[s]),[e,t,s]};function re(e,t){typeof e.currentLocationPath>"u"&&(e.currentLocationPath=e.to=he(e.instance.root)),e.currentLocationPath=e.instance._checkForAHash(e.currentLocationPath),t()}function G(e,t){for(var s=0;s<e.instance.routes.length;s++){var r=e.instance.routes[s],n=fe(e,r);if(n&&(e.matches||(e.matches=[]),e.matches.push(n),e.resolveOptions.strategy==="ONE")){t();return}}t()}function De(e,t){e.navigateOptions&&(typeof e.navigateOptions.shouldResolve<"u"&&console.warn('"shouldResolve" is deprecated. Please check the documentation.'),typeof e.navigateOptions.silent<"u"&&console.warn('"silent" is deprecated. Please check the documentation.')),t()}function Ue(e,t){e.navigateOptions.force===!0?(e.instance._setCurrent([e.instance._pathToMatchObject(e.to)]),t(!1)):t()}var ne=Z(),Fe=pe();function Ge(e,t){if(R(e.navigateOptions,"updateBrowserURL")){var s=("/"+e.to).replace(/\/\//g,"/"),r=ne&&e.resolveOptions&&e.resolveOptions.hash===!0;Fe?(history[e.navigateOptions.historyAPIMethod||"pushState"](e.navigateOptions.stateObj||{},e.navigateOptions.title||"",r?"#"+s:s),location&&location.hash&&(e.instance.__freezeListening=!0,setTimeout(function(){if(!r){var n=location.hash;location.hash="",location.hash=n}e.instance.__freezeListening=!1},1))):ne&&(window.location.href=e.to)}t()}function ge(e,t){var s=e.instance;if(!s.lastResolved()){t();return}C(s.lastResolved().map(function(r){return function(n,i){if(!r.route.hooks||!r.route.hooks.leave){i();return}var a=!1,c=e.instance.matchLocation(r.route.path,e.currentLocationPath,!1);if(r.route.path!=="*")a=!c;else{var u=e.matches?e.matches.find(function(f){return r.route.path===f.route.path}):!1;a=!u}if(R(e.navigateOptions,"callHooks")&&a){C(r.route.hooks.leave.map(function(f){return function(p,v){return f(function(d){d===!1?e.instance.__markAsClean(e):v()},e.matches&&e.matches.length>0?e.matches.length===1?e.matches[0]:e.matches:void 0)}}).concat([function(){return i()}]));return}else i()}}),{},function(){return t()})}function We(e,t){e.match.route.hooks&&e.match.route.hooks.before&&R(e.navigateOptions,"callHooks")?C(e.match.route.hooks.before.map(function(s){return function(n,i){return s(function(a){a===!1?e.instance.__markAsClean(e):i()},e.match)}}).concat([function(){return t()}])):t()}function Ye(e,t){R(e.navigateOptions,"callHandler")&&e.match.route.handler(e.match),e.instance.updatePageLinks(),t()}function Xe(e,t){e.match.route.hooks&&e.match.route.hooks.after&&R(e.navigateOptions,"callHooks")&&e.match.route.hooks.after.forEach(function(s){return s(e.match)}),t()}function Ke(e,t){var s=e.instance.lastResolved();if(s&&s[0]&&s[0].route===e.match.route&&s[0].url===e.match.url&&s[0].queryString===e.match.queryString){s.forEach(function(r){r.route.hooks&&r.route.hooks.already&&R(e.navigateOptions,"callHooks")&&r.route.hooks.already.forEach(function(n){return n(e.match)})}),t(!1);return}t()}function Je(e,t){var s=e.instance._notFoundRoute;if(s){e.notFoundHandled=!0;var r=F(e.currentLocationPath),n=r[0],i=r[1],a=U(e.to);s.path=b(n);var c={url:s.path,queryString:i,hashString:a,data:null,route:s,params:i!==""?Q(i):null};e.matches=[c],e.match=c}t()}function Qe(e,t){(!e.resolveOptions||e.resolveOptions.noMatchWarning===!1||typeof e.resolveOptions.noMatchWarning>"u")&&console.warn('Navigo: "'+e.currentLocationPath+`" didn't match any of the registered routes.`),t()}function Ze(e,t){e.instance._setCurrent(null),t()}function me(e,t){R(e.navigateOptions,"updateState")&&e.instance._setCurrent(e.matches),t()}var ve=[Ke,We,Ye,Xe],oe=[ge,Je,C.if(function(e){var t=e.notFoundHandled;return t},ve.concat([me]),[Qe,Ze])];function K(){return K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},K.apply(this,arguments)}function ie(e,t){var s=0;function r(){if(s===e.matches.length){me(e,t);return}C(ve,K({},e,{match:e.matches[s]}),function(){s+=1,r()})}ge(e,r)}function W(e){e.instance.__markAsClean(e)}function J(){return J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r])}return e},J.apply(this,arguments)}var ae="[data-navigo]";function et(e,t){var s=t||{strategy:"ONE",hash:!1,noMatchWarning:!1,linksSelector:ae},r=this,n="/",i=null,a=[],c=!1,u,f=pe(),p=Z();e?n=b(e):console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.');function v(o){return o.indexOf("#")>=0&&(s.hash===!0?o=o.split("#")[1]||"/":o=o.split("#")[0]),o}function d(o){return b(n+"/"+b(o))}function m(o,l,h,y){return o=D(o)?d(o):o,{name:y||b(String(o)),path:o,handler:l,hooks:Ve(h)}}function x(o,l,h){var y=this;return typeof o=="object"&&!(o instanceof RegExp)?(Object.keys(o).forEach(function(g){if(typeof o[g]=="function")y.on(g,o[g]);else{var E=o[g],H=E.uses,Ae=E.as,Te=E.hooks;a.push(m(g,H,[u,Te],Ae))}}),this):(typeof o=="function"&&(h=l,l=o,o=n),a.push(m(o,l,[u,h])),this)}function w(o,l){if(r.__dirty){r.__waiting.push(function(){return r.resolve(o,l)});return}else r.__dirty=!0;o=o?b(n)+"/"+b(o):void 0;var h={instance:r,to:o,currentLocationPath:o,navigateOptions:{},resolveOptions:J({},s,l)};return C([re,G,C.if(function(y){var g=y.matches;return g&&g.length>0},ie,oe)],h,W),h.matches?h.matches:!1}function k(o,l){if(r.__dirty){r.__waiting.push(function(){return r.navigate(o,l)});return}else r.__dirty=!0;o=b(n)+"/"+b(o);var h={instance:r,to:o,navigateOptions:l||{},resolveOptions:l&&l.resolveOptions?l.resolveOptions:s,currentLocationPath:v(o)};C([De,Ue,G,C.if(function(y){var g=y.matches;return g&&g.length>0},ie,oe),Ge,W],h,W)}function P(o,l,h){var y=ee(o,l);return y!==null?(k(y.replace(new RegExp("^/?"+n),""),h),!0):!1}function M(o){return this.routes=a=a.filter(function(l){return D(o)?b(l.path)!==b(o):je(o)?o!==l.handler:String(l.path)!==String(o)}),this}function O(){f&&(this.__popstateListener=function(){r.__freezeListening||w()},window.addEventListener("popstate",this.__popstateListener))}function B(){this.routes=a=[],f&&window.removeEventListener("popstate",this.__popstateListener),this.destroyed=c=!0}function I(o,l){return r._notFoundRoute=m("*",o,[u,l],"__NOT_FOUND__"),this}function A(){if(p)return z().forEach(function(o){if(o.getAttribute("data-navigo")==="false"||o.getAttribute("target")==="_blank"){o.hasListenerAttached&&o.removeEventListener("click",o.navigoHandler);return}o.hasListenerAttached||(o.hasListenerAttached=!0,o.navigoHandler=function(l){if((l.ctrlKey||l.metaKey)&&l.target.tagName.toLowerCase()==="a")return!1;var h=o.getAttribute("href");if(typeof h>"u"||h===null)return!1;if(h.match(/^(http|https)/)&&typeof URL<"u")try{var y=new URL(h);h=y.pathname+y.search}catch{}var g=Ne(o.getAttribute("data-navigo-options"));c||(l.preventDefault(),l.stopPropagation(),r.navigate(b(h),g))},o.addEventListener("click",o.navigoHandler))}),r}function z(){return p?[].slice.call(document.querySelectorAll(s.linksSelector||ae)):[]}function q(o){return"/"+n+"/"+b(o)}function ke(o){return u=o,this}function Se(){return i}function ee(o,l,h){var y=a.find(function(H){return H.name===o}),g=null;if(y){if(g=y.path,l)for(var E in l)g=g.replace(":"+E,l[E]);g=g.match(/^\//)?g:"/"+g}return g&&h&&!h.includeRoot&&(g=g.replace(new RegExp("^/"+n),"")),g}function Le(o){return o.getAttribute("href")}function te(o){var l=F(b(o)),h=l[0],y=l[1],g=y===""?null:Q(y),E=U(o),H=m(h,function(){},[u],h);return{url:h,queryString:y,hashString:E,route:H,data:null,params:g}}function Ee(){return te(b(he(n)).replace(new RegExp("^"+n),""))}function _e(o){var l={instance:r,currentLocationPath:o,to:o,resolveOptions:s};return G(l,function(){}),l.matches?l.matches:!1}function Ce(o,l,h){typeof l<"u"&&(typeof h>"u"||h)&&(l=d(l));var y={instance:r,to:l,currentLocationPath:l};re(y,function(){}),typeof o=="string"&&(o=typeof h>"u"||h?d(o):o);var g=fe(y,{name:String(o),path:o,handler:function(){},hooks:{}});return g||!1}function N(o,l,h){return typeof l=="string"&&(l=se(l)),l?(l.hooks[o]||(l.hooks[o]=[]),l.hooks[o].push(h),function(){l.hooks[o]=l.hooks[o].filter(function(y){return y!==h})}):(console.warn("Route doesn't exists: "+l),function(){})}function se(o){return typeof o=="string"?a.find(function(l){return l.name===d(o)}):a.find(function(l){return l.handler===o})}function Pe(o){o.instance.__dirty=!1,o.instance.__waiting.length>0&&o.instance.__waiting.shift()()}this.root=n,this.routes=a,this.destroyed=c,this.current=i,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=Pe,this.on=x,this.off=M,this.resolve=w,this.navigate=k,this.navigateByName=P,this.destroy=B,this.notFound=I,this.updatePageLinks=A,this.link=q,this.hooks=ke,this.extractGETParameters=function(o){return F(v(o))},this.lastResolved=Se,this.generate=ee,this.getLinkPath=Le,this.match=_e,this.matchLocation=Ce,this.getCurrentLocation=Ee,this.addBeforeHook=N.bind(this,"before"),this.addAfterHook=N.bind(this,"after"),this.addAlreadyHook=N.bind(this,"already"),this.addLeaveHook=N.bind(this,"leave"),this.getRoute=se,this._pathToMatchObject=te,this._clean=b,this._checkForAHash=v,this._setCurrent=function(o){return i=r.current=o},O.call(this),A.call(this)}const tt="https://youtube-music.f8team.dev/api",S={async request(e,t={}){const s=`${tt}${e}`,r={"Content-Type":"application/json",...t.headers},n=localStorage.getItem("accessToken");n&&(r.Authorization=`Bearer ${n}`);const i={...t,headers:r};try{const a=await fetch(s,i),c=await a.json();if(!a.ok)throw new Error(c.message||"Lỗi API");return c}catch(a){throw console.error("Yêu cầu API thất bại:",a),a}},get(e,t={}){return this.request(e,{...t,method:"GET"})},post(e,t,s={}){return this.request(e,{...s,method:"POST",body:JSON.stringify(t)})},put(e,t,s={}){return this.request(e,{...s,method:"PUT",body:JSON.stringify(t)})},delete(e,t={}){return this.request(e,{...t,method:"DELETE"})},getChartVideos(e={}){return this.get("/charts/videos",e)},getTopArtists(e={}){return this.get("/charts/top-artists",e)},getMoods(e={}){return this.get("/moods",e)},getPlaylistsByCountry(e,t={}){return this.get(`/playlists/by-country?country=${e}`,t)},getPersonalized(e={}){return this.get("/home/personalized",e)}};class st{constructor(){this.state={user:null,isAuthenticated:!1,isLoading:!0},this.listeners=[],this.init()}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(s=>s!==t)}}notify(){this.listeners.forEach(t=>t(this.state))}async init(){if(localStorage.getItem("accessToken"))try{await this.fetchCurrentUser()}catch(s){console.error("Session hết hạn hoặc không hợp lệ:",s),this.logout()}else this.setState({isLoading:!1})}setState(t){this.state={...this.state,...t},this.notify()}async login(t,s){this.setState({isLoading:!0});try{const r=await S.post("/auth/login",{email:t,password:s}),{access_token:n,refresh_token:i}=r.data||r,a=n,c=i;if(!a)throw new Error("No access token received");return localStorage.setItem("accessToken",a),localStorage.setItem("refreshToken",c),await this.fetchCurrentUser(),{success:!0}}catch(r){return this.setState({isLoading:!1}),{success:!1,error:r.message}}}async register(t,s,r,n){this.setState({isLoading:!0});try{const i=await S.post("/auth/register",{name:t,email:s,password:r,confirmPassword:n}),{access_token:a,refresh_token:c,user:u}=i.data||i,f=a,p=c;return f?(localStorage.setItem("accessToken",f),localStorage.setItem("refreshToken",p),u?this.setState({user:u,isAuthenticated:!0,isLoading:!1}):await this.fetchCurrentUser()):this.setState({isLoading:!1}),{success:!0}}catch(i){return this.setState({isLoading:!1}),{success:!1,error:i.message}}}async logout(){localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),this.setState({user:null,isAuthenticated:!1,isLoading:!1})}async fetchCurrentUser(){try{const t=await S.get("/auth/me"),s=t.data||t;this.setState({user:s,isAuthenticated:!0,isLoading:!1})}catch(t){throw t}}get isAuthenticated(){return this.state.isAuthenticated}get user(){return this.state.user}}const L=new st,ye=e=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(String(e).toLowerCase()),be=e=>e&&e.length>=8,rt=e=>e&&e.trim().length>=2,nt=e=>{const t=document.getElementById("app"),s=`
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
  `;t.innerHTML=s;const r=document.getElementById("login-form"),n=document.getElementById("error-message");r.addEventListener("submit",async i=>{i.preventDefault();const a=document.getElementById("email").value,c=document.getElementById("password").value;if(n.classList.add("hidden"),n.textContent="",!ye(a)){n.textContent="Email không hợp lệ. Vui lòng kiểm tra lại.",n.classList.remove("hidden");return}if(!be(c)){n.textContent="Mật khẩu phải có ít nhất 6 ký tự.",n.classList.remove("hidden");return}const u=r.querySelector('button[type="submit"]'),f=u.textContent;u.disabled=!0,u.textContent="Đang đăng nhập...";const p=await L.login(a,c);p.success?e.navigate("/"):(n.textContent=p.error||"Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",n.classList.remove("hidden"),u.disabled=!1,u.textContent=f)})},ot=e=>{const t=document.getElementById("app"),s=`
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
  `;t.innerHTML=s;const r=document.getElementById("register-form"),n=document.getElementById("error-message");r.addEventListener("submit",async i=>{i.preventDefault();const a=document.getElementById("name").value,c=document.getElementById("email").value,u=document.getElementById("password").value,f=document.getElementById("confirm-password").value;let p=!0,v="";if(rt(a)?ye(c)?be(u)?u!==f&&(v="Mật khẩu không khớp.",p=!1):(v="Mật khẩu phải có ít nhất 6 ký tự.",p=!1):(v="Email không hợp lệ.",p=!1):(v="Tên phải có ít nhất 2 ký tự.",p=!1),!p){n.textContent=v,n.classList.remove("hidden");return}n.classList.add("hidden"),n.textContent="";const d=r.querySelector('button[type="submit"]'),m=d.textContent;d.disabled=!0,d.textContent="Đang đăng ký & đăng nhập...";const x=await L.register(a,c,u,f);x.success?e.navigate("/"):(n.textContent=x.error||"Đăng ký thất bại.",n.classList.remove("hidden"),d.disabled=!1,d.textContent=m)})},it="modulepreload",at=function(e){return"/f8-zoom-module-2/"+e},le={},xe=function(t,s,r){let n=Promise.resolve();if(s&&s.length>0){let f=function(p){return Promise.all(p.map(v=>Promise.resolve(v).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};var a=f;document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),u=c?.nonce||c?.getAttribute("nonce");n=f(s.map(p=>{if(p=at(p),p in le)return;le[p]=!0;const v=p.endsWith(".css"),d=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${d}`))return;const m=document.createElement("link");if(m.rel=v?"stylesheet":it,v||(m.as="script"),m.crossOrigin="",m.href=p,u&&m.setAttribute("nonce",u),document.head.appendChild(m),v)return new Promise((x,w)=>{m.addEventListener("load",x),m.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(c){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=c,window.dispatchEvent(u),!u.defaultPrevented)throw c}return n.then(c=>{for(const u of c||[])u.status==="rejected"&&i(u.reason);return t().catch(i)})},j=e=>typeof e!="string"?e:e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),lt=()=>`
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
  `;class ct{constructor(){this.state={isSidebarCollapsed:localStorage.getItem("sidebarCollapsed")==="true"},this.listeners=[],this.init()}init(){this.applyState()}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(s=>s!==t)}}notify(){this.listeners.forEach(t=>t(this.state))}toggleSidebar(){this.state.isSidebarCollapsed=!this.state.isSidebarCollapsed,localStorage.setItem("sidebarCollapsed",this.state.isSidebarCollapsed),this.applyState(),this.notify()}applyState(){this.state.isSidebarCollapsed?document.body.classList.add("sidebar-collapsed"):document.body.classList.remove("sidebar-collapsed")}get isSidebarCollapsed(){return this.state.isSidebarCollapsed}}const dt=new ct,ce=()=>{const e=L.user,t=e&&e.name?e.name.charAt(0).toUpperCase():"G";return`
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
  `},de=e=>{const t=document.getElementById("sidebar-toggle");t&&t.addEventListener("click",i=>{dt.toggleSidebar()});const s=document.getElementById("header-logout-btn");s&&s.addEventListener("click",async()=>{const i=document.getElementById("profile-dropdown");i&&i.classList.add("hidden"),await L.logout(),e.navigate("/login")});const r=document.getElementById("profile-trigger"),n=document.getElementById("profile-dropdown");if(r&&n){r.addEventListener("click",a=>{a.stopPropagation(),n.classList.toggle("hidden")});const i=a=>{!r.contains(a.target)&&!n.contains(a.target)&&n.classList.add("hidden")};document._headerClickOutside&&document.removeEventListener("click",document._headerClickOutside),document._headerClickOutside=i,document.addEventListener("click",i)}};class ut{constructor(){this.state={isPlaying:!1,currentSong:null,queue:[],currentIndex:-1,volume:localStorage.getItem("yt_volume")?parseInt(localStorage.getItem("yt_volume")):100,currentTime:0,duration:0},this.listeners=[],this.player=null,this.initPlayer()}initPlayer(){const t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";const s=document.getElementsByTagName("script")[0];if(s.parentNode.insertBefore(t,s),window.onYouTubeIframeAPIReady=()=>{this.player=new window.YT.Player("yt-player-container",{height:"180",width:"320",playerVars:{autoplay:1,controls:0,disablekb:1,fs:0,iv_load_policy:3,modestbranding:1,playsinline:1,rel:0},events:{onReady:r=>{this.setVolume(this.state.volume),this.state.currentSong&&this.play(this.state.currentSong)},onStateChange:r=>{r.data===window.YT.PlayerState.PLAYING?(this.setState({isPlaying:!0}),this.startProgressLoop()):r.data===window.YT.PlayerState.PAUSED?(this.setState({isPlaying:!1}),this.stopProgressLoop()):r.data===window.YT.PlayerState.ENDED&&this.next()}}})},!document.getElementById("yt-player-container")){const r=document.createElement("div");r.id="yt-player-container",r.className="yt-video-container hidden-video",document.body.appendChild(r)}}startProgressLoop(){this.stopProgressLoop(),this.progressInterval=setInterval(()=>{if(this.player&&this.player.getCurrentTime){const t=this.player.getCurrentTime(),s=this.player.getDuration();this.setState({currentTime:t,duration:s})}},1e3)}stopProgressLoop(){this.progressInterval&&clearInterval(this.progressInterval)}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(s=>s!==t)}}notify(){this.listeners.forEach(t=>t(this.state))}setState(t){this.state={...this.state,...t},this.notify()}play(t){if(this.state.currentSong&&this.state.currentSong.id===t.id){this.player&&typeof this.player.playVideo=="function"&&this.player.playVideo(),this.setState({isPlaying:!0});return}if(this.setState({currentSong:t,isPlaying:!0,currentTime:0,duration:t.duration||0}),this.player&&typeof this.player.loadVideoById=="function"){const s=t.id;this.player.loadVideoById(s)}if(this.state.queue.length===0)this.state.queue=[t],this.state.currentIndex=0;else{const s=this.state.queue.findIndex(r=>r.id===t.id);s===-1?(this.state.queue.push(t),this.setState({currentIndex:this.state.queue.length-1})):this.setState({currentIndex:s})}}togglePlay(){this.state.isPlaying?this.player&&this.player.pauseVideo():this.player&&this.player.playVideo(),this.setState({isPlaying:!this.state.isPlaying})}next(){if(this.state.queue.length===0)return;const t=(this.state.currentIndex+1)%this.state.queue.length;this.play(this.state.queue[t])}prev(){if(this.state.queue.length===0)return;const t=(this.state.currentIndex-1+this.state.queue.length)%this.state.queue.length;this.play(this.state.queue[t])}setVolume(t){this.setState({volume:t}),localStorage.setItem("yt_volume",t),this.player&&typeof this.player.setVolume=="function"&&this.player.setVolume(t)}seek(t){this.player&&typeof this.player.seekTo=="function"&&(this.player.seekTo(t,!0),this.setState({currentTime:t}))}}const T=new ut,we=Object.freeze(Object.defineProperty({__proto__:null,playerStore:T},Symbol.toStringTag,{value:"Module"})),Y=()=>{const{currentSong:e,isPlaying:t,volume:s}=T.state;if(!e)return"";const r=e.title||e.name||"Unknown Title",n=e.artists?e.artists.map(a=>a.name).join(", "):"Unknown Artist";return`
    <div class="fixed bottom-0 left-0 right-0 h-player bg-yt-player border-t border-gray-800 flex items-center justify-between px-4 z-player">
      
      <!-- Left: Song Info -->
      <div class="flex items-center w-1/4 min-w-[180px]">
        <img src="${e.thumbnail||e.image||"https://via.placeholder.com/60"}" alt="${r}" class="w-12 h-12 rounded bg-gray-700 object-cover mr-4">
        <div class="overflow-hidden">
           <h3 class="text-white font-medium truncate text-sm">${r}</h3>
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
         <input type="range" min="0" max="100" value="${s}" class="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white">
      </div>

    </div>
  `},X=()=>{const e=document.getElementById("player-play"),t=document.getElementById("player-next"),s=document.getElementById("player-prev"),r=document.getElementById("player-toggle-video");e&&(e.onclick=()=>T.togglePlay()),t&&(t.onclick=()=>T.next()),s&&(s.onclick=()=>T.prev()),r&&(r.onclick=()=>{const n=document.getElementById("yt-player-container");n&&(n.classList.toggle("hidden-video"),r.classList.toggle("text-white"),r.classList.toggle("text-yt-text-secondary"))})},$=(e,t)=>{const s=document.getElementById("app");(()=>{s.innerHTML=`
        <div class="flex h-screen w-full bg-yt-base text-yt-text-primary overflow-hidden relative gap-16">
            <div class="aurora-bg"></div>
            
            <!-- Sidebar is now a flex item, not fixed -->
            ${lt()}
            
            <!-- Main Content Wrapper: Flex column, takes remaining space -->
            <div class="flex flex-col flex-1 min-w-0 transition-all relative z-10">
                ${ce()}
                
                <main class="flex-1 overflow-y-auto pb-player px-8 scroll-smooth scrollbar-none">
                    ${e}
                </main>
            </div>
            
            ${T.state.currentSong?Y():""}
        </div>
    `,de(t),T.state.currentSong&&X();const n=window.location.pathname;document.querySelectorAll("nav a").forEach(a=>{a.getAttribute("href")===n&&a.classList.add("bg-yt-hover","text-yt-text-primary")})})(),T.subscribe(n=>{const i=document.querySelector(".bg-yt-player.fixed.bottom-0");if(n.currentSong&&!i){const a=document.querySelector("#app > div");if(a){const c=document.createElement("div");c.innerHTML=Y(),a.appendChild(c.firstElementChild),X()}}else if(n.currentSong&&i){const a=document.createElement("div");a.innerHTML=Y(),i.replaceWith(a.firstElementChild),X()}}),L.subscribe(n=>{const i=document.querySelector("header");if(i){const a=document.createElement("div");a.innerHTML=ce();const c=a.firstElementChild;i.replaceWith(c),de(t)}})},ht=async e=>{$(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,e);try{const t=[S.get("/home/albums-for-you"),S.get("/home/todays-hits"),S.get("/moods"),S.getPlaylistsByCountry("VN")],s=!!L.user;s&&t.push(S.getPersonalized());const r=await Promise.all(t),n=r[0],i=r[1],a=r[2],c=r[3],u=s?r[4]:[],f=Array.isArray(n)?n:n.data||[],p=Array.isArray(i)?i:i.data||[],v=a&&a.items?a.items:Array.isArray(a)?a:[],d=Array.isArray(c)?c:c.data||[],m=Array.isArray(u)?u:u.data||[],x=L.user,k=`
      <div class="space-y-10">
        <!-- Section: Welcome / Quick actions -->
        <div class="mb-6">
           <h1 class="text-3xl font-bold mb-2">${x?`Xin chào, ${x.name}`:"Xin chào"}</h1>
           ${x?"":'<p class="text-yt-text-secondary">Đăng nhập để xem lịch sử nghe nhạc và đề xuất riêng cho bạn.</p>'}
        </div>

        <!-- Section: Moods / Categories -->
        ${v.length>0?`
        <div class="flex overflow-x-auto gap-3 pb-2 scrollbar-none -mx-8 px-8 mb-8 bg-transparent py-2 transition-all">
            ${v.map(M=>`
                <a href="/f8-zoom-module-2/explore?category=${M.slug}" class="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors whitespace-nowrap border border-white/5" data-navigo>
                    ${M.name}
                </a>
            `).join("")}
        </div>
        `:""}

        <!-- Section: Personalized (If logged in) -->
        ${s&&m.length>0?V("Dành riêng cho bạn",m,"personalized","Dựa trên lịch sử nghe nhạc"):""}
        
        <!-- Section 1: Albums for you -->
        ${V("Gợi ý Album",f,"albums")}

        <!-- Section 2: Today's Hits -->
        ${V("Hit Hôm Nay",p,"hits")}

        <!-- Section 3: Country Playlists -->
        ${V("Tuyển tập Việt Nam",d,"country-playlists","Khám phá âm nhạc Việt")}
      </div>
    `;$(k,e);const P=document.querySelector("main");P&&(P.addEventListener("click",O=>{const B=O.target.closest(".song-card");if(B)try{const I=JSON.parse(B.dataset.song);xe(async()=>{const{playerStore:A}=await Promise.resolve().then(()=>we);return{playerStore:A}},void 0).then(({playerStore:A})=>{A.play(I)})}catch(I){console.error("Failed to play song",I)}}),P.querySelectorAll("[data-scroll]").forEach(O=>{O.addEventListener("click",B=>{const I=B.currentTarget.dataset.scroll,A=B.currentTarget.dataset.target,z=document.getElementById(A);if(z){const q=z.clientWidth*.75;I==="left"?z.scrollBy({left:-q,behavior:"smooth"}):z.scrollBy({left:q,behavior:"smooth"})}})}))}catch(t){console.error("Home load error",t),$(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Đã có lỗi xảy ra</h3>
           <p>${t.message}</p>
           <button class="mt-4 px-4 py-2 bg-white text-black rounded-full" onclick="location.reload()">Thử lại</button>
       </div>
    `,e)}},V=(e,t,s,r="")=>{const n=t.slice(0,12);return`
    <section>
        <div class="flex items-end justify-between mb-4">
            <div>
                ${r?`<p class="text-sm font-medium text-yt-text-secondary uppercase tracking-wider mb-1">${r}</p>`:""}
                <h2 class="text-2xl font-bold leading-tight">${e}</h2>
            </div>
            <div class="flex items-center gap-2">
                <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white disabled:opacity-50" 
                    data-scroll="left" data-target="${s}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button class="w-8 h-8 rounded-full border border-gray-700 hover:border-white flex items-center justify-center transition-colors text-white disabled:opacity-50" 
                    data-scroll="right" data-target="${s}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
        </div>
        <div id="${s}" class="flex overflow-x-auto scroll-smooth gap-6 scrollbar-none pb-4 snap-x">
            ${n.map((i,a)=>{let c="";return a>2&&(c="hidden sm:block"),a>3&&(c="hidden md:block"),a>4&&(c="hidden lg:block"),`<div class="${c}">${ft(i)}</div>`}).join("")}
        </div>
    </section>
    `},ft=e=>{const t=e.title||e.name||"Không có tiêu đề",s=j(t),r=Array.isArray(e.artists)?e.artists.map(a=>typeof a=="string"?a:a.name).join(", "):e.description||"",n=j(r),i=e.thumbnails&&e.thumbnails[0]||e.thumbnail||e.image||"https://via.placeholder.com/300";return`
      <div class="flex-shrink-0 w-48 group cursor-pointer song-card snap-start" data-song='${JSON.stringify(e).replace(/'/g,"&#39;")}'>
         <div class="relative aspect-square mb-3 rounded overflow-hidden bg-gray-800">
            <img src="${i}" alt="${s}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </button>
            </div>
         </div>
         <h3 class="font-medium text-white truncate group-hover:underline" title="${s}">${s}</h3>
         <p class="text-sm text-yt-text-secondary truncate" title="${n}">${n}</p>
      </div>
    `},pt=async e=>{$(`
      <div class="flex items-center justify-center h-64">
          <div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
  `,e);try{const[t,s,r,n]=await Promise.all([S.get("/explore/new-releases"),S.getChartVideos(),S.getTopArtists(),S.getMoods()]),i=t.items||t.data||[],a=s.items||s.data||[],c=r.items||r.data||[],f=(n.items||n.data||[]).map(d=>({label:d.title||d.name||"Unknown",slug:d.slug||""}));f.length===0?["Mới phát hành","Bảng xếp hạng","Tâm trạng","Pop","Rock","Hiphop"].forEach(d=>f.push({label:d,slug:""})):(f.unshift({label:"Mới phát hành",slug:"new-releases"}),f.splice(1,0,{label:"Bảng xếp hạng",slug:"charts"}));const p=`
       <div class="space-y-8">
         <!-- Chips Navigation -->
         <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            ${f.map((d,m)=>`
               <button 
                  class="category-chip px-4 py-2 bg-yt-hover rounded-lg text-sm font-medium whitespace-nowrap hover:bg-white/20 transition-colors ${m===0?"bg-white text-black hover:bg-gray-200":""}"
                  data-category="${d.label}"
                  data-slug="${d.slug}"
               >
                  ${d.label}
               </button>
            `).join("")}
         </div>

         <!-- Section: Mới phát hành -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Mới phát hành</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${i.slice(0,10).map(d=>ue(d)).join("")}
            </div>
         </section>

         <!-- Section: Top Music Videos -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Bảng xếp hạng Music Videos</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${a.slice(0,5).map((d,m)=>ue(d,m+1)).join("")}
            </div>
         </section>

         <!-- Section: Top Artists -->
         <section>
            <h2 class="text-2xl font-bold mb-4">Nghệ sĩ hàng đầu</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
               ${c.slice(0,5).map(d=>gt(d)).join("")}
            </div>
         </section>
       </div>
     `;$(p,e);const v=document.querySelector("main");v&&v.addEventListener("click",d=>{const m=d.target.closest(".song-card");if(m)try{const w=JSON.parse(m.dataset.song);xe(async()=>{const{playerStore:k}=await Promise.resolve().then(()=>we);return{playerStore:k}},void 0).then(({playerStore:k})=>{k.play(w)})}catch(w){console.error("Failed to play song",w)}const x=d.target.closest(".category-chip");if(x){const w=x.dataset.category;document.querySelectorAll(".category-chip").forEach(P=>{P.classList.remove("bg-white","text-black","hover:bg-gray-200"),P.classList.add("bg-yt-hover","text-white")}),x.classList.remove("bg-yt-hover","text-white"),x.classList.add("bg-white","text-black","hover:bg-gray-200");const k=document.querySelector("h2");k&&(w==="Mới phát hành"?k.textContent="Mới phát hành":k.textContent=`${w} (Demo)`)}})}catch(t){console.error("Explore load error",t),$(`
       <div class="text-center py-20 text-red-500">
           <h3 class="text-xl font-bold">Lỗi tải dữ liệu</h3>
           <p>${t.message}</p>
       </div>
    `,e)}},ue=e=>{const t=e.title||e.name||"No Title",s=j(t),r=Array.isArray(e.artists)?e.artists.map(a=>typeof a=="string"?a:a.name).join(", "):"",n=j(r),i=e.thumbnails&&e.thumbnails[0]||e.thumbnail||e.thumb||e.image||"https://via.placeholder.com/300";return`
      <div class="group cursor-pointer song-card" data-song='${JSON.stringify(e).replace(/'/g,"&#39;")}'>
         <div class="relative aspect-square mb-3 rounded overflow-hidden bg-gray-800">
            <img src="${i}" alt="${s}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center pl-1 hover:scale-110 transition-transform">
                   <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </button>
            </div>
         </div>
         <h3 class="font-medium text-white truncate hover:underline" title="${s}">${s}</h3>
         <p class="text-sm text-yt-text-secondary truncate" title="${n}">${n}</p>
      </div>
    `},gt=e=>{const t=e.name||"Unknown Artist",s=j(t);return`
      <div class="group cursor-pointer flex flex-col items-center text-center">
         <div class="relative w-full aspect-square mb-3 rounded-full overflow-hidden bg-gray-800">
            <img src="${e.thumbnails&&e.thumbnails[0]||e.thumbnail||e.image||"https://via.placeholder.com/300"}" alt="${s}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
         </div>
         <h3 class="font-medium text-white hover:underline" title="${s}">${s}</h3>
         <p class="text-sm text-yt-text-secondary">Nghệ sĩ</p>
      </div>
    `},mt=e=>{$(`
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
  `,e)},_=new et("/f8-zoom-module-2/");_.on({"/":()=>{ht(_)},"/explore":()=>{pt(_)},"/library":()=>{mt(_)},"/login":()=>{L.isAuthenticated?_.navigate("/"):nt(_)},"/register":()=>{L.isAuthenticated?_.navigate("/"):ot(_)}});_.hooks({before:async(e,t)=>{!L.isAuthenticated&&localStorage.getItem("accessToken")&&await L.init(),e()}});(async()=>(localStorage.getItem("accessToken"),_.resolve()))();
