!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("react-dom"),require("react"),require("mobx")):"function"==typeof define&&define.amd?define(["exports","react-dom","react","mobx"],r):r(e.mobxReact={},e.ReactDOM,e.React,e.mobx)}(this,function(e,r,t,n){var o="default"in t?t.default:t;if(!t.useState)throw new Error("mobx-react-lite requires React with Hooks support");if(!n.spy)throw new Error("mobx-react-lite requires mobx at least version 4 to be available");var i=function(){},a=!1;function u(){return a}var c=function(){return(c=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var o in r=arguments[t])Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e}).apply(this,arguments)};function s(e){return e.current?n.getDependencyTree(e.current):"<unknown>"}var f=[];function p(e,r){if(void 0===r&&(r="observed"),u())return e();var o,i,a,c=(a=function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,o,i=t.call(e),a=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)a.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(o)throw o.error}}return a}(t.useState(0),2)[1],t.useCallback(function(){a(function(e){return e+1})},[])),p=t.useRef(null);if(p.current||(p.current=new n.Reaction("observer("+r+")",function(){c()})),t.useDebugValue(p,s),function(e){t.useEffect(function(){return e},f)}(function(){p.current.dispose()}),p.current.track(function(){try{o=e()}catch(e){i=e}}),i)throw p.current.dispose(),i;return o}var l={$$typeof:!0,render:!0,compare:!0,type:!0};function d(e){var r=e.children||e.render;return"function"!=typeof r?null:p(r)}function b(e,r,t,n,o){var i="function"==typeof e[r],a="function"==typeof e["children"===r?"render":"children"];return i&&a?new Error("MobX Observer: Do not use children and render in the same time in`"+t):i||a?null:new Error("Invalid prop `"+o+"` of type `"+typeof e[r]+"` supplied to `"+t+"`, expected `function`.")}d.propTypes={children:b,render:b},d.displayName="Observer";var y=0,v={};function h(e){return v[e]||(v[e]=function(e){if("function"==typeof Symbol)return Symbol(e);var r="__$mobx-react "+e+" ("+y+")";return y++,r}(e)),v[e]}function m(e,r){if(w(e,r))return!0;if("object"!=typeof e||null===e||"object"!=typeof r||null===r)return!1;var t=Object.keys(e),n=Object.keys(r);if(t.length!==n.length)return!1;for(var o=0;o<t.length;o++)if(!hasOwnProperty.call(r,t[o])||!w(e[t[o]],r[t[o]]))return!1;return!0}function w(e,r){return e===r?0!==e||1/e==1/r:e!=e&&r!=r}var O={$$typeof:1,render:1,compare:1,type:1,childContextTypes:1,contextType:1,contextTypes:1,defaultProps:1,getDefaultProps:1,getDerivedStateFromError:1,getDerivedStateFromProps:1,mixins:1,propTypes:1},g=!1,j=h("skipRender"),x=h("isForcingUpdate"),P="function"==typeof t.forwardRef&&t.forwardRef(function(e,r){}).$$typeof;function R(e,r,t){Object.hasOwnProperty.call(e,r)?e[r]=t:Object.defineProperty(e,r,{enumerable:!1,configurable:!0,writable:!0,value:t})}function E(e,r){return g&&console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side."),this.state!==r||!m(this.props,e)}function C(e,r){var t=h("reactProp_"+r+"_valueHolder"),o=h("reactProp_"+r+"_atomHolder");function i(){return this[o]||R(this,o,n.createAtom("reactive "+r)),this[o]}Object.defineProperty(e,r,{configurable:!0,enumerable:!0,get:function(){return i.call(this).reportObserved(),this[t]},set:function(e){this[x]||m(this[t],e)?R(this,t,e):(R(this,t,e),R(this,j,!0),i.call(this).reportChanged(),R(this,j,!1))}})}function k(e){if(!0===e.isMobxInjector&&console.warn("Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'"),P&&e.$$typeof===P){var r=e.render;if("function"!=typeof r)throw new Error("render property of ForwardRef was not a function");return t.forwardRef(function(){var e=arguments;return o.createElement(d,null,function(){return r.apply(void 0,e)})})}return"function"!=typeof e||e.prototype&&e.prototype.render||e.isReactClass||t.Component.isPrototypeOf(e)?function(e){var r=e.prototype||e;if(r.componentWillReact)throw new Error("The componentWillReact life-cycle event is no longer supported");if(e.__proto__!==t.PureComponent)if(r.shouldComponentUpdate){if(r.shouldComponentUpdate!==E)throw new Error("It is not allowed to use shouldComponentUpdate in observer based components.")}else r.shouldComponentUpdate=E;C(r,"props"),C(r,"state");var n=r.render;return r.render=function(){if(!this.baseRender){var e=n.bind(this);this.baseRender=function(){return e()}}return o.createElement(d,null,this.baseRender)},e}(e):function(e,r){if(u())return e;var n,o,i,a=c({forwardRef:!1},void 0),s=e.displayName||e.name,f=function(r,t){return p(function(){return e(r,t)},s)};return n=t.memo(a.forwardRef?t.forwardRef(f):f),o=e,i=n,Object.keys(o).forEach(function(e){o.hasOwnProperty(e)&&!l[e]&&Object.defineProperty(i,e,Object.getOwnPropertyDescriptor(o,e))}),n.displayName=s,n}(e)}var _={children:!0,key:!0,ref:!0},S=t.createContext({}),U=function(e){function r(r,t){e.call(this,r,t),this.state=Object.assign({},t,T(r))}return e&&(r.__proto__=e),(r.prototype=Object.create(e&&e.prototype)).constructor=r,r.prototype.render=function(){return t.createElement(S.Provider,{value:this.state},t.Children.only(this.props.children))},r.getDerivedStateFromProps=function(e,r){if(!m(r,Object.assign({},r,T(e))))throw new Error("MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children");return r},r}(t.Component);function T(e){var r={};if(!e)return r;for(var t in e)A(t)&&(r[t]=e[t]);return r}function A(e){return!_[e]&&"suppressChangedStoreWarning"!==e}function M(e,r,n,i){var a=function(e,r){var t=e.displayName||e.name||e.constructor&&e.constructor.name||"Component";return r?"inject-with-"+r+"("+t+")":"inject("+t+")"}(r,n),u=function(n){function o(){n.apply(this,arguments)}return n&&(o.__proto__=n),(o.prototype=Object.create(n&&n.prototype)).constructor=o,o.prototype.render=function(){var n=this.props,o=n.forwardRef,i=function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===r.indexOf(n)&&(t[n]=e[n]);return t}(n,["forwardRef"]);return Object.assign(i,e(this.context||{},i)||{}),o&&!function(e){return!(e.prototype&&e.prototype.render)}(r)&&(i.ref=this.props.forwardRef),t.createElement(r,i)},o}(t.Component);u.contextType=S,i&&(u=k(u)),u.isMobxInjector=!0;var c,s,f=o.forwardRef(function(e,r){return o.createElement(u,Object.assign({},e,{forwardRef:r}))});return c=r,s=f,Object.keys(c).forEach(function(e){c.hasOwnProperty(e)&&!O[e]&&Object.defineProperty(s,e,Object.getOwnPropertyDescriptor(c,e))}),f.wrappedComponent=r,f.displayName=a,f}U.contextType=S;var D=h("disposeOnUnmount"),q=h("originalOnUnmount");function $(){var e=this;this[q]&&this[q](),this[D]&&(this[D].forEach(function(r){var t="string"==typeof r?e[r]:r;if(null!=t){if("function"!=typeof t)throw new Error("[mobx-react] disposeOnUnmount only works on functions such as disposers returned by reactions, autorun, etc.");t()}}),this[D]=[])}function I(e){function r(r,t,o,i,a,u){for(var c=[],s=arguments.length-6;s-- >0;)c[s]=arguments[s+6];return n.untracked(function(){return i=i||"<<anonymous>>",u=u||o,null==t[o]?r?new Error("The "+a+" `"+u+"` is marked as required in `"+i+"`, but its value is `"+(null===t[o]?"null":"undefined")+"`."):null:e.apply(void 0,[t,o,i,a,u].concat(c))})}var t=r.bind(null,!1);return t.isRequired=r.bind(null,!0),t}function W(e){var r=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":function(e,r){return"symbol"===e||"Symbol"===r["@@toStringTag"]||"function"==typeof Symbol&&r instanceof Symbol}(r,e)?"symbol":r}function F(e,r){return I(function(t,o,i,a,u){return n.untracked(function(){if(e&&W(t[o])===r.toLowerCase())return null;var a;switch(r){case"Array":a=n.isObservableArray;break;case"Object":a=n.isObservableObject;break;case"Map":a=n.isObservableMap;break;default:throw new Error("Unexpected mobxType: "+r)}var c=t[o];if(!a(c)){var s=function(e){var r=W(e);if("object"===r){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return r}(c),f=e?" or javascript `"+r.toLowerCase()+"`":"";return new Error("Invalid prop `"+u+"` of type `"+s+"` supplied to `"+i+"`, expected `mobx.Observable"+r+"`"+f+".")}return null})})}function N(e,r){return I(function(t,o,i,a,u){for(var c=[],s=arguments.length-5;s-- >0;)c[s]=arguments[s+5];return n.untracked(function(){if("function"!=typeof r)return new Error("Property `"+u+"` of component `"+i+"` has invalid PropType notation.");var n=F(e,"Array")(t,o,i);if(n instanceof Error)return n;for(var s=t[o],f=0;f<s.length;f++)if((n=r.apply(void 0,[s,f,i,a,u+"["+f+"]"].concat(c)))instanceof Error)return n;return null})})}var H={observableArray:F(!1,"Array"),observableArrayOf:N.bind(null,!1),observableMap:F(!1,"Map"),observableObject:F(!1,"Object"),arrayOrObservableArray:F(!0,"Array"),arrayOrObservableArrayOf:N.bind(null,!0),objectOrObservableObject:F(!0,"Object")};if(!t.Component)throw new Error("mobx-react requires React to be available");if(!n.observable)throw new Error("mobx-react requires mobx to be available");"function"==typeof r.unstable_batchedUpdates&&n.configure({reactionScheduler:r.unstable_batchedUpdates}),e.useObservable=function(e){var r=t.useRef(null);return r.current||(r.current=n.observable(e)),r.current},e.useComputed=function(e,r){return void 0===r&&(r=[]),t.useMemo(function(){return n.computed(e)},r).get()},e.useDisposable=function(e,r){void 0===r&&(r=[]);var n=t.useRef(null),o=t.useRef(!1);function a(r){if(o.current)return i;if(!n.current){var t=e();if("function"!=typeof t){var a=new Error("generated disposer must be a function");return console.error(a),i}n.current=t}return function(){n.current&&(n.current(),n.current=null),r&&(o.current=!0)}}return t.useEffect(function(){return a(!1)},r),a(!0)},e.useObserver=p,e.Observer=d,e.observer=k,e.useStaticRendering=function(e){g=e,a=e},e.Provider=U,e.inject=function(){for(var e,r=[],t=arguments.length;t--;)r[t]=arguments[t];return"function"==typeof arguments[0]?(e=arguments[0],function(r){return M(e,r,e.name,!0)}):function(e){return M(function(e){return function(r,t){return e.forEach(function(e){if(!(e in t)){if(!(e in r))throw new Error("MobX injector: Store '"+e+"' is not available! Make sure it is provided by some Provider");t[e]=r[e]}}),t}}(r),e,r.join("-"),!1)}},e.disposeOnUnmount=function e(r,n){if(Array.isArray(n))return n.map(function(t){return e(r,t)});var o=Object.getPrototypeOf(r).constructor||Object.getPrototypeOf(r.constructor),i=Object.getPrototypeOf(r.constructor);if(o!==t.Component&&o!==t.PureComponent&&i!==t.Component&&i!==t.PureComponent)throw new Error("[mobx-react] disposeOnUnmount only supports direct subclasses of React.Component or React.PureComponent.");if("string"!=typeof n&&"function"!=typeof n)throw new Error("[mobx-react] disposeOnUnmount only works if the parameter is either a property key or a function.");var a=!!r[D];return(r[D]||(r[D]=[])).push(n),a||(r.componentWillUnmount&&(r[q]=r.componentWillUnmount),Object.defineProperty(r,"componentWillUnmount",{get:function(){return $},set:function(e){this[D].push(e),this[q]=void 0},configurable:!1,enumerable:!1})),"string"!=typeof n?n:void 0},e.PropTypes=H});
//# sourceMappingURL=mobx-react.umd.js.map
