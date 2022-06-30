'use strict'
;(self.webpackChunk_openmrs_esm_implementer_tools_app =
  self.webpackChunk_openmrs_esm_implementer_tools_app || []).push([
  [531],
  {
    1766: (e, t, n) => {
      n.d(t, {Z: () => l})
      var r = n(361),
        o = n.n(r)()(function(e) {
          return e[1]
        })
      o.push([
        e.id,
        '.-esm-implementer-tools__json-editor__toolbar___VYRpX{display:flex}.-esm-implementer-tools__json-editor__alert___FAFMa{color:#fff;display:flex;align-items:center;width:100%;padding-left:2em}',
        '',
      ]),
        (o.locals = {
          toolbar: '-esm-implementer-tools__json-editor__toolbar___VYRpX',
          alert: '-esm-implementer-tools__json-editor__alert___FAFMa',
        })
      const l = o
    },
    8531: (e, t, n) => {
      n.r(t), n.d(t, {default: () => j})
      var r = n(6983),
        o = n.n(r),
        l = n(8478),
        a = n(7520),
        i = n(487),
        s = n.n(i),
        u = n(631),
        c = n.n(u),
        m = n(2052),
        f = n.n(m),
        _ = n(4010),
        d = n.n(_),
        p = n(1469),
        y = n.n(p),
        h = n(9329),
        g = n.n(h),
        b = n(1766),
        v = {}
      ;(v.styleTagTransform = g()),
        (v.setAttributes = d()),
        (v.insert = f().bind(null, 'head')),
        (v.domAPI = c()),
        (v.insertStyleElement = y()),
        s()(b.Z, v)
      const S = b.Z && b.Z.locals ? b.Z.locals : void 0
      n(189), n(5793)
      var A = n(9784)
      function C(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
        return r
      }
      function w(e, t) {
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
              var r,
                o,
                l = [],
                a = !0,
                i = !1
              try {
                for (
                  n = n.call(e);
                  !(a = (r = n.next()).done) &&
                  (l.push(r.value), !t || l.length !== t);
                  a = !0
                );
              } catch (e) {
                ;(i = !0), (o = e)
              } finally {
                try {
                  a || null == n.return || n.return()
                } finally {
                  if (i) throw o
                }
              }
              return l
            }
          })(e, t) ||
          (function(e, t) {
            if (e) {
              if ('string' == typeof e) return C(e, t)
              var n = Object.prototype.toString.call(e).slice(8, -1)
              return (
                'Object' === n && e.constructor && (n = e.constructor.name),
                'Map' === n || 'Set' === n
                  ? Array.from(n)
                  : 'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? C(e, t)
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
      function j(e) {
        var t = e.height,
          n = (0, l.useStore)(l.temporaryConfigStore),
          i = w((0, r.useState)(''), 2),
          s = i[0],
          u = i[1],
          c = w((0, r.useState)(''), 2),
          m = c[0],
          f = c[1],
          _ = w((0, r.useState)('ace-editor'), 2),
          d = _[0],
          p = _[1],
          y = (0, r.useCallback)(
            function() {
              var e
              try {
                e = JSON.parse(s)
              } catch (e) {
                return void f(e.message)
              }
              f(''), l.temporaryConfigStore.setState({config: e})
            },
            [s, l.temporaryConfigStore],
          )
        return (
          (0, r.useEffect)(
            function() {
              s != JSON.stringify(n.config, null, 2) &&
                p(function(e) {
                  return ''.concat(e, '+')
                })
            },
            [n.config],
          ),
          o().createElement(
            'div',
            null,
            o().createElement(a.ZP, {
              key: d,
              mode: 'json',
              theme: 'github',
              defaultValue: JSON.stringify(n.config, null, 2),
              tabSize: 2,
              fontSize: '12pt',
              width: '100vw',
              height: 'calc('.concat(t, ' - 3rem)'),
              onChange: function(e) {
                u(e)
              },
            }),
            o().createElement(
              'div',
              {className: S.toolbar},
              o().createElement(
                A.Button,
                {type: 'submit', onClick: y},
                'Update',
              ),
              o().createElement(
                'div',
                {
                  className: S.alert,
                  style: {backgroundColor: m ? '#d03030' : 'inherit'},
                },
                m,
              ),
            ),
          )
        )
      }
    },
  },
])
