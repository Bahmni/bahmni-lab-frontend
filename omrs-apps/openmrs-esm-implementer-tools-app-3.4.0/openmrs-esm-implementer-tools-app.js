System.register('@openmrs/esm-implementer-tools-app', [], function(a, j) {
  var b = void 0
  return {
    execute: function() {
      a(
        (() => {
          function k(a) {
            var b = g[a]
            if (void 0 !== b) return b.exports
            var c = (g[a] = {id: a, loaded: !1, exports: {}})
            return (
              M[a].call(c.exports, c, c.exports, k), (c.loaded = !0), c.exports
            )
          }
          var q,
            w,
            x,
            z,
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            r,
            H,
            I,
            J,
            K,
            L,
            M = {
              6585: (a, b, c) => {
                ;(0, c(7968).s)(1)
              },
              7968: (a, b, c) => {
                const d = c(1577).R
                b.s = function(a) {
                  if ((a || (a = 1), !c.y.meta || !c.y.meta.url))
                    throw (console.error('__system_context__', c.y),
                    Error(
                      'systemjs-webpack-interop was provided an unknown SystemJS context. Expected context.meta.url, but none was provided',
                    ))
                  c.p = d(c.y.meta.url, a)
                }
              },
              8331: (a, b, c) => {
                c(6585)
              },
              1577: (a, b) => {
                ;(b.R = function(b, c) {
                  var d = document.createElement('a')
                  d.href = b
                  for (
                    var e =
                        '/' === d.pathname[0] ? d.pathname : '/' + d.pathname,
                      f = 0,
                      g = e.length;
                    f !== c && 0 <= g;

                  )
                    '/' === e[--g] && f++
                  if (f !== c)
                    throw Error(
                      'systemjs-webpack-interop: rootDirectoryLevel (' +
                        c +
                        ') is greater than the number of directories (' +
                        f +
                        ') in the URL path ' +
                        b,
                    )
                  var h = e.slice(0, g + 1)
                  return d.protocol + '//' + d.host + h
                }),
                  Number.isInteger
              },
              5387: (c, d, f) => {
                var g = {
                    app: () => (
                      b ||
                        ((self.webpackChunk_openmrs_esm_implementer_tools_app =
                          self.webpackChunk_openmrs_esm_implementer_tools_app ||
                          []).push([
                          [284],
                          {
                            1284: (b, d, e) => {
                              function f(a) {
                                var b = a.configPath,
                                  c = (0, k.useTranslation)().t
                                return j().createElement(
                                  'button',
                                  {
                                    onClick: function() {
                                      i.wT.setState({configPathBeingEdited: b})
                                    },
                                  },
                                  c('edit', 'Edit'),
                                )
                              }
                              function a() {
                                var a = {
                                  featureName: 'Implementer Tools',
                                  moduleName:
                                    '@openmrs/esm-implementer-tools-app',
                                }
                                return {
                                  pages: [
                                    {
                                      route: function() {
                                        return !0
                                      },
                                      load: (0, g.getAsyncLifecycle)(
                                        function() {
                                          return Promise.all([
                                            e.e(458),
                                            e.e(784),
                                            e.e(811),
                                          ]).then(e.bind(e, 8811))
                                        },
                                        a,
                                      ),
                                    },
                                  ],
                                  extensions: [
                                    {
                                      name: 'implementer-tools-button',
                                      slot: 'top-nav-actions-slot',
                                      load: (0, g.getAsyncLifecycle)(
                                        function() {
                                          return Promise.all([
                                            e.e(350),
                                            e.e(784),
                                            e.e(105),
                                          ]).then(e.bind(e, 4105))
                                        },
                                        a,
                                      ),
                                    },
                                  ],
                                }
                              }
                              e.r(d),
                                e.d(d, {
                                  ConfigEditButton: () => f,
                                  importTranslation: () => l,
                                  setupOpenMRS: () => a,
                                  assets: () => [
                                    '1.js',
                                    '25.js',
                                    '105.js',
                                    '280.js',
                                    '319.js',
                                    'openmrs-esm-implementer-tools-app.js',
                                    '350.js',
                                    '458.js',
                                    '475.js',
                                    '531.js',
                                    '574.js',
                                    '620.js',
                                    '652.js',
                                    '735.js',
                                    '743.js',
                                    '769.js',
                                    '788.js',
                                    '811.js',
                                    '860.js',
                                    '889.js',
                                    '890.js',
                                  ],
                                })
                              var g = e(7644),
                                h = e(6983),
                                j = e.n(h),
                                i = e(1004),
                                k = e(2680),
                                l = e(3979)
                            },
                            1004: (g, e, h) => {
                              function j(a, b, c) {
                                return (
                                  b in a
                                    ? Object.defineProperty(a, b, {
                                        value: c,
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                      })
                                    : (a[b] = c),
                                  a
                                )
                              }
                              function k(a) {
                                for (var b = 1; b < arguments.length; b++) {
                                  var c =
                                      null == arguments[b] ? {} : arguments[b],
                                    d = Object.keys(c)
                                  'function' ==
                                    typeof Object.getOwnPropertySymbols &&
                                    (d = d.concat(
                                      Object.getOwnPropertySymbols(c).filter(
                                        function(a) {
                                          return Object.getOwnPropertyDescriptor(
                                            c,
                                            a,
                                          ).enumerable
                                        },
                                      ),
                                    )),
                                    d.forEach(function(b) {
                                      j(a, b, c[b])
                                    })
                                }
                                return a
                              }
                              function n() {
                                var a
                                return (
                                  null !==
                                    (a = JSON.parse(
                                      localStorage.getItem(
                                        'openmrs:openmrsImplementerToolsAreOpen',
                                      ) || 'false',
                                    )) &&
                                  void 0 !== a &&
                                  a
                                )
                              }
                              function m() {
                                var a
                                return (
                                  null ===
                                    (a = JSON.parse(
                                      localStorage.getItem(
                                        'openmrs:openmrsImplementerToolsConfigOpen',
                                      ) || 'true',
                                    )) ||
                                  void 0 === a ||
                                  a
                                )
                              }
                              function f() {
                                var a
                                return (
                                  null !==
                                    (a = JSON.parse(
                                      localStorage.getItem(
                                        'openmrs:isUIEditorEnabled',
                                      ) || 'false',
                                    )) &&
                                  void 0 !== a &&
                                  a
                                )
                              }
                              function d() {
                                var a
                                return (
                                  null !==
                                    (a = JSON.parse(
                                      localStorage.getItem(
                                        'openmrs:getIsJsonModeEnabled',
                                      ) || 'false',
                                    )) &&
                                  void 0 !== a &&
                                  a
                                )
                              }
                              h.d(e, {XE: () => o, wT: () => b, zI: () => i})
                              var b = (0,
                                h(7644).createGlobalStore)(
                                  'implementer-tools',
                                  {
                                    activeItemDescription: void 0,
                                    configPathBeingEdited: null,
                                    isOpen: n(),
                                    hasAlert: !1,
                                    openTabIndex: 0,
                                    isConfigToolbarOpen: m(),
                                    isUIEditorEnabled: f(),
                                    isJsonModeEnabled: d(),
                                  },
                                ),
                                i =
                                  (b.action(function(a, b) {
                                    return k({}, a, {hasAlert: b})
                                  }),
                                  b.action(function(a) {
                                    return k({}, a, {isOpen: !a.isOpen})
                                  })),
                                o = b.action(function(a) {
                                  return k({}, a, {isOpen: !0, openTabIndex: 1})
                                }),
                                l = n(),
                                q = m(),
                                r = f(),
                                s = d()
                              b.subscribe(function(a) {
                                var b, c
                                a.isOpen != l &&
                                  ((b = a.isOpen),
                                  localStorage.setItem(
                                    'openmrs:openmrsImplementerToolsAreOpen',
                                    JSON.stringify(b),
                                  ),
                                  (l = a.isOpen)),
                                  a.isUIEditorEnabled != r &&
                                    ((c = a.isUIEditorEnabled),
                                    localStorage.setItem(
                                      'openmrs:isUIEditorEnabled',
                                      JSON.stringify(c),
                                    ),
                                    (r = a.isUIEditorEnabled)),
                                  a.isConfigToolbarOpen != q &&
                                    ((function(a) {
                                      localStorage.setItem(
                                        'openmrs:openmrsImplementerToolsConfigOpen',
                                        JSON.stringify(a),
                                      )
                                    })(a.isConfigToolbarOpen),
                                    (q = a.isConfigToolbarOpen)),
                                  a.isJsonModeEnabled != s &&
                                    ((function(a) {
                                      localStorage.setItem(
                                        'openmrs:getIsJsonModeEnabled',
                                        JSON.stringify(a),
                                      )
                                    })(a.isJsonModeEnabled),
                                    (s = a.isJsonModeEnabled))
                              })
                            },
                            3979: (a, b, c) => {
                              function d(a) {
                                if (!c.o(f, a))
                                  return Promise.resolve().then(() => {
                                    var b = new Error(
                                      "Cannot find module '" + a + "'",
                                    )
                                    throw ((b.code = 'MODULE_NOT_FOUND'), b)
                                  })
                                var b = f[a],
                                  d = b[0]
                                return c.e(b[1]).then(() => c(d))
                              }
                              var f = {
                                './en.json': [3574, 574],
                                './es.json': [8319, 319],
                              }
                              ;(d.keys = () => Object.keys(f)),
                                (d.id = 3979),
                                (a.exports = d)
                            },
                          },
                        ]),
                        (b = Promise.all([f.e(983), f.e(284)]).then(() => () =>
                          f(1284),
                        ))),
                      b
                    ),
                  },
                  e = (a, b) => (
                    (f.R = b),
                    (b = f.o(g, a)
                      ? g[a]()
                      : Promise.resolve().then(() => {
                          throw new Error(
                            'Module "' + a + '" does not exist in container.',
                          )
                        })),
                    (f.R = void 0),
                    b
                  ),
                  h = (a, b) => {
                    if (f.S) {
                      var c = f.S['default']
                      if (c && c !== a)
                        throw new Error(
                          'Container initialization failed as it has already been initialized with a different share scope',
                        )
                      return (f.S['default'] = a), f.I('default', b)
                    }
                  }
                f.d(d, {get: () => e, init: () => h})
              },
            },
            g = {}
          return (
            (k.m = M),
            (k.c = g),
            (k.y = j),
            (k.amdD = function() {
              throw new Error('define cannot be used indirect')
            }),
            (k.n = a => {
              var b = a && a.__esModule ? () => a.default : () => a
              return k.d(b, {a: b}), b
            }),
            (k.d = (a, b) => {
              for (var c in b)
                k.o(b, c) &&
                  !k.o(a, c) &&
                  Object.defineProperty(a, c, {enumerable: !0, get: b[c]})
            }),
            (k.f = {}),
            (k.e = a =>
              Promise.all(
                Object.keys(k.f).reduce((b, c) => (k.f[c](a, b), b), []),
              )),
            (k.u = a => a + '.js'),
            (k.g = (function() {
              if ('object' == typeof globalThis) return globalThis
              try {
                return this || new Function('return this')()
              } catch (a) {
                if ('object' == typeof window) return window
              }
            })()),
            (k.o = (a, b) => Object.prototype.hasOwnProperty.call(a, b)),
            (q = {}),
            (w = '@openmrs/esm-implementer-tools-app:'),
            (k.l = (a, b, d) => {
              if (q[a]) q[a].push(b)
              else {
                var e, g
                if (void 0 !== d)
                  for (
                    var h, j = document.getElementsByTagName('script'), l = 0;
                    l < j.length;
                    l++
                  )
                    if (
                      ((h = j[l]),
                      h.getAttribute('src') == a ||
                        h.getAttribute('data-webpack') == w + d)
                    ) {
                      e = h
                      break
                    }
                e ||
                  ((g = !0),
                  ((e = document.createElement('script')).charset = 'utf-8'),
                  (e.timeout = 120),
                  k.nc && e.setAttribute('nonce', k.nc),
                  e.setAttribute('data-webpack', w + d),
                  (e.src = a)),
                  (q[a] = [b])
                var m = (b, c) => {
                    ;(e.onerror = e.onload = null), clearTimeout(f)
                    var d = q[a]
                    if (
                      (delete q[a],
                      e.parentNode && e.parentNode.removeChild(e),
                      d && d.forEach(a => a(c)),
                      b)
                    )
                      return b(c)
                  },
                  f = setTimeout(
                    m.bind(null, void 0, {type: 'timeout', target: e}),
                    12e4,
                  )
                ;(e.onerror = m.bind(null, e.onerror)),
                  (e.onload = m.bind(null, e.onload)),
                  g && document.head.appendChild(e)
              }
            }),
            (k.r = a => {
              'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(a, Symbol.toStringTag, {value: 'Module'}),
                Object.defineProperty(a, '__esModule', {value: !0})
            }),
            (k.nmd = a => ((a.paths = []), a.children || (a.children = []), a)),
            (() => {
              k.S = {}
              var b = {},
                c = {}
              k.I = (d, e) => {
                e || (e = [])
                var f = c[d]
                if ((f || (f = c[d] = {}), !(0 <= e.indexOf(f)))) {
                  if ((e.push(f), b[d])) return b[d]
                  k.o(k.S, d) || (k.S[d] = {})
                  var g = k.S[d],
                    a = (a, b, c, d) => {
                      var e = (g[a] = g[a] || {}),
                        f = e[b]
                      ;(f &&
                        (f.loaded ||
                          (!d == !f.eager
                            ? !('@openmrs/esm-implementer-tools-app' > f.from)
                            : !d))) ||
                        (e[b] = {
                          get: c,
                          from: '@openmrs/esm-implementer-tools-app',
                          eager: !!d,
                        })
                    },
                    h = []
                  return (
                    'default' === d &&
                      (a('@openmrs/esm-framework', '3.4.0', () =>
                        Promise.all([k.e(983), k.e(889)]).then(() => () =>
                          k(4889),
                        ),
                      ),
                      a('carbon-components-react', '7.31.0', () =>
                        Promise.all([
                          k.e(652),
                          k.e(890),
                          k.e(983),
                          k.e(412),
                          k.e(199),
                        ]).then(() => () => k(3890)),
                      ),
                      a('carbon-components', '10.31.0', () =>
                        Promise.all([k.e(25), k.e(1)]).then(() => () => k(25)),
                      ),
                      a('carbon-icons', '7.0.7', () =>
                        k.e(860).then(() => () => k(4860)),
                      ),
                      a('react-dom', '16.14.0', () =>
                        Promise.all([k.e(788), k.e(983)]).then(() => () =>
                          k(2788),
                        ),
                      ),
                      a('react-i18next', '11.16.2', () =>
                        Promise.all([k.e(743), k.e(983)]).then(() => () =>
                          k(5743),
                        ),
                      ),
                      a('react', '16.14.0', () =>
                        k.e(735).then(() => () => k(2735)),
                      )),
                    (b[d] = h.length
                      ? Promise.all(h).then(() => (b[d] = 1))
                      : 1)
                  )
                }
              }
            })(),
            (k.p = ''),
            (x = a => {
              var b = a => a.split('.').map(a => (+a == a ? +a : a)),
                c = /^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(a),
                d = c[1] ? b(c[1]) : []
              return (
                c[2] && (d.length++, d.push.apply(d, b(c[2]))),
                c[3] && (d.push([]), d.push.apply(d, b(c[3]))),
                d
              )
            }),
            (z = (b, c) => {
              ;(b = x(b)), (c = x(c))
              for (var d = 0; ; ) {
                if (d >= b.length)
                  return d < c.length && 'u' != (typeof c[d])[0]
                var f = b[d],
                  g = (typeof f)[0]
                if (d >= c.length) return 'u' == g
                var a = c[d],
                  h = (typeof a)[0]
                if (g != h)
                  return ('o' == g && 'n' == h) || 's' == h || 'u' == g
                if ('o' != g && 'u' != g && f != a) return f < a
                d++
              }
            }),
            (A = a => {
              function b() {
                return g.pop().replace(/^\((.+)\)$/, '$1')
              }
              var c = a[0],
                d = ''
              if (1 === a.length) return '*'
              if (c + 0.5) {
                d +=
                  0 == c
                    ? '>='
                    : -1 == c
                    ? '<'
                    : 1 == c
                    ? '^'
                    : 2 == c
                    ? '~'
                    : 0 < c
                    ? '='
                    : '!='
                for (var e = 1, f = 1; f < a.length; f++)
                  e--,
                    (d +=
                      'u' == (typeof (h = a[f]))[0]
                        ? '-'
                        : (0 < e ? '.' : '') + ((e = 2), h))
                return d
              }
              var g = []
              for (f = 1; f < a.length; f++) {
                var h = a[f]
                g.push(
                  0 === h
                    ? 'not(' + b() + ')'
                    : 1 === h
                    ? '(' + b() + ' || ' + b() + ')'
                    : 2 === h
                    ? g.pop() + ' ' + g.pop()
                    : A(h),
                )
              }
              return b()
            }),
            (B = (b, e) => {
              if (0 in b) {
                e = x(e)
                var g = b[0],
                  h = 0 > g
                h && (g = -g - 1)
                for (var i = 0, j = 1, k = !0; ; j++, i++) {
                  var n,
                    o,
                    q = j < b.length ? (typeof b[j])[0] : ''
                  if (i >= e.length || 'o' == (o = (typeof (n = e[i]))[0]))
                    return !k || ('u' == q ? j > g && !h : ('' == q) != h)
                  if ('u' == o) {
                    if (!k || 'u' != q) return !1
                  } else if (!k) 's' != q && 'n' != q && ((k = !1), j--)
                  else if (q == o) {
                    if (!(j <= g)) {
                      if (h ? n > b[j] : n < b[j]) return !1
                      n != b[j] && (k = !1)
                    } else if (n != b[j]) return !1
                  } else if ('s' != q && 'n' != q) {
                    if (h || j <= g) return !1
                    ;(k = !1), j--
                  } else {
                    if (j <= g || o < q != h) return !1
                    k = !1
                  }
                }
              }
              var f = [],
                c = f.pop.bind(f)
              for (i = 1; i < b.length; i++) {
                var d = b[i]
                f.push(
                  1 == d ? c() | c() : 2 == d ? c() & c() : d ? B(d, e) : !c(),
                )
              }
              return !!c()
            }),
            (C = (a, b) => {
              var c = a[b]
              return Object.keys(c).reduce(
                (a, b) => (a && (c[a].loaded || !z(a, b)) ? a : b),
                0,
              )
            }),
            (D = (a, b, c, d) =>
              'Unsatisfied version ' +
              c +
              ' from ' +
              (c && a[b][c].from) +
              ' of shared singleton module ' +
              b +
              ' (required ' +
              A(d) +
              ')'),
            (E = (a, b, c) => {
              var d = C(a, c)
              return G(a[c][d])
            }),
            (F = (a, b, c, d) => {
              var e = C(a, c)
              return (
                B(d, e) ||
                  ('undefined' != typeof console &&
                    console.warn &&
                    console.warn(D(a, c, e, d))),
                G(a[c][e])
              )
            }),
            (G = a => ((a.loaded = 1), a.get())),
            (H = (r = b =>
              function(c, d, e, f) {
                var g = k.I(c)
                return g && g.then
                  ? g.then(b.bind(b, c, k.S[c], d, e, f))
                  : b(c, k.S[c], d, e, f)
              })((a, b, c, d) => (b && k.o(b, c) ? E(b, 0, c) : d()))),
            (I = r((a, b, c, d, e) => (b && k.o(b, c) ? F(b, 0, c, d) : e()))),
            (J = {}),
            (K = {
              6983: () =>
                I('default', 'react', [1, 16], () =>
                  k.e(735).then(() => () => k(2735)),
                ),
              2680: () =>
                I('default', 'react-i18next', [1, 11], () =>
                  k.e(743).then(() => () => k(5743)),
                ),
              7644: () =>
                I(
                  'default',
                  '@openmrs/esm-framework',
                  [0, 3, 1, 14, , 'pre'],
                  () => k.e(889).then(() => () => k(4889)),
                ),
              5412: () =>
                I('default', 'react-dom', [1, 16], () =>
                  k.e(788).then(() => () => k(2788)),
                ),
              6240: () =>
                I('default', 'carbon-icons', [1, 7], () =>
                  k.e(860).then(() => () => k(4860)),
                ),
              7569: () =>
                I('default', 'carbon-components', [1, 10], () =>
                  k.e(25).then(() => () => k(25)),
                ),
              9784: () =>
                I('default', 'carbon-components-react', [1, 7], () =>
                  Promise.all([
                    k.e(652),
                    k.e(890),
                    k.e(412),
                    k.e(199),
                  ]).then(() => () => k(3890)),
                ),
              8478: () =>
                H('default', '@openmrs/esm-framework/src/internal', () =>
                  k.e(889).then(() => () => k(4889)),
                ),
            }),
            (L = {
              199: [6240, 7569],
              284: [2680, 7644],
              412: [5412],
              478: [8478],
              784: [9784],
              983: [6983],
            }),
            (k.f.consumes = (a, b) => {
              k.o(L, a) &&
                L[a].forEach(a => {
                  if (k.o(J, a)) return b.push(J[a])
                  var c = b => {
                      ;(J[a] = 0),
                        (k.m[a] = c => {
                          delete k.c[a], (c.exports = b())
                        })
                    },
                    d = b => {
                      delete J[a],
                        (k.m[a] = () => {
                          throw (delete k.c[a], b)
                        })
                    }
                  try {
                    var e = K[a]()
                    e.then ? b.push((J[a] = e.then(c).catch(d))) : c(e)
                  } catch (a) {
                    d(a)
                  }
                })
            }),
            (() => {
              var b = {346: 0}
              k.f.j = (c, d) => {
                var e = k.o(b, c) ? b[c] : void 0
                if (0 !== e)
                  if (e) d.push(e[2])
                  else if (/^(199|412|478|784|983)$/.test(c)) b[c] = 0
                  else {
                    var f = new Promise((a, d) => (e = b[c] = [a, d]))
                    d.push((e[2] = f))
                    var g = k.p + k.u(c),
                      h = new Error()
                    k.l(
                      g,
                      d => {
                        if (
                          k.o(b, c) &&
                          (0 !== (e = b[c]) && (b[c] = void 0), e)
                        ) {
                          var f = d && ('load' === d.type ? 'missing' : d.type),
                            g = d && d.target && d.target.src
                          ;(h.message =
                            'Loading chunk ' +
                            c +
                            ' failed.\n(' +
                            f +
                            ': ' +
                            g +
                            ')'),
                            (h.name = 'ChunkLoadError'),
                            (h.type = f),
                            (h.request = g),
                            e[1](h)
                        }
                      },
                      'chunk-' + c,
                      c,
                    )
                  }
              }
              var a = (c, d) => {
                  var e,
                    f,
                    [g, a, h] = d,
                    i = 0
                  if (g.some(a => 0 !== b[a])) {
                    for (e in a) k.o(a, e) && (k.m[e] = a[e])
                    h && h(k)
                  }
                  for (c && c(d); i < g.length; i++)
                    (f = g[i]), k.o(b, f) && b[f] && b[f][0](), (b[f] = 0)
                },
                c = (self.webpackChunk_openmrs_esm_implementer_tools_app =
                  self.webpackChunk_openmrs_esm_implementer_tools_app || [])
              c.forEach(a.bind(null, 0)),
                (c.push = a.bind(null, c.push.bind(c)))
            })(),
            k(8331),
            k(5387)
          )
        })(),
      )
    },
  }
})
