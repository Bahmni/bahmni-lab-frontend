(self.webpackChunk_openmrs_esm_offline_tools_app=self.webpackChunk_openmrs_esm_offline_tools_app||[]).push([[603],{7024:(e,t,r)=>{"use strict";function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}r.d(t,{u9:()=>u});var c=["width","height","viewBox"],s=["tabindex"],l={focusable:"false",preserveAspectRatio:"xMidYMid meet"};function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.width,r=e.height,n=e.viewBox,a=void 0===n?"0 0 ".concat(t," ").concat(r):n,u=i(e,c),p=u.tabindex,f=i(u,s),b=o(o(o({},l),f),{},{width:t,height:r,viewBox:a});return b["aria-label"]||b["aria-labelledby"]||b.title?(b.role="img",null!=p&&(b.focusable="true",b.tabindex=p)):b["aria-hidden"]=!0,b}},8251:(e,t,r)=>{"use strict";r.d(t,{I:()=>b,_:()=>f,a:()=>l});var n=r(7024),o=r(216),a=r.n(o),i=r(6983),c=r.n(i);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var b=c().forwardRef((function(e,t){var r=e.className,o=e.children,a=e.tabIndex,i=f(e,["className","children","tabIndex"]),s=(0,n.u9)(p(p({},i),{},{tabindex:a})),l=s.tabindex,u=f(s,["tabindex"]);return r&&(u.className=r),null!=l&&(u.tabIndex=l),t&&(u.ref=t),c().createElement("svg",u,o)}));b.displayName="Icon",b.propTypes={"aria-hidden":a().string,"aria-label":a().string,"aria-labelledby":a().string,children:a().node,className:a().string,height:a().number,preserveAspectRatio:a().string,tabIndex:a().string,viewBox:a().string,width:a().number,xmlns:a().string},b.defaultProps={xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"xMidYMid meet"}},7873:(e,t,r)=>{"use strict";r.d(t,{Q:()=>o});var n=r(7657);function o(){const e=(0,n.getOfflinePatientDataStore)();return(0,n.useStore)(e)}},1631:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var n=r(6983),o=r.n(n),a=r(2680),i=r(7873),c=r(6698),s=r(1219),l=r(9549);const u=()=>{const{t:e}=(0,a.useTranslation)(),t=function(){const e=(0,i.Q)();return Object.values(e.offlinePatientDataSyncState).filter((e=>0===e.failedHandlers.length&&0===e.syncingHandlers.length)).length}();return o().createElement(s.Z,{header:e("homeOverviewCardPatientsHeader","Patients"),viewLink:l._.offlineToolsPatients},o().createElement(c.Z,{header:e("homeOverviewCardPatientsDownloaded","Downloaded"),content:t}))}},459:(e,t,r)=>{"use strict";var n=r(5704);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,a,i){if(i!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return r.PropTypes=r,r}},216:(e,t,r)=>{e.exports=r(459)()},5704:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);