;(self.webpackChunk_openmrs_esm_implementer_tools_app =
  self.webpackChunk_openmrs_esm_implementer_tools_app || []).push([
  [1],
  [
    ,
    (t, e, n) => {
      var r = /^\s+|\s+$/g,
        o = /^[-+]0x[0-9a-f]+$/i,
        i = /^0b[01]+$/i,
        u = /^0o[0-7]+$/i,
        f = parseInt,
        c = 'object' == typeof n.g && n.g && n.g.Object === Object && n.g,
        a = 'object' == typeof self && self && self.Object === Object && self,
        s = c || a || Function('return this')(),
        p = Object.prototype.toString,
        l = Math.max,
        v = Math.min,
        m = function() {
          return s.Date.now()
        }
      function b(t) {
        var e = typeof t
        return !!t && ('object' == e || 'function' == e)
      }
      function y(t) {
        if ('number' == typeof t) return t
        if (
          (function(t) {
            return (
              'symbol' == typeof t ||
              ((function(t) {
                return !!t && 'object' == typeof t
              })(t) &&
                '[object Symbol]' == p.call(t))
            )
          })(t)
        )
          return NaN
        if (b(t)) {
          var e = 'function' == typeof t.valueOf ? t.valueOf() : t
          t = b(e) ? e + '' : e
        }
        if ('string' != typeof t) return 0 === t ? t : +t
        t = t.replace(r, '')
        var n = i.test(t)
        return n || u.test(t) ? f(t.slice(2), n ? 2 : 8) : o.test(t) ? NaN : +t
      }
      t.exports = function(t, e, n) {
        var r,
          o,
          i,
          u,
          f,
          c,
          a = 0,
          s = !1,
          p = !1,
          d = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function g(e) {
          var n = r,
            i = o
          return (r = o = void 0), (a = e), (u = t.apply(i, n))
        }
        function j(t) {
          return (a = t), (f = setTimeout(h, e)), s ? g(t) : u
        }
        function _(t) {
          var n = t - c
          return void 0 === c || n >= e || n < 0 || (p && t - a >= i)
        }
        function h() {
          var t = m()
          if (_(t)) return O(t)
          f = setTimeout(
            h,
            (function(t) {
              var n = e - (t - c)
              return p ? v(n, i - (t - a)) : n
            })(t),
          )
        }
        function O(t) {
          return (f = void 0), d && r ? g(t) : ((r = o = void 0), u)
        }
        function x() {
          var t = m(),
            n = _(t)
          if (((r = arguments), (o = this), (c = t), n)) {
            if (void 0 === f) return j(c)
            if (p) return (f = setTimeout(h, e)), g(c)
          }
          return void 0 === f && (f = setTimeout(h, e)), u
        }
        return (
          (e = y(e) || 0),
          b(n) &&
            ((s = !!n.leading),
            (i = (p = 'maxWait' in n) ? l(y(n.maxWait) || 0, e) : i),
            (d = 'trailing' in n ? !!n.trailing : d)),
          (x.cancel = function() {
            void 0 !== f && clearTimeout(f), (a = 0), (r = c = o = f = void 0)
          }),
          (x.flush = function() {
            return void 0 === f ? u : O(m())
          }),
          x
        )
      }
    },
  ],
])
