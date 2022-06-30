'use strict'
;(self.webpackChunk_openmrs_esm_implementer_tools_app =
  self.webpackChunk_openmrs_esm_implementer_tools_app || []).push([
  [280],
  {
    4790: (e, t, n) => {
      n.d(t, {Z: () => i})
      var o = n(8251),
        r = n(6983),
        l = n.n(r),
        a = l().createElement('path', {
          d:
            'M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z',
        })
      const i = l().forwardRef(function(e, t) {
        var n = e.children,
          r = (0, o._)(e, ['children'])
        return l().createElement(
          o.I,
          (0, o.a)(
            {
              width: 16,
              height: 16,
              viewBox: '0 0 32 32',
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'currentColor',
              ref: t,
            },
            r,
          ),
          a,
          n,
        )
      })
    },
    3539: (e, t, n) => {
      n.d(t, {Z: () => l})
      var o = n(361),
        r = n.n(o)()(function(e) {
          return e[1]
        })
      r.push([
        e.id,
        '.-esm-implementer-tools__styles__slotOverlay___0dSua {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(43, 43, 185, 0.1);\n  border: 1px solid rgba(43, 43, 185, 0.4);\n  pointer-events: none;\n}\n\n.-esm-implementer-tools__styles__slotName___gwNsi {\n  background-color: rgb(255, 255, 255, 0.85);\n  border: 1px solid rgba(43, 43, 185, 0.4);\n  color: #393939;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  padding: 0.5em 0.5em 0.5em 0.5em;\n  pointer-events: none;\n}\n\n.-esm-implementer-tools__styles__extensionOverlay___EKzCd {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: none;\n  border: none;\n}\n\n.-esm-implementer-tools__styles__extensionOverlay___EKzCd:hover {\n  background-color: rgba(43, 43, 185, 0.1);\n}\n\n/* Show the tooltip text when you mouse over the tooltip container */\n.-esm-implementer-tools__styles__extensionOverlay___EKzCd:focus .-esm-implementer-tools__styles__extensionTooltip___QVban,\n.-esm-implementer-tools__styles__extensionOverlay___EKzCd:hover .-esm-implementer-tools__styles__extensionTooltip___QVban {\n  visibility: visible;\n  opacity: 1;\n}\n\n.-esm-implementer-tools__styles__extensionTooltip___QVban {\n  visibility: hidden;\n  width: auto;\n  background-color: rgb(255, 255, 255, 0.85);\n  text-align: center;\n  padding: 0.5em 0.5em 0.5em 0.5em;\n  border: 1px solid rgba(43, 43, 185, 0.4);\n\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.-esm-implementer-tools__styles__exitButton___VWj92 {\n  position: fixed !important;\n  bottom: 0;\n  right: 0;\n  z-index: 999999;\n}\n',
        '',
      ]),
        (r.locals = {
          slotOverlay: '-esm-implementer-tools__styles__slotOverlay___0dSua',
          slotName: '-esm-implementer-tools__styles__slotName___gwNsi',
          extensionOverlay:
            '-esm-implementer-tools__styles__extensionOverlay___EKzCd',
          extensionTooltip:
            '-esm-implementer-tools__styles__extensionTooltip___QVban',
          exitButton: '-esm-implementer-tools__styles__exitButton___VWj92',
        })
      const l = r
    },
    8280: (e, t, n) => {
      n.r(t),
        n.d(t, {ExitButton: () => B, SlotOverlay: () => T, default: () => C})
      var o = n(6983),
        r = n.n(o),
        l = n(487),
        a = n.n(l),
        i = n(631),
        s = n.n(i),
        m = n(2052),
        c = n.n(m),
        u = n(4010),
        _ = n.n(u),
        d = n(1469),
        p = n.n(d),
        y = n(9329),
        f = n.n(y),
        v = n(3539),
        b = {}
      ;(b.styleTagTransform = f()),
        (b.setAttributes = _()),
        (b.insert = c().bind(null, 'head')),
        (b.domAPI = s()),
        (b.insertStyleElement = p()),
        a()(v.Z, b)
      const h = v.Z && v.Z.locals ? v.Z.locals : void 0
      var g = n(4790),
        x = n(8478),
        E = n(9784),
        w = n(5412)
      function O(e) {
        var t = e.el,
          n = e.children
        return t ? (0, w.createPortal)(n, t) : null
      }
      function S(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n]
        return o
      }
      function N(e) {
        var t,
          n,
          l = e.extensionName,
          a = e.slotModuleName,
          i = e.slotName,
          s = e.domElement,
          m =
            ((t = (0, o.useState)()),
            (n = 2),
            (function(e) {
              if (Array.isArray(e)) return e
            })(t) ||
              (function(e, t) {
                var n =
                  null == e
                    ? null
                    : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                      e['@@iterator']
                if (null != n) {
                  var o,
                    r,
                    l = [],
                    a = !0,
                    i = !1
                  try {
                    for (
                      n = n.call(e);
                      !(a = (o = n.next()).done) &&
                      (l.push(o.value), !t || l.length !== t);
                      a = !0
                    );
                  } catch (e) {
                    ;(i = !0), (r = e)
                  } finally {
                    try {
                      a || null == n.return || n.return()
                    } finally {
                      if (i) throw r
                    }
                  }
                  return l
                }
              })(t, n) ||
              (function(e, t) {
                if (e) {
                  if ('string' == typeof e) return S(e, t)
                  var n = Object.prototype.toString.call(e).slice(8, -1)
                  return (
                    'Object' === n && e.constructor && (n = e.constructor.name),
                    'Map' === n || 'Set' === n
                      ? Array.from(n)
                      : 'Arguments' === n ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                      ? S(e, t)
                      : void 0
                  )
                }
              })(t, n) ||
              (function() {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                )
              })()),
          c = m[0],
          u = m[1]
        return (
          (0, o.useEffect)(
            function() {
              if (s) {
                var e,
                  t = document.createElement('div')
                null === (e = s.parentElement) ||
                  void 0 === e ||
                  e.appendChild(t),
                  u(t)
              }
            },
            [s],
          ),
          c
            ? r().createElement(
                O,
                {
                  key: 'extension-overlay-'
                    .concat(a, '-')
                    .concat(i, '-')
                    .concat(l),
                  el: c,
                },
                r().createElement(I, {extensionId: l}),
              )
            : null
        )
      }
      function I(e) {
        var t = e.extensionId
        return r().createElement(
          'button',
          {className: h.extensionOverlay},
          r().createElement('span', {className: h.extensionTooltip}, t),
        )
      }
      var A = n(1004)
      function k(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n]
        return o
      }
      function j(e, t) {
        return (
          (function(e) {
            if (Array.isArray(e)) return e
          })(e) ||
          (function(e, t) {
            var n =
              null == e
                ? null
                : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                  e['@@iterator']
            if (null != n) {
              var o,
                r,
                l = [],
                a = !0,
                i = !1
              try {
                for (
                  n = n.call(e);
                  !(a = (o = n.next()).done) &&
                  (l.push(o.value), !t || l.length !== t);
                  a = !0
                );
              } catch (e) {
                ;(i = !0), (r = e)
              } finally {
                try {
                  a || null == n.return || n.return()
                } finally {
                  if (i) throw r
                }
              }
              return l
            }
          })(e, t) ||
          (function(e, t) {
            if (e) {
              if ('string' == typeof e) return k(e, t)
              var n = Object.prototype.toString.call(e).slice(8, -1)
              return (
                'Object' === n && e.constructor && (n = e.constructor.name),
                'Map' === n || 'Set' === n
                  ? Array.from(n)
                  : 'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? k(e, t)
                  : void 0
              )
            }
          })(e, t) ||
          (function() {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            )
          })()
        )
      }
      function C() {
        var e = (0, x.useStore)((0, x.getExtensionInternalStore)()),
          t = e.slots,
          n = e.extensions,
          o = (0, x.useStore)(A.wT).isOpen
        return r().createElement(
          r().Fragment,
          null,
          o ? null : r().createElement(B, null),
          t
            ? Object.entries(t).map(function(e) {
                var t = j(e, 2),
                  n = t[0],
                  o = t[1]
                return r().createElement(
                  O,
                  {
                    key: 'slot-overlay-'.concat(o.moduleName, '-').concat(n),
                    el: document.querySelector(
                      '*[data-extension-slot-name="'
                        .concat(n, '"][data-extension-slot-module-name="')
                        .concat(o.moduleName, '"]'),
                    ),
                  },
                  r().createElement(T, {slotName: n}),
                )
              })
            : null,
          n
            ? Object.entries(n).map(function(e) {
                var t = j(e, 2),
                  n = t[0],
                  o = t[1]
                return Object.entries(o.instances).map(function(e) {
                  var t = j(e, 2),
                    o = t[0],
                    l = t[1]
                  return Object.entries(l).map(function(e) {
                    var t = j(e, 2),
                      l = t[0],
                      a = t[1]
                    return r().createElement(N, {
                      key: l,
                      extensionName: n,
                      slotModuleName: o,
                      slotName: l,
                      domElement: document.querySelector(
                        '*[data-extension-slot-name="'
                          .concat(l, '"][data-extension-slot-module-name="')
                          .concat(o, '"] *[data-extension-id="')
                          .concat(a.id, '"]'),
                      ),
                    })
                  })
                })
              })
            : null,
        )
      }
      function T(e) {
        var t = e.slotName
        return r().createElement(
          r().Fragment,
          null,
          r().createElement('div', {className: h.slotOverlay}),
          r().createElement('div', {className: h.slotName}, t),
        )
      }
      var z = {
        toggleIsUIEditorEnabled: function(e) {
          return {isUIEditorEnabled: !e.isUIEditorEnabled}
        },
      }
      function B() {
        var e = (0, x.useStoreWithActions)(A.wT, z).toggleIsUIEditorEnabled
        return r().createElement(E.Button, {
          className: h.exitButton,
          kind: 'danger',
          size: 'sm',
          renderIcon: g.Z,
          iconDescription: 'Exit UI Editor',
          tooltipPosition: 'left',
          onClick: e,
          hasIconOnly: !0,
        })
      }
    },
  },
])
