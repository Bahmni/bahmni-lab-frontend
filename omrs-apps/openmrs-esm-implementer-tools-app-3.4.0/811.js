'use strict'
;(self.webpackChunk_openmrs_esm_implementer_tools_app =
  self.webpackChunk_openmrs_esm_implementer_tools_app || []).push([
  [811],
  {
    8811: (e, n, r) => {
      r.r(n), r.d(n, {default: () => O})
      var t,
        o = r(6983),
        u = r.n(o),
        i = r(9784),
        a = r(7644),
        c = r(1004),
        l = r(1602),
        s = r.n(l),
        f = r(3114)
      function d(e, n) {
        ;(null == n || n > e.length) && (n = e.length)
        for (var r = 0, t = new Array(n); r < n; r++) t[r] = e[r]
        return t
      }
      function p(e, n, r, t, o, u, i) {
        try {
          var a = e[u](i),
            c = a.value
        } catch (e) {
          return void r(e)
        }
        a.done ? n(c) : Promise.resolve(c).then(t, o)
      }
      function m(e) {
        return function() {
          var n = this,
            r = arguments
          return new Promise(function(t, o) {
            var u = e.apply(n, r)
            function i(e) {
              p(u, t, o, i, a, 'next', e)
            }
            function a(e) {
              p(u, t, o, i, a, 'throw', e)
            }
            i(void 0)
          })
        }
      }
      function y(e) {
        return (
          (function(e) {
            if (Array.isArray(e)) return d(e)
          })(e) ||
          (function(e) {
            if (
              ('undefined' != typeof Symbol && null != e[Symbol.iterator]) ||
              null != e['@@iterator']
            )
              return Array.from(e)
          })(e) ||
          (function(e, n) {
            if (e) {
              if ('string' == typeof e) return d(e, n)
              var r = Object.prototype.toString.call(e).slice(8, -1)
              return (
                'Object' === r && e.constructor && (r = e.constructor.name),
                'Map' === r || 'Set' === r
                  ? Array.from(r)
                  : 'Arguments' === r ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                  ? d(e, n)
                  : void 0
              )
            }
          })(e) ||
          (function() {
            throw new TypeError(
              'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            )
          })()
        )
      }
      function v() {
        return b.apply(this, arguments)
      }
      function b() {
        return (b = m(
          s().mark(function e() {
            var n
            return s().wrap(
              function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.prev = 0), (e.next = 3), w()
                    case 3:
                      return (n = e.sent), e.abrupt('return', n.data.results)
                    case 7:
                      ;(e.prev = 7), (e.t0 = e.catch(0)), console.error(e.t0)
                    case 10:
                      return e.abrupt('return', [])
                    case 11:
                    case 'end':
                      return e.stop()
                  }
              },
              e,
              null,
              [[0, 7]],
            )
          }),
        )).apply(this, arguments)
      }
      function h(e, n) {
        var r,
          t = [],
          o = (function(e, n) {
            var r = Object.keys(e),
              t = n.map(function(e) {
                return e.uuid
              })
            return (0, f.Z)(r, t).map(function(n) {
              return {uuid: n, version: e[n]}
            })
          })(e.backendDependencies, n),
          u = (function(e, n) {
            return Object.keys(e)
              .map(function(n) {
                return {uuid: n, version: e[n]}
              })
              .filter(function(e) {
                return n.find(function(n) {
                  return e.uuid === n.uuid
                })
              })
          })(e.backendDependencies, n)
        return (
          (r = t).push.apply(
            r,
            y(
              o.map(function(e) {
                return {
                  name: e.uuid,
                  requiredVersion: e.version,
                  type: 'missing',
                }
              }),
            ).concat(
              y(
                u.map(function(e) {
                  var r = e.version,
                    t = (function(e, n) {
                      var r,
                        t,
                        o = e.uuid
                      return null !==
                        (t =
                          null ===
                            (r = n.find(function(e) {
                              return e.uuid == o
                            })) || void 0 === r
                            ? void 0
                            : r.version) && void 0 !== t
                        ? t
                        : ''
                    })(e, n)
                  return {
                    name: e.uuid,
                    requiredVersion: r,
                    installedVersion: t,
                    type: A(r, t),
                  }
                }),
              ),
            ),
          ),
          {name: e.moduleName, dependencies: t}
        )
      }
      function w() {
        return (0, a.openmrsFetch)(
          '/ws/rest/v1/module?v=custom:(uuid,version)',
          {method: 'GET'},
        )
      }
      function A(e, n) {
        return (0, a.isVersionSatisfied)(e, n) ? 'okay' : 'version-mismatch'
      }
      function g() {
        return (g = m(
          s().mark(function e() {
            var n, r, o
            return s().wrap(function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (t) {
                      e.next = 7
                      break
                    }
                    return (
                      (r = (null !== (n = window.installedModules) &&
                      void 0 !== n
                        ? n
                        : []
                      )
                        .filter(function(e) {
                          return e[1].backendDependencies
                        })
                        .map(function(e) {
                          return {
                            backendDependencies: e[1].backendDependencies,
                            moduleName: e[0],
                          }
                        })),
                      (e.next = 5),
                      v()
                    )
                  case 5:
                    ;(o = e.sent),
                      (t = r.map(function(e) {
                        return h(e, o)
                      }))
                  case 7:
                    return e.abrupt('return', t)
                  case 8:
                  case 'end':
                    return e.stop()
                }
            }, e)
          }),
        )).apply(this, arguments)
      }
      function k(e, n) {
        ;(null == n || n > e.length) && (n = e.length)
        for (var r = 0, t = new Array(n); r < n; r++) t[r] = e[r]
        return t
      }
      function S() {
        var e,
          n,
          r =
            ((e = (0, o.useState)([])),
            (n = 2),
            (function(e) {
              if (Array.isArray(e)) return e
            })(e) ||
              (function(e, n) {
                var r =
                  null == e
                    ? null
                    : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                      e['@@iterator']
                if (null != r) {
                  var t,
                    o,
                    u = [],
                    i = !0,
                    a = !1
                  try {
                    for (
                      r = r.call(e);
                      !(i = (t = r.next()).done) &&
                      (u.push(t.value), !n || u.length !== n);
                      i = !0
                    );
                  } catch (e) {
                    ;(a = !0), (o = e)
                  } finally {
                    try {
                      i || null == r.return || r.return()
                    } finally {
                      if (a) throw o
                    }
                  }
                  return u
                }
              })(e, n) ||
              (function(e, n) {
                if (e) {
                  if ('string' == typeof e) return k(e, n)
                  var r = Object.prototype.toString.call(e).slice(8, -1)
                  return (
                    'Object' === r && e.constructor && (r = e.constructor.name),
                    'Map' === r || 'Set' === r
                      ? Array.from(r)
                      : 'Arguments' === r ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                      ? k(e, n)
                      : void 0
                  )
                }
              })(e, n) ||
              (function() {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                )
              })()),
          t = r[0],
          u = r[1]
        return (
          (0, o.useEffect)(function() {
            ;(function() {
              return g.apply(this, arguments)
            })().then(u)
          }, []),
          t
        )
      }
      var E = r(2680)
      function I(e, n) {
        ;(null == n || n > e.length) && (n = e.length)
        for (var r = 0, t = new Array(n); r < n; r++) t[r] = e[r]
        return t
      }
      var j = u().lazy(function() {
          return Promise.all([r.e(350), r.e(769), r.e(478), r.e(475)]).then(
            r.bind(r, 9475),
          )
        }),
        x = u().lazy(function() {
          return Promise.all([r.e(350), r.e(412), r.e(478), r.e(280)]).then(
            r.bind(r, 8280),
          )
        })
      function _() {
        var e,
          n,
          r = S(),
          t =
            ((e = (0, o.useState)(!1)),
            (n = 2),
            (function(e) {
              if (Array.isArray(e)) return e
            })(e) ||
              (function(e, n) {
                var r =
                  null == e
                    ? null
                    : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                      e['@@iterator']
                if (null != r) {
                  var t,
                    o,
                    u = [],
                    i = !0,
                    a = !1
                  try {
                    for (
                      r = r.call(e);
                      !(i = (t = r.next()).done) &&
                      (u.push(t.value), !n || u.length !== n);
                      i = !0
                    );
                  } catch (e) {
                    ;(a = !0), (o = e)
                  } finally {
                    try {
                      i || null == r.return || r.return()
                    } finally {
                      if (a) throw o
                    }
                  }
                  return u
                }
              })(e, n) ||
              (function(e, n) {
                if (e) {
                  if ('string' == typeof e) return I(e, n)
                  var r = Object.prototype.toString.call(e).slice(8, -1)
                  return (
                    'Object' === r && e.constructor && (r = e.constructor.name),
                    'Map' === r || 'Set' === r
                      ? Array.from(r)
                      : 'Arguments' === r ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                      ? I(e, n)
                      : void 0
                  )
                }
              })(e, n) ||
              (function() {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                )
              })()),
          l = t[0],
          s = t[1],
          f = (0, E.useTranslation)().t
        ;(0, o.useEffect)(
          function() {
            s(function(e) {
              return (
                e ||
                (function(e) {
                  return e.some(function(e) {
                    return e.dependencies.some(function(e) {
                      return 'okay' !== e.type
                    })
                  })
                })(r)
              )
            })
          },
          [r],
        ),
          (0, o.useEffect)(
            function() {
              l &&
                (0, a.showNotification)({
                  description:
                    'Found modules with unresolved backend dependencies.',
                  action: u().createElement(
                    i.NotificationActionButton,
                    {onClick: c.XE},
                    f('view', 'View'),
                  ),
                  kind: 'error',
                })
            },
            [l],
          )
        var d = (0, a.useStore)(c.wT),
          p = d.isOpen,
          m = d.isUIEditorEnabled,
          y = d.openTabIndex
        return u().createElement(
          u().Fragment,
          null,
          p
            ? u().createElement(j, {
                close: c.zI,
                frontendModules: r,
                visibleTabIndex: y,
              })
            : null,
          m ? u().createElement(x, null) : null,
        )
      }
      function O() {
        return u().createElement(
          a.UserHasAccess,
          {privilege: 'coreapps.systemAdministration'},
          u().createElement(_, null),
        )
      }
    },
  },
])
