;(self.webpackChunk_openmrs_esm_implementer_tools_app =
  self.webpackChunk_openmrs_esm_implementer_tools_app || []).push([
  [284],
  {
    1284: (e, n, t) => {
      'use strict'
      t.r(n),
        t.d(n, {
          ConfigEditButton: () => a,
          importTranslation: () => c,
          setupOpenMRS: () => p,
        })
      var o = t(7644),
        r = t(6983),
        i = t.n(r),
        s = t(1004),
        l = t(2680)
      function a(e) {
        var n = e.configPath,
          t = (0, l.useTranslation)().t
        return i().createElement(
          'button',
          {
            onClick: function() {
              s.wT.setState({configPathBeingEdited: n})
            },
          },
          t('edit', 'Edit'),
        )
      }
      function p() {
        var e = {
          featureName: 'Implementer Tools',
          moduleName: '@openmrs/esm-implementer-tools-app',
        }
        return {
          pages: [
            {
              route: function() {
                return !0
              },
              load: (0, o.getAsyncLifecycle)(function() {
                return Promise.all([t.e(458), t.e(784), t.e(811)]).then(
                  t.bind(t, 8811),
                )
              }, e),
            },
          ],
          extensions: [
            {
              name: 'implementer-tools-button',
              slot: 'top-nav-actions-slot',
              load: (0, o.getAsyncLifecycle)(function() {
                return Promise.all([t.e(350), t.e(784), t.e(105)]).then(
                  t.bind(t, 4105),
                )
              }, e),
            },
          ],
        }
      }
      var c = t(3979)
    },
    1004: (e, n, t) => {
      'use strict'
      function o(e, n, t) {
        return (
          n in e
            ? Object.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[n] = t),
          e
        )
      }
      function r(e) {
        for (var n = 1; n < arguments.length; n++) {
          var t = null != arguments[n] ? arguments[n] : {},
            r = Object.keys(t)
          'function' == typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(t).filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
              }),
            )),
            r.forEach(function(n) {
              o(e, n, t[n])
            })
        }
        return e
      }
      t.d(n, {XE: () => l, wT: () => i, zI: () => s})
      var i = (0, t(7644).createGlobalStore)('implementer-tools', {
          activeItemDescription: void 0,
          configPathBeingEdited: null,
          isOpen: m(),
          hasAlert: !1,
          openTabIndex: 0,
          isConfigToolbarOpen: f(),
          isUIEditorEnabled: d(),
          isJsonModeEnabled: b(),
        }),
        s =
          (i.action(function(e, n) {
            return r({}, e, {hasAlert: n})
          }),
          i.action(function(e) {
            return r({}, e, {isOpen: !e.isOpen})
          })),
        l = i.action(function(e) {
          return r({}, e, {isOpen: !0, openTabIndex: 1})
        }),
        a = m(),
        p = f(),
        c = d(),
        u = b()
      function m() {
        var e
        return (
          null !==
            (e = JSON.parse(
              localStorage.getItem('openmrs:openmrsImplementerToolsAreOpen') ||
                'false',
            )) &&
          void 0 !== e &&
          e
        )
      }
      function f() {
        var e
        return (
          null ===
            (e = JSON.parse(
              localStorage.getItem(
                'openmrs:openmrsImplementerToolsConfigOpen',
              ) || 'true',
            )) ||
          void 0 === e ||
          e
        )
      }
      function d() {
        var e
        return (
          null !==
            (e = JSON.parse(
              localStorage.getItem('openmrs:isUIEditorEnabled') || 'false',
            )) &&
          void 0 !== e &&
          e
        )
      }
      function b() {
        var e
        return (
          null !==
            (e = JSON.parse(
              localStorage.getItem('openmrs:getIsJsonModeEnabled') || 'false',
            )) &&
          void 0 !== e &&
          e
        )
      }
      i.subscribe(function(e) {
        var n, t
        e.isOpen != a &&
          ((n = e.isOpen),
          localStorage.setItem(
            'openmrs:openmrsImplementerToolsAreOpen',
            JSON.stringify(n),
          ),
          (a = e.isOpen)),
          e.isUIEditorEnabled != c &&
            ((t = e.isUIEditorEnabled),
            localStorage.setItem(
              'openmrs:isUIEditorEnabled',
              JSON.stringify(t),
            ),
            (c = e.isUIEditorEnabled)),
          e.isConfigToolbarOpen != p &&
            ((function(e) {
              localStorage.setItem(
                'openmrs:openmrsImplementerToolsConfigOpen',
                JSON.stringify(e),
              )
            })(e.isConfigToolbarOpen),
            (p = e.isConfigToolbarOpen)),
          e.isJsonModeEnabled != u &&
            ((function(e) {
              localStorage.setItem(
                'openmrs:getIsJsonModeEnabled',
                JSON.stringify(e),
              )
            })(e.isJsonModeEnabled),
            (u = e.isJsonModeEnabled))
      })
    },
    3979: (e, n, t) => {
      var o = {'./en.json': [3574, 574], './es.json': [8319, 319]}
      function r(e) {
        if (!t.o(o, e))
          return Promise.resolve().then(() => {
            var n = new Error("Cannot find module '" + e + "'")
            throw ((n.code = 'MODULE_NOT_FOUND'), n)
          })
        var n = o[e],
          r = n[0]
        return t.e(n[1]).then(() => t(r))
      }
      ;(r.keys = () => Object.keys(o)), (r.id = 3979), (e.exports = r)
    },
  },
])
