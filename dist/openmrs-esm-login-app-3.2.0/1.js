(self.webpackChunk_openmrs_esm_login_app=self.webpackChunk_openmrs_esm_login_app||[]).push([[1],[,(t,e,n)=>{var r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,u=/^0o[0-7]+$/i,f=parseInt,c="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,a="object"==typeof self&&self&&self.Object===Object&&self,s=c||a||Function("return this")(),p=Object.prototype.toString,l=Math.max,v=Math.min,b=function(){return s.Date.now()};function m(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==p.call(t)}(t))return NaN;if(m(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=m(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(r,"");var n=o.test(t);return n||u.test(t)?f(t.slice(2),n?2:8):i.test(t)?NaN:+t}t.exports=function(t,e,n){var r,i,o,u,f,c,a=0,s=!1,p=!1,g=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function d(e){var n=r,o=i;return r=i=void 0,a=e,u=t.apply(o,n)}function j(t){return a=t,f=setTimeout(_,e),s?d(t):u}function h(t){var n=t-c;return void 0===c||n>=e||n<0||p&&t-a>=o}function _(){var t=b();if(h(t))return O(t);f=setTimeout(_,function(t){var n=e-(t-c);return p?v(n,o-(t-a)):n}(t))}function O(t){return f=void 0,g&&r?d(t):(r=i=void 0,u)}function x(){var t=b(),n=h(t);if(r=arguments,i=this,c=t,n){if(void 0===f)return j(c);if(p)return f=setTimeout(_,e),d(c)}return void 0===f&&(f=setTimeout(_,e)),u}return e=y(e)||0,m(n)&&(s=!!n.leading,o=(p="maxWait"in n)?l(y(n.maxWait)||0,e):o,g="trailing"in n?!!n.trailing:g),x.cancel=function(){void 0!==f&&clearTimeout(f),a=0,r=c=i=f=void 0},x.flush=function(){return void 0===f?u:O(b())},x}}]]);