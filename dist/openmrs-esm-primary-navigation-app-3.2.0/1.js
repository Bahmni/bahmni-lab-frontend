(self.webpackChunk_openmrs_esm_primary_navigation_app=self.webpackChunk_openmrs_esm_primary_navigation_app||[]).push([[1],[,(t,n,e)=>{var r=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,u=/^0o[0-7]+$/i,f=parseInt,a="object"==typeof e.g&&e.g&&e.g.Object===Object&&e.g,c="object"==typeof self&&self&&self.Object===Object&&self,p=a||c||Function("return this")(),s=Object.prototype.toString,v=Math.max,l=Math.min,m=function(){return p.Date.now()};function b(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==s.call(t)}(t))return NaN;if(b(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=b(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(r,"");var e=o.test(t);return e||u.test(t)?f(t.slice(2),e?2:8):i.test(t)?NaN:+t}t.exports=function(t,n,e){var r,i,o,u,f,a,c=0,p=!1,s=!1,g=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function d(n){var e=r,o=i;return r=i=void 0,c=n,u=t.apply(o,e)}function j(t){return c=t,f=setTimeout(h,n),p?d(t):u}function _(t){var e=t-a;return void 0===a||e>=n||e<0||s&&t-c>=o}function h(){var t=m();if(_(t))return O(t);f=setTimeout(h,function(t){var e=n-(t-a);return s?l(e,o-(t-c)):e}(t))}function O(t){return f=void 0,g&&r?d(t):(r=i=void 0,u)}function x(){var t=m(),e=_(t);if(r=arguments,i=this,a=t,e){if(void 0===f)return j(a);if(s)return f=setTimeout(h,n),d(a)}return void 0===f&&(f=setTimeout(h,n)),u}return n=y(n)||0,b(e)&&(p=!!e.leading,o=(s="maxWait"in e)?v(y(e.maxWait)||0,n):o,g="trailing"in e?!!e.trailing:g),x.cancel=function(){void 0!==f&&clearTimeout(f),c=0,r=a=i=f=void 0},x.flush=function(){return void 0===f?u:O(m())},x}}]]);