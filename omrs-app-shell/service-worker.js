;(() => {
  var e = {
      982: function(e) {
        e.exports = (function() {
          'use strict'
          var e = 6e4,
            t = 36e5,
            n = 'millisecond',
            r = 'second',
            i = 'minute',
            o = 'hour',
            s = 'day',
            a = 'week',
            u = 'month',
            c = 'quarter',
            l = 'year',
            h = 'date',
            f = 'Invalid Date',
            d = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
            p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
            g = {
              name: 'en',
              weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
                '_',
              ),
              months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                '_',
              ),
            },
            y = function(e, t, n) {
              var r = String(e)
              return !r || r.length >= t
                ? e
                : '' + Array(t + 1 - r.length).join(n) + e
            },
            v = {
              s: y,
              z: function(e) {
                var t = -e.utcOffset(),
                  n = Math.abs(t),
                  r = Math.floor(n / 60),
                  i = n % 60
                return (t <= 0 ? '+' : '-') + y(r, 2, '0') + ':' + y(i, 2, '0')
              },
              m: function e(t, n) {
                if (t.date() < n.date()) return -e(n, t)
                var r = 12 * (n.year() - t.year()) + (n.month() - t.month()),
                  i = t.clone().add(r, u),
                  o = n - i < 0,
                  s = t.clone().add(r + (o ? -1 : 1), u)
                return +(-(r + (n - i) / (o ? i - s : s - i)) || 0)
              },
              a: function(e) {
                return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
              },
              p: function(e) {
                return (
                  {M: u, y: l, w: a, d: s, D: h, h: o, m: i, s: r, ms: n, Q: c}[
                    e
                  ] ||
                  String(e || '')
                    .toLowerCase()
                    .replace(/s$/, '')
                )
              },
              u: function(e) {
                return void 0 === e
              },
            },
            m = 'en',
            b = {}
          b[m] = g
          var w = function(e) {
              return e instanceof S
            },
            _ = function e(t, n, r) {
              var i
              if (!t) return m
              if ('string' == typeof t) {
                var o = t.toLowerCase()
                b[o] && (i = o), n && ((b[o] = n), (i = o))
                var s = t.split('-')
                if (!i && s.length > 1) return e(s[0])
              } else {
                var a = t.name
                ;(b[a] = t), (i = a)
              }
              return !r && i && (m = i), i || (!r && m)
            },
            k = function(e, t) {
              if (w(e)) return e.clone()
              var n = 'object' == typeof t ? t : {}
              return (n.date = e), (n.args = arguments), new S(n)
            },
            x = v
          ;(x.l = _),
            (x.i = w),
            (x.w = function(e, t) {
              return k(e, {
                locale: t.$L,
                utc: t.$u,
                x: t.$x,
                $offset: t.$offset,
              })
            })
          var S = (function() {
              function g(e) {
                ;(this.$L = _(e.locale, null, !0)), this.parse(e)
              }
              var y = g.prototype
              return (
                (y.parse = function(e) {
                  ;(this.$d = (function(e) {
                    var t = e.date,
                      n = e.utc
                    if (null === t) return new Date(NaN)
                    if (x.u(t)) return new Date()
                    if (t instanceof Date) return new Date(t)
                    if ('string' == typeof t && !/Z$/i.test(t)) {
                      var r = t.match(d)
                      if (r) {
                        var i = r[2] - 1 || 0,
                          o = (r[7] || '0').substring(0, 3)
                        return n
                          ? new Date(
                              Date.UTC(
                                r[1],
                                i,
                                r[3] || 1,
                                r[4] || 0,
                                r[5] || 0,
                                r[6] || 0,
                                o,
                              ),
                            )
                          : new Date(
                              r[1],
                              i,
                              r[3] || 1,
                              r[4] || 0,
                              r[5] || 0,
                              r[6] || 0,
                              o,
                            )
                      }
                    }
                    return new Date(t)
                  })(e)),
                    (this.$x = e.x || {}),
                    this.init()
                }),
                (y.init = function() {
                  var e = this.$d
                  ;(this.$y = e.getFullYear()),
                    (this.$M = e.getMonth()),
                    (this.$D = e.getDate()),
                    (this.$W = e.getDay()),
                    (this.$H = e.getHours()),
                    (this.$m = e.getMinutes()),
                    (this.$s = e.getSeconds()),
                    (this.$ms = e.getMilliseconds())
                }),
                (y.$utils = function() {
                  return x
                }),
                (y.isValid = function() {
                  return !(this.$d.toString() === f)
                }),
                (y.isSame = function(e, t) {
                  var n = k(e)
                  return this.startOf(t) <= n && n <= this.endOf(t)
                }),
                (y.isAfter = function(e, t) {
                  return k(e) < this.startOf(t)
                }),
                (y.isBefore = function(e, t) {
                  return this.endOf(t) < k(e)
                }),
                (y.$g = function(e, t, n) {
                  return x.u(e) ? this[t] : this.set(n, e)
                }),
                (y.unix = function() {
                  return Math.floor(this.valueOf() / 1e3)
                }),
                (y.valueOf = function() {
                  return this.$d.getTime()
                }),
                (y.startOf = function(e, t) {
                  var n = this,
                    c = !!x.u(t) || t,
                    f = x.p(e),
                    d = function(e, t) {
                      var r = x.w(
                        n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e),
                        n,
                      )
                      return c ? r : r.endOf(s)
                    },
                    p = function(e, t) {
                      return x.w(
                        n
                          .toDate()
                          [e].apply(
                            n.toDate('s'),
                            (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t),
                          ),
                        n,
                      )
                    },
                    g = this.$W,
                    y = this.$M,
                    v = this.$D,
                    m = 'set' + (this.$u ? 'UTC' : '')
                  switch (f) {
                    case l:
                      return c ? d(1, 0) : d(31, 11)
                    case u:
                      return c ? d(1, y) : d(0, y + 1)
                    case a:
                      var b = this.$locale().weekStart || 0,
                        w = (g < b ? g + 7 : g) - b
                      return d(c ? v - w : v + (6 - w), y)
                    case s:
                    case h:
                      return p(m + 'Hours', 0)
                    case o:
                      return p(m + 'Minutes', 1)
                    case i:
                      return p(m + 'Seconds', 2)
                    case r:
                      return p(m + 'Milliseconds', 3)
                    default:
                      return this.clone()
                  }
                }),
                (y.endOf = function(e) {
                  return this.startOf(e, !1)
                }),
                (y.$set = function(e, t) {
                  var a,
                    c = x.p(e),
                    f = 'set' + (this.$u ? 'UTC' : ''),
                    d = ((a = {}),
                    (a[s] = f + 'Date'),
                    (a[h] = f + 'Date'),
                    (a[u] = f + 'Month'),
                    (a[l] = f + 'FullYear'),
                    (a[o] = f + 'Hours'),
                    (a[i] = f + 'Minutes'),
                    (a[r] = f + 'Seconds'),
                    (a[n] = f + 'Milliseconds'),
                    a)[c],
                    p = c === s ? this.$D + (t - this.$W) : t
                  if (c === u || c === l) {
                    var g = this.clone().set(h, 1)
                    g.$d[d](p),
                      g.init(),
                      (this.$d = g.set(
                        h,
                        Math.min(this.$D, g.daysInMonth()),
                      ).$d)
                  } else d && this.$d[d](p)
                  return this.init(), this
                }),
                (y.set = function(e, t) {
                  return this.clone().$set(e, t)
                }),
                (y.get = function(e) {
                  return this[x.p(e)]()
                }),
                (y.add = function(n, c) {
                  var h,
                    f = this
                  n = Number(n)
                  var d = x.p(c),
                    p = function(e) {
                      var t = k(f)
                      return x.w(t.date(t.date() + Math.round(e * n)), f)
                    }
                  if (d === u) return this.set(u, this.$M + n)
                  if (d === l) return this.set(l, this.$y + n)
                  if (d === s) return p(1)
                  if (d === a) return p(7)
                  var g =
                      ((h = {}), (h[i] = e), (h[o] = t), (h[r] = 1e3), h)[d] ||
                      1,
                    y = this.$d.getTime() + n * g
                  return x.w(y, this)
                }),
                (y.subtract = function(e, t) {
                  return this.add(-1 * e, t)
                }),
                (y.format = function(e) {
                  var t = this,
                    n = this.$locale()
                  if (!this.isValid()) return n.invalidDate || f
                  var r = e || 'YYYY-MM-DDTHH:mm:ssZ',
                    i = x.z(this),
                    o = this.$H,
                    s = this.$m,
                    a = this.$M,
                    u = n.weekdays,
                    c = n.months,
                    l = function(e, n, i, o) {
                      return (e && (e[n] || e(t, r))) || i[n].substr(0, o)
                    },
                    h = function(e) {
                      return x.s(o % 12 || 12, e, '0')
                    },
                    d =
                      n.meridiem ||
                      function(e, t, n) {
                        var r = e < 12 ? 'AM' : 'PM'
                        return n ? r.toLowerCase() : r
                      },
                    g = {
                      YY: String(this.$y).slice(-2),
                      YYYY: this.$y,
                      M: a + 1,
                      MM: x.s(a + 1, 2, '0'),
                      MMM: l(n.monthsShort, a, c, 3),
                      MMMM: l(c, a),
                      D: this.$D,
                      DD: x.s(this.$D, 2, '0'),
                      d: String(this.$W),
                      dd: l(n.weekdaysMin, this.$W, u, 2),
                      ddd: l(n.weekdaysShort, this.$W, u, 3),
                      dddd: u[this.$W],
                      H: String(o),
                      HH: x.s(o, 2, '0'),
                      h: h(1),
                      hh: h(2),
                      a: d(o, s, !0),
                      A: d(o, s, !1),
                      m: String(s),
                      mm: x.s(s, 2, '0'),
                      s: String(this.$s),
                      ss: x.s(this.$s, 2, '0'),
                      SSS: x.s(this.$ms, 3, '0'),
                      Z: i,
                    }
                  return r.replace(p, function(e, t) {
                    return t || g[e] || i.replace(':', '')
                  })
                }),
                (y.utcOffset = function() {
                  return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                }),
                (y.diff = function(n, h, f) {
                  var d,
                    p = x.p(h),
                    g = k(n),
                    y = (g.utcOffset() - this.utcOffset()) * e,
                    v = this - g,
                    m = x.m(this, g)
                  return (
                    (m =
                      ((d = {}),
                      (d[l] = m / 12),
                      (d[u] = m),
                      (d[c] = m / 3),
                      (d[a] = (v - y) / 6048e5),
                      (d[s] = (v - y) / 864e5),
                      (d[o] = v / t),
                      (d[i] = v / e),
                      (d[r] = v / 1e3),
                      d)[p] || v),
                    f ? m : x.a(m)
                  )
                }),
                (y.daysInMonth = function() {
                  return this.endOf(u).$D
                }),
                (y.$locale = function() {
                  return b[this.$L]
                }),
                (y.locale = function(e, t) {
                  if (!e) return this.$L
                  var n = this.clone(),
                    r = _(e, t, !0)
                  return r && (n.$L = r), n
                }),
                (y.clone = function() {
                  return x.w(this.$d, this)
                }),
                (y.toDate = function() {
                  return new Date(this.valueOf())
                }),
                (y.toJSON = function() {
                  return this.isValid() ? this.toISOString() : null
                }),
                (y.toISOString = function() {
                  return this.$d.toISOString()
                }),
                (y.toString = function() {
                  return this.$d.toUTCString()
                }),
                g
              )
            })(),
            O = S.prototype
          return (
            (k.prototype = O),
            [
              ['$ms', n],
              ['$s', r],
              ['$m', i],
              ['$H', o],
              ['$W', s],
              ['$M', u],
              ['$y', l],
              ['$D', h],
            ].forEach(function(e) {
              O[e[1]] = function(t) {
                return this.$g(t, e[0], e[1])
              }
            }),
            (k.extend = function(e, t) {
              return e.$i || (e(t, S, k), (e.$i = !0)), k
            }),
            (k.locale = _),
            (k.isDayjs = w),
            (k.unix = function(e) {
              return k(1e3 * e)
            }),
            (k.en = b[m]),
            (k.Ls = b),
            (k.p = {}),
            k
          )
        })()
      },
      240: (e, t, n) => {
        'use strict'
        function r(e) {
          return (
            (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function(e) {
                    return typeof e
                  }
                : function(e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e
                  }),
            r(e)
          )
        }
        function i(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          )
        }
        function o(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? Object(arguments[t]) : {},
              r = Object.keys(n)
            'function' == typeof Object.getOwnPropertySymbols &&
              r.push.apply(
                r,
                Object.getOwnPropertySymbols(n).filter(function(e) {
                  return Object.getOwnPropertyDescriptor(n, e).enumerable
                }),
              ),
              r.forEach(function(t) {
                i(e, t, n[t])
              })
          }
          return e
        }
        function s(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        }
        function a(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n]
            ;(r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              'value' in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r)
          }
        }
        function u(e, t, n) {
          return (
            t && a(e.prototype, t),
            n && a(e, n),
            Object.defineProperty(e, 'prototype', {writable: !1}),
            e
          )
        }
        function c(e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called",
            )
          return e
        }
        function l(e, t) {
          if (t && ('object' === r(t) || 'function' == typeof t)) return t
          if (void 0 !== t)
            throw new TypeError(
              'Derived constructors may only return object or undefined',
            )
          return c(e)
        }
        function h(e) {
          return (
            (h = Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function(e) {
                  return e.__proto__ || Object.getPrototypeOf(e)
                }),
            h(e)
          )
        }
        function f(e, t) {
          return (
            (f =
              Object.setPrototypeOf ||
              function(e, t) {
                return (e.__proto__ = t), e
              }),
            f(e, t)
          )
        }
        function d(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function',
            )
          ;(e.prototype = Object.create(t && t.prototype, {
            constructor: {value: e, writable: !0, configurable: !0},
          })),
            Object.defineProperty(e, 'prototype', {writable: !1}),
            t && f(e, t)
        }
        n.r(t), n.d(t, {default: () => W})
        var p = {
            type: 'logger',
            log: function(e) {
              this.output('log', e)
            },
            warn: function(e) {
              this.output('warn', e)
            },
            error: function(e) {
              this.output('error', e)
            },
            output: function(e, t) {
              console && console[e] && console[e].apply(console, t)
            },
          },
          g = new ((function() {
            function e(t) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {}
              s(this, e), this.init(t, n)
            }
            return (
              u(e, [
                {
                  key: 'init',
                  value: function(e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {}
                    ;(this.prefix = t.prefix || 'i18next:'),
                      (this.logger = e || p),
                      (this.options = t),
                      (this.debug = t.debug)
                  },
                },
                {
                  key: 'setDebug',
                  value: function(e) {
                    this.debug = e
                  },
                },
                {
                  key: 'log',
                  value: function() {
                    for (
                      var e = arguments.length, t = new Array(e), n = 0;
                      n < e;
                      n++
                    )
                      t[n] = arguments[n]
                    return this.forward(t, 'log', '', !0)
                  },
                },
                {
                  key: 'warn',
                  value: function() {
                    for (
                      var e = arguments.length, t = new Array(e), n = 0;
                      n < e;
                      n++
                    )
                      t[n] = arguments[n]
                    return this.forward(t, 'warn', '', !0)
                  },
                },
                {
                  key: 'error',
                  value: function() {
                    for (
                      var e = arguments.length, t = new Array(e), n = 0;
                      n < e;
                      n++
                    )
                      t[n] = arguments[n]
                    return this.forward(t, 'error', '')
                  },
                },
                {
                  key: 'deprecate',
                  value: function() {
                    for (
                      var e = arguments.length, t = new Array(e), n = 0;
                      n < e;
                      n++
                    )
                      t[n] = arguments[n]
                    return this.forward(t, 'warn', 'WARNING DEPRECATED: ', !0)
                  },
                },
                {
                  key: 'forward',
                  value: function(e, t, n, r) {
                    return r && !this.debug
                      ? null
                      : ('string' == typeof e[0] &&
                          (e[0] = ''
                            .concat(n)
                            .concat(this.prefix, ' ')
                            .concat(e[0])),
                        this.logger[t](e))
                  },
                },
                {
                  key: 'create',
                  value: function(t) {
                    return new e(
                      this.logger,
                      o(
                        {},
                        {prefix: ''.concat(this.prefix, ':').concat(t, ':')},
                        this.options,
                      ),
                    )
                  },
                },
              ]),
              e
            )
          })())(),
          y = (function() {
            function e() {
              s(this, e), (this.observers = {})
            }
            return (
              u(e, [
                {
                  key: 'on',
                  value: function(e, t) {
                    var n = this
                    return (
                      e.split(' ').forEach(function(e) {
                        ;(n.observers[e] = n.observers[e] || []),
                          n.observers[e].push(t)
                      }),
                      this
                    )
                  },
                },
                {
                  key: 'off',
                  value: function(e, t) {
                    this.observers[e] &&
                      (t
                        ? (this.observers[e] = this.observers[e].filter(
                            function(e) {
                              return e !== t
                            },
                          ))
                        : delete this.observers[e])
                  },
                },
                {
                  key: 'emit',
                  value: function(e) {
                    for (
                      var t = arguments.length,
                        n = new Array(t > 1 ? t - 1 : 0),
                        r = 1;
                      r < t;
                      r++
                    )
                      n[r - 1] = arguments[r]
                    if (this.observers[e]) {
                      var i = [].concat(this.observers[e])
                      i.forEach(function(e) {
                        e.apply(void 0, n)
                      })
                    }
                    if (this.observers['*']) {
                      var o = [].concat(this.observers['*'])
                      o.forEach(function(t) {
                        t.apply(t, [e].concat(n))
                      })
                    }
                  },
                },
              ]),
              e
            )
          })()
        function v() {
          var e,
            t,
            n = new Promise(function(n, r) {
              ;(e = n), (t = r)
            })
          return (n.resolve = e), (n.reject = t), n
        }
        function m(e) {
          return null == e ? '' : '' + e
        }
        function b(e, t, n) {
          e.forEach(function(e) {
            t[e] && (n[e] = t[e])
          })
        }
        function w(e, t, n) {
          function r(e) {
            return e && e.indexOf('###') > -1 ? e.replace(/###/g, '.') : e
          }
          function i() {
            return !e || 'string' == typeof e
          }
          for (
            var o = 'string' != typeof t ? [].concat(t) : t.split('.');
            o.length > 1;

          ) {
            if (i()) return {}
            var s = r(o.shift())
            !e[s] && n && (e[s] = new n()),
              (e = Object.prototype.hasOwnProperty.call(e, s) ? e[s] : {})
          }
          return i() ? {} : {obj: e, k: r(o.shift())}
        }
        function _(e, t, n) {
          var r = w(e, t, Object)
          r.obj[r.k] = n
        }
        function k(e, t) {
          var n = w(e, t),
            r = n.obj,
            i = n.k
          if (r) return r[i]
        }
        function x(e, t, n) {
          var r = k(e, n)
          return void 0 !== r ? r : k(t, n)
        }
        function S(e, t, n) {
          for (var r in t)
            '__proto__' !== r &&
              'constructor' !== r &&
              (r in e
                ? 'string' == typeof e[r] ||
                  e[r] instanceof String ||
                  'string' == typeof t[r] ||
                  t[r] instanceof String
                  ? n && (e[r] = t[r])
                  : S(e[r], t[r], n)
                : (e[r] = t[r]))
          return e
        }
        function O(e) {
          return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
        }
        var E = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
          '/': '&#x2F;',
        }
        function P(e) {
          return 'string' == typeof e
            ? e.replace(/[&<>"'\/]/g, function(e) {
                return E[e]
              })
            : e
        }
        var C =
            'undefined' != typeof window &&
            window.navigator &&
            window.navigator.userAgent &&
            window.navigator.userAgent.indexOf('MSIE') > -1,
          j = (function(e) {
            function t(e) {
              var n,
                r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {ns: ['translation'], defaultNS: 'translation'}
              return (
                s(this, t),
                (n = l(this, h(t).call(this))),
                C && y.call(c(n)),
                (n.data = e || {}),
                (n.options = r),
                void 0 === n.options.keySeparator &&
                  (n.options.keySeparator = '.'),
                n
              )
            }
            return (
              d(t, e),
              u(t, [
                {
                  key: 'addNamespaces',
                  value: function(e) {
                    this.options.ns.indexOf(e) < 0 && this.options.ns.push(e)
                  },
                },
                {
                  key: 'removeNamespaces',
                  value: function(e) {
                    var t = this.options.ns.indexOf(e)
                    t > -1 && this.options.ns.splice(t, 1)
                  },
                },
                {
                  key: 'getResource',
                  value: function(e, t, n) {
                    var r =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : {},
                      i =
                        void 0 !== r.keySeparator
                          ? r.keySeparator
                          : this.options.keySeparator,
                      o = [e, t]
                    return (
                      n && 'string' != typeof n && (o = o.concat(n)),
                      n &&
                        'string' == typeof n &&
                        (o = o.concat(i ? n.split(i) : n)),
                      e.indexOf('.') > -1 && (o = e.split('.')),
                      k(this.data, o)
                    )
                  },
                },
                {
                  key: 'addResource',
                  value: function(e, t, n, r) {
                    var i =
                        arguments.length > 4 && void 0 !== arguments[4]
                          ? arguments[4]
                          : {silent: !1},
                      o = this.options.keySeparator
                    void 0 === o && (o = '.')
                    var s = [e, t]
                    n && (s = s.concat(o ? n.split(o) : n)),
                      e.indexOf('.') > -1 &&
                        ((r = t), (t = (s = e.split('.'))[1])),
                      this.addNamespaces(t),
                      _(this.data, s, r),
                      i.silent || this.emit('added', e, t, n, r)
                  },
                },
                {
                  key: 'addResources',
                  value: function(e, t, n) {
                    var r =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : {silent: !1}
                    for (var i in n)
                      ('string' != typeof n[i] &&
                        '[object Array]' !==
                          Object.prototype.toString.apply(n[i])) ||
                        this.addResource(e, t, i, n[i], {silent: !0})
                    r.silent || this.emit('added', e, t, n)
                  },
                },
                {
                  key: 'addResourceBundle',
                  value: function(e, t, n, r, i) {
                    var s =
                        arguments.length > 5 && void 0 !== arguments[5]
                          ? arguments[5]
                          : {silent: !1},
                      a = [e, t]
                    e.indexOf('.') > -1 &&
                      ((r = n), (n = t), (t = (a = e.split('.'))[1])),
                      this.addNamespaces(t)
                    var u = k(this.data, a) || {}
                    r ? S(u, n, i) : (u = o({}, u, n)),
                      _(this.data, a, u),
                      s.silent || this.emit('added', e, t, n)
                  },
                },
                {
                  key: 'removeResourceBundle',
                  value: function(e, t) {
                    this.hasResourceBundle(e, t) && delete this.data[e][t],
                      this.removeNamespaces(t),
                      this.emit('removed', e, t)
                  },
                },
                {
                  key: 'hasResourceBundle',
                  value: function(e, t) {
                    return void 0 !== this.getResource(e, t)
                  },
                },
                {
                  key: 'getResourceBundle',
                  value: function(e, t) {
                    return (
                      t || (t = this.options.defaultNS),
                      'v1' === this.options.compatibilityAPI
                        ? o({}, {}, this.getResource(e, t))
                        : this.getResource(e, t)
                    )
                  },
                },
                {
                  key: 'getDataByLanguage',
                  value: function(e) {
                    return this.data[e]
                  },
                },
                {
                  key: 'toJSON',
                  value: function() {
                    return this.data
                  },
                },
              ]),
              t
            )
          })(y),
          R = {
            processors: {},
            addPostProcessor: function(e) {
              this.processors[e.name] = e
            },
            handle: function(e, t, n, r, i) {
              var o = this
              return (
                e.forEach(function(e) {
                  o.processors[e] && (t = o.processors[e].process(t, n, r, i))
                }),
                t
              )
            },
          },
          D = {},
          A = (function(e) {
            function t(e) {
              var n,
                r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {}
              return (
                s(this, t),
                (n = l(this, h(t).call(this))),
                C && y.call(c(n)),
                b(
                  [
                    'resourceStore',
                    'languageUtils',
                    'pluralResolver',
                    'interpolator',
                    'backendConnector',
                    'i18nFormat',
                    'utils',
                  ],
                  e,
                  c(n),
                ),
                (n.options = r),
                void 0 === n.options.keySeparator &&
                  (n.options.keySeparator = '.'),
                (n.logger = g.create('translator')),
                n
              )
            }
            return (
              d(t, e),
              u(
                t,
                [
                  {
                    key: 'changeLanguage',
                    value: function(e) {
                      e && (this.language = e)
                    },
                  },
                  {
                    key: 'exists',
                    value: function(e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {interpolation: {}},
                        n = this.resolve(e, t)
                      return n && void 0 !== n.res
                    },
                  },
                  {
                    key: 'extractFromKey',
                    value: function(e, t) {
                      var n =
                        void 0 !== t.nsSeparator
                          ? t.nsSeparator
                          : this.options.nsSeparator
                      void 0 === n && (n = ':')
                      var r =
                          void 0 !== t.keySeparator
                            ? t.keySeparator
                            : this.options.keySeparator,
                        i = t.ns || this.options.defaultNS
                      if (n && e.indexOf(n) > -1) {
                        var o = e.match(this.interpolator.nestingRegexp)
                        if (o && o.length > 0) return {key: e, namespaces: i}
                        var s = e.split(n)
                        ;(n !== r ||
                          (n === r && this.options.ns.indexOf(s[0]) > -1)) &&
                          (i = s.shift()),
                          (e = s.join(r))
                      }
                      return (
                        'string' == typeof i && (i = [i]),
                        {key: e, namespaces: i}
                      )
                    },
                  },
                  {
                    key: 'translate',
                    value: function(e, n, i) {
                      var s = this
                      if (
                        ('object' !== r(n) &&
                          this.options.overloadTranslationOptionHandler &&
                          (n = this.options.overloadTranslationOptionHandler(
                            arguments,
                          )),
                        n || (n = {}),
                        null == e)
                      )
                        return ''
                      Array.isArray(e) || (e = [String(e)])
                      var a =
                          void 0 !== n.keySeparator
                            ? n.keySeparator
                            : this.options.keySeparator,
                        u = this.extractFromKey(e[e.length - 1], n),
                        c = u.key,
                        l = u.namespaces,
                        h = l[l.length - 1],
                        f = n.lng || this.language,
                        d =
                          n.appendNamespaceToCIMode ||
                          this.options.appendNamespaceToCIMode
                      if (f && 'cimode' === f.toLowerCase()) {
                        if (d) {
                          var p = n.nsSeparator || this.options.nsSeparator
                          return h + p + c
                        }
                        return c
                      }
                      var g = this.resolve(e, n),
                        y = g && g.res,
                        v = (g && g.usedKey) || c,
                        m = (g && g.exactUsedKey) || c,
                        b = Object.prototype.toString.apply(y),
                        w = [
                          '[object Number]',
                          '[object Function]',
                          '[object RegExp]',
                        ],
                        _ =
                          void 0 !== n.joinArrays
                            ? n.joinArrays
                            : this.options.joinArrays,
                        k = !this.i18nFormat || this.i18nFormat.handleAsObject,
                        x =
                          'string' != typeof y &&
                          'boolean' != typeof y &&
                          'number' != typeof y
                      if (
                        k &&
                        y &&
                        x &&
                        w.indexOf(b) < 0 &&
                        ('string' != typeof _ || '[object Array]' !== b)
                      ) {
                        if (!n.returnObjects && !this.options.returnObjects)
                          return (
                            this.logger.warn(
                              'accessing an object - but returnObjects options is not enabled!',
                            ),
                            this.options.returnedObjectHandler
                              ? this.options.returnedObjectHandler(v, y, n)
                              : "key '"
                                  .concat(c, ' (')
                                  .concat(
                                    this.language,
                                    ")' returned an object instead of string.",
                                  )
                          )
                        if (a) {
                          var S = '[object Array]' === b,
                            O = S ? [] : {},
                            E = S ? m : v
                          for (var P in y)
                            if (Object.prototype.hasOwnProperty.call(y, P)) {
                              var C = ''
                                .concat(E)
                                .concat(a)
                                .concat(P)
                              ;(O[P] = this.translate(
                                C,
                                o({}, n, {joinArrays: !1, ns: l}),
                              )),
                                O[P] === C && (O[P] = y[P])
                            }
                          y = O
                        }
                      } else if (
                        k &&
                        'string' == typeof _ &&
                        '[object Array]' === b
                      )
                        (y = y.join(_)) &&
                          (y = this.extendTranslation(y, e, n, i))
                      else {
                        var j = !1,
                          R = !1,
                          D = void 0 !== n.count && 'string' != typeof n.count,
                          A = t.hasDefaultValue(n),
                          L = D
                            ? this.pluralResolver.getSuffix(f, n.count)
                            : '',
                          K = n['defaultValue'.concat(L)] || n.defaultValue
                        !this.isValidLookup(y) && A && ((j = !0), (y = K)),
                          this.isValidLookup(y) || ((R = !0), (y = c))
                        var T = A && K !== y && this.options.updateMissing
                        if (R || j || T) {
                          if (
                            (this.logger.log(
                              T ? 'updateKey' : 'missingKey',
                              f,
                              h,
                              c,
                              T ? K : y,
                            ),
                            a)
                          ) {
                            var N = this.resolve(
                              c,
                              o({}, n, {keySeparator: !1}),
                            )
                            N &&
                              N.res &&
                              this.logger.warn(
                                'Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.',
                              )
                          }
                          var M = [],
                            $ = this.languageUtils.getFallbackCodes(
                              this.options.fallbackLng,
                              n.lng || this.language,
                            )
                          if (
                            'fallback' === this.options.saveMissingTo &&
                            $ &&
                            $[0]
                          )
                            for (var I = 0; I < $.length; I++) M.push($[I])
                          else
                            'all' === this.options.saveMissingTo
                              ? (M = this.languageUtils.toResolveHierarchy(
                                  n.lng || this.language,
                                ))
                              : M.push(n.lng || this.language)
                          var F = function(e, t, r) {
                            s.options.missingKeyHandler
                              ? s.options.missingKeyHandler(
                                  e,
                                  h,
                                  t,
                                  T ? r : y,
                                  T,
                                  n,
                                )
                              : s.backendConnector &&
                                s.backendConnector.saveMissing &&
                                s.backendConnector.saveMissing(
                                  e,
                                  h,
                                  t,
                                  T ? r : y,
                                  T,
                                  n,
                                ),
                              s.emit('missingKey', e, h, t, y)
                          }
                          this.options.saveMissing &&
                            (this.options.saveMissingPlurals && D
                              ? M.forEach(function(e) {
                                  s.pluralResolver
                                    .getSuffixes(e)
                                    .forEach(function(t) {
                                      F(
                                        [e],
                                        c + t,
                                        n['defaultValue'.concat(t)] || K,
                                      )
                                    })
                                })
                              : F(M, c, K))
                        }
                        ;(y = this.extendTranslation(y, e, n, g, i)),
                          R &&
                            y === c &&
                            this.options.appendNamespaceToMissingKey &&
                            (y = ''.concat(h, ':').concat(c)),
                          R &&
                            this.options.parseMissingKeyHandler &&
                            (y = this.options.parseMissingKeyHandler(y))
                      }
                      return y
                    },
                  },
                  {
                    key: 'extendTranslation',
                    value: function(e, t, n, r, i) {
                      var s = this
                      if (this.i18nFormat && this.i18nFormat.parse)
                        e = this.i18nFormat.parse(
                          e,
                          n,
                          r.usedLng,
                          r.usedNS,
                          r.usedKey,
                          {resolved: r},
                        )
                      else if (!n.skipInterpolation) {
                        n.interpolation &&
                          this.interpolator.init(
                            o({}, n, {
                              interpolation: o(
                                {},
                                this.options.interpolation,
                                n.interpolation,
                              ),
                            }),
                          )
                        var a,
                          u =
                            (n.interpolation &&
                              n.interpolation.skipOnVariables) ||
                            this.options.interpolation.skipOnVariables
                        if (u) {
                          var c = e.match(this.interpolator.nestingRegexp)
                          a = c && c.length
                        }
                        var l =
                          n.replace && 'string' != typeof n.replace
                            ? n.replace
                            : n
                        if (
                          (this.options.interpolation.defaultVariables &&
                            (l = o(
                              {},
                              this.options.interpolation.defaultVariables,
                              l,
                            )),
                          (e = this.interpolator.interpolate(
                            e,
                            l,
                            n.lng || this.language,
                            n,
                          )),
                          u)
                        ) {
                          var h = e.match(this.interpolator.nestingRegexp)
                          a < (h && h.length) && (n.nest = !1)
                        }
                        !1 !== n.nest &&
                          (e = this.interpolator.nest(
                            e,
                            function() {
                              for (
                                var e = arguments.length,
                                  r = new Array(e),
                                  o = 0;
                                o < e;
                                o++
                              )
                                r[o] = arguments[o]
                              return i && i[0] === r[0] && !n.context
                                ? (s.logger.warn(
                                    'It seems you are nesting recursively key: '
                                      .concat(r[0], ' in key: ')
                                      .concat(t[0]),
                                  ),
                                  null)
                                : s.translate.apply(s, r.concat([t]))
                            },
                            n,
                          )),
                          n.interpolation && this.interpolator.reset()
                      }
                      var f = n.postProcess || this.options.postProcess,
                        d = 'string' == typeof f ? [f] : f
                      return (
                        null != e &&
                          d &&
                          d.length &&
                          !1 !== n.applyPostProcessor &&
                          (e = R.handle(
                            d,
                            e,
                            t,
                            this.options && this.options.postProcessPassResolved
                              ? o({i18nResolved: r}, n)
                              : n,
                            this,
                          )),
                        e
                      )
                    },
                  },
                  {
                    key: 'resolve',
                    value: function(e) {
                      var t,
                        n,
                        r,
                        i,
                        o,
                        s = this,
                        a =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {}
                      return (
                        'string' == typeof e && (e = [e]),
                        e.forEach(function(e) {
                          if (!s.isValidLookup(t)) {
                            var u = s.extractFromKey(e, a),
                              c = u.key
                            n = c
                            var l = u.namespaces
                            s.options.fallbackNS &&
                              (l = l.concat(s.options.fallbackNS))
                            var h =
                                void 0 !== a.count &&
                                'string' != typeof a.count,
                              f =
                                void 0 !== a.context &&
                                'string' == typeof a.context &&
                                '' !== a.context,
                              d = a.lngs
                                ? a.lngs
                                : s.languageUtils.toResolveHierarchy(
                                    a.lng || s.language,
                                    a.fallbackLng,
                                  )
                            l.forEach(function(e) {
                              s.isValidLookup(t) ||
                                ((o = e),
                                !D[''.concat(d[0], '-').concat(e)] &&
                                  s.utils &&
                                  s.utils.hasLoadedNamespace &&
                                  !s.utils.hasLoadedNamespace(o) &&
                                  ((D[''.concat(d[0], '-').concat(e)] = !0),
                                  s.logger.warn(
                                    'key "'
                                      .concat(n, '" for languages "')
                                      .concat(
                                        d.join(', '),
                                        '" won\'t get resolved as namespace "',
                                      )
                                      .concat(o, '" was not yet loaded'),
                                    'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!',
                                  )),
                                d.forEach(function(n) {
                                  if (!s.isValidLookup(t)) {
                                    i = n
                                    var o,
                                      u,
                                      l = c,
                                      d = [l]
                                    for (
                                      s.i18nFormat && s.i18nFormat.addLookupKeys
                                        ? s.i18nFormat.addLookupKeys(
                                            d,
                                            c,
                                            n,
                                            e,
                                            a,
                                          )
                                        : (h &&
                                            (o = s.pluralResolver.getSuffix(
                                              n,
                                              a.count,
                                            )),
                                          h && f && d.push(l + o),
                                          f &&
                                            d.push(
                                              (l += ''
                                                .concat(
                                                  s.options.contextSeparator,
                                                )
                                                .concat(a.context)),
                                            ),
                                          h && d.push((l += o)));
                                      (u = d.pop());

                                    )
                                      s.isValidLookup(t) ||
                                        ((r = u),
                                        (t = s.getResource(n, e, u, a)))
                                  }
                                }))
                            })
                          }
                        }),
                        {
                          res: t,
                          usedKey: n,
                          exactUsedKey: r,
                          usedLng: i,
                          usedNS: o,
                        }
                      )
                    },
                  },
                  {
                    key: 'isValidLookup',
                    value: function(e) {
                      return !(
                        void 0 === e ||
                        (!this.options.returnNull && null === e) ||
                        (!this.options.returnEmptyString && '' === e)
                      )
                    },
                  },
                  {
                    key: 'getResource',
                    value: function(e, t, n) {
                      var r =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : {}
                      return this.i18nFormat && this.i18nFormat.getResource
                        ? this.i18nFormat.getResource(e, t, n, r)
                        : this.resourceStore.getResource(e, t, n, r)
                    },
                  },
                ],
                [
                  {
                    key: 'hasDefaultValue',
                    value: function(e) {
                      var t = 'defaultValue'
                      for (var n in e)
                        if (
                          Object.prototype.hasOwnProperty.call(e, n) &&
                          t === n.substring(0, t.length) &&
                          void 0 !== e[n]
                        )
                          return !0
                      return !1
                    },
                  },
                ],
              ),
              t
            )
          })(y)
        function L(e) {
          return e.charAt(0).toUpperCase() + e.slice(1)
        }
        var K = (function() {
            function e(t) {
              s(this, e),
                (this.options = t),
                (this.whitelist = this.options.supportedLngs || !1),
                (this.supportedLngs = this.options.supportedLngs || !1),
                (this.logger = g.create('languageUtils'))
            }
            return (
              u(e, [
                {
                  key: 'getScriptPartFromCode',
                  value: function(e) {
                    if (!e || e.indexOf('-') < 0) return null
                    var t = e.split('-')
                    return 2 === t.length
                      ? null
                      : (t.pop(),
                        'x' === t[t.length - 1].toLowerCase()
                          ? null
                          : this.formatLanguageCode(t.join('-')))
                  },
                },
                {
                  key: 'getLanguagePartFromCode',
                  value: function(e) {
                    if (!e || e.indexOf('-') < 0) return e
                    var t = e.split('-')
                    return this.formatLanguageCode(t[0])
                  },
                },
                {
                  key: 'formatLanguageCode',
                  value: function(e) {
                    if ('string' == typeof e && e.indexOf('-') > -1) {
                      var t = [
                          'hans',
                          'hant',
                          'latn',
                          'cyrl',
                          'cans',
                          'mong',
                          'arab',
                        ],
                        n = e.split('-')
                      return (
                        this.options.lowerCaseLng
                          ? (n = n.map(function(e) {
                              return e.toLowerCase()
                            }))
                          : 2 === n.length
                          ? ((n[0] = n[0].toLowerCase()),
                            (n[1] = n[1].toUpperCase()),
                            t.indexOf(n[1].toLowerCase()) > -1 &&
                              (n[1] = L(n[1].toLowerCase())))
                          : 3 === n.length &&
                            ((n[0] = n[0].toLowerCase()),
                            2 === n[1].length && (n[1] = n[1].toUpperCase()),
                            'sgn' !== n[0] &&
                              2 === n[2].length &&
                              (n[2] = n[2].toUpperCase()),
                            t.indexOf(n[1].toLowerCase()) > -1 &&
                              (n[1] = L(n[1].toLowerCase())),
                            t.indexOf(n[2].toLowerCase()) > -1 &&
                              (n[2] = L(n[2].toLowerCase()))),
                        n.join('-')
                      )
                    }
                    return this.options.cleanCode || this.options.lowerCaseLng
                      ? e.toLowerCase()
                      : e
                  },
                },
                {
                  key: 'isWhitelisted',
                  value: function(e) {
                    return (
                      this.logger.deprecate(
                        'languageUtils.isWhitelisted',
                        'function "isWhitelisted" will be renamed to "isSupportedCode" in the next major - please make sure to rename it\'s usage asap.',
                      ),
                      this.isSupportedCode(e)
                    )
                  },
                },
                {
                  key: 'isSupportedCode',
                  value: function(e) {
                    return (
                      ('languageOnly' === this.options.load ||
                        this.options.nonExplicitSupportedLngs) &&
                        (e = this.getLanguagePartFromCode(e)),
                      !this.supportedLngs ||
                        !this.supportedLngs.length ||
                        this.supportedLngs.indexOf(e) > -1
                    )
                  },
                },
                {
                  key: 'getBestMatchFromCodes',
                  value: function(e) {
                    var t,
                      n = this
                    return e
                      ? (e.forEach(function(e) {
                          if (!t) {
                            var r = n.formatLanguageCode(e)
                            ;(n.options.supportedLngs &&
                              !n.isSupportedCode(r)) ||
                              (t = r)
                          }
                        }),
                        !t &&
                          this.options.supportedLngs &&
                          e.forEach(function(e) {
                            if (!t) {
                              var r = n.getLanguagePartFromCode(e)
                              if (n.isSupportedCode(r)) return (t = r)
                              t = n.options.supportedLngs.find(function(e) {
                                if (0 === e.indexOf(r)) return e
                              })
                            }
                          }),
                        t ||
                          (t = this.getFallbackCodes(
                            this.options.fallbackLng,
                          )[0]),
                        t)
                      : null
                  },
                },
                {
                  key: 'getFallbackCodes',
                  value: function(e, t) {
                    if (!e) return []
                    if (
                      ('function' == typeof e && (e = e(t)),
                      'string' == typeof e && (e = [e]),
                      '[object Array]' === Object.prototype.toString.apply(e))
                    )
                      return e
                    if (!t) return e.default || []
                    var n = e[t]
                    return (
                      n || (n = e[this.getScriptPartFromCode(t)]),
                      n || (n = e[this.formatLanguageCode(t)]),
                      n || (n = e[this.getLanguagePartFromCode(t)]),
                      n || (n = e.default),
                      n || []
                    )
                  },
                },
                {
                  key: 'toResolveHierarchy',
                  value: function(e, t) {
                    var n = this,
                      r = this.getFallbackCodes(
                        t || this.options.fallbackLng || [],
                        e,
                      ),
                      i = [],
                      o = function(e) {
                        e &&
                          (n.isSupportedCode(e)
                            ? i.push(e)
                            : n.logger.warn(
                                'rejecting language code not found in supportedLngs: '.concat(
                                  e,
                                ),
                              ))
                      }
                    return (
                      'string' == typeof e && e.indexOf('-') > -1
                        ? ('languageOnly' !== this.options.load &&
                            o(this.formatLanguageCode(e)),
                          'languageOnly' !== this.options.load &&
                            'currentOnly' !== this.options.load &&
                            o(this.getScriptPartFromCode(e)),
                          'currentOnly' !== this.options.load &&
                            o(this.getLanguagePartFromCode(e)))
                        : 'string' == typeof e && o(this.formatLanguageCode(e)),
                      r.forEach(function(e) {
                        i.indexOf(e) < 0 && o(n.formatLanguageCode(e))
                      }),
                      i
                    )
                  },
                },
              ]),
              e
            )
          })(),
          T = [
            {
              lngs: [
                'ach',
                'ak',
                'am',
                'arn',
                'br',
                'fil',
                'gun',
                'ln',
                'mfe',
                'mg',
                'mi',
                'oc',
                'pt',
                'pt-BR',
                'tg',
                'tl',
                'ti',
                'tr',
                'uz',
                'wa',
              ],
              nr: [1, 2],
              fc: 1,
            },
            {
              lngs: [
                'af',
                'an',
                'ast',
                'az',
                'bg',
                'bn',
                'ca',
                'da',
                'de',
                'dev',
                'el',
                'en',
                'eo',
                'es',
                'et',
                'eu',
                'fi',
                'fo',
                'fur',
                'fy',
                'gl',
                'gu',
                'ha',
                'hi',
                'hu',
                'hy',
                'ia',
                'it',
                'kn',
                'ku',
                'lb',
                'mai',
                'ml',
                'mn',
                'mr',
                'nah',
                'nap',
                'nb',
                'ne',
                'nl',
                'nn',
                'no',
                'nso',
                'pa',
                'pap',
                'pms',
                'ps',
                'pt-PT',
                'rm',
                'sco',
                'se',
                'si',
                'so',
                'son',
                'sq',
                'sv',
                'sw',
                'ta',
                'te',
                'tk',
                'ur',
                'yo',
              ],
              nr: [1, 2],
              fc: 2,
            },
            {
              lngs: [
                'ay',
                'bo',
                'cgg',
                'fa',
                'ht',
                'id',
                'ja',
                'jbo',
                'ka',
                'kk',
                'km',
                'ko',
                'ky',
                'lo',
                'ms',
                'sah',
                'su',
                'th',
                'tt',
                'ug',
                'vi',
                'wo',
                'zh',
              ],
              nr: [1],
              fc: 3,
            },
            {
              lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
              nr: [1, 2, 5],
              fc: 4,
            },
            {lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5},
            {lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6},
            {lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7},
            {lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8},
            {lngs: ['fr'], nr: [1, 2], fc: 9},
            {lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10},
            {lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11},
            {lngs: ['is'], nr: [1, 2], fc: 12},
            {lngs: ['jv'], nr: [0, 1], fc: 13},
            {lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14},
            {lngs: ['lt'], nr: [1, 2, 10], fc: 15},
            {lngs: ['lv'], nr: [1, 2, 0], fc: 16},
            {lngs: ['mk'], nr: [1, 2], fc: 17},
            {lngs: ['mnk'], nr: [0, 1, 2], fc: 18},
            {lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19},
            {lngs: ['or'], nr: [2, 1], fc: 2},
            {lngs: ['ro'], nr: [1, 2, 20], fc: 20},
            {lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21},
            {lngs: ['he', 'iw'], nr: [1, 2, 20, 21], fc: 22},
          ],
          N = {
            1: function(e) {
              return Number(e > 1)
            },
            2: function(e) {
              return Number(1 != e)
            },
            3: function(e) {
              return 0
            },
            4: function(e) {
              return Number(
                e % 10 == 1 && e % 100 != 11
                  ? 0
                  : e % 10 >= 2 &&
                    e % 10 <= 4 &&
                    (e % 100 < 10 || e % 100 >= 20)
                  ? 1
                  : 2,
              )
            },
            5: function(e) {
              return Number(
                0 == e
                  ? 0
                  : 1 == e
                  ? 1
                  : 2 == e
                  ? 2
                  : e % 100 >= 3 && e % 100 <= 10
                  ? 3
                  : e % 100 >= 11
                  ? 4
                  : 5,
              )
            },
            6: function(e) {
              return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2)
            },
            7: function(e) {
              return Number(
                1 == e
                  ? 0
                  : e % 10 >= 2 &&
                    e % 10 <= 4 &&
                    (e % 100 < 10 || e % 100 >= 20)
                  ? 1
                  : 2,
              )
            },
            8: function(e) {
              return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3)
            },
            9: function(e) {
              return Number(e >= 2)
            },
            10: function(e) {
              return Number(
                1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4,
              )
            },
            11: function(e) {
              return Number(
                1 == e || 11 == e
                  ? 0
                  : 2 == e || 12 == e
                  ? 1
                  : e > 2 && e < 20
                  ? 2
                  : 3,
              )
            },
            12: function(e) {
              return Number(e % 10 != 1 || e % 100 == 11)
            },
            13: function(e) {
              return Number(0 !== e)
            },
            14: function(e) {
              return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3)
            },
            15: function(e) {
              return Number(
                e % 10 == 1 && e % 100 != 11
                  ? 0
                  : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20)
                  ? 1
                  : 2,
              )
            },
            16: function(e) {
              return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2)
            },
            17: function(e) {
              return Number(1 == e || (e % 10 == 1 && e % 100 != 11) ? 0 : 1)
            },
            18: function(e) {
              return Number(0 == e ? 0 : 1 == e ? 1 : 2)
            },
            19: function(e) {
              return Number(
                1 == e
                  ? 0
                  : 0 == e || (e % 100 > 1 && e % 100 < 11)
                  ? 1
                  : e % 100 > 10 && e % 100 < 20
                  ? 2
                  : 3,
              )
            },
            20: function(e) {
              return Number(
                1 == e ? 0 : 0 == e || (e % 100 > 0 && e % 100 < 20) ? 1 : 2,
              )
            },
            21: function(e) {
              return Number(
                e % 100 == 1
                  ? 1
                  : e % 100 == 2
                  ? 2
                  : e % 100 == 3 || e % 100 == 4
                  ? 3
                  : 0,
              )
            },
            22: function(e) {
              return Number(
                1 == e
                  ? 0
                  : 2 == e
                  ? 1
                  : (e < 0 || e > 10) && e % 10 == 0
                  ? 2
                  : 3,
              )
            },
          }
        function M() {
          var e = {}
          return (
            T.forEach(function(t) {
              t.lngs.forEach(function(n) {
                e[n] = {numbers: t.nr, plurals: N[t.fc]}
              })
            }),
            e
          )
        }
        var $ = (function() {
            function e(t) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {}
              s(this, e),
                (this.languageUtils = t),
                (this.options = n),
                (this.logger = g.create('pluralResolver')),
                (this.rules = M())
            }
            return (
              u(e, [
                {
                  key: 'addRule',
                  value: function(e, t) {
                    this.rules[e] = t
                  },
                },
                {
                  key: 'getRule',
                  value: function(e) {
                    return (
                      this.rules[e] ||
                      this.rules[this.languageUtils.getLanguagePartFromCode(e)]
                    )
                  },
                },
                {
                  key: 'needsPlural',
                  value: function(e) {
                    var t = this.getRule(e)
                    return t && t.numbers.length > 1
                  },
                },
                {
                  key: 'getPluralFormsOfKey',
                  value: function(e, t) {
                    return this.getSuffixes(e).map(function(e) {
                      return t + e
                    })
                  },
                },
                {
                  key: 'getSuffixes',
                  value: function(e) {
                    var t = this,
                      n = this.getRule(e)
                    return n
                      ? n.numbers.map(function(n) {
                          return t.getSuffix(e, n)
                        })
                      : []
                  },
                },
                {
                  key: 'getSuffix',
                  value: function(e, t) {
                    var n = this,
                      r = this.getRule(e)
                    if (r) {
                      var i = r.noAbs ? r.plurals(t) : r.plurals(Math.abs(t)),
                        o = r.numbers[i]
                      this.options.simplifyPluralSuffix &&
                        2 === r.numbers.length &&
                        1 === r.numbers[0] &&
                        (2 === o ? (o = 'plural') : 1 === o && (o = ''))
                      var s = function() {
                        return n.options.prepend && o.toString()
                          ? n.options.prepend + o.toString()
                          : o.toString()
                      }
                      return 'v1' === this.options.compatibilityJSON
                        ? 1 === o
                          ? ''
                          : 'number' == typeof o
                          ? '_plural_'.concat(o.toString())
                          : s()
                        : 'v2' === this.options.compatibilityJSON ||
                          (this.options.simplifyPluralSuffix &&
                            2 === r.numbers.length &&
                            1 === r.numbers[0])
                        ? s()
                        : this.options.prepend && i.toString()
                        ? this.options.prepend + i.toString()
                        : i.toString()
                    }
                    return (
                      this.logger.warn('no plural rule found for: '.concat(e)),
                      ''
                    )
                  },
                },
              ]),
              e
            )
          })(),
          I = (function() {
            function e() {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {}
              s(this, e),
                (this.logger = g.create('interpolator')),
                (this.options = t),
                (this.format =
                  (t.interpolation && t.interpolation.format) ||
                  function(e) {
                    return e
                  }),
                this.init(t)
            }
            return (
              u(e, [
                {
                  key: 'init',
                  value: function() {
                    var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {}
                    e.interpolation || (e.interpolation = {escapeValue: !0})
                    var t = e.interpolation
                    ;(this.escape = void 0 !== t.escape ? t.escape : P),
                      (this.escapeValue =
                        void 0 === t.escapeValue || t.escapeValue),
                      (this.useRawValueToEscape =
                        void 0 !== t.useRawValueToEscape &&
                        t.useRawValueToEscape),
                      (this.prefix = t.prefix
                        ? O(t.prefix)
                        : t.prefixEscaped || '{{'),
                      (this.suffix = t.suffix
                        ? O(t.suffix)
                        : t.suffixEscaped || '}}'),
                      (this.formatSeparator = t.formatSeparator
                        ? t.formatSeparator
                        : t.formatSeparator || ','),
                      (this.unescapePrefix = t.unescapeSuffix
                        ? ''
                        : t.unescapePrefix || '-'),
                      (this.unescapeSuffix = this.unescapePrefix
                        ? ''
                        : t.unescapeSuffix || ''),
                      (this.nestingPrefix = t.nestingPrefix
                        ? O(t.nestingPrefix)
                        : t.nestingPrefixEscaped || O('$t(')),
                      (this.nestingSuffix = t.nestingSuffix
                        ? O(t.nestingSuffix)
                        : t.nestingSuffixEscaped || O(')')),
                      (this.nestingOptionsSeparator = t.nestingOptionsSeparator
                        ? t.nestingOptionsSeparator
                        : t.nestingOptionsSeparator || ','),
                      (this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3),
                      (this.alwaysFormat =
                        void 0 !== t.alwaysFormat && t.alwaysFormat),
                      this.resetRegExp()
                  },
                },
                {
                  key: 'reset',
                  value: function() {
                    this.options && this.init(this.options)
                  },
                },
                {
                  key: 'resetRegExp',
                  value: function() {
                    var e = ''.concat(this.prefix, '(.+?)').concat(this.suffix)
                    this.regexp = new RegExp(e, 'g')
                    var t = ''
                      .concat(this.prefix)
                      .concat(this.unescapePrefix, '(.+?)')
                      .concat(this.unescapeSuffix)
                      .concat(this.suffix)
                    this.regexpUnescape = new RegExp(t, 'g')
                    var n = ''
                      .concat(this.nestingPrefix, '(.+?)')
                      .concat(this.nestingSuffix)
                    this.nestingRegexp = new RegExp(n, 'g')
                  },
                },
                {
                  key: 'interpolate',
                  value: function(e, t, n, r) {
                    var i,
                      o,
                      s,
                      a = this,
                      u =
                        (this.options &&
                          this.options.interpolation &&
                          this.options.interpolation.defaultVariables) ||
                        {}
                    function c(e) {
                      return e.replace(/\$/g, '$$$$')
                    }
                    var l = function(e) {
                      if (e.indexOf(a.formatSeparator) < 0) {
                        var i = x(t, u, e)
                        return a.alwaysFormat ? a.format(i, void 0, n) : i
                      }
                      var o = e.split(a.formatSeparator),
                        s = o.shift().trim(),
                        c = o.join(a.formatSeparator).trim()
                      return a.format(x(t, u, s), c, n, r)
                    }
                    this.resetRegExp()
                    var h =
                        (r && r.missingInterpolationHandler) ||
                        this.options.missingInterpolationHandler,
                      f =
                        (r &&
                          r.interpolation &&
                          r.interpolation.skipOnVariables) ||
                        this.options.interpolation.skipOnVariables
                    return (
                      [
                        {
                          regex: this.regexpUnescape,
                          safeValue: function(e) {
                            return c(e)
                          },
                        },
                        {
                          regex: this.regexp,
                          safeValue: function(e) {
                            return a.escapeValue ? c(a.escape(e)) : c(e)
                          },
                        },
                      ].forEach(function(t) {
                        for (s = 0; (i = t.regex.exec(e)); ) {
                          if (void 0 === (o = l(i[1].trim())))
                            if ('function' == typeof h) {
                              var n = h(e, i, r)
                              o = 'string' == typeof n ? n : ''
                            } else {
                              if (f) {
                                o = i[0]
                                continue
                              }
                              a.logger.warn(
                                'missed to pass in variable '
                                  .concat(i[1], ' for interpolating ')
                                  .concat(e),
                              ),
                                (o = '')
                            }
                          else
                            'string' == typeof o ||
                              a.useRawValueToEscape ||
                              (o = m(o))
                          if (
                            ((e = e.replace(i[0], t.safeValue(o))),
                            (t.regex.lastIndex = 0),
                            ++s >= a.maxReplaces)
                          )
                            break
                        }
                      }),
                      e
                    )
                  },
                },
                {
                  key: 'nest',
                  value: function(e, t) {
                    var n,
                      r,
                      i = this,
                      s =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {},
                      a = o({}, s)
                    function u(e, t) {
                      var n = this.nestingOptionsSeparator
                      if (e.indexOf(n) < 0) return e
                      var r = e.split(new RegExp(''.concat(n, '[ ]*{'))),
                        i = '{'.concat(r[1])
                      ;(e = r[0]),
                        (i = (i = this.interpolate(i, a)).replace(/'/g, '"'))
                      try {
                        ;(a = JSON.parse(i)), t && (a = o({}, t, a))
                      } catch (t) {
                        return (
                          this.logger.warn(
                            'failed parsing options string in nesting for key '.concat(
                              e,
                            ),
                            t,
                          ),
                          ''
                            .concat(e)
                            .concat(n)
                            .concat(i)
                        )
                      }
                      return delete a.defaultValue, e
                    }
                    for (
                      a.applyPostProcessor = !1, delete a.defaultValue;
                      (n = this.nestingRegexp.exec(e));

                    ) {
                      var c = [],
                        l = !1
                      if (
                        n[0].includes(this.formatSeparator) &&
                        !/{.*}/.test(n[1])
                      ) {
                        var h = n[1]
                          .split(this.formatSeparator)
                          .map(function(e) {
                            return e.trim()
                          })
                        ;(n[1] = h.shift()), (c = h), (l = !0)
                      }
                      if (
                        (r = t(u.call(this, n[1].trim(), a), a)) &&
                        n[0] === e &&
                        'string' != typeof r
                      )
                        return r
                      'string' != typeof r && (r = m(r)),
                        r ||
                          (this.logger.warn(
                            'missed to resolve '
                              .concat(n[1], ' for nesting ')
                              .concat(e),
                          ),
                          (r = '')),
                        l &&
                          (r = c.reduce(function(e, t) {
                            return i.format(e, t, s.lng, s)
                          }, r.trim())),
                        (e = e.replace(n[0], r)),
                        (this.regexp.lastIndex = 0)
                    }
                    return e
                  },
                },
              ]),
              e
            )
          })(),
          F = (function(e) {
            function t(e, n, r) {
              var i,
                o =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : {}
              return (
                s(this, t),
                (i = l(this, h(t).call(this))),
                C && y.call(c(i)),
                (i.backend = e),
                (i.store = n),
                (i.services = r),
                (i.languageUtils = r.languageUtils),
                (i.options = o),
                (i.logger = g.create('backendConnector')),
                (i.state = {}),
                (i.queue = []),
                i.backend && i.backend.init && i.backend.init(r, o.backend, o),
                i
              )
            }
            return (
              d(t, e),
              u(t, [
                {
                  key: 'queueLoad',
                  value: function(e, t, n, r) {
                    var i = this,
                      o = [],
                      s = [],
                      a = [],
                      u = []
                    return (
                      e.forEach(function(e) {
                        var r = !0
                        t.forEach(function(t) {
                          var a = ''.concat(e, '|').concat(t)
                          !n.reload && i.store.hasResourceBundle(e, t)
                            ? (i.state[a] = 2)
                            : i.state[a] < 0 ||
                              (1 === i.state[a]
                                ? s.indexOf(a) < 0 && s.push(a)
                                : ((i.state[a] = 1),
                                  (r = !1),
                                  s.indexOf(a) < 0 && s.push(a),
                                  o.indexOf(a) < 0 && o.push(a),
                                  u.indexOf(t) < 0 && u.push(t)))
                        }),
                          r || a.push(e)
                      }),
                      (o.length || s.length) &&
                        this.queue.push({
                          pending: s,
                          loaded: {},
                          errors: [],
                          callback: r,
                        }),
                      {
                        toLoad: o,
                        pending: s,
                        toLoadLanguages: a,
                        toLoadNamespaces: u,
                      }
                    )
                  },
                },
                {
                  key: 'loaded',
                  value: function(e, t, n) {
                    var r = e.split('|'),
                      i = r[0],
                      o = r[1]
                    t && this.emit('failedLoading', i, o, t),
                      n && this.store.addResourceBundle(i, o, n),
                      (this.state[e] = t ? -1 : 2)
                    var s = {}
                    this.queue.forEach(function(n) {
                      var r, a, u, c, l
                      ;(r = n.loaded),
                        (a = o),
                        ((c = (u = w(r, [i], Object)).obj)[(l = u.k)] =
                          c[l] || []),
                        c[l].push(a),
                        (function(e, t) {
                          for (var n = e.indexOf(t); -1 !== n; )
                            e.splice(n, 1), (n = e.indexOf(t))
                        })(n.pending, e),
                        t && n.errors.push(t),
                        0 !== n.pending.length ||
                          n.done ||
                          (Object.keys(n.loaded).forEach(function(e) {
                            s[e] || (s[e] = []),
                              n.loaded[e].length &&
                                n.loaded[e].forEach(function(t) {
                                  s[e].indexOf(t) < 0 && s[e].push(t)
                                })
                          }),
                          (n.done = !0),
                          n.errors.length ? n.callback(n.errors) : n.callback())
                    }),
                      this.emit('loaded', s),
                      (this.queue = this.queue.filter(function(e) {
                        return !e.done
                      }))
                  },
                },
                {
                  key: 'read',
                  value: function(e, t, n) {
                    var r = this,
                      i =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : 0,
                      o =
                        arguments.length > 4 && void 0 !== arguments[4]
                          ? arguments[4]
                          : 350,
                      s = arguments.length > 5 ? arguments[5] : void 0
                    return e.length
                      ? this.backend[n](e, t, function(a, u) {
                          a && u && i < 5
                            ? setTimeout(function() {
                                r.read.call(r, e, t, n, i + 1, 2 * o, s)
                              }, o)
                            : s(a, u)
                        })
                      : s(null, {})
                  },
                },
                {
                  key: 'prepareLoading',
                  value: function(e, t) {
                    var n = this,
                      r =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : {},
                      i = arguments.length > 3 ? arguments[3] : void 0
                    if (!this.backend)
                      return (
                        this.logger.warn(
                          'No backend was added via i18next.use. Will not load resources.',
                        ),
                        i && i()
                      )
                    'string' == typeof e &&
                      (e = this.languageUtils.toResolveHierarchy(e)),
                      'string' == typeof t && (t = [t])
                    var o = this.queueLoad(e, t, r, i)
                    if (!o.toLoad.length) return o.pending.length || i(), null
                    o.toLoad.forEach(function(e) {
                      n.loadOne(e)
                    })
                  },
                },
                {
                  key: 'load',
                  value: function(e, t, n) {
                    this.prepareLoading(e, t, {}, n)
                  },
                },
                {
                  key: 'reload',
                  value: function(e, t, n) {
                    this.prepareLoading(e, t, {reload: !0}, n)
                  },
                },
                {
                  key: 'loadOne',
                  value: function(e) {
                    var t = this,
                      n =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : '',
                      r = e.split('|'),
                      i = r[0],
                      o = r[1]
                    this.read(i, o, 'read', void 0, void 0, function(r, s) {
                      r &&
                        t.logger.warn(
                          ''
                            .concat(n, 'loading namespace ')
                            .concat(o, ' for language ')
                            .concat(i, ' failed'),
                          r,
                        ),
                        !r &&
                          s &&
                          t.logger.log(
                            ''
                              .concat(n, 'loaded namespace ')
                              .concat(o, ' for language ')
                              .concat(i),
                            s,
                          ),
                        t.loaded(e, r, s)
                    })
                  },
                },
                {
                  key: 'saveMissing',
                  value: function(e, t, n, r, i) {
                    var s =
                      arguments.length > 5 && void 0 !== arguments[5]
                        ? arguments[5]
                        : {}
                    this.services.utils &&
                    this.services.utils.hasLoadedNamespace &&
                    !this.services.utils.hasLoadedNamespace(t)
                      ? this.logger.warn(
                          'did not save key "'
                            .concat(n, '" as the namespace "')
                            .concat(t, '" was not yet loaded'),
                          'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!',
                        )
                      : null != n &&
                        '' !== n &&
                        (this.backend &&
                          this.backend.create &&
                          this.backend.create(
                            e,
                            t,
                            n,
                            r,
                            null,
                            o({}, s, {isUpdate: i}),
                          ),
                        e && e[0] && this.store.addResource(e[0], t, n, r))
                  },
                },
              ]),
              t
            )
          })(y)
        function B() {
          return {
            debug: !1,
            initImmediate: !0,
            ns: ['translation'],
            defaultNS: ['translation'],
            fallbackLng: ['dev'],
            fallbackNS: !1,
            whitelist: !1,
            nonExplicitWhitelist: !1,
            supportedLngs: !1,
            nonExplicitSupportedLngs: !1,
            load: 'all',
            preload: !1,
            simplifyPluralSuffix: !0,
            keySeparator: '.',
            nsSeparator: ':',
            pluralSeparator: '_',
            contextSeparator: '_',
            partialBundledLanguages: !1,
            saveMissing: !1,
            updateMissing: !1,
            saveMissingTo: 'fallback',
            saveMissingPlurals: !0,
            missingKeyHandler: !1,
            missingInterpolationHandler: !1,
            postProcess: !1,
            postProcessPassResolved: !1,
            returnNull: !0,
            returnEmptyString: !0,
            returnObjects: !1,
            joinArrays: !1,
            returnedObjectHandler: !1,
            parseMissingKeyHandler: !1,
            appendNamespaceToMissingKey: !1,
            appendNamespaceToCIMode: !1,
            overloadTranslationOptionHandler: function(e) {
              var t = {}
              if (
                ('object' === r(e[1]) && (t = e[1]),
                'string' == typeof e[1] && (t.defaultValue = e[1]),
                'string' == typeof e[2] && (t.tDescription = e[2]),
                'object' === r(e[2]) || 'object' === r(e[3]))
              ) {
                var n = e[3] || e[2]
                Object.keys(n).forEach(function(e) {
                  t[e] = n[e]
                })
              }
              return t
            },
            interpolation: {
              escapeValue: !0,
              format: function(e, t, n, r) {
                return e
              },
              prefix: '{{',
              suffix: '}}',
              formatSeparator: ',',
              unescapePrefix: '-',
              nestingPrefix: '$t(',
              nestingSuffix: ')',
              nestingOptionsSeparator: ',',
              maxReplaces: 1e3,
              skipOnVariables: !1,
            },
          }
        }
        function q(e) {
          return (
            'string' == typeof e.ns && (e.ns = [e.ns]),
            'string' == typeof e.fallbackLng &&
              (e.fallbackLng = [e.fallbackLng]),
            'string' == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]),
            e.whitelist &&
              (e.whitelist &&
                e.whitelist.indexOf('cimode') < 0 &&
                (e.whitelist = e.whitelist.concat(['cimode'])),
              (e.supportedLngs = e.whitelist)),
            e.nonExplicitWhitelist &&
              (e.nonExplicitSupportedLngs = e.nonExplicitWhitelist),
            e.supportedLngs &&
              e.supportedLngs.indexOf('cimode') < 0 &&
              (e.supportedLngs = e.supportedLngs.concat(['cimode'])),
            e
          )
        }
        function U() {}
        const W = new ((function(e) {
          function t() {
            var e,
              n =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              r = arguments.length > 1 ? arguments[1] : void 0
            if (
              (s(this, t),
              (e = l(this, h(t).call(this))),
              C && y.call(c(e)),
              (e.options = q(n)),
              (e.services = {}),
              (e.logger = g),
              (e.modules = {external: []}),
              r && !e.isInitialized && !n.isClone)
            ) {
              if (!e.options.initImmediate) return e.init(n, r), l(e, c(e))
              setTimeout(function() {
                e.init(n, r)
              }, 0)
            }
            return e
          }
          return (
            d(t, e),
            u(t, [
              {
                key: 'init',
                value: function() {
                  var e = this,
                    t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    n = arguments.length > 1 ? arguments[1] : void 0
                  function r(e) {
                    return e ? ('function' == typeof e ? new e() : e) : null
                  }
                  if (
                    ('function' == typeof t && ((n = t), (t = {})),
                    t.whitelist &&
                      !t.supportedLngs &&
                      this.logger.deprecate(
                        'whitelist',
                        'option "whitelist" will be renamed to "supportedLngs" in the next major - please make sure to rename this option asap.',
                      ),
                    t.nonExplicitWhitelist &&
                      !t.nonExplicitSupportedLngs &&
                      this.logger.deprecate(
                        'whitelist',
                        'options "nonExplicitWhitelist" will be renamed to "nonExplicitSupportedLngs" in the next major - please make sure to rename this option asap.',
                      ),
                    (this.options = o({}, B(), this.options, q(t))),
                    (this.format = this.options.interpolation.format),
                    n || (n = U),
                    !this.options.isClone)
                  ) {
                    this.modules.logger
                      ? g.init(r(this.modules.logger), this.options)
                      : g.init(null, this.options)
                    var i = new K(this.options)
                    this.store = new j(this.options.resources, this.options)
                    var s = this.services
                    ;(s.logger = g),
                      (s.resourceStore = this.store),
                      (s.languageUtils = i),
                      (s.pluralResolver = new $(i, {
                        prepend: this.options.pluralSeparator,
                        compatibilityJSON: this.options.compatibilityJSON,
                        simplifyPluralSuffix: this.options.simplifyPluralSuffix,
                      })),
                      (s.interpolator = new I(this.options)),
                      (s.utils = {
                        hasLoadedNamespace: this.hasLoadedNamespace.bind(this),
                      }),
                      (s.backendConnector = new F(
                        r(this.modules.backend),
                        s.resourceStore,
                        s,
                        this.options,
                      )),
                      s.backendConnector.on('*', function(t) {
                        for (
                          var n = arguments.length,
                            r = new Array(n > 1 ? n - 1 : 0),
                            i = 1;
                          i < n;
                          i++
                        )
                          r[i - 1] = arguments[i]
                        e.emit.apply(e, [t].concat(r))
                      }),
                      this.modules.languageDetector &&
                        ((s.languageDetector = r(
                          this.modules.languageDetector,
                        )),
                        s.languageDetector.init(
                          s,
                          this.options.detection,
                          this.options,
                        )),
                      this.modules.i18nFormat &&
                        ((s.i18nFormat = r(this.modules.i18nFormat)),
                        s.i18nFormat.init && s.i18nFormat.init(this)),
                      (this.translator = new A(this.services, this.options)),
                      this.translator.on('*', function(t) {
                        for (
                          var n = arguments.length,
                            r = new Array(n > 1 ? n - 1 : 0),
                            i = 1;
                          i < n;
                          i++
                        )
                          r[i - 1] = arguments[i]
                        e.emit.apply(e, [t].concat(r))
                      }),
                      this.modules.external.forEach(function(t) {
                        t.init && t.init(e)
                      })
                  }
                  if (
                    this.options.fallbackLng &&
                    !this.services.languageDetector &&
                    !this.options.lng
                  ) {
                    var a = this.services.languageUtils.getFallbackCodes(
                      this.options.fallbackLng,
                    )
                    a.length > 0 && 'dev' !== a[0] && (this.options.lng = a[0])
                  }
                  this.services.languageDetector ||
                    this.options.lng ||
                    this.logger.warn(
                      'init: no languageDetector is used and no lng is defined',
                    )
                  var u = [
                    'getResource',
                    'hasResourceBundle',
                    'getResourceBundle',
                    'getDataByLanguage',
                  ]
                  u.forEach(function(t) {
                    e[t] = function() {
                      var n
                      return (n = e.store)[t].apply(n, arguments)
                    }
                  })
                  var c = [
                    'addResource',
                    'addResources',
                    'addResourceBundle',
                    'removeResourceBundle',
                  ]
                  c.forEach(function(t) {
                    e[t] = function() {
                      var n
                      return (n = e.store)[t].apply(n, arguments), e
                    }
                  })
                  var l = v(),
                    h = function() {
                      var t = function(t, r) {
                        e.isInitialized &&
                          e.logger.warn(
                            'init: i18next is already initialized. You should call init just once!',
                          ),
                          (e.isInitialized = !0),
                          e.options.isClone ||
                            e.logger.log('initialized', e.options),
                          e.emit('initialized', e.options),
                          l.resolve(r),
                          n(t, r)
                      }
                      if (
                        e.languages &&
                        'v1' !== e.options.compatibilityAPI &&
                        !e.isInitialized
                      )
                        return t(null, e.t.bind(e))
                      e.changeLanguage(e.options.lng, t)
                    }
                  return (
                    this.options.resources || !this.options.initImmediate
                      ? h()
                      : setTimeout(h, 0),
                    l
                  )
                },
              },
              {
                key: 'loadResources',
                value: function(e) {
                  var t = this,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : U,
                    r = n,
                    i = 'string' == typeof e ? e : this.language
                  if (
                    ('function' == typeof e && (r = e),
                    !this.options.resources ||
                      this.options.partialBundledLanguages)
                  ) {
                    if (i && 'cimode' === i.toLowerCase()) return r()
                    var o = [],
                      s = function(e) {
                        e &&
                          t.services.languageUtils
                            .toResolveHierarchy(e)
                            .forEach(function(e) {
                              o.indexOf(e) < 0 && o.push(e)
                            })
                      }
                    if (i) s(i)
                    else {
                      var a = this.services.languageUtils.getFallbackCodes(
                        this.options.fallbackLng,
                      )
                      a.forEach(function(e) {
                        return s(e)
                      })
                    }
                    this.options.preload &&
                      this.options.preload.forEach(function(e) {
                        return s(e)
                      }),
                      this.services.backendConnector.load(o, this.options.ns, r)
                  } else r(null)
                },
              },
              {
                key: 'reloadResources',
                value: function(e, t, n) {
                  var r = v()
                  return (
                    e || (e = this.languages),
                    t || (t = this.options.ns),
                    n || (n = U),
                    this.services.backendConnector.reload(e, t, function(e) {
                      r.resolve(), n(e)
                    }),
                    r
                  )
                },
              },
              {
                key: 'use',
                value: function(e) {
                  if (!e)
                    throw new Error(
                      'You are passing an undefined module! Please check the object you are passing to i18next.use()',
                    )
                  if (!e.type)
                    throw new Error(
                      'You are passing a wrong module! Please check the object you are passing to i18next.use()',
                    )
                  return (
                    'backend' === e.type && (this.modules.backend = e),
                    ('logger' === e.type || (e.log && e.warn && e.error)) &&
                      (this.modules.logger = e),
                    'languageDetector' === e.type &&
                      (this.modules.languageDetector = e),
                    'i18nFormat' === e.type && (this.modules.i18nFormat = e),
                    'postProcessor' === e.type && R.addPostProcessor(e),
                    '3rdParty' === e.type && this.modules.external.push(e),
                    this
                  )
                },
              },
              {
                key: 'changeLanguage',
                value: function(e, t) {
                  var n = this
                  this.isLanguageChangingTo = e
                  var r = v()
                  this.emit('languageChanging', e)
                  var i = function(e) {
                    var i =
                      'string' == typeof e
                        ? e
                        : n.services.languageUtils.getBestMatchFromCodes(e)
                    i &&
                      (n.language ||
                        ((n.language = i),
                        (n.languages = n.services.languageUtils.toResolveHierarchy(
                          i,
                        ))),
                      n.translator.language || n.translator.changeLanguage(i),
                      n.services.languageDetector &&
                        n.services.languageDetector.cacheUserLanguage(i)),
                      n.loadResources(i, function(e) {
                        !(function(e, i) {
                          i
                            ? ((n.language = i),
                              (n.languages = n.services.languageUtils.toResolveHierarchy(
                                i,
                              )),
                              n.translator.changeLanguage(i),
                              (n.isLanguageChangingTo = void 0),
                              n.emit('languageChanged', i),
                              n.logger.log('languageChanged', i))
                            : (n.isLanguageChangingTo = void 0),
                            r.resolve(function() {
                              return n.t.apply(n, arguments)
                            }),
                            t &&
                              t(e, function() {
                                return n.t.apply(n, arguments)
                              })
                        })(e, i)
                      })
                  }
                  return (
                    e ||
                    !this.services.languageDetector ||
                    this.services.languageDetector.async
                      ? !e &&
                        this.services.languageDetector &&
                        this.services.languageDetector.async
                        ? this.services.languageDetector.detect(i)
                        : i(e)
                      : i(this.services.languageDetector.detect()),
                    r
                  )
                },
              },
              {
                key: 'getFixedT',
                value: function(e, t) {
                  var n = this,
                    i = function e(t, i) {
                      var s
                      if ('object' !== r(i)) {
                        for (
                          var a = arguments.length,
                            u = new Array(a > 2 ? a - 2 : 0),
                            c = 2;
                          c < a;
                          c++
                        )
                          u[c - 2] = arguments[c]
                        s = n.options.overloadTranslationOptionHandler(
                          [t, i].concat(u),
                        )
                      } else s = o({}, i)
                      return (
                        (s.lng = s.lng || e.lng),
                        (s.lngs = s.lngs || e.lngs),
                        (s.ns = s.ns || e.ns),
                        n.t(t, s)
                      )
                    }
                  return (
                    'string' == typeof e ? (i.lng = e) : (i.lngs = e),
                    (i.ns = t),
                    i
                  )
                },
              },
              {
                key: 't',
                value: function() {
                  var e
                  return (
                    this.translator &&
                    (e = this.translator).translate.apply(e, arguments)
                  )
                },
              },
              {
                key: 'exists',
                value: function() {
                  var e
                  return (
                    this.translator &&
                    (e = this.translator).exists.apply(e, arguments)
                  )
                },
              },
              {
                key: 'setDefaultNamespace',
                value: function(e) {
                  this.options.defaultNS = e
                },
              },
              {
                key: 'hasLoadedNamespace',
                value: function(e) {
                  var t = this,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {}
                  if (!this.isInitialized)
                    return (
                      this.logger.warn(
                        'hasLoadedNamespace: i18next was not initialized',
                        this.languages,
                      ),
                      !1
                    )
                  if (!this.languages || !this.languages.length)
                    return (
                      this.logger.warn(
                        'hasLoadedNamespace: i18n.languages were undefined or empty',
                        this.languages,
                      ),
                      !1
                    )
                  var r = this.languages[0],
                    i = !!this.options && this.options.fallbackLng,
                    o = this.languages[this.languages.length - 1]
                  if ('cimode' === r.toLowerCase()) return !0
                  var s = function(e, n) {
                    var r =
                      t.services.backendConnector.state[
                        ''.concat(e, '|').concat(n)
                      ]
                    return -1 === r || 2 === r
                  }
                  if (n.precheck) {
                    var a = n.precheck(this, s)
                    if (void 0 !== a) return a
                  }
                  return (
                    !!this.hasResourceBundle(r, e) ||
                    !this.services.backendConnector.backend ||
                    !(!s(r, e) || (i && !s(o, e)))
                  )
                },
              },
              {
                key: 'loadNamespaces',
                value: function(e, t) {
                  var n = this,
                    r = v()
                  return this.options.ns
                    ? ('string' == typeof e && (e = [e]),
                      e.forEach(function(e) {
                        n.options.ns.indexOf(e) < 0 && n.options.ns.push(e)
                      }),
                      this.loadResources(function(e) {
                        r.resolve(), t && t(e)
                      }),
                      r)
                    : (t && t(), Promise.resolve())
                },
              },
              {
                key: 'loadLanguages',
                value: function(e, t) {
                  var n = v()
                  'string' == typeof e && (e = [e])
                  var r = this.options.preload || [],
                    i = e.filter(function(e) {
                      return r.indexOf(e) < 0
                    })
                  return i.length
                    ? ((this.options.preload = r.concat(i)),
                      this.loadResources(function(e) {
                        n.resolve(), t && t(e)
                      }),
                      n)
                    : (t && t(), Promise.resolve())
                },
              },
              {
                key: 'dir',
                value: function(e) {
                  return (
                    e ||
                      (e =
                        this.languages && this.languages.length > 0
                          ? this.languages[0]
                          : this.language),
                    e
                      ? [
                          'ar',
                          'shu',
                          'sqr',
                          'ssh',
                          'xaa',
                          'yhd',
                          'yud',
                          'aao',
                          'abh',
                          'abv',
                          'acm',
                          'acq',
                          'acw',
                          'acx',
                          'acy',
                          'adf',
                          'ads',
                          'aeb',
                          'aec',
                          'afb',
                          'ajp',
                          'apc',
                          'apd',
                          'arb',
                          'arq',
                          'ars',
                          'ary',
                          'arz',
                          'auz',
                          'avl',
                          'ayh',
                          'ayl',
                          'ayn',
                          'ayp',
                          'bbz',
                          'pga',
                          'he',
                          'iw',
                          'ps',
                          'pbt',
                          'pbu',
                          'pst',
                          'prp',
                          'prd',
                          'ug',
                          'ur',
                          'ydd',
                          'yds',
                          'yih',
                          'ji',
                          'yi',
                          'hbo',
                          'men',
                          'xmn',
                          'fa',
                          'jpr',
                          'peo',
                          'pes',
                          'prs',
                          'dv',
                          'sam',
                        ].indexOf(
                          this.services.languageUtils.getLanguagePartFromCode(
                            e,
                          ),
                        ) >= 0
                        ? 'rtl'
                        : 'ltr'
                      : 'rtl'
                  )
                },
              },
              {
                key: 'createInstance',
                value: function() {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    n = arguments.length > 1 ? arguments[1] : void 0
                  return new t(e, n)
                },
              },
              {
                key: 'cloneInstance',
                value: function() {
                  var e = this,
                    n =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    r =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : U,
                    i = o({}, this.options, n, {isClone: !0}),
                    s = new t(i),
                    a = ['store', 'services', 'language']
                  return (
                    a.forEach(function(t) {
                      s[t] = e[t]
                    }),
                    (s.services = o({}, this.services)),
                    (s.services.utils = {
                      hasLoadedNamespace: s.hasLoadedNamespace.bind(s),
                    }),
                    (s.translator = new A(s.services, s.options)),
                    s.translator.on('*', function(e) {
                      for (
                        var t = arguments.length,
                          n = new Array(t > 1 ? t - 1 : 0),
                          r = 1;
                        r < t;
                        r++
                      )
                        n[r - 1] = arguments[r]
                      s.emit.apply(s, [e].concat(n))
                    }),
                    s.init(i, r),
                    (s.translator.options = s.options),
                    (s.translator.backendConnector.services.utils = {
                      hasLoadedNamespace: s.hasLoadedNamespace.bind(s),
                    }),
                    s
                  )
                },
              },
            ]),
            t
          )
        })(y))()
      },
      265: () => {
        'use strict'
        try {
          self['workbox:core:6.5.0'] && _()
        } catch (e) {}
      },
      344: () => {
        'use strict'
        try {
          self['workbox:routing:6.5.0'] && _()
        } catch (e) {}
      },
      921: () => {
        'use strict'
        try {
          self['workbox:strategies:6.5.0'] && _()
        } catch (e) {}
      },
    },
    t = {}
  function n(r) {
    var i = t[r]
    if (void 0 !== i) return i.exports
    var o = (t[r] = {exports: {}})
    return e[r].call(o.exports, o, o.exports, n), o.exports
  }
  ;(n.d = (e, t) => {
    for (var r in t)
      n.o(t, r) &&
        !n.o(e, r) &&
        Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
  }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = e => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {value: 'Module'}),
        Object.defineProperty(e, '__esModule', {value: !0})
    }),
    (() => {
      n.S = {}
      var e = {},
        t = {}
      n.I = (r, i) => {
        i || (i = [])
        var o = t[r]
        if ((o || (o = t[r] = {}), !(i.indexOf(o) >= 0))) {
          if ((i.push(o), e[r])) return e[r]
          n.o(n.S, r) || (n.S[r] = {})
          var s = n.S[r],
            a = 'openmrs',
            u = (e, t, n, r) => {
              var i = (s[e] = s[e] || {}),
                o = i[t]
              ;(!o || (!o.loaded && (!r != !o.eager ? r : a > o.from))) &&
                (i[t] = {get: n, from: a, eager: !!r})
            },
            c = []
          return (
            'default' === r &&
              (u('dayjs', '1.11.0', () => () => n(982), 1),
              u('i18next', '19.9.2', () => () => n(240), 1)),
            (e[r] = c.length ? Promise.all(c).then(() => (e[r] = 1)) : 1)
          )
        }
      }
    })(),
    (() => {
      'use strict'
      n(265)
      class e extends Error {
        constructor(e, t) {
          super(
            (function(e) {
              let t = e
              for (
                var n = arguments.length,
                  r = new Array(n > 1 ? n - 1 : 0),
                  i = 1;
                i < n;
                i++
              )
                r[i - 1] = arguments[i]
              return r.length > 0 && (t += ` :: ${JSON.stringify(r)}`), t
            })(e, t),
          ),
            (this.name = e),
            (this.details = t)
        }
      }
      const t = new Set(),
        r = {
          googleAnalytics: 'googleAnalytics',
          precache: 'precache-v2',
          prefix: 'workbox',
          runtime: 'runtime',
          suffix: 'undefined' != typeof registration ? registration.scope : '',
        },
        i = e => {
          return (
            e ||
            ((t = r.runtime),
            [r.prefix, t, r.suffix].filter(e => e && e.length > 0).join('-'))
          )
          var t
        }
      function o(e, t) {
        const n = new URL(e)
        for (const e of t) n.searchParams.delete(e)
        return n.href
      }
      class s {
        constructor() {
          this.promise = new Promise((e, t) => {
            ;(this.resolve = e), (this.reject = t)
          })
        }
      }
      function a(e) {
        return new Promise(t => setTimeout(t, e))
      }
      const u =
        'object' == typeof global &&
        global &&
        global.Object === Object &&
        global
      var c = 'object' == typeof self && self && self.Object === Object && self
      const l = u || c || Function('return this')(),
        h = l.Symbol,
        f = Array.isArray
      var d = Object.prototype,
        p = d.hasOwnProperty,
        g = d.toString,
        y = h ? h.toStringTag : void 0
      var v = Object.prototype.toString
      var m = h ? h.toStringTag : void 0
      const b = function(e) {
          return null == e
            ? void 0 === e
              ? '[object Undefined]'
              : '[object Null]'
            : m && m in Object(e)
            ? (function(e) {
                var t = p.call(e, y),
                  n = e[y]
                try {
                  e[y] = void 0
                  var r = !0
                } catch (e) {}
                var i = g.call(e)
                return r && (t ? (e[y] = n) : delete e[y]), i
              })(e)
            : (function(e) {
                return v.call(e)
              })(e)
        },
        w = function(e) {
          return null != e && 'object' == typeof e
        }
      var _ = h ? h.prototype : void 0,
        k = _ ? _.toString : void 0
      const x = function e(t) {
        if ('string' == typeof t) return t
        if (f(t))
          return (
            (function(e, t) {
              for (
                var n = -1, r = null == e ? 0 : e.length, i = Array(r);
                ++n < r;

              )
                i[n] = t(e[n], n, e)
              return i
            })(t, e) + ''
          )
        if (
          (function(e) {
            return 'symbol' == typeof e || (w(e) && '[object Symbol]' == b(e))
          })(t)
        )
          return k ? k.call(t) : ''
        var n = t + ''
        return '0' == n && 1 / t == -1 / 0 ? '-0' : n
      }
      var S = /[\\^$.*+?()[\]{}|]/g,
        O = RegExp(S.source)
      const E = function(e) {
        return (e = null == (t = e) ? '' : x(t)) && O.test(e)
          ? e.replace(S, '\\$&')
          : e
        var t
      }
      var P = function(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }
          function a(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }
          function u(e) {
            var t
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t)
                    })).then(s, a)
          }
          u((r = r.apply(e, t || [])).next())
        })
      }
      function C(e) {
        return P(this, void 0, void 0, function*() {
          if (!(e <= 0)) return new Promise(t => setTimeout(t, e))
        })
      }
      const j = function(e) {
          var t = typeof e
          return null != e && ('object' == t || 'function' == t)
        },
        R = l['__core-js_shared__']
      var D,
        A = (D = /[^.]+$/.exec((R && R.keys && R.keys.IE_PROTO) || ''))
          ? 'Symbol(src)_1.' + D
          : ''
      var L = Function.prototype.toString
      var K = /^\[object .+?Constructor\]$/,
        T = Function.prototype,
        N = Object.prototype,
        M = T.toString,
        $ = N.hasOwnProperty,
        I = RegExp(
          '^' +
            M.call($)
              .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                '$1.*?',
              ) +
            '$',
        )
      const F = function(e) {
          return (
            !(!j(e) || ((t = e), A && A in t)) &&
            ((function(e) {
              if (!j(e)) return !1
              var t = b(e)
              return (
                '[object Function]' == t ||
                '[object GeneratorFunction]' == t ||
                '[object AsyncFunction]' == t ||
                '[object Proxy]' == t
              )
            })(e)
              ? I
              : K
            ).test(
              (function(e) {
                if (null != e) {
                  try {
                    return L.call(e)
                  } catch (e) {}
                  try {
                    return e + ''
                  } catch (e) {}
                }
                return ''
              })(e),
            )
          )
          var t
        },
        B = function(e, t) {
          var n = (function(e, t) {
            return null == e ? void 0 : e[t]
          })(e, t)
          return F(n) ? n : void 0
        },
        q = B(Object, 'create')
      var U = Object.prototype.hasOwnProperty
      var W = Object.prototype.hasOwnProperty
      function V(e) {
        var t = -1,
          n = null == e ? 0 : e.length
        for (this.clear(); ++t < n; ) {
          var r = e[t]
          this.set(r[0], r[1])
        }
      }
      ;(V.prototype.clear = function() {
        ;(this.__data__ = q ? q(null) : {}), (this.size = 0)
      }),
        (V.prototype.delete = function(e) {
          var t = this.has(e) && delete this.__data__[e]
          return (this.size -= t ? 1 : 0), t
        }),
        (V.prototype.get = function(e) {
          var t = this.__data__
          if (q) {
            var n = t[e]
            return '__lodash_hash_undefined__' === n ? void 0 : n
          }
          return U.call(t, e) ? t[e] : void 0
        }),
        (V.prototype.has = function(e) {
          var t = this.__data__
          return q ? void 0 !== t[e] : W.call(t, e)
        }),
        (V.prototype.set = function(e, t) {
          var n = this.__data__
          return (
            (this.size += this.has(e) ? 0 : 1),
            (n[e] = q && void 0 === t ? '__lodash_hash_undefined__' : t),
            this
          )
        })
      const H = V,
        z = function(e, t) {
          for (var n = e.length; n--; )
            if ((r = e[n][0]) === (i = t) || (r != r && i != i)) return n
          var r, i
          return -1
        }
      var Y = Array.prototype.splice
      function G(e) {
        var t = -1,
          n = null == e ? 0 : e.length
        for (this.clear(); ++t < n; ) {
          var r = e[t]
          this.set(r[0], r[1])
        }
      }
      ;(G.prototype.clear = function() {
        ;(this.__data__ = []), (this.size = 0)
      }),
        (G.prototype.delete = function(e) {
          var t = this.__data__,
            n = z(t, e)
          return !(
            n < 0 ||
            (n == t.length - 1 ? t.pop() : Y.call(t, n, 1), --this.size, 0)
          )
        }),
        (G.prototype.get = function(e) {
          var t = this.__data__,
            n = z(t, e)
          return n < 0 ? void 0 : t[n][1]
        }),
        (G.prototype.has = function(e) {
          return z(this.__data__, e) > -1
        }),
        (G.prototype.set = function(e, t) {
          var n = this.__data__,
            r = z(n, e)
          return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this
        })
      const J = G,
        Q = B(l, 'Map'),
        X = function(e, t) {
          var n,
            r,
            i = e.__data__
          return ('string' == (r = typeof (n = t)) ||
          'number' == r ||
          'symbol' == r ||
          'boolean' == r
          ? '__proto__' !== n
          : null === n)
            ? i['string' == typeof t ? 'string' : 'hash']
            : i.map
        }
      function Z(e) {
        var t = -1,
          n = null == e ? 0 : e.length
        for (this.clear(); ++t < n; ) {
          var r = e[t]
          this.set(r[0], r[1])
        }
      }
      ;(Z.prototype.clear = function() {
        ;(this.size = 0),
          (this.__data__ = {
            hash: new H(),
            map: new (Q || J)(),
            string: new H(),
          })
      }),
        (Z.prototype.delete = function(e) {
          var t = X(this, e).delete(e)
          return (this.size -= t ? 1 : 0), t
        }),
        (Z.prototype.get = function(e) {
          return X(this, e).get(e)
        }),
        (Z.prototype.has = function(e) {
          return X(this, e).has(e)
        }),
        (Z.prototype.set = function(e, t) {
          var n = X(this, e),
            r = n.size
          return n.set(e, t), (this.size += n.size == r ? 0 : 1), this
        })
      const ee = Z
      function te(e) {
        var t = -1,
          n = null == e ? 0 : e.length
        for (this.__data__ = new ee(); ++t < n; ) this.add(e[t])
      }
      ;(te.prototype.add = te.prototype.push = function(e) {
        return this.__data__.set(e, '__lodash_hash_undefined__'), this
      }),
        (te.prototype.has = function(e) {
          return this.__data__.has(e)
        })
      const ne = te,
        re = function(e) {
          return e != e
        },
        ie = function(e, t) {
          return (
            !(null == e || !e.length) &&
            (function(e, t, n) {
              return t == t
                ? (function(e, t, n) {
                    for (var r = n - 1, i = e.length; ++r < i; )
                      if (e[r] === t) return r
                    return -1
                  })(e, t, n)
                : (function(e, t, n, r) {
                    for (
                      var i = e.length, o = n + (r ? 1 : -1);
                      r ? o-- : ++o < i;

                    )
                      if (t(e[o], o, e)) return o
                    return -1
                  })(e, re, n)
            })(e, t, 0) > -1
          )
        },
        oe = function(e, t, n) {
          for (var r = -1, i = null == e ? 0 : e.length; ++r < i; )
            if (n(t, e[r])) return !0
          return !1
        },
        se = function(e, t) {
          return e.has(t)
        },
        ae = B(l, 'Set'),
        ue = function(e) {
          var t = -1,
            n = Array(e.size)
          return (
            e.forEach(function(e) {
              n[++t] = e
            }),
            n
          )
        },
        ce =
          ae && 1 / ue(new ae([, -0]))[1] == 1 / 0
            ? function(e) {
                return new ae(e)
              }
            : function() {},
        le = function(e) {
          return e && e.length
            ? (function(e, t, n) {
                var r = -1,
                  i = ie,
                  o = e.length,
                  s = !0,
                  a = [],
                  u = a
                if (n) (s = !1), (i = oe)
                else if (o >= 200) {
                  var c = t ? null : ce(e)
                  if (c) return ue(c)
                  ;(s = !1), (i = se), (u = new ne())
                } else u = t ? [] : a
                e: for (; ++r < o; ) {
                  var l = e[r],
                    h = t ? t(l) : l
                  if (((l = n || 0 !== l ? l : 0), s && h == h)) {
                    for (var f = u.length; f--; ) if (u[f] === h) continue e
                    t && u.push(h), a.push(l)
                  } else i(u, h, n) || (u !== a && u.push(h), a.push(l))
                }
                return a
              })(e)
            : []
        },
        he = 'omrs-spa-cache-v1',
        fe = [
          {revision: null, url: '011d289a8d88a2fdfd6c.woff'},
          {revision: null, url: '040426f99ff6e00b8650.woff'},
          {revision: null, url: '092493151c223670ee3a.woff2'},
          {revision: null, url: '0d8bb5b3ee5f5dac9e44.woff2'},
          {revision: null, url: '176f8f5bd5f02b3abfcf.woff2'},
          {revision: null, url: '18d00f739ff1e1c52db1.woff'},
          {revision: null, url: '2267169ee7270a22a963.woff'},
          {revision: null, url: '22fb8afba4ab1f093b6e.woff'},
          {revision: null, url: '2ba7bd2ec230f22f6b28.js'},
          {revision: null, url: '2de7bfeaf08fb03d4315.woff2'},
          {revision: null, url: '3254cfe8da4b4bdf5779.woff'},
          {revision: null, url: '41dba2ac8f3b89bba110.woff2'},
          {revision: null, url: '49ae34d4cc6b98c00c69.woff'},
          {revision: null, url: '4b08e01d805fa35d7bf7.woff2'},
          {revision: null, url: '57aab56f67155c247201.woff2'},
          {revision: null, url: '5a0649a56872700d9315.woff2'},
          {revision: null, url: '5a8e212f1c994e975f94.woff'},
          {revision: null, url: '79db67aca65f5285964a.woff'},
          {revision: null, url: '7d8125ff7f707231fd89.woff2'},
          {revision: null, url: '9360531f9bb817f917f0.woff'},
          {revision: null, url: 'b1d9d9904bfca8802a63.woff'},
          {revision: null, url: 'c18ee39fb002ad58b6dc.woff2'},
          {revision: null, url: 'cd92541b177652fffb6e.woff2'},
          {revision: null, url: 'cea99d3e3e13a3a599a0.woff'},
          {revision: null, url: 'd022bc70dc1bf7b3425d.woff2'},
          {revision: null, url: 'd9479e8023bef9cbd9bf.woff2'},
          {revision: null, url: 'f5b74d7ffcdf85b9dd60.woff2'},
          {revision: null, url: 'f6efe64b9b246e70f4e8.woff'},
          {revision: null, url: 'f87f3d87cea0dd0979bf.woff'},
          {revision: '30de494bd9e73ae96c18fd0c06fa422b', url: 'favicon.ico'},
          {revision: '18dc895b9723d370fea0437fa399a963', url: 'importmap.json'},
          {revision: null, url: 'importmap.json'},
          {revision: 'eb279cd54a9e9608c239081967042954', url: 'index.html'},
          {revision: '6b758b31ea00150986994edcfb033a94', url: 'logo-512.png'},
          {revision: 'b860db243392596e3b875bad9794b4e5', url: 'logo.svg'},
          {revision: 'c8029ffc488e99c63592dc5e9af23405', url: 'openmrs.css'},
          {revision: '1104154ddbcc19cfe47e92fb32071436', url: 'openmrs.js'},
          {
            revision: '2dbd8883a0f7597eaf47ec6995dfec2f',
            url: 'openmrs.js.LICENSE.txt',
          },
        ],
        de = ge('index.html'),
        pe = le(fe.map(({url: e}) => ge(e)))
      function ge(e) {
        return new URL(e, self.location.href).href
      }
      const ye = function(e, t) {
          for (var n = -1, r = t.length, i = e.length; ++n < r; )
            e[i + n] = t[n]
          return e
        },
        ve = function(e) {
          return w(e) && '[object Arguments]' == b(e)
        }
      var me = Object.prototype,
        be = me.hasOwnProperty,
        we = me.propertyIsEnumerable
      const _e = ve(
        (function() {
          return arguments
        })(),
      )
        ? ve
        : function(e) {
            return w(e) && be.call(e, 'callee') && !we.call(e, 'callee')
          }
      var ke = h ? h.isConcatSpreadable : void 0
      const xe = function(e) {
          return f(e) || _e(e) || !!(ke && e && e[ke])
        },
        Se = function e(t, n, r, i, o) {
          var s = -1,
            a = t.length
          for (r || (r = xe), o || (o = []); ++s < a; ) {
            var u = t[s]
            n > 0 && r(u)
              ? n > 1
                ? e(u, n - 1, r, i, o)
                : ye(o, u)
              : i || (o[o.length] = u)
          }
          return o
        },
        Oe = function(e) {
          return null != e && e.length ? Se(e, 1) : []
        }
      var Ee = function(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }
          function a(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }
          function u(e) {
            var t
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t)
                    })).then(s, a)
          }
          u((r = r.apply(e, t || [])).next())
        })
      }
      const Pe =
          'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : global,
        Ce = Object.keys,
        je = Array.isArray
      function Re(e, t) {
        return (
          'object' != typeof t ||
            Ce(t).forEach(function(n) {
              e[n] = t[n]
            }),
          e
        )
      }
      'undefined' == typeof Promise || Pe.Promise || (Pe.Promise = Promise)
      const De = Object.getPrototypeOf,
        Ae = {}.hasOwnProperty
      function Le(e, t) {
        return Ae.call(e, t)
      }
      function Ke(e, t) {
        'function' == typeof t && (t = t(De(e))),
          ('undefined' == typeof Reflect ? Ce : Reflect.ownKeys)(t).forEach(
            n => {
              Ne(e, n, t[n])
            },
          )
      }
      const Te = Object.defineProperty
      function Ne(e, t, n, r) {
        Te(
          e,
          t,
          Re(
            n && Le(n, 'get') && 'function' == typeof n.get
              ? {get: n.get, set: n.set, configurable: !0}
              : {value: n, configurable: !0, writable: !0},
            r,
          ),
        )
      }
      function Me(e) {
        return {
          from: function(t) {
            return (
              (e.prototype = Object.create(t.prototype)),
              Ne(e.prototype, 'constructor', e),
              {extend: Ke.bind(null, e.prototype)}
            )
          },
        }
      }
      const $e = Object.getOwnPropertyDescriptor
      function Ie(e, t) {
        let n
        return $e(e, t) || ((n = De(e)) && Ie(n, t))
      }
      const Fe = [].slice
      function Be(e, t, n) {
        return Fe.call(e, t, n)
      }
      function qe(e, t) {
        return t(e)
      }
      function Ue(e) {
        if (!e) throw new Error('Assertion Failed')
      }
      function We(e) {
        Pe.setImmediate ? setImmediate(e) : setTimeout(e, 0)
      }
      function Ve(e, t) {
        return e.reduce((e, n, r) => {
          var i = t(n, r)
          return i && (e[i[0]] = i[1]), e
        }, {})
      }
      function He(e, t) {
        if (Le(e, t)) return e[t]
        if (!t) return e
        if ('string' != typeof t) {
          for (var n = [], r = 0, i = t.length; r < i; ++r) {
            var o = He(e, t[r])
            n.push(o)
          }
          return n
        }
        var s = t.indexOf('.')
        if (-1 !== s) {
          var a = e[t.substr(0, s)]
          return void 0 === a ? void 0 : He(a, t.substr(s + 1))
        }
      }
      function ze(e, t, n) {
        if (
          e &&
          void 0 !== t &&
          (!('isFrozen' in Object) || !Object.isFrozen(e))
        )
          if ('string' != typeof t && 'length' in t) {
            Ue('string' != typeof n && 'length' in n)
            for (var r = 0, i = t.length; r < i; ++r) ze(e, t[r], n[r])
          } else {
            var o = t.indexOf('.')
            if (-1 !== o) {
              var s = t.substr(0, o),
                a = t.substr(o + 1)
              if ('' === a)
                void 0 === n
                  ? je(e) && !isNaN(parseInt(s))
                    ? e.splice(s, 1)
                    : delete e[s]
                  : (e[s] = n)
              else {
                var u = e[s]
                u || (u = e[s] = {}), ze(u, a, n)
              }
            } else
              void 0 === n
                ? je(e) && !isNaN(parseInt(t))
                  ? e.splice(t, 1)
                  : delete e[t]
                : (e[t] = n)
          }
      }
      function Ye(e) {
        var t = {}
        for (var n in e) Le(e, n) && (t[n] = e[n])
        return t
      }
      const Ge = [].concat
      function Je(e) {
        return Ge.apply([], e)
      }
      const Qe = 'Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey'
          .split(',')
          .concat(
            Je(
              [8, 16, 32, 64].map(e =>
                ['Int', 'Uint', 'Float'].map(t => t + e + 'Array'),
              ),
            ),
          )
          .filter(e => Pe[e]),
        Xe = Qe.map(e => Pe[e])
      Ve(Qe, e => [e, !0])
      let Ze = null
      function et(e) {
        Ze = 'undefined' != typeof WeakMap && new WeakMap()
        const t = tt(e)
        return (Ze = null), t
      }
      function tt(e) {
        if (!e || 'object' != typeof e) return e
        let t = Ze && Ze.get(e)
        if (t) return t
        if (je(e)) {
          ;(t = []), Ze && Ze.set(e, t)
          for (var n = 0, r = e.length; n < r; ++n) t.push(tt(e[n]))
        } else if (Xe.indexOf(e.constructor) >= 0) t = e
        else {
          const n = De(e)
          for (var i in ((t = n === Object.prototype ? {} : Object.create(n)),
          Ze && Ze.set(e, t),
          e))
            Le(e, i) && (t[i] = tt(e[i]))
        }
        return t
      }
      const {toString: nt} = {}
      function rt(e) {
        return nt.call(e).slice(8, -1)
      }
      const it = 'undefined' != typeof Symbol ? Symbol.iterator : '@@iterator',
        ot =
          'symbol' == typeof it
            ? function(e) {
                var t
                return null != e && (t = e[it]) && t.apply(e)
              }
            : function() {
                return null
              },
        st = {}
      function at(e) {
        var t, n, r, i
        if (1 === arguments.length) {
          if (je(e)) return e.slice()
          if (this === st && 'string' == typeof e) return [e]
          if ((i = ot(e))) {
            for (n = []; !(r = i.next()).done; ) n.push(r.value)
            return n
          }
          if (null == e) return [e]
          if ('number' == typeof (t = e.length)) {
            for (n = new Array(t); t--; ) n[t] = e[t]
            return n
          }
          return [e]
        }
        for (t = arguments.length, n = new Array(t); t--; ) n[t] = arguments[t]
        return n
      }
      const ut =
        'undefined' != typeof Symbol
          ? e => 'AsyncFunction' === e[Symbol.toStringTag]
          : () => !1
      var ct =
        'undefined' != typeof location &&
        /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href)
      function lt(e, t) {
        ;(ct = e), (ht = t)
      }
      var ht = () => !0
      const ft = !new Error('').stack
      function dt() {
        if (ft)
          try {
            throw (dt.arguments, new Error())
          } catch (e) {
            return e
          }
        return new Error()
      }
      function pt(e, t) {
        var n = e.stack
        return n
          ? ((t = t || 0),
            0 === n.indexOf(e.name) &&
              (t += (e.name + e.message).split('\n').length),
            n
              .split('\n')
              .slice(t)
              .filter(ht)
              .map(e => '\n' + e)
              .join(''))
          : ''
      }
      var gt = [
          'Unknown',
          'Constraint',
          'Data',
          'TransactionInactive',
          'ReadOnly',
          'Version',
          'NotFound',
          'InvalidState',
          'InvalidAccess',
          'Abort',
          'Timeout',
          'QuotaExceeded',
          'Syntax',
          'DataClone',
        ],
        yt = [
          'Modify',
          'Bulk',
          'OpenFailed',
          'VersionChange',
          'Schema',
          'Upgrade',
          'InvalidTable',
          'MissingAPI',
          'NoSuchDatabase',
          'InvalidArgument',
          'SubTransaction',
          'Unsupported',
          'Internal',
          'DatabaseClosed',
          'PrematureCommit',
          'ForeignAwait',
        ].concat(gt),
        vt = {
          VersionChanged:
            'Database version changed by other database connection',
          DatabaseClosed: 'Database has been closed',
          Abort: 'Transaction aborted',
          TransactionInactive: 'Transaction has already completed or failed',
          MissingAPI:
            'IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb',
        }
      function mt(e, t) {
        ;(this._e = dt()), (this.name = e), (this.message = t)
      }
      function bt(e, t) {
        return (
          e +
          '. Errors: ' +
          Object.keys(t)
            .map(e => t[e].toString())
            .filter((e, t, n) => n.indexOf(e) === t)
            .join('\n')
        )
      }
      function wt(e, t, n, r) {
        ;(this._e = dt()),
          (this.failures = t),
          (this.failedKeys = r),
          (this.successCount = n),
          (this.message = bt(e, t))
      }
      function _t(e, t) {
        ;(this._e = dt()),
          (this.name = 'BulkError'),
          (this.failures = Object.keys(t).map(e => t[e])),
          (this.failuresByPos = t),
          (this.message = bt(e, t))
      }
      Me(mt)
        .from(Error)
        .extend({
          stack: {
            get: function() {
              return (
                this._stack ||
                (this._stack = this.name + ': ' + this.message + pt(this._e, 2))
              )
            },
          },
          toString: function() {
            return this.name + ': ' + this.message
          },
        }),
        Me(wt).from(mt),
        Me(_t).from(mt)
      var kt = yt.reduce((e, t) => ((e[t] = t + 'Error'), e), {})
      const xt = mt
      var St = yt.reduce((e, t) => {
        var n = t + 'Error'
        function r(e, r) {
          ;(this._e = dt()),
            (this.name = n),
            e
              ? 'string' == typeof e
                ? ((this.message = `${e}${r ? '\n ' + r : ''}`),
                  (this.inner = r || null))
                : 'object' == typeof e &&
                  ((this.message = `${e.name} ${e.message}`), (this.inner = e))
              : ((this.message = vt[t] || n), (this.inner = null))
        }
        return Me(r).from(xt), (e[t] = r), e
      }, {})
      ;(St.Syntax = SyntaxError), (St.Type = TypeError), (St.Range = RangeError)
      var Ot = gt.reduce((e, t) => ((e[t + 'Error'] = St[t]), e), {}),
        Et = yt.reduce(
          (e, t) => (
            -1 === ['Syntax', 'Type', 'Range'].indexOf(t) &&
              (e[t + 'Error'] = St[t]),
            e
          ),
          {},
        )
      function Pt() {}
      function Ct(e) {
        return e
      }
      function jt(e, t) {
        return null == e || e === Ct
          ? t
          : function(n) {
              return t(e(n))
            }
      }
      function Rt(e, t) {
        return function() {
          e.apply(this, arguments), t.apply(this, arguments)
        }
      }
      function Dt(e, t) {
        return e === Pt
          ? t
          : function() {
              var n = e.apply(this, arguments)
              void 0 !== n && (arguments[0] = n)
              var r = this.onsuccess,
                i = this.onerror
              ;(this.onsuccess = null), (this.onerror = null)
              var o = t.apply(this, arguments)
              return (
                r &&
                  (this.onsuccess = this.onsuccess ? Rt(r, this.onsuccess) : r),
                i && (this.onerror = this.onerror ? Rt(i, this.onerror) : i),
                void 0 !== o ? o : n
              )
            }
      }
      function At(e, t) {
        return e === Pt
          ? t
          : function() {
              e.apply(this, arguments)
              var n = this.onsuccess,
                r = this.onerror
              ;(this.onsuccess = this.onerror = null),
                t.apply(this, arguments),
                n &&
                  (this.onsuccess = this.onsuccess ? Rt(n, this.onsuccess) : n),
                r && (this.onerror = this.onerror ? Rt(r, this.onerror) : r)
            }
      }
      function Lt(e, t) {
        return e === Pt
          ? t
          : function(n) {
              var r = e.apply(this, arguments)
              Re(n, r)
              var i = this.onsuccess,
                o = this.onerror
              ;(this.onsuccess = null), (this.onerror = null)
              var s = t.apply(this, arguments)
              return (
                i &&
                  (this.onsuccess = this.onsuccess ? Rt(i, this.onsuccess) : i),
                o && (this.onerror = this.onerror ? Rt(o, this.onerror) : o),
                void 0 === r ? (void 0 === s ? void 0 : s) : Re(r, s)
              )
            }
      }
      function Kt(e, t) {
        return e === Pt
          ? t
          : function() {
              return !1 !== t.apply(this, arguments) && e.apply(this, arguments)
            }
      }
      function Tt(e, t) {
        return e === Pt
          ? t
          : function() {
              var n = e.apply(this, arguments)
              if (n && 'function' == typeof n.then) {
                for (
                  var r = this, i = arguments.length, o = new Array(i);
                  i--;

                )
                  o[i] = arguments[i]
                return n.then(function() {
                  return t.apply(r, o)
                })
              }
              return t.apply(this, arguments)
            }
      }
      ;(Et.ModifyError = wt), (Et.DexieError = mt), (Et.BulkError = _t)
      var Nt = {}
      const [Mt, $t, It] =
          'undefined' == typeof Promise
            ? []
            : (() => {
                let e = Promise.resolve()
                if ('undefined' == typeof crypto || !crypto.subtle)
                  return [e, De(e), e]
                const t = crypto.subtle.digest('SHA-512', new Uint8Array([0]))
                return [t, De(t), e]
              })(),
        Ft = $t && $t.then,
        Bt = Mt && Mt.constructor,
        qt = !!It
      var Ut = !1,
        Wt = It
          ? () => {
              It.then(pn)
            }
          : Pe.setImmediate
          ? setImmediate.bind(null, pn)
          : Pe.MutationObserver
          ? () => {
              var e = document.createElement('div')
              new MutationObserver(() => {
                pn(), (e = null)
              }).observe(e, {attributes: !0}),
                e.setAttribute('i', '1')
            }
          : () => {
              setTimeout(pn, 0)
            },
        Vt = function(e, t) {
          en.push([e, t]), zt && (Wt(), (zt = !1))
        },
        Ht = !0,
        zt = !0,
        Yt = [],
        Gt = [],
        Jt = null,
        Qt = Ct,
        Xt = {
          id: 'global',
          global: !0,
          ref: 0,
          unhandleds: [],
          onunhandled: $n,
          pgp: !1,
          env: {},
          finalize: function() {
            this.unhandleds.forEach(e => {
              try {
                $n(e[0], e[1])
              } catch (e) {}
            })
          },
        },
        Zt = Xt,
        en = [],
        tn = 0,
        nn = []
      function rn(e) {
        if ('object' != typeof this)
          throw new TypeError('Promises must be constructed via new')
        ;(this._listeners = []), (this.onuncatched = Pt), (this._lib = !1)
        var t = (this._PSD = Zt)
        if (
          (ct &&
            ((this._stackHolder = dt()),
            (this._prev = null),
            (this._numPrev = 0)),
          'function' != typeof e)
        ) {
          if (e !== Nt) throw new TypeError('Not a function')
          return (
            (this._state = arguments[1]),
            (this._value = arguments[2]),
            void (!1 === this._state && un(this, this._value))
          )
        }
        ;(this._state = null), (this._value = null), ++t.ref, an(this, e)
      }
      const on = {
        get: function() {
          var e = Zt,
            t = Sn
          function n(n, r) {
            var i = !e.global && (e !== Zt || t !== Sn)
            const o = i && !Cn()
            var s = new rn((t, s) => {
              ln(this, new sn(Nn(n, e, i, o), Nn(r, e, i, o), t, s, e))
            })
            return ct && dn(s, this), s
          }
          return (n.prototype = Nt), n
        },
        set: function(e) {
          Ne(
            this,
            'then',
            e && e.prototype === Nt
              ? on
              : {
                  get: function() {
                    return e
                  },
                  set: on.set,
                },
          )
        },
      }
      function sn(e, t, n, r, i) {
        ;(this.onFulfilled = 'function' == typeof e ? e : null),
          (this.onRejected = 'function' == typeof t ? t : null),
          (this.resolve = n),
          (this.reject = r),
          (this.psd = i)
      }
      function an(e, t) {
        try {
          t(t => {
            if (null === e._state) {
              if (t === e)
                throw new TypeError('A promise cannot be resolved with itself.')
              var n = e._lib && gn()
              t && 'function' == typeof t.then
                ? an(e, (e, n) => {
                    t instanceof rn ? t._then(e, n) : t.then(e, n)
                  })
                : ((e._state = !0), (e._value = t), cn(e)),
                n && yn()
            }
          }, un.bind(null, e))
        } catch (t) {
          un(e, t)
        }
      }
      function un(e, t) {
        if ((Gt.push(t), null === e._state)) {
          var n = e._lib && gn()
          ;(t = Qt(t)),
            (e._state = !1),
            (e._value = t),
            ct &&
              null !== t &&
              'object' == typeof t &&
              !t._promise &&
              (function(e, t, n) {
                try {
                  e.apply(null, void 0)
                } catch (e) {}
              })(() => {
                var n = Ie(t, 'stack')
                ;(t._promise = e),
                  Ne(t, 'stack', {
                    get: () =>
                      Ut ? n && (n.get ? n.get.apply(t) : n.value) : e.stack,
                  })
              }),
            (function(e) {
              Yt.some(t => t._value === e._value) || Yt.push(e)
            })(e),
            cn(e),
            n && yn()
        }
      }
      function cn(e) {
        var t = e._listeners
        e._listeners = []
        for (var n = 0, r = t.length; n < r; ++n) ln(e, t[n])
        var i = e._PSD
        --i.ref || i.finalize(),
          0 === tn &&
            (++tn,
            Vt(() => {
              0 == --tn && vn()
            }, []))
      }
      function ln(e, t) {
        if (null !== e._state) {
          var n = e._state ? t.onFulfilled : t.onRejected
          if (null === n) return (e._state ? t.resolve : t.reject)(e._value)
          ++t.psd.ref, ++tn, Vt(hn, [n, e, t])
        } else e._listeners.push(t)
      }
      function hn(e, t, n) {
        try {
          Jt = t
          var r,
            i = t._value
          t._state
            ? (r = e(i))
            : (Gt.length && (Gt = []),
              (r = e(i)),
              -1 === Gt.indexOf(i) &&
                (function(e) {
                  for (var t = Yt.length; t; )
                    if (Yt[--t]._value === e._value) return void Yt.splice(t, 1)
                })(t)),
            n.resolve(r)
        } catch (e) {
          n.reject(e)
        } finally {
          ;(Jt = null), 0 == --tn && vn(), --n.psd.ref || n.psd.finalize()
        }
      }
      function fn(e, t, n) {
        if (t.length === n) return t
        var r = ''
        if (!1 === e._state) {
          var i,
            o,
            s = e._value
          null != s
            ? ((i = s.name || 'Error'), (o = s.message || s), (r = pt(s, 0)))
            : ((i = s), (o = '')),
            t.push(i + (o ? ': ' + o : '') + r)
        }
        return (
          ct &&
            ((r = pt(e._stackHolder, 2)) && -1 === t.indexOf(r) && t.push(r),
            e._prev && fn(e._prev, t, n)),
          t
        )
      }
      function dn(e, t) {
        var n = t ? t._numPrev + 1 : 0
        n < 100 && ((e._prev = t), (e._numPrev = n))
      }
      function pn() {
        gn() && yn()
      }
      function gn() {
        var e = Ht
        return (Ht = !1), (zt = !1), e
      }
      function yn() {
        var e, t, n
        do {
          for (; en.length > 0; )
            for (e = en, en = [], n = e.length, t = 0; t < n; ++t) {
              var r = e[t]
              r[0].apply(null, r[1])
            }
        } while (en.length > 0)
        ;(Ht = !0), (zt = !0)
      }
      function vn() {
        var e = Yt
        ;(Yt = []),
          e.forEach(e => {
            e._PSD.onunhandled.call(null, e._value, e)
          })
        for (var t = nn.slice(0), n = t.length; n; ) t[--n]()
      }
      function mn(e) {
        return new rn(Nt, !1, e)
      }
      function bn(e, t) {
        var n = Zt
        return function() {
          var r = gn(),
            i = Zt
          try {
            return An(n, !0), e.apply(this, arguments)
          } catch (e) {
            t && t(e)
          } finally {
            An(i, !1), r && yn()
          }
        }
      }
      Ke(rn.prototype, {
        then: on,
        _then: function(e, t) {
          ln(this, new sn(null, null, e, t, Zt))
        },
        catch: function(e) {
          if (1 === arguments.length) return this.then(null, e)
          var t = arguments[0],
            n = arguments[1]
          return 'function' == typeof t
            ? this.then(null, e => (e instanceof t ? n(e) : mn(e)))
            : this.then(null, e => (e && e.name === t ? n(e) : mn(e)))
        },
        finally: function(e) {
          return this.then(
            t => (e(), t),
            t => (e(), mn(t)),
          )
        },
        stack: {
          get: function() {
            if (this._stack) return this._stack
            try {
              Ut = !0
              var e = fn(this, [], 20).join('\nFrom previous: ')
              return null !== this._state && (this._stack = e), e
            } finally {
              Ut = !1
            }
          },
        },
        timeout: function(e, t) {
          return e < 1 / 0
            ? new rn((n, r) => {
                var i = setTimeout(() => r(new St.Timeout(t)), e)
                this.then(n, r).finally(clearTimeout.bind(null, i))
              })
            : this
        },
      }),
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Ne(rn.prototype, Symbol.toStringTag, 'Dexie.Promise'),
        (Xt.env = Ln()),
        Ke(rn, {
          all: function() {
            var e = at.apply(null, arguments).map(jn)
            return new rn(function(t, n) {
              0 === e.length && t([])
              var r = e.length
              e.forEach((i, o) =>
                rn.resolve(i).then(n => {
                  ;(e[o] = n), --r || t(e)
                }, n),
              )
            })
          },
          resolve: e => {
            if (e instanceof rn) return e
            if (e && 'function' == typeof e.then)
              return new rn((t, n) => {
                e.then(t, n)
              })
            var t = new rn(Nt, !0, e)
            return dn(t, Jt), t
          },
          reject: mn,
          race: function() {
            var e = at.apply(null, arguments).map(jn)
            return new rn((t, n) => {
              e.map(e => rn.resolve(e).then(t, n))
            })
          },
          PSD: {get: () => Zt, set: e => (Zt = e)},
          totalEchoes: {get: () => Sn},
          newPSD: En,
          usePSD: Kn,
          scheduler: {
            get: () => Vt,
            set: e => {
              Vt = e
            },
          },
          rejectionMapper: {
            get: () => Qt,
            set: e => {
              Qt = e
            },
          },
          follow: (e, t) =>
            new rn((n, r) =>
              En(
                (t, n) => {
                  var r = Zt
                  ;(r.unhandleds = []),
                    (r.onunhandled = n),
                    (r.finalize = Rt(function() {
                      !(function(e) {
                        nn.push(function t() {
                          e(), nn.splice(nn.indexOf(t), 1)
                        }),
                          ++tn,
                          Vt(() => {
                            0 == --tn && vn()
                          }, [])
                      })(() => {
                        0 === this.unhandleds.length
                          ? t()
                          : n(this.unhandleds[0])
                      })
                    }, r.finalize)),
                    e()
                },
                t,
                n,
                r,
              ),
            ),
        }),
        Bt &&
          (Bt.allSettled &&
            Ne(rn, 'allSettled', function() {
              const e = at.apply(null, arguments).map(jn)
              return new rn(t => {
                0 === e.length && t([])
                let n = e.length
                const r = new Array(n)
                e.forEach((e, i) =>
                  rn
                    .resolve(e)
                    .then(
                      e => (r[i] = {status: 'fulfilled', value: e}),
                      e => (r[i] = {status: 'rejected', reason: e}),
                    )
                    .then(() => --n || t(r)),
                )
              })
            }),
          Bt.any &&
            'undefined' != typeof AggregateError &&
            Ne(rn, 'any', function() {
              const e = at.apply(null, arguments).map(jn)
              return new rn((t, n) => {
                0 === e.length && n(new AggregateError([]))
                let r = e.length
                const i = new Array(r)
                e.forEach((e, o) =>
                  rn.resolve(e).then(
                    e => t(e),
                    e => {
                      ;(i[o] = e), --r || n(new AggregateError(i))
                    },
                  ),
                )
              })
            }))
      const wn = {awaits: 0, echoes: 0, id: 0}
      var _n = 0,
        kn = [],
        xn = 0,
        Sn = 0,
        On = 0
      function En(e, t, n, r) {
        var i = Zt,
          o = Object.create(i)
        ;(o.parent = i), (o.ref = 0), (o.global = !1), (o.id = ++On)
        var s = Xt.env
        ;(o.env = qt
          ? {
              Promise: rn,
              PromiseProp: {value: rn, configurable: !0, writable: !0},
              all: rn.all,
              race: rn.race,
              allSettled: rn.allSettled,
              any: rn.any,
              resolve: rn.resolve,
              reject: rn.reject,
              nthen: Mn(s.nthen, o),
              gthen: Mn(s.gthen, o),
            }
          : {}),
          t && Re(o, t),
          ++i.ref,
          (o.finalize = function() {
            --this.parent.ref || this.parent.finalize()
          })
        var a = Kn(o, e, n, r)
        return 0 === o.ref && o.finalize(), a
      }
      function Pn() {
        return wn.id || (wn.id = ++_n), ++wn.awaits, (wn.echoes += 100), wn.id
      }
      function Cn() {
        return (
          !!wn.awaits &&
          (0 == --wn.awaits && (wn.id = 0), (wn.echoes = 100 * wn.awaits), !0)
        )
      }
      function jn(e) {
        return wn.echoes && e && e.constructor === Bt
          ? (Pn(),
            e.then(
              e => (Cn(), e),
              e => (Cn(), In(e)),
            ))
          : e
      }
      function Rn(e) {
        ++Sn,
          (wn.echoes && 0 != --wn.echoes) || (wn.echoes = wn.id = 0),
          kn.push(Zt),
          An(e, !0)
      }
      function Dn() {
        var e = kn[kn.length - 1]
        kn.pop(), An(e, !1)
      }
      function An(e, t) {
        var n = Zt
        if (
          ((t ? !wn.echoes || (xn++ && e === Zt) : !xn || (--xn && e === Zt)) ||
            Tn(t ? Rn.bind(null, e) : Dn),
          e !== Zt && ((Zt = e), n === Xt && (Xt.env = Ln()), qt))
        ) {
          var r = Xt.env.Promise,
            i = e.env
          ;($t.then = i.nthen),
            (r.prototype.then = i.gthen),
            (n.global || e.global) &&
              (Object.defineProperty(Pe, 'Promise', i.PromiseProp),
              (r.all = i.all),
              (r.race = i.race),
              (r.resolve = i.resolve),
              (r.reject = i.reject),
              i.allSettled && (r.allSettled = i.allSettled),
              i.any && (r.any = i.any))
        }
      }
      function Ln() {
        var e = Pe.Promise
        return qt
          ? {
              Promise: e,
              PromiseProp: Object.getOwnPropertyDescriptor(Pe, 'Promise'),
              all: e.all,
              race: e.race,
              allSettled: e.allSettled,
              any: e.any,
              resolve: e.resolve,
              reject: e.reject,
              nthen: $t.then,
              gthen: e.prototype.then,
            }
          : {}
      }
      function Kn(e, t, n, r, i) {
        var o = Zt
        try {
          return An(e, !0), t(n, r, i)
        } finally {
          An(o, !1)
        }
      }
      function Tn(e) {
        Ft.call(Mt, e)
      }
      function Nn(e, t, n, r) {
        return 'function' != typeof e
          ? e
          : function() {
              var i = Zt
              n && Pn(), An(t, !0)
              try {
                return e.apply(this, arguments)
              } finally {
                An(i, !1), r && Tn(Cn)
              }
            }
      }
      function Mn(e, t) {
        return function(n, r) {
          return e.call(this, Nn(n, t), Nn(r, t))
        }
      }
      function $n(e, t) {
        var n
        try {
          n = t.onuncatched(e)
        } catch (e) {}
        if (!1 !== n)
          try {
            var r,
              i = {promise: t, reason: e}
            if (
              (Pe.document && document.createEvent
                ? ((r = document.createEvent('Event')).initEvent(
                    'unhandledrejection',
                    !0,
                    !0,
                  ),
                  Re(r, i))
                : Pe.CustomEvent &&
                  Re(
                    (r = new CustomEvent('unhandledrejection', {detail: i})),
                    i,
                  ),
              r &&
                Pe.dispatchEvent &&
                (dispatchEvent(r),
                !Pe.PromiseRejectionEvent && Pe.onunhandledrejection))
            )
              try {
                Pe.onunhandledrejection(r)
              } catch (e) {}
            ct &&
              r &&
              !r.defaultPrevented &&
              console.warn(`Unhandled rejection: ${e.stack || e}`)
          } catch (e) {}
      }
      ;-1 === ('' + Ft).indexOf('[native code]') && (Pn = Cn = Pt)
      var In = rn.reject
      function Fn(e, t, n, r) {
        if (e.idbdb && (e._state.openComplete || Zt.letThrough || e._vip)) {
          var i = e._createTransaction(t, n, e._dbSchema)
          try {
            i.create(), (e._state.PR1398_maxLoop = 3)
          } catch (i) {
            return i.name === kt.InvalidState &&
              e.isOpen() &&
              --e._state.PR1398_maxLoop > 0
              ? (console.warn('Dexie: Need to reopen db'),
                e._close(),
                e.open().then(() => Fn(e, t, n, r)))
              : In(i)
          }
          return i
            ._promise(t, (e, t) => En(() => ((Zt.trans = i), r(e, t, i))))
            .then(e => i._completion.then(() => e))
        }
        if (e._state.openComplete)
          return In(new St.DatabaseClosed(e._state.dbOpenError))
        if (!e._state.isBeingOpened) {
          if (!e._options.autoOpen) return In(new St.DatabaseClosed())
          e.open().catch(Pt)
        }
        return e._state.dbReadyPromise.then(() => Fn(e, t, n, r))
      }
      const Bn = String.fromCharCode(65535),
        qn =
          'Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.',
        Un = [],
        Wn =
          'undefined' != typeof navigator &&
          /(MSIE|Trident|Edge)/.test(navigator.userAgent),
        Vn = Wn,
        Hn = Wn,
        zn = e => !/(dexie\.js|dexie\.min\.js)/.test(e)
      function Yn(e, t) {
        return e
          ? t
            ? function() {
                return e.apply(this, arguments) && t.apply(this, arguments)
              }
            : e
          : t
      }
      const Gn = {
        type: 3,
        lower: -1 / 0,
        lowerOpen: !1,
        upper: [[]],
        upperOpen: !1,
      }
      function Jn(e) {
        return 'string' != typeof e || /\./.test(e)
          ? e => e
          : t => (void 0 === t[e] && e in t && delete (t = et(t))[e], t)
      }
      class Qn {
        _trans(e, t, n) {
          const r = this._tx || Zt.trans,
            i = this.name
          function o(e, n, r) {
            if (!r.schema[i])
              throw new St.NotFound('Table ' + i + ' not part of transaction')
            return t(r.idbtrans, r)
          }
          const s = gn()
          try {
            return r && r.db === this.db
              ? r === Zt.trans
                ? r._promise(e, o, n)
                : En(() => r._promise(e, o, n), {
                    trans: r,
                    transless: Zt.transless || Zt,
                  })
              : Fn(this.db, e, [this.name], o)
          } finally {
            s && yn()
          }
        }
        get(e, t) {
          return e && e.constructor === Object
            ? this.where(e).first(t)
            : this._trans('readonly', t =>
                this.core
                  .get({trans: t, key: e})
                  .then(e => this.hook.reading.fire(e)),
              ).then(t)
        }
        where(e) {
          if ('string' == typeof e) return new this.db.WhereClause(this, e)
          if (je(e)) return new this.db.WhereClause(this, `[${e.join('+')}]`)
          const t = Ce(e)
          if (1 === t.length) return this.where(t[0]).equals(e[t[0]])
          const n = this.schema.indexes
            .concat(this.schema.primKey)
            .filter(
              e =>
                e.compound &&
                t.every(t => e.keyPath.indexOf(t) >= 0) &&
                e.keyPath.every(e => t.indexOf(e) >= 0),
            )[0]
          if (n && this.db._maxKey !== Bn)
            return this.where(n.name).equals(n.keyPath.map(t => e[t]))
          !n &&
            ct &&
            console.warn(
              `The query ${JSON.stringify(e)} on ${
                this.name
              } would benefit of a compound index [${t.join('+')}]`,
            )
          const {idxByName: r} = this.schema,
            i = this.db._deps.indexedDB
          function o(e, t) {
            try {
              return 0 === i.cmp(e, t)
            } catch (e) {
              return !1
            }
          }
          const [s, a] = t.reduce(
            ([t, n], i) => {
              const s = r[i],
                a = e[i]
              return [
                t || s,
                t || !s
                  ? Yn(
                      n,
                      s && s.multi
                        ? e => {
                            const t = He(e, i)
                            return je(t) && t.some(e => o(a, e))
                          }
                        : e => o(a, He(e, i)),
                    )
                  : n,
              ]
            },
            [null, null],
          )
          return s
            ? this.where(s.name)
                .equals(e[s.keyPath])
                .filter(a)
            : n
            ? this.filter(a)
            : this.where(t).equals('')
        }
        filter(e) {
          return this.toCollection().and(e)
        }
        count(e) {
          return this.toCollection().count(e)
        }
        offset(e) {
          return this.toCollection().offset(e)
        }
        limit(e) {
          return this.toCollection().limit(e)
        }
        each(e) {
          return this.toCollection().each(e)
        }
        toArray(e) {
          return this.toCollection().toArray(e)
        }
        toCollection() {
          return new this.db.Collection(new this.db.WhereClause(this))
        }
        orderBy(e) {
          return new this.db.Collection(
            new this.db.WhereClause(this, je(e) ? `[${e.join('+')}]` : e),
          )
        }
        reverse() {
          return this.toCollection().reverse()
        }
        mapToClass(e) {
          this.schema.mappedClass = e
          const t = t => {
            if (!t) return t
            const n = Object.create(e.prototype)
            for (var r in t)
              if (Le(t, r))
                try {
                  n[r] = t[r]
                } catch (e) {}
            return n
          }
          return (
            this.schema.readHook &&
              this.hook.reading.unsubscribe(this.schema.readHook),
            (this.schema.readHook = t),
            this.hook('reading', t),
            e
          )
        }
        defineClass() {
          return this.mapToClass(function(e) {
            Re(this, e)
          })
        }
        add(e, t) {
          const {auto: n, keyPath: r} = this.schema.primKey
          let i = e
          return (
            r && n && (i = Jn(r)(e)),
            this._trans('readwrite', e =>
              this.core.mutate({
                trans: e,
                type: 'add',
                keys: null != t ? [t] : null,
                values: [i],
              }),
            )
              .then(e =>
                e.numFailures ? rn.reject(e.failures[0]) : e.lastResult,
              )
              .then(t => {
                if (r)
                  try {
                    ze(e, r, t)
                  } catch (e) {}
                return t
              })
          )
        }
        update(e, t) {
          if ('object' != typeof e || je(e))
            return this.where(':id')
              .equals(e)
              .modify(t)
          {
            const n = He(e, this.schema.primKey.keyPath)
            if (void 0 === n)
              return In(
                new St.InvalidArgument(
                  'Given object does not contain its primary key',
                ),
              )
            try {
              'function' != typeof t
                ? Ce(t).forEach(n => {
                    ze(e, n, t[n])
                  })
                : t(e, {value: e, primKey: n})
            } catch (e) {}
            return this.where(':id')
              .equals(n)
              .modify(t)
          }
        }
        put(e, t) {
          const {auto: n, keyPath: r} = this.schema.primKey
          let i = e
          return (
            r && n && (i = Jn(r)(e)),
            this._trans('readwrite', e =>
              this.core.mutate({
                trans: e,
                type: 'put',
                values: [i],
                keys: null != t ? [t] : null,
              }),
            )
              .then(e =>
                e.numFailures ? rn.reject(e.failures[0]) : e.lastResult,
              )
              .then(t => {
                if (r)
                  try {
                    ze(e, r, t)
                  } catch (e) {}
                return t
              })
          )
        }
        delete(e) {
          return this._trans('readwrite', t =>
            this.core.mutate({trans: t, type: 'delete', keys: [e]}),
          ).then(e => (e.numFailures ? rn.reject(e.failures[0]) : void 0))
        }
        clear() {
          return this._trans('readwrite', e =>
            this.core.mutate({trans: e, type: 'deleteRange', range: Gn}),
          ).then(e => (e.numFailures ? rn.reject(e.failures[0]) : void 0))
        }
        bulkGet(e) {
          return this._trans('readonly', t =>
            this.core
              .getMany({keys: e, trans: t})
              .then(e => e.map(e => this.hook.reading.fire(e))),
          )
        }
        bulkAdd(e, t, n) {
          const r = Array.isArray(t) ? t : void 0,
            i = (n = n || (r ? void 0 : t)) ? n.allKeys : void 0
          return this._trans('readwrite', t => {
            const {auto: n, keyPath: o} = this.schema.primKey
            if (o && r)
              throw new St.InvalidArgument(
                'bulkAdd(): keys argument invalid on tables with inbound keys',
              )
            if (r && r.length !== e.length)
              throw new St.InvalidArgument(
                'Arguments objects and keys must have the same length',
              )
            const s = e.length
            let a = o && n ? e.map(Jn(o)) : e
            return this.core
              .mutate({
                trans: t,
                type: 'add',
                keys: r,
                values: a,
                wantResults: i,
              })
              .then(
                ({numFailures: e, results: t, lastResult: n, failures: r}) => {
                  if (0 === e) return i ? t : n
                  throw new _t(
                    `${this.name}.bulkAdd(): ${e} of ${s} operations failed`,
                    r,
                  )
                },
              )
          })
        }
        bulkPut(e, t, n) {
          const r = Array.isArray(t) ? t : void 0,
            i = (n = n || (r ? void 0 : t)) ? n.allKeys : void 0
          return this._trans('readwrite', t => {
            const {auto: n, keyPath: o} = this.schema.primKey
            if (o && r)
              throw new St.InvalidArgument(
                'bulkPut(): keys argument invalid on tables with inbound keys',
              )
            if (r && r.length !== e.length)
              throw new St.InvalidArgument(
                'Arguments objects and keys must have the same length',
              )
            const s = e.length
            let a = o && n ? e.map(Jn(o)) : e
            return this.core
              .mutate({
                trans: t,
                type: 'put',
                keys: r,
                values: a,
                wantResults: i,
              })
              .then(
                ({numFailures: e, results: t, lastResult: n, failures: r}) => {
                  if (0 === e) return i ? t : n
                  throw new _t(
                    `${this.name}.bulkPut(): ${e} of ${s} operations failed`,
                    r,
                  )
                },
              )
          })
        }
        bulkDelete(e) {
          const t = e.length
          return this._trans('readwrite', t =>
            this.core.mutate({trans: t, type: 'delete', keys: e}),
          ).then(({numFailures: e, lastResult: n, failures: r}) => {
            if (0 === e) return n
            throw new _t(
              `${this.name}.bulkDelete(): ${e} of ${t} operations failed`,
              r,
            )
          })
        }
      }
      function Xn(e) {
        var t = {},
          n = function(n, r) {
            if (r) {
              for (var i = arguments.length, o = new Array(i - 1); --i; )
                o[i - 1] = arguments[i]
              return t[n].subscribe.apply(null, o), e
            }
            if ('string' == typeof n) return t[n]
          }
        n.addEventType = o
        for (var r = 1, i = arguments.length; r < i; ++r) o(arguments[r])
        return n
        function o(e, r, i) {
          if ('object' == typeof e) return s(e)
          r || (r = Kt), i || (i = Pt)
          var o = {
            subscribers: [],
            fire: i,
            subscribe: function(e) {
              ;-1 === o.subscribers.indexOf(e) &&
                (o.subscribers.push(e), (o.fire = r(o.fire, e)))
            },
            unsubscribe: function(e) {
              ;(o.subscribers = o.subscribers.filter(function(t) {
                return t !== e
              })),
                (o.fire = o.subscribers.reduce(r, i))
            },
          }
          return (t[e] = n[e] = o), o
        }
        function s(e) {
          Ce(e).forEach(function(t) {
            var n = e[t]
            if (je(n)) o(t, e[t][0], e[t][1])
            else {
              if ('asap' !== n)
                throw new St.InvalidArgument('Invalid event config')
              var r = o(t, Ct, function() {
                for (var e = arguments.length, t = new Array(e); e--; )
                  t[e] = arguments[e]
                r.subscribers.forEach(function(e) {
                  We(function() {
                    e.apply(null, t)
                  })
                })
              })
            }
          })
        }
      }
      function Zn(e, t) {
        return Me(t).from({prototype: e}), t
      }
      function er(e, t) {
        return (
          !(e.filter || e.algorithm || e.or) &&
          (t ? e.justLimit : !e.replayFilter)
        )
      }
      function tr(e, t) {
        e.filter = Yn(e.filter, t)
      }
      function nr(e, t, n) {
        var r = e.replayFilter
        ;(e.replayFilter = r ? () => Yn(r(), t()) : t), (e.justLimit = n && !r)
      }
      function rr(e, t) {
        if (e.isPrimKey) return t.primaryKey
        const n = t.getIndexByKeyPath(e.index)
        if (!n)
          throw new St.Schema(
            'KeyPath ' +
              e.index +
              ' on object store ' +
              t.name +
              ' is not indexed',
          )
        return n
      }
      function ir(e, t, n) {
        const r = rr(e, t.schema)
        return t.openCursor({
          trans: n,
          values: !e.keysOnly,
          reverse: 'prev' === e.dir,
          unique: !!e.unique,
          query: {index: r, range: e.range},
        })
      }
      function or(e, t, n, r) {
        const i = e.replayFilter ? Yn(e.filter, e.replayFilter()) : e.filter
        if (e.or) {
          const o = {},
            s = (e, n, r) => {
              if (
                !i ||
                i(
                  n,
                  r,
                  e => n.stop(e),
                  e => n.fail(e),
                )
              ) {
                var s = n.primaryKey,
                  a = '' + s
                '[object ArrayBuffer]' === a && (a = '' + new Uint8Array(s)),
                  Le(o, a) || ((o[a] = !0), t(e, n, r))
              }
            }
          return Promise.all([
            e.or._iterate(s, n),
            sr(ir(e, r, n), e.algorithm, s, !e.keysOnly && e.valueMapper),
          ])
        }
        return sr(
          ir(e, r, n),
          Yn(e.algorithm, i),
          t,
          !e.keysOnly && e.valueMapper,
        )
      }
      function sr(e, t, n, r) {
        var i = bn(r ? (e, t, i) => n(r(e), t, i) : n)
        return e.then(e => {
          if (e)
            return e.start(() => {
              var n = () => e.continue()
              ;(t &&
                !t(
                  e,
                  e => (n = e),
                  t => {
                    e.stop(t), (n = Pt)
                  },
                  t => {
                    e.fail(t), (n = Pt)
                  },
                )) ||
                i(e.value, e, e => (n = e)),
                n()
            })
        })
      }
      function ar(e, t) {
        try {
          const n = ur(e),
            r = ur(t)
          if (n !== r)
            return 'Array' === n
              ? 1
              : 'Array' === r
              ? -1
              : 'binary' === n
              ? 1
              : 'binary' === r
              ? -1
              : 'string' === n
              ? 1
              : 'string' === r
              ? -1
              : 'Date' === n
              ? 1
              : 'Date' !== r
              ? NaN
              : -1
          switch (n) {
            case 'number':
            case 'Date':
            case 'string':
              return e > t ? 1 : e < t ? -1 : 0
            case 'binary':
              return (function(e, t) {
                const n = e.length,
                  r = t.length,
                  i = n < r ? n : r
                for (let n = 0; n < i; ++n)
                  if (e[n] !== t[n]) return e[n] < t[n] ? -1 : 1
                return n === r ? 0 : n < r ? -1 : 1
              })(cr(e), cr(t))
            case 'Array':
              return (function(e, t) {
                const n = e.length,
                  r = t.length,
                  i = n < r ? n : r
                for (let n = 0; n < i; ++n) {
                  const r = ar(e[n], t[n])
                  if (0 !== r) return r
                }
                return n === r ? 0 : n < r ? -1 : 1
              })(e, t)
          }
        } catch (e) {}
        return NaN
      }
      function ur(e) {
        const t = typeof e
        if ('object' !== t) return t
        if (ArrayBuffer.isView(e)) return 'binary'
        const n = rt(e)
        return 'ArrayBuffer' === n ? 'binary' : n
      }
      function cr(e) {
        return e instanceof Uint8Array
          ? e
          : ArrayBuffer.isView(e)
          ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
          : new Uint8Array(e)
      }
      class lr {
        _read(e, t) {
          var n = this._ctx
          return n.error
            ? n.table._trans(null, In.bind(null, n.error))
            : n.table._trans('readonly', e).then(t)
        }
        _write(e) {
          var t = this._ctx
          return t.error
            ? t.table._trans(null, In.bind(null, t.error))
            : t.table._trans('readwrite', e, 'locked')
        }
        _addAlgorithm(e) {
          var t = this._ctx
          t.algorithm = Yn(t.algorithm, e)
        }
        _iterate(e, t) {
          return or(this._ctx, e, t, this._ctx.table.core)
        }
        clone(e) {
          var t = Object.create(this.constructor.prototype),
            n = Object.create(this._ctx)
          return e && Re(n, e), (t._ctx = n), t
        }
        raw() {
          return (this._ctx.valueMapper = null), this
        }
        each(e) {
          var t = this._ctx
          return this._read(n => or(t, e, n, t.table.core))
        }
        count(e) {
          return this._read(e => {
            const t = this._ctx,
              n = t.table.core
            if (er(t, !0))
              return n
                .count({
                  trans: e,
                  query: {index: rr(t, n.schema), range: t.range},
                })
                .then(e => Math.min(e, t.limit))
            var r = 0
            return or(t, () => (++r, !1), e, n).then(() => r)
          }).then(e)
        }
        sortBy(e, t) {
          const n = e.split('.').reverse(),
            r = n[0],
            i = n.length - 1
          function o(e, t) {
            return t ? o(e[n[t]], t - 1) : e[r]
          }
          var s = 'next' === this._ctx.dir ? 1 : -1
          function a(e, t) {
            var n = o(e, i),
              r = o(t, i)
            return n < r ? -s : n > r ? s : 0
          }
          return this.toArray(function(e) {
            return e.sort(a)
          }).then(t)
        }
        toArray(e) {
          return this._read(e => {
            var t = this._ctx
            if ('next' === t.dir && er(t, !0) && t.limit > 0) {
              const {valueMapper: n} = t,
                r = rr(t, t.table.core.schema)
              return t.table.core
                .query({
                  trans: e,
                  limit: t.limit,
                  values: !0,
                  query: {index: r, range: t.range},
                })
                .then(({result: e}) => (n ? e.map(n) : e))
            }
            {
              const n = []
              return or(t, e => n.push(e), e, t.table.core).then(() => n)
            }
          }, e)
        }
        offset(e) {
          var t = this._ctx
          return (
            e <= 0 ||
              ((t.offset += e),
              er(t)
                ? nr(t, () => {
                    var t = e
                    return (e, n) =>
                      0 === t ||
                      (1 === t
                        ? (--t, !1)
                        : (n(() => {
                            e.advance(t), (t = 0)
                          }),
                          !1))
                  })
                : nr(t, () => {
                    var t = e
                    return () => --t < 0
                  })),
            this
          )
        }
        limit(e) {
          return (
            (this._ctx.limit = Math.min(this._ctx.limit, e)),
            nr(
              this._ctx,
              () => {
                var t = e
                return function(e, n, r) {
                  return --t <= 0 && n(r), t >= 0
                }
              },
              !0,
            ),
            this
          )
        }
        until(e, t) {
          return (
            tr(this._ctx, function(n, r, i) {
              return !e(n.value) || (r(i), t)
            }),
            this
          )
        }
        first(e) {
          return this.limit(1)
            .toArray(function(e) {
              return e[0]
            })
            .then(e)
        }
        last(e) {
          return this.reverse().first(e)
        }
        filter(e) {
          var t, n
          return (
            tr(this._ctx, function(t) {
              return e(t.value)
            }),
            (t = this._ctx),
            (n = e),
            (t.isMatch = Yn(t.isMatch, n)),
            this
          )
        }
        and(e) {
          return this.filter(e)
        }
        or(e) {
          return new this.db.WhereClause(this._ctx.table, e, this)
        }
        reverse() {
          return (
            (this._ctx.dir = 'prev' === this._ctx.dir ? 'next' : 'prev'),
            this._ondirectionchange && this._ondirectionchange(this._ctx.dir),
            this
          )
        }
        desc() {
          return this.reverse()
        }
        eachKey(e) {
          var t = this._ctx
          return (
            (t.keysOnly = !t.isMatch),
            this.each(function(t, n) {
              e(n.key, n)
            })
          )
        }
        eachUniqueKey(e) {
          return (this._ctx.unique = 'unique'), this.eachKey(e)
        }
        eachPrimaryKey(e) {
          var t = this._ctx
          return (
            (t.keysOnly = !t.isMatch),
            this.each(function(t, n) {
              e(n.primaryKey, n)
            })
          )
        }
        keys(e) {
          var t = this._ctx
          t.keysOnly = !t.isMatch
          var n = []
          return this.each(function(e, t) {
            n.push(t.key)
          })
            .then(function() {
              return n
            })
            .then(e)
        }
        primaryKeys(e) {
          var t = this._ctx
          if ('next' === t.dir && er(t, !0) && t.limit > 0)
            return this._read(e => {
              var n = rr(t, t.table.core.schema)
              return t.table.core.query({
                trans: e,
                values: !1,
                limit: t.limit,
                query: {index: n, range: t.range},
              })
            })
              .then(({result: e}) => e)
              .then(e)
          t.keysOnly = !t.isMatch
          var n = []
          return this.each(function(e, t) {
            n.push(t.primaryKey)
          })
            .then(function() {
              return n
            })
            .then(e)
        }
        uniqueKeys(e) {
          return (this._ctx.unique = 'unique'), this.keys(e)
        }
        firstKey(e) {
          return this.limit(1)
            .keys(function(e) {
              return e[0]
            })
            .then(e)
        }
        lastKey(e) {
          return this.reverse().firstKey(e)
        }
        distinct() {
          var e = this._ctx,
            t = e.index && e.table.schema.idxByName[e.index]
          if (!t || !t.multi) return this
          var n = {}
          return (
            tr(this._ctx, function(e) {
              var t = e.primaryKey.toString(),
                r = Le(n, t)
              return (n[t] = !0), !r
            }),
            this
          )
        }
        modify(e) {
          var t = this._ctx
          return this._write(n => {
            var r
            if ('function' == typeof e) r = e
            else {
              var i = Ce(e),
                o = i.length
              r = function(t) {
                for (var n = !1, r = 0; r < o; ++r) {
                  var s = i[r],
                    a = e[s]
                  He(t, s) !== a && (ze(t, s, a), (n = !0))
                }
                return n
              }
            }
            const s = t.table.core,
              {outbound: a, extractKey: u} = s.schema.primaryKey,
              c = this.db._options.modifyChunkSize || 200,
              l = []
            let h = 0
            const f = [],
              d = (e, t) => {
                const {failures: n, numFailures: r} = t
                h += e - r
                for (let e of Ce(n)) l.push(n[e])
              }
            return this.clone()
              .primaryKeys()
              .then(i => {
                const o = l => {
                  const h = Math.min(c, i.length - l)
                  return s
                    .getMany({
                      trans: n,
                      keys: i.slice(l, l + h),
                      cache: 'immutable',
                    })
                    .then(f => {
                      const p = [],
                        g = [],
                        y = a ? [] : null,
                        v = []
                      for (let e = 0; e < h; ++e) {
                        const t = f[e],
                          n = {value: et(t), primKey: i[l + e]}
                        !1 !== r.call(n, n.value, n) &&
                          (null == n.value
                            ? v.push(i[l + e])
                            : a || 0 === ar(u(t), u(n.value))
                            ? (g.push(n.value), a && y.push(i[l + e]))
                            : (v.push(i[l + e]), p.push(n.value)))
                      }
                      const m = er(t) &&
                        t.limit === 1 / 0 &&
                        ('function' != typeof e || e === hr) && {
                          index: t.index,
                          range: t.range,
                        }
                      return Promise.resolve(
                        p.length > 0 &&
                          s
                            .mutate({trans: n, type: 'add', values: p})
                            .then(e => {
                              for (let t in e.failures) v.splice(parseInt(t), 1)
                              d(p.length, e)
                            }),
                      )
                        .then(
                          () =>
                            (g.length > 0 || (m && 'object' == typeof e)) &&
                            s
                              .mutate({
                                trans: n,
                                type: 'put',
                                keys: y,
                                values: g,
                                criteria: m,
                                changeSpec: 'function' != typeof e && e,
                              })
                              .then(e => d(g.length, e)),
                        )
                        .then(
                          () =>
                            (v.length > 0 || (m && e === hr)) &&
                            s
                              .mutate({
                                trans: n,
                                type: 'delete',
                                keys: v,
                                criteria: m,
                              })
                              .then(e => d(v.length, e)),
                        )
                        .then(() => i.length > l + h && o(l + c))
                    })
                }
                return o(0).then(() => {
                  if (l.length > 0)
                    throw new wt('Error modifying one or more objects', l, h, f)
                  return i.length
                })
              })
          })
        }
        delete() {
          var e = this._ctx,
            t = e.range
          return er(e) && ((e.isPrimKey && !Hn) || 3 === t.type)
            ? this._write(n => {
                const {primaryKey: r} = e.table.core.schema,
                  i = t
                return e.table.core
                  .count({trans: n, query: {index: r, range: i}})
                  .then(t =>
                    e.table.core
                      .mutate({trans: n, type: 'deleteRange', range: i})
                      .then(
                        ({
                          failures: e,
                          lastResult: n,
                          results: r,
                          numFailures: i,
                        }) => {
                          if (i)
                            throw new wt(
                              'Could not delete some values',
                              Object.keys(e).map(t => e[t]),
                              t - i,
                            )
                          return t - i
                        },
                      ),
                  )
              })
            : this.modify(hr)
        }
      }
      const hr = (e, t) => (t.value = null)
      function fr(e, t) {
        return e < t ? -1 : e === t ? 0 : 1
      }
      function dr(e, t) {
        return e > t ? -1 : e === t ? 0 : 1
      }
      function pr(e, t, n) {
        var r = e instanceof wr ? new e.Collection(e) : e
        return (r._ctx.error = n ? new n(t) : new TypeError(t)), r
      }
      function gr(e) {
        return new e.Collection(e, () => br('')).limit(0)
      }
      function yr(e, t, n, r, i, o) {
        for (var s = Math.min(e.length, r.length), a = -1, u = 0; u < s; ++u) {
          var c = t[u]
          if (c !== r[u])
            return i(e[u], n[u]) < 0
              ? e.substr(0, u) + n[u] + n.substr(u + 1)
              : i(e[u], r[u]) < 0
              ? e.substr(0, u) + r[u] + n.substr(u + 1)
              : a >= 0
              ? e.substr(0, a) + t[a] + n.substr(a + 1)
              : null
          i(e[u], c) < 0 && (a = u)
        }
        return s < r.length && 'next' === o
          ? e + n.substr(e.length)
          : s < e.length && 'prev' === o
          ? e.substr(0, n.length)
          : a < 0
          ? null
          : e.substr(0, a) + r[a] + n.substr(a + 1)
      }
      function vr(e, t, n, r) {
        var i,
          o,
          s,
          a,
          u,
          c,
          l,
          h = n.length
        if (!n.every(e => 'string' == typeof e))
          return pr(e, 'String expected.')
        function f(e) {
          ;(i = (function(e) {
            return 'next' === e ? e => e.toUpperCase() : e => e.toLowerCase()
          })(e)),
            (o = (function(e) {
              return 'next' === e ? e => e.toLowerCase() : e => e.toUpperCase()
            })(e)),
            (s = 'next' === e ? fr : dr)
          var t = n
            .map(function(e) {
              return {lower: o(e), upper: i(e)}
            })
            .sort(function(e, t) {
              return s(e.lower, t.lower)
            })
          ;(a = t.map(function(e) {
            return e.upper
          })),
            (u = t.map(function(e) {
              return e.lower
            })),
            (c = e),
            (l = 'next' === e ? '' : r)
        }
        f('next')
        var d = new e.Collection(e, () => mr(a[0], u[h - 1] + r))
        d._ondirectionchange = function(e) {
          f(e)
        }
        var p = 0
        return (
          d._addAlgorithm(function(e, n, r) {
            var i = e.key
            if ('string' != typeof i) return !1
            var f = o(i)
            if (t(f, u, p)) return !0
            for (var d = null, g = p; g < h; ++g) {
              var y = yr(i, f, a[g], u[g], s, c)
              null === y && null === d
                ? (p = g + 1)
                : (null === d || s(d, y) > 0) && (d = y)
            }
            return (
              n(
                null !== d
                  ? function() {
                      e.continue(d + l)
                    }
                  : r,
              ),
              !1
            )
          }),
          d
        )
      }
      function mr(e, t, n, r) {
        return {type: 2, lower: e, upper: t, lowerOpen: n, upperOpen: r}
      }
      function br(e) {
        return {type: 1, lower: e, upper: e}
      }
      class wr {
        get Collection() {
          return this._ctx.table.db.Collection
        }
        between(e, t, n, r) {
          ;(n = !1 !== n), (r = !0 === r)
          try {
            return this._cmp(e, t) > 0 ||
              (0 === this._cmp(e, t) && (n || r) && (!n || !r))
              ? gr(this)
              : new this.Collection(this, () => mr(e, t, !n, !r))
          } catch (e) {
            return pr(this, qn)
          }
        }
        equals(e) {
          return null == e
            ? pr(this, qn)
            : new this.Collection(this, () => br(e))
        }
        above(e) {
          return null == e
            ? pr(this, qn)
            : new this.Collection(this, () => mr(e, void 0, !0))
        }
        aboveOrEqual(e) {
          return null == e
            ? pr(this, qn)
            : new this.Collection(this, () => mr(e, void 0, !1))
        }
        below(e) {
          return null == e
            ? pr(this, qn)
            : new this.Collection(this, () => mr(void 0, e, !1, !0))
        }
        belowOrEqual(e) {
          return null == e
            ? pr(this, qn)
            : new this.Collection(this, () => mr(void 0, e))
        }
        startsWith(e) {
          return 'string' != typeof e
            ? pr(this, 'String expected.')
            : this.between(e, e + Bn, !0, !0)
        }
        startsWithIgnoreCase(e) {
          return '' === e
            ? this.startsWith(e)
            : vr(this, (e, t) => 0 === e.indexOf(t[0]), [e], Bn)
        }
        equalsIgnoreCase(e) {
          return vr(this, (e, t) => e === t[0], [e], '')
        }
        anyOfIgnoreCase() {
          var e = at.apply(st, arguments)
          return 0 === e.length
            ? gr(this)
            : vr(this, (e, t) => -1 !== t.indexOf(e), e, '')
        }
        startsWithAnyOfIgnoreCase() {
          var e = at.apply(st, arguments)
          return 0 === e.length
            ? gr(this)
            : vr(this, (e, t) => t.some(t => 0 === e.indexOf(t)), e, Bn)
        }
        anyOf() {
          const e = at.apply(st, arguments)
          let t = this._cmp
          try {
            e.sort(t)
          } catch (e) {
            return pr(this, qn)
          }
          if (0 === e.length) return gr(this)
          const n = new this.Collection(this, () => mr(e[0], e[e.length - 1]))
          n._ondirectionchange = n => {
            ;(t = 'next' === n ? this._ascending : this._descending), e.sort(t)
          }
          let r = 0
          return (
            n._addAlgorithm((n, i, o) => {
              const s = n.key
              for (; t(s, e[r]) > 0; )
                if ((++r, r === e.length)) return i(o), !1
              return (
                0 === t(s, e[r]) ||
                (i(() => {
                  n.continue(e[r])
                }),
                !1)
              )
            }),
            n
          )
        }
        notEqual(e) {
          return this.inAnyRange(
            [
              [-1 / 0, e],
              [e, this.db._maxKey],
            ],
            {includeLowers: !1, includeUppers: !1},
          )
        }
        noneOf() {
          const e = at.apply(st, arguments)
          if (0 === e.length) return new this.Collection(this)
          try {
            e.sort(this._ascending)
          } catch (e) {
            return pr(this, qn)
          }
          const t = e.reduce(
            (e, t) => (e ? e.concat([[e[e.length - 1][1], t]]) : [[-1 / 0, t]]),
            null,
          )
          return (
            t.push([e[e.length - 1], this.db._maxKey]),
            this.inAnyRange(t, {includeLowers: !1, includeUppers: !1})
          )
        }
        inAnyRange(e, t) {
          const n = this._cmp,
            r = this._ascending,
            i = this._descending,
            o = this._min,
            s = this._max
          if (0 === e.length) return gr(this)
          if (
            !e.every(
              e => void 0 !== e[0] && void 0 !== e[1] && r(e[0], e[1]) <= 0,
            )
          )
            return pr(
              this,
              'First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower',
              St.InvalidArgument,
            )
          const a = !t || !1 !== t.includeLowers,
            u = t && !0 === t.includeUppers
          let c,
            l = r
          function h(e, t) {
            return l(e[0], t[0])
          }
          try {
            ;(c = e.reduce(function(e, t) {
              let r = 0,
                i = e.length
              for (; r < i; ++r) {
                const i = e[r]
                if (n(t[0], i[1]) < 0 && n(t[1], i[0]) > 0) {
                  ;(i[0] = o(i[0], t[0])), (i[1] = s(i[1], t[1]))
                  break
                }
              }
              return r === i && e.push(t), e
            }, [])),
              c.sort(h)
          } catch (e) {
            return pr(this, qn)
          }
          let f = 0
          const d = u ? e => r(e, c[f][1]) > 0 : e => r(e, c[f][1]) >= 0,
            p = a ? e => i(e, c[f][0]) > 0 : e => i(e, c[f][0]) >= 0
          let g = d
          const y = new this.Collection(this, () =>
            mr(c[0][0], c[c.length - 1][1], !a, !u),
          )
          return (
            (y._ondirectionchange = e => {
              'next' === e ? ((g = d), (l = r)) : ((g = p), (l = i)), c.sort(h)
            }),
            y._addAlgorithm((e, t, n) => {
              for (var i = e.key; g(i); )
                if ((++f, f === c.length)) return t(n), !1
              return (
                !!(function(e) {
                  return !d(e) && !p(e)
                })(i) ||
                (0 === this._cmp(i, c[f][1]) ||
                  0 === this._cmp(i, c[f][0]) ||
                  t(() => {
                    l === r ? e.continue(c[f][0]) : e.continue(c[f][1])
                  }),
                !1)
              )
            }),
            y
          )
        }
        startsWithAnyOf() {
          const e = at.apply(st, arguments)
          return e.every(e => 'string' == typeof e)
            ? 0 === e.length
              ? gr(this)
              : this.inAnyRange(e.map(e => [e, e + Bn]))
            : pr(this, 'startsWithAnyOf() only works with strings')
        }
      }
      function _r(e) {
        return bn(function(t) {
          return kr(t), e(t.target.error), !1
        })
      }
      function kr(e) {
        e.stopPropagation && e.stopPropagation(),
          e.preventDefault && e.preventDefault()
      }
      const xr = Xn(null, 'storagemutated')
      class Sr {
        _lock() {
          return (
            Ue(!Zt.global),
            ++this._reculock,
            1 !== this._reculock || Zt.global || (Zt.lockOwnerFor = this),
            this
          )
        }
        _unlock() {
          if ((Ue(!Zt.global), 0 == --this._reculock))
            for (
              Zt.global || (Zt.lockOwnerFor = null);
              this._blockedFuncs.length > 0 && !this._locked();

            ) {
              var e = this._blockedFuncs.shift()
              try {
                Kn(e[1], e[0])
              } catch (e) {}
            }
          return this
        }
        _locked() {
          return this._reculock && Zt.lockOwnerFor !== this
        }
        create(e) {
          if (!this.mode) return this
          const t = this.db.idbdb,
            n = this.db._state.dbOpenError
          if ((Ue(!this.idbtrans), !e && !t))
            switch (n && n.name) {
              case 'DatabaseClosedError':
                throw new St.DatabaseClosed(n)
              case 'MissingAPIError':
                throw new St.MissingAPI(n.message, n)
              default:
                throw new St.OpenFailed(n)
            }
          if (!this.active) throw new St.TransactionInactive()
          return (
            Ue(null === this._completion._state),
            ((e = this.idbtrans =
              e ||
              (this.db.core
                ? this.db.core.transaction(this.storeNames, this.mode, {
                    durability: this.chromeTransactionDurability,
                  })
                : t.transaction(this.storeNames, this.mode, {
                    durability: this.chromeTransactionDurability,
                  }))).onerror = bn(t => {
              kr(t), this._reject(e.error)
            })),
            (e.onabort = bn(t => {
              kr(t),
                this.active && this._reject(new St.Abort(e.error)),
                (this.active = !1),
                this.on('abort').fire(t)
            })),
            (e.oncomplete = bn(() => {
              ;(this.active = !1),
                this._resolve(),
                'mutatedParts' in e && xr.storagemutated.fire(e.mutatedParts)
            })),
            this
          )
        }
        _promise(e, t, n) {
          if ('readwrite' === e && 'readwrite' !== this.mode)
            return In(new St.ReadOnly('Transaction is readonly'))
          if (!this.active) return In(new St.TransactionInactive())
          if (this._locked())
            return new rn((r, i) => {
              this._blockedFuncs.push([
                () => {
                  this._promise(e, t, n).then(r, i)
                },
                Zt,
              ])
            })
          if (n)
            return En(() => {
              var e = new rn((e, n) => {
                this._lock()
                const r = t(e, n, this)
                r && r.then && r.then(e, n)
              })
              return e.finally(() => this._unlock()), (e._lib = !0), e
            })
          var r = new rn((e, n) => {
            var r = t(e, n, this)
            r && r.then && r.then(e, n)
          })
          return (r._lib = !0), r
        }
        _root() {
          return this.parent ? this.parent._root() : this
        }
        waitFor(e) {
          var t = this._root()
          const n = rn.resolve(e)
          if (t._waitingFor) t._waitingFor = t._waitingFor.then(() => n)
          else {
            ;(t._waitingFor = n), (t._waitingQueue = [])
            var r = t.idbtrans.objectStore(t.storeNames[0])
            !(function e() {
              for (++t._spinCount; t._waitingQueue.length; )
                t._waitingQueue.shift()()
              t._waitingFor && (r.get(-1 / 0).onsuccess = e)
            })()
          }
          var i = t._waitingFor
          return new rn((e, r) => {
            n.then(
              n => t._waitingQueue.push(bn(e.bind(null, n))),
              e => t._waitingQueue.push(bn(r.bind(null, e))),
            ).finally(() => {
              t._waitingFor === i && (t._waitingFor = null)
            })
          })
        }
        abort() {
          this.active &&
            ((this.active = !1),
            this.idbtrans && this.idbtrans.abort(),
            this._reject(new St.Abort()))
        }
        table(e) {
          const t = this._memoizedTables || (this._memoizedTables = {})
          if (Le(t, e)) return t[e]
          const n = this.schema[e]
          if (!n)
            throw new St.NotFound('Table ' + e + ' not part of transaction')
          const r = new this.db.Table(e, n, this)
          return (r.core = this.db.core.table(e)), (t[e] = r), r
        }
      }
      function Or(e, t, n, r, i, o, s) {
        return {
          name: e,
          keyPath: t,
          unique: n,
          multi: r,
          auto: i,
          compound: o,
          src: (n && !s ? '&' : '') + (r ? '*' : '') + (i ? '++' : '') + Er(t),
        }
      }
      function Er(e) {
        return 'string' == typeof e
          ? e
          : e
          ? '[' + [].join.call(e, '+') + ']'
          : ''
      }
      function Pr(e, t, n) {
        return {
          name: e,
          primKey: t,
          indexes: n,
          mappedClass: null,
          idxByName: Ve(n, e => [e.name, e]),
        }
      }
      let Cr = e => {
        try {
          return e.only([[]]), (Cr = () => [[]]), [[]]
        } catch (e) {
          return (Cr = () => Bn), Bn
        }
      }
      function jr(e) {
        return null == e
          ? () => {}
          : 'string' == typeof e
          ? (function(e) {
              return 1 === e.split('.').length ? t => t[e] : t => He(t, e)
            })(e)
          : t => He(t, e)
      }
      function Rr(e) {
        return [].slice.call(e)
      }
      let Dr = 0
      function Ar(e) {
        return null == e ? ':id' : 'string' == typeof e ? e : `[${e.join('+')}]`
      }
      function Lr(e, t, n) {
        function r(e) {
          if (3 === e.type) return null
          if (4 === e.type)
            throw new Error('Cannot convert never type to IDBKeyRange')
          const {lower: n, upper: r, lowerOpen: i, upperOpen: o} = e
          return void 0 === n
            ? void 0 === r
              ? null
              : t.upperBound(r, !!o)
            : void 0 === r
            ? t.lowerBound(n, !!i)
            : t.bound(n, r, !!i, !!o)
        }
        const {schema: i, hasGetAll: o} = (function(e, t) {
            const n = Rr(e.objectStoreNames)
            return {
              schema: {
                name: e.name,
                tables: n
                  .map(e => t.objectStore(e))
                  .map(e => {
                    const {keyPath: t, autoIncrement: n} = e,
                      r = je(t),
                      i = null == t,
                      o = {},
                      s = {
                        name: e.name,
                        primaryKey: {
                          name: null,
                          isPrimaryKey: !0,
                          outbound: i,
                          compound: r,
                          keyPath: t,
                          autoIncrement: n,
                          unique: !0,
                          extractKey: jr(t),
                        },
                        indexes: Rr(e.indexNames)
                          .map(t => e.index(t))
                          .map(e => {
                            const {
                                name: t,
                                unique: n,
                                multiEntry: r,
                                keyPath: i,
                              } = e,
                              s = {
                                name: t,
                                compound: je(i),
                                keyPath: i,
                                unique: n,
                                multiEntry: r,
                                extractKey: jr(i),
                              }
                            return (o[Ar(i)] = s), s
                          }),
                        getIndexByKeyPath: e => o[Ar(e)],
                      }
                    return (
                      (o[':id'] = s.primaryKey),
                      null != t && (o[Ar(t)] = s.primaryKey),
                      s
                    )
                  }),
              },
              hasGetAll:
                n.length > 0 &&
                'getAll' in t.objectStore(n[0]) &&
                !(
                  'undefined' != typeof navigator &&
                  /Safari/.test(navigator.userAgent) &&
                  !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
                  [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604
                ),
            }
          })(e, n),
          s = i.tables.map(e =>
            (function(e) {
              const t = e.name
              return {
                name: t,
                schema: e,
                mutate: function({
                  trans: e,
                  type: n,
                  keys: i,
                  values: o,
                  range: s,
                }) {
                  return new Promise((a, u) => {
                    a = bn(a)
                    const c = e.objectStore(t),
                      l = null == c.keyPath,
                      h = 'put' === n || 'add' === n
                    if (!h && 'delete' !== n && 'deleteRange' !== n)
                      throw new Error('Invalid operation type: ' + n)
                    const {length: f} = i || o || {length: 1}
                    if (i && o && i.length !== o.length)
                      throw new Error(
                        'Given keys array must have same length as given values array.',
                      )
                    if (0 === f)
                      return a({
                        numFailures: 0,
                        failures: {},
                        results: [],
                        lastResult: void 0,
                      })
                    let d
                    const p = [],
                      g = []
                    let y = 0
                    const v = e => {
                      ++y, kr(e)
                    }
                    if ('deleteRange' === n) {
                      if (4 === s.type)
                        return a({
                          numFailures: y,
                          failures: g,
                          results: [],
                          lastResult: void 0,
                        })
                      3 === s.type
                        ? p.push((d = c.clear()))
                        : p.push((d = c.delete(r(s))))
                    } else {
                      const [e, t] = h ? (l ? [o, i] : [o, null]) : [i, null]
                      if (h)
                        for (let r = 0; r < f; ++r)
                          p.push(
                            (d =
                              t && void 0 !== t[r]
                                ? c[n](e[r], t[r])
                                : c[n](e[r])),
                          ),
                            (d.onerror = v)
                      else
                        for (let t = 0; t < f; ++t)
                          p.push((d = c[n](e[t]))), (d.onerror = v)
                    }
                    const m = e => {
                      const t = e.target.result
                      p.forEach((e, t) => null != e.error && (g[t] = e.error)),
                        a({
                          numFailures: y,
                          failures: g,
                          results: 'delete' === n ? i : p.map(e => e.result),
                          lastResult: t,
                        })
                    }
                    ;(d.onerror = e => {
                      v(e), m(e)
                    }),
                      (d.onsuccess = m)
                  })
                },
                getMany: ({trans: e, keys: n}) =>
                  new Promise((r, i) => {
                    r = bn(r)
                    const o = e.objectStore(t),
                      s = n.length,
                      a = new Array(s)
                    let u,
                      c = 0,
                      l = 0
                    const h = e => {
                        const t = e.target
                        ;(a[t._pos] = t.result), ++l === c && r(a)
                      },
                      f = _r(i)
                    for (let e = 0; e < s; ++e)
                      null != n[e] &&
                        ((u = o.get(n[e])),
                        (u._pos = e),
                        (u.onsuccess = h),
                        (u.onerror = f),
                        ++c)
                    0 === c && r(a)
                  }),
                get: ({trans: e, key: n}) =>
                  new Promise((r, i) => {
                    r = bn(r)
                    const o = e.objectStore(t).get(n)
                    ;(o.onsuccess = e => r(e.target.result)),
                      (o.onerror = _r(i))
                  }),
                query: (function(e) {
                  return n =>
                    new Promise((i, o) => {
                      i = bn(i)
                      const {trans: s, values: a, limit: u, query: c} = n,
                        l = u === 1 / 0 ? void 0 : u,
                        {index: h, range: f} = c,
                        d = s.objectStore(t),
                        p = h.isPrimaryKey ? d : d.index(h.name),
                        g = r(f)
                      if (0 === u) return i({result: []})
                      if (e) {
                        const e = a ? p.getAll(g, l) : p.getAllKeys(g, l)
                        ;(e.onsuccess = e => i({result: e.target.result})),
                          (e.onerror = _r(o))
                      } else {
                        let e = 0
                        const t =
                            a || !('openKeyCursor' in p)
                              ? p.openCursor(g)
                              : p.openKeyCursor(g),
                          n = []
                        ;(t.onsuccess = r => {
                          const o = t.result
                          return o
                            ? (n.push(a ? o.value : o.primaryKey),
                              ++e === u ? i({result: n}) : void o.continue())
                            : i({result: n})
                        }),
                          (t.onerror = _r(o))
                      }
                    })
                })(o),
                openCursor: function({
                  trans: e,
                  values: n,
                  query: i,
                  reverse: o,
                  unique: s,
                }) {
                  return new Promise((a, u) => {
                    a = bn(a)
                    const {index: c, range: l} = i,
                      h = e.objectStore(t),
                      f = c.isPrimaryKey ? h : h.index(c.name),
                      d = o
                        ? s
                          ? 'prevunique'
                          : 'prev'
                        : s
                        ? 'nextunique'
                        : 'next',
                      p =
                        n || !('openKeyCursor' in f)
                          ? f.openCursor(r(l), d)
                          : f.openKeyCursor(r(l), d)
                    ;(p.onerror = _r(u)),
                      (p.onsuccess = bn(t => {
                        const n = p.result
                        if (!n) return void a(null)
                        ;(n.___id = ++Dr), (n.done = !1)
                        const r = n.continue.bind(n)
                        let i = n.continuePrimaryKey
                        i && (i = i.bind(n))
                        const o = n.advance.bind(n),
                          s = () => {
                            throw new Error('Cursor not stopped')
                          }
                        ;(n.trans = e),
                          (n.stop = n.continue = n.continuePrimaryKey = n.advance = () => {
                            throw new Error('Cursor not started')
                          }),
                          (n.fail = bn(u)),
                          (n.next = function() {
                            let e = 1
                            return this.start(() =>
                              e-- ? this.continue() : this.stop(),
                            ).then(() => this)
                          }),
                          (n.start = e => {
                            const t = new Promise((e, t) => {
                                ;(e = bn(e)),
                                  (p.onerror = _r(t)),
                                  (n.fail = t),
                                  (n.stop = t => {
                                    ;(n.stop = n.continue = n.continuePrimaryKey = n.advance = s),
                                      e(t)
                                  })
                              }),
                              a = () => {
                                if (p.result)
                                  try {
                                    e()
                                  } catch (e) {
                                    n.fail(e)
                                  }
                                else
                                  (n.done = !0),
                                    (n.start = () => {
                                      throw new Error(
                                        'Cursor behind last entry',
                                      )
                                    }),
                                    n.stop()
                              }
                            return (
                              (p.onsuccess = bn(e => {
                                ;(p.onsuccess = a), a()
                              })),
                              (n.continue = r),
                              (n.continuePrimaryKey = i),
                              (n.advance = o),
                              a(),
                              t
                            )
                          }),
                          a(n)
                      }, u))
                  })
                },
                count({query: e, trans: n}) {
                  const {index: i, range: o} = e
                  return new Promise((e, s) => {
                    const a = n.objectStore(t),
                      u = i.isPrimaryKey ? a : a.index(i.name),
                      c = r(o),
                      l = c ? u.count(c) : u.count()
                    ;(l.onsuccess = bn(t => e(t.target.result))),
                      (l.onerror = _r(s))
                  })
                },
              }
            })(e),
          ),
          a = {}
        return (
          s.forEach(e => (a[e.name] = e)),
          {
            stack: 'dbcore',
            transaction: e.transaction.bind(e),
            table(e) {
              if (!a[e]) throw new Error(`Table '${e}' not found`)
              return a[e]
            },
            MIN_KEY: -1 / 0,
            MAX_KEY: Cr(t),
            schema: i,
          }
        )
      }
      function Kr({_novip: e}, t) {
        const n = t.db,
          r = (function(e, t, {IDBKeyRange: n, indexedDB: r}, i) {
            const o = (function(e, t) {
              return t.reduce((e, {create: t}) => ({...e, ...t(e)}), e)
            })(Lr(t, n, i), e.dbcore)
            return {dbcore: o}
          })(e._middlewares, n, e._deps, t)
        ;(e.core = r.dbcore),
          e.tables.forEach(t => {
            const n = t.name
            e.core.schema.tables.some(e => e.name === n) &&
              ((t.core = e.core.table(n)),
              e[n] instanceof e.Table && (e[n].core = t.core))
          })
      }
      function Tr({_novip: e}, t, n, r) {
        n.forEach(n => {
          const i = r[n]
          t.forEach(t => {
            const r = Ie(t, n)
            ;(!r || ('value' in r && void 0 === r.value)) &&
              (t === e.Transaction.prototype || t instanceof e.Transaction
                ? Ne(t, n, {
                    get() {
                      return this.table(n)
                    },
                    set(e) {
                      Te(this, n, {
                        value: e,
                        writable: !0,
                        configurable: !0,
                        enumerable: !0,
                      })
                    },
                  })
                : (t[n] = new e.Table(n, i)))
          })
        })
      }
      function Nr({_novip: e}, t) {
        t.forEach(t => {
          for (let n in t) t[n] instanceof e.Table && delete t[n]
        })
      }
      function Mr(e, t) {
        return e._cfg.version - t._cfg.version
      }
      function $r(e, t, n, r) {
        const i = e._dbSchema,
          o = e._createTransaction('readwrite', e._storeNames, i)
        o.create(n), o._completion.catch(r)
        const s = o._reject.bind(o),
          a = Zt.transless || Zt
        En(() => {
          ;(Zt.trans = o),
            (Zt.transless = a),
            0 === t
              ? (Ce(i).forEach(e => {
                  Fr(n, e, i[e].primKey, i[e].indexes)
                }),
                Kr(e, n),
                rn.follow(() => e.on.populate.fire(o)).catch(s))
              : (function({_novip: e}, t, n, r) {
                  const i = [],
                    o = e._versions
                  let s = (e._dbSchema = qr(0, e.idbdb, r)),
                    a = !1
                  return (
                    o
                      .filter(e => e._cfg.version >= t)
                      .forEach(o => {
                        i.push(() => {
                          const i = s,
                            u = o._cfg.dbschema
                          Ur(e, i, r), Ur(e, u, r), (s = e._dbSchema = u)
                          const c = Ir(i, u)
                          c.add.forEach(e => {
                            Fr(r, e[0], e[1].primKey, e[1].indexes)
                          }),
                            c.change.forEach(e => {
                              if (e.recreate)
                                throw new St.Upgrade(
                                  'Not yet support for changing primary key',
                                )
                              {
                                const t = r.objectStore(e.name)
                                e.add.forEach(e => Br(t, e)),
                                  e.change.forEach(e => {
                                    t.deleteIndex(e.name), Br(t, e)
                                  }),
                                  e.del.forEach(e => t.deleteIndex(e))
                              }
                            })
                          const l = o._cfg.contentUpgrade
                          if (l && o._cfg.version > t) {
                            Kr(e, r), (n._memoizedTables = {}), (a = !0)
                            let t = Ye(u)
                            c.del.forEach(e => {
                              t[e] = i[e]
                            }),
                              Nr(e, [e.Transaction.prototype]),
                              Tr(e, [e.Transaction.prototype], Ce(t), t),
                              (n.schema = t)
                            const o = ut(l)
                            let s
                            o && Pn()
                            const h = rn.follow(() => {
                              if (((s = l(n)), s && o)) {
                                var e = Cn.bind(null, null)
                                s.then(e, e)
                              }
                            })
                            return s && 'function' == typeof s.then
                              ? rn.resolve(s)
                              : h.then(() => s)
                          }
                        }),
                          i.push(t => {
                            ;(a && Vn) ||
                              (function(e, t) {
                                ;[].slice
                                  .call(t.db.objectStoreNames)
                                  .forEach(
                                    n =>
                                      null == e[n] && t.db.deleteObjectStore(n),
                                  )
                              })(o._cfg.dbschema, t),
                              Nr(e, [e.Transaction.prototype]),
                              Tr(
                                e,
                                [e.Transaction.prototype],
                                e._storeNames,
                                e._dbSchema,
                              ),
                              (n.schema = e._dbSchema)
                          })
                      }),
                    (function e() {
                      return i.length
                        ? rn.resolve(i.shift()(n.idbtrans)).then(e)
                        : rn.resolve()
                    })().then(() => {
                      var e, t
                      ;(t = r),
                        Ce((e = s)).forEach(n => {
                          t.db.objectStoreNames.contains(n) ||
                            Fr(t, n, e[n].primKey, e[n].indexes)
                        })
                    })
                  )
                })(e, t, o, n).catch(s)
        })
      }
      function Ir(e, t) {
        const n = {del: [], add: [], change: []}
        let r
        for (r in e) t[r] || n.del.push(r)
        for (r in t) {
          const i = e[r],
            o = t[r]
          if (i) {
            const e = {
              name: r,
              def: o,
              recreate: !1,
              del: [],
              add: [],
              change: [],
            }
            if (
              '' + (i.primKey.keyPath || '') !=
                '' + (o.primKey.keyPath || '') ||
              (i.primKey.auto !== o.primKey.auto && !Wn)
            )
              (e.recreate = !0), n.change.push(e)
            else {
              const t = i.idxByName,
                r = o.idxByName
              let s
              for (s in t) r[s] || e.del.push(s)
              for (s in r) {
                const n = t[s],
                  i = r[s]
                n ? n.src !== i.src && e.change.push(i) : e.add.push(i)
              }
              ;(e.del.length > 0 || e.add.length > 0 || e.change.length > 0) &&
                n.change.push(e)
            }
          } else n.add.push([r, o])
        }
        return n
      }
      function Fr(e, t, n, r) {
        const i = e.db.createObjectStore(
          t,
          n.keyPath
            ? {keyPath: n.keyPath, autoIncrement: n.auto}
            : {autoIncrement: n.auto},
        )
        return r.forEach(e => Br(i, e)), i
      }
      function Br(e, t) {
        e.createIndex(t.name, t.keyPath, {
          unique: t.unique,
          multiEntry: t.multi,
        })
      }
      function qr(e, t, n) {
        const r = {}
        return (
          Be(t.objectStoreNames, 0).forEach(e => {
            const t = n.objectStore(e)
            let i = t.keyPath
            const o = Or(
                Er(i),
                i || '',
                !1,
                !1,
                !!t.autoIncrement,
                i && 'string' != typeof i,
                !0,
              ),
              s = []
            for (let e = 0; e < t.indexNames.length; ++e) {
              const n = t.index(t.indexNames[e])
              i = n.keyPath
              var a = Or(
                n.name,
                i,
                !!n.unique,
                !!n.multiEntry,
                !1,
                i && 'string' != typeof i,
                !1,
              )
              s.push(a)
            }
            r[e] = Pr(e, o, s)
          }),
          r
        )
      }
      function Ur({_novip: e}, t, n) {
        const r = n.db.objectStoreNames
        for (let i = 0; i < r.length; ++i) {
          const o = r[i],
            s = n.objectStore(o)
          e._hasGetAll = 'getAll' in s
          for (let e = 0; e < s.indexNames.length; ++e) {
            const n = s.indexNames[e],
              r = s.index(n).keyPath,
              i = 'string' == typeof r ? r : '[' + Be(r).join('+') + ']'
            if (t[o]) {
              const e = t[o].idxByName[i]
              e &&
                ((e.name = n),
                delete t[o].idxByName[i],
                (t[o].idxByName[n] = e))
            }
          }
        }
        'undefined' != typeof navigator &&
          /Safari/.test(navigator.userAgent) &&
          !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
          Pe.WorkerGlobalScope &&
          Pe instanceof Pe.WorkerGlobalScope &&
          [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 &&
          (e._hasGetAll = !1)
      }
      class Wr {
        _parseStoresSpec(e, t) {
          Ce(e).forEach(n => {
            if (null !== e[n]) {
              var r = e[n].split(',').map((e, t) => {
                  const n = (e = e.trim()).replace(/([&*]|\+\+)/g, ''),
                    r = /^\[/.test(n) ? n.match(/^\[(.*)\]$/)[1].split('+') : n
                  return Or(
                    n,
                    r || null,
                    /\&/.test(e),
                    /\*/.test(e),
                    /\+\+/.test(e),
                    je(r),
                    0 === t,
                  )
                }),
                i = r.shift()
              if (i.multi)
                throw new St.Schema('Primary key cannot be multi-valued')
              r.forEach(e => {
                if (e.auto)
                  throw new St.Schema(
                    'Only primary key can be marked as autoIncrement (++)',
                  )
                if (!e.keyPath)
                  throw new St.Schema(
                    'Index must have a name and cannot be an empty string',
                  )
              }),
                (t[n] = Pr(n, i, r))
            }
          })
        }
        stores(e) {
          const t = this.db
          this._cfg.storesSource = this._cfg.storesSource
            ? Re(this._cfg.storesSource, e)
            : e
          const n = t._versions,
            r = {}
          let i = {}
          return (
            n.forEach(e => {
              Re(r, e._cfg.storesSource),
                (i = e._cfg.dbschema = {}),
                e._parseStoresSpec(r, i)
            }),
            (t._dbSchema = i),
            Nr(t, [t._allTables, t, t.Transaction.prototype]),
            Tr(
              t,
              [t._allTables, t, t.Transaction.prototype, this._cfg.tables],
              Ce(i),
              i,
            ),
            (t._storeNames = Ce(i)),
            this
          )
        }
        upgrade(e) {
          return (
            (this._cfg.contentUpgrade = Tt(this._cfg.contentUpgrade || Pt, e)),
            this
          )
        }
      }
      function Vr(e, t) {
        let n = e._dbNamesDB
        return (
          n ||
            ((n = e._dbNamesDB = new fi('__dbnames', {
              addons: [],
              indexedDB: e,
              IDBKeyRange: t,
            })),
            n.version(1).stores({dbnames: 'name'})),
          n.table('dbnames')
        )
      }
      function Hr(e) {
        return e && 'function' == typeof e.databases
      }
      function zr(e) {
        return En(function() {
          return (Zt.letThrough = !0), e()
        })
      }
      function Yr() {
        var e
        return !navigator.userAgentData &&
          /Safari\//.test(navigator.userAgent) &&
          !/Chrom(e|ium)\//.test(navigator.userAgent) &&
          indexedDB.databases
          ? new Promise(function(t) {
              var n = function() {
                return indexedDB.databases().finally(t)
              }
              ;(e = setInterval(n, 100)), n()
            }).finally(function() {
              return clearInterval(e)
            })
          : Promise.resolve()
      }
      function Gr(e) {
        var t = t => e.next(t),
          n = i(t),
          r = i(t => e.throw(t))
        function i(e) {
          return t => {
            var i = e(t),
              o = i.value
            return i.done
              ? o
              : o && 'function' == typeof o.then
              ? o.then(n, r)
              : je(o)
              ? Promise.all(o).then(n, r)
              : n(o)
          }
        }
        return i(t)()
      }
      function Jr(e, t, n) {
        var r = arguments.length
        if (r < 2) throw new St.InvalidArgument('Too few arguments')
        for (var i = new Array(r - 1); --r; ) i[r - 1] = arguments[r]
        n = i.pop()
        var o = Je(i)
        return [e, o, n]
      }
      function Qr(e, t, n, r, i) {
        return rn.resolve().then(() => {
          const o = Zt.transless || Zt,
            s = e._createTransaction(t, n, e._dbSchema, r),
            a = {trans: s, transless: o}
          if (r) s.idbtrans = r.idbtrans
          else
            try {
              s.create(), (e._state.PR1398_maxLoop = 3)
            } catch (r) {
              return r.name === kt.InvalidState &&
                e.isOpen() &&
                --e._state.PR1398_maxLoop > 0
                ? (console.warn('Dexie: Need to reopen db'),
                  e._close(),
                  e.open().then(() => Qr(e, t, n, null, i)))
                : In(r)
            }
          const u = ut(i)
          let c
          u && Pn()
          const l = rn.follow(() => {
            if (((c = i.call(s, s)), c))
              if (u) {
                var e = Cn.bind(null, null)
                c.then(e, e)
              } else
                'function' == typeof c.next &&
                  'function' == typeof c.throw &&
                  (c = Gr(c))
          }, a)
          return (c && 'function' == typeof c.then
            ? rn
                .resolve(c)
                .then(e =>
                  s.active
                    ? e
                    : In(
                        new St.PrematureCommit(
                          'Transaction committed too early. See http://bit.ly/2kdckMn',
                        ),
                      ),
                )
            : l.then(() => c)
          )
            .then(e => (r && s._resolve(), s._completion.then(() => e)))
            .catch(e => (s._reject(e), In(e)))
        })
      }
      function Xr(e, t, n) {
        const r = je(e) ? e.slice() : [e]
        for (let e = 0; e < n; ++e) r.push(t)
        return r
      }
      const Zr = {
        stack: 'dbcore',
        name: 'VirtualIndexMiddleware',
        level: 1,
        create: function(e) {
          return {
            ...e,
            table(t) {
              const n = e.table(t),
                {schema: r} = n,
                i = {},
                o = []
              function s(e, t, n) {
                const r = Ar(e),
                  a = (i[r] = i[r] || []),
                  u = null == e ? 0 : 'string' == typeof e ? 1 : e.length,
                  c = t > 0,
                  l = {
                    ...n,
                    isVirtual: c,
                    keyTail: t,
                    keyLength: u,
                    extractKey: jr(e),
                    unique: !c && n.unique,
                  }
                return (
                  a.push(l),
                  l.isPrimaryKey || o.push(l),
                  u > 1 && s(2 === u ? e[0] : e.slice(0, u - 1), t + 1, n),
                  a.sort((e, t) => e.keyTail - t.keyTail),
                  l
                )
              }
              const a = s(r.primaryKey.keyPath, 0, r.primaryKey)
              i[':id'] = [a]
              for (const e of r.indexes) s(e.keyPath, 0, e)
              function u(t) {
                const n = t.query.index
                return n.isVirtual
                  ? {
                      ...t,
                      query: {
                        index: n,
                        range:
                          ((r = t.query.range),
                          (i = n.keyTail),
                          {
                            type: 1 === r.type ? 2 : r.type,
                            lower: Xr(
                              r.lower,
                              r.lowerOpen ? e.MAX_KEY : e.MIN_KEY,
                              i,
                            ),
                            lowerOpen: !0,
                            upper: Xr(
                              r.upper,
                              r.upperOpen ? e.MIN_KEY : e.MAX_KEY,
                              i,
                            ),
                            upperOpen: !0,
                          }),
                      },
                    }
                  : t
                var r, i
              }
              const c = {
                ...n,
                schema: {
                  ...r,
                  primaryKey: a,
                  indexes: o,
                  getIndexByKeyPath: function(e) {
                    const t = i[Ar(e)]
                    return t && t[0]
                  },
                },
                count: e => n.count(u(e)),
                query: e => n.query(u(e)),
                openCursor(t) {
                  const {keyTail: r, isVirtual: i, keyLength: o} = t.query.index
                  return i
                    ? n.openCursor(u(t)).then(
                        n =>
                          n &&
                          (function(n) {
                            const i = Object.create(n, {
                              continue: {
                                value: function(i) {
                                  null != i
                                    ? n.continue(
                                        Xr(
                                          i,
                                          t.reverse ? e.MAX_KEY : e.MIN_KEY,
                                          r,
                                        ),
                                      )
                                    : t.unique
                                    ? n.continue(
                                        n.key
                                          .slice(0, o)
                                          .concat(
                                            t.reverse ? e.MIN_KEY : e.MAX_KEY,
                                            r,
                                          ),
                                      )
                                    : n.continue()
                                },
                              },
                              continuePrimaryKey: {
                                value(t, i) {
                                  n.continuePrimaryKey(Xr(t, e.MAX_KEY, r), i)
                                },
                              },
                              primaryKey: {get: () => n.primaryKey},
                              key: {
                                get() {
                                  const e = n.key
                                  return 1 === o ? e[0] : e.slice(0, o)
                                },
                              },
                              value: {get: () => n.value},
                            })
                            return i
                          })(n),
                      )
                    : n.openCursor(t)
                },
              }
              return c
            },
          }
        },
      }
      function ei(e, t, n, r) {
        return (
          (n = n || {}),
          (r = r || ''),
          Ce(e).forEach(i => {
            if (Le(t, i)) {
              var o = e[i],
                s = t[i]
              if ('object' == typeof o && 'object' == typeof s && o && s) {
                const e = rt(o)
                e !== rt(s)
                  ? (n[r + i] = t[i])
                  : 'Object' === e
                  ? ei(o, s, n, r + i + '.')
                  : o !== s && (n[r + i] = t[i])
              } else o !== s && (n[r + i] = t[i])
            } else n[r + i] = void 0
          }),
          Ce(t).forEach(i => {
            Le(e, i) || (n[r + i] = t[i])
          }),
          n
        )
      }
      const ti = {
        stack: 'dbcore',
        name: 'HooksMiddleware',
        level: 2,
        create: e => ({
          ...e,
          table(t) {
            const n = e.table(t),
              {primaryKey: r} = n.schema,
              i = {
                ...n,
                mutate(e) {
                  const i = Zt.trans,
                    {deleting: o, creating: s, updating: a} = i.table(t).hook
                  switch (e.type) {
                    case 'add':
                      if (s.fire === Pt) break
                      return i._promise('readwrite', () => u(e), !0)
                    case 'put':
                      if (s.fire === Pt && a.fire === Pt) break
                      return i._promise('readwrite', () => u(e), !0)
                    case 'delete':
                      if (o.fire === Pt) break
                      return i._promise('readwrite', () => u(e), !0)
                    case 'deleteRange':
                      if (o.fire === Pt) break
                      return i._promise(
                        'readwrite',
                        () =>
                          (function(e) {
                            return c(e.trans, e.range, 1e4)
                          })(e),
                        !0,
                      )
                  }
                  return n.mutate(e)
                  function u(e) {
                    const t = Zt.trans,
                      i =
                        e.keys ||
                        (function(e, t) {
                          return 'delete' === t.type
                            ? t.keys
                            : t.keys || t.values.map(e.extractKey)
                        })(r, e)
                    if (!i) throw new Error('Keys missing')
                    return (
                      'delete' !==
                        (e =
                          'add' === e.type || 'put' === e.type
                            ? {...e, keys: i}
                            : {...e}).type && (e.values = [...e.values]),
                      e.keys && (e.keys = [...e.keys]),
                      (function(e, t, n) {
                        return 'add' === t.type
                          ? Promise.resolve([])
                          : e.getMany({
                              trans: t.trans,
                              keys: n,
                              cache: 'immutable',
                            })
                      })(n, e, i).then(u => {
                        const c = i.map((n, i) => {
                          const c = u[i],
                            l = {onerror: null, onsuccess: null}
                          if ('delete' === e.type) o.fire.call(l, n, c, t)
                          else if ('add' === e.type || void 0 === c) {
                            const o = s.fire.call(l, n, e.values[i], t)
                            null == n &&
                              null != o &&
                              ((n = o),
                              (e.keys[i] = n),
                              r.outbound || ze(e.values[i], r.keyPath, n))
                          } else {
                            const r = ei(c, e.values[i]),
                              o = a.fire.call(l, r, n, c, t)
                            if (o) {
                              const t = e.values[i]
                              Object.keys(o).forEach(e => {
                                Le(t, e) ? (t[e] = o[e]) : ze(t, e, o[e])
                              })
                            }
                          }
                          return l
                        })
                        return n
                          .mutate(e)
                          .then(
                            ({
                              failures: t,
                              results: n,
                              numFailures: r,
                              lastResult: o,
                            }) => {
                              for (let r = 0; r < i.length; ++r) {
                                const o = n ? n[r] : i[r],
                                  s = c[r]
                                null == o
                                  ? s.onerror && s.onerror(t[r])
                                  : s.onsuccess &&
                                    s.onsuccess(
                                      'put' === e.type && u[r]
                                        ? e.values[r]
                                        : o,
                                    )
                              }
                              return {
                                failures: t,
                                results: n,
                                numFailures: r,
                                lastResult: o,
                              }
                            },
                          )
                          .catch(
                            e => (
                              c.forEach(t => t.onerror && t.onerror(e)),
                              Promise.reject(e)
                            ),
                          )
                      })
                    )
                  }
                  function c(e, t, i) {
                    return n
                      .query({
                        trans: e,
                        values: !1,
                        query: {index: r, range: t},
                        limit: i,
                      })
                      .then(({result: n}) =>
                        u({type: 'delete', keys: n, trans: e}).then(r =>
                          r.numFailures > 0
                            ? Promise.reject(r.failures[0])
                            : n.length < i
                            ? {failures: [], numFailures: 0, lastResult: void 0}
                            : c(
                                e,
                                {...t, lower: n[n.length - 1], lowerOpen: !0},
                                i,
                              ),
                        ),
                      )
                  }
                },
              }
            return i
          },
        }),
      }
      function ni(e, t, n) {
        try {
          if (!t) return null
          if (t.keys.length < e.length) return null
          const r = []
          for (let i = 0, o = 0; i < t.keys.length && o < e.length; ++i)
            0 === ar(t.keys[i], e[o]) &&
              (r.push(n ? et(t.values[i]) : t.values[i]), ++o)
          return r.length === e.length ? r : null
        } catch (e) {
          return null
        }
      }
      const ri = {
        stack: 'dbcore',
        level: -1,
        create: e => ({
          table: t => {
            const n = e.table(t)
            return {
              ...n,
              getMany: e => {
                if (!e.cache) return n.getMany(e)
                const t = ni(e.keys, e.trans._cache, 'clone' === e.cache)
                return t
                  ? rn.resolve(t)
                  : n.getMany(e).then(
                      t => (
                        (e.trans._cache = {
                          keys: e.keys,
                          values: 'clone' === e.cache ? et(t) : t,
                        }),
                        t
                      ),
                    )
              },
              mutate: e => (
                'add' !== e.type && (e.trans._cache = null), n.mutate(e)
              ),
            }
          },
        }),
      }
      function ii(e) {
        return !('from' in e)
      }
      const oi = function(e, t) {
        if (!this) {
          const t = new oi()
          return e && 'd' in e && Re(t, e), t
        }
        Re(
          this,
          arguments.length
            ? {d: 1, from: e, to: arguments.length > 1 ? t : e}
            : {d: 0},
        )
      }
      function si(e, t, n) {
        const r = ar(t, n)
        if (isNaN(r)) return
        if (r > 0) throw RangeError()
        if (ii(e)) return Re(e, {from: t, to: n, d: 1})
        const i = e.l,
          o = e.r
        if (ar(n, e.from) < 0)
          return (
            i ? si(i, t, n) : (e.l = {from: t, to: n, d: 1, l: null, r: null}),
            ci(e)
          )
        if (ar(t, e.to) > 0)
          return (
            o ? si(o, t, n) : (e.r = {from: t, to: n, d: 1, l: null, r: null}),
            ci(e)
          )
        ar(t, e.from) < 0 &&
          ((e.from = t), (e.l = null), (e.d = o ? o.d + 1 : 1)),
          ar(n, e.to) > 0 &&
            ((e.to = n), (e.r = null), (e.d = e.l ? e.l.d + 1 : 1))
        const s = !e.r
        i && !e.l && ai(e, i), o && s && ai(e, o)
      }
      function ai(e, t) {
        ii(t) ||
          (function e(t, {from: n, to: r, l: i, r: o}) {
            si(t, n, r), i && e(t, i), o && e(t, o)
          })(e, t)
      }
      function ui(e) {
        let t = ii(e) ? null : {s: 0, n: e}
        return {
          next(e) {
            const n = arguments.length > 0
            for (; t; )
              switch (t.s) {
                case 0:
                  if (((t.s = 1), n))
                    for (; t.n.l && ar(e, t.n.from) < 0; )
                      t = {up: t, n: t.n.l, s: 1}
                  else for (; t.n.l; ) t = {up: t, n: t.n.l, s: 1}
                case 1:
                  if (((t.s = 2), !n || ar(e, t.n.to) <= 0))
                    return {value: t.n, done: !1}
                case 2:
                  if (t.n.r) {
                    ;(t.s = 3), (t = {up: t, n: t.n.r, s: 0})
                    continue
                  }
                case 3:
                  t = t.up
              }
            return {done: !0}
          },
        }
      }
      function ci(e) {
        var t, n
        const r =
            ((null === (t = e.r) || void 0 === t ? void 0 : t.d) || 0) -
            ((null === (n = e.l) || void 0 === n ? void 0 : n.d) || 0),
          i = r > 1 ? 'r' : r < -1 ? 'l' : ''
        if (i) {
          const t = 'r' === i ? 'l' : 'r',
            n = {...e},
            r = e[i]
          ;(e.from = r.from),
            (e.to = r.to),
            (e[i] = r[i]),
            (n[i] = r[t]),
            (e[t] = n),
            (n.d = li(n))
        }
        e.d = li(e)
      }
      function li({r: e, l: t}) {
        return (e ? (t ? Math.max(e.d, t.d) : e.d) : t ? t.d : 0) + 1
      }
      Ke(oi.prototype, {
        add(e) {
          return ai(this, e), this
        },
        addKey(e) {
          return si(this, e, e), this
        },
        addKeys(e) {
          return e.forEach(e => si(this, e, e)), this
        },
        [it]() {
          return ui(this)
        },
      })
      const hi = {
        stack: 'dbcore',
        level: 0,
        create: e => {
          const t = e.schema.name,
            n = new oi(e.MIN_KEY, e.MAX_KEY)
          return {
            ...e,
            table: r => {
              const i = e.table(r),
                {schema: o} = i,
                {primaryKey: s} = o,
                {extractKey: a, outbound: u} = s,
                c = {
                  ...i,
                  mutate: e => {
                    const s = e.trans,
                      a = s.mutatedParts || (s.mutatedParts = {}),
                      u = e => {
                        const n = `idb://${t}/${r}/${e}`
                        return a[n] || (a[n] = new oi())
                      },
                      c = u(''),
                      l = u(':dels'),
                      {type: h} = e
                    let [f, d] =
                      'deleteRange' === e.type
                        ? [e.range]
                        : 'delete' === e.type
                        ? [e.keys]
                        : e.values.length < 50
                        ? [[], e.values]
                        : []
                    const p = e.trans._cache
                    return i.mutate(e).then(e => {
                      if (je(f)) {
                        'delete' !== h && (f = e.results), c.addKeys(f)
                        const t = ni(f, p)
                        t || 'add' === h || l.addKeys(f),
                          (t || d) &&
                            (function(e, t, n, r) {
                              t.indexes.forEach(function(t) {
                                const i = e(t.name || '')
                                function o(e) {
                                  return null != e ? t.extractKey(e) : null
                                }
                                const s = e =>
                                  t.multiEntry && je(e)
                                    ? e.forEach(e => i.addKey(e))
                                    : i.addKey(e)
                                ;(n || r).forEach((e, t) => {
                                  const i = n && o(n[t]),
                                    a = r && o(r[t])
                                  0 !== ar(i, a) &&
                                    (null != i && s(i), null != a && s(a))
                                })
                              })
                            })(u, o, t, d)
                      } else if (f) {
                        const e = {from: f.lower, to: f.upper}
                        l.add(e), c.add(e)
                      } else
                        c.add(n),
                          l.add(n),
                          o.indexes.forEach(e => u(e.name).add(n))
                      return e
                    })
                  },
                },
                l = ({query: {index: t, range: n}}) => {
                  var r, i
                  return [
                    t,
                    new oi(
                      null !== (r = n.lower) && void 0 !== r ? r : e.MIN_KEY,
                      null !== (i = n.upper) && void 0 !== i ? i : e.MAX_KEY,
                    ),
                  ]
                },
                h = {
                  get: e => [s, new oi(e.key)],
                  getMany: e => [s, new oi().addKeys(e.keys)],
                  count: l,
                  query: l,
                  openCursor: l,
                }
              return (
                Ce(h).forEach(e => {
                  c[e] = function(o) {
                    const {subscr: s} = Zt
                    if (s) {
                      const c = e => {
                          const n = `idb://${t}/${r}/${e}`
                          return s[n] || (s[n] = new oi())
                        },
                        l = c(''),
                        f = c(':dels'),
                        [d, p] = h[e](o)
                      if ((c(d.name || '').add(p), !d.isPrimaryKey)) {
                        if ('count' !== e) {
                          const t =
                            'query' === e &&
                            u &&
                            o.values &&
                            i.query({...o, values: !1})
                          return i[e].apply(this, arguments).then(n => {
                            if ('query' === e) {
                              if (u && o.values)
                                return t.then(
                                  ({result: e}) => (l.addKeys(e), n),
                                )
                              const e = o.values ? n.result.map(a) : n.result
                              o.values ? l.addKeys(e) : f.addKeys(e)
                            } else if ('openCursor' === e) {
                              const e = n,
                                t = o.values
                              return (
                                e &&
                                Object.create(e, {
                                  key: {
                                    get: () => (f.addKey(e.primaryKey), e.key),
                                  },
                                  primaryKey: {
                                    get() {
                                      const t = e.primaryKey
                                      return f.addKey(t), t
                                    },
                                  },
                                  value: {
                                    get: () => (
                                      t && l.addKey(e.primaryKey), e.value
                                    ),
                                  },
                                })
                              )
                            }
                            return n
                          })
                        }
                        f.add(n)
                      }
                    }
                    return i[e].apply(this, arguments)
                  }
                }),
                c
              )
            },
          }
        },
      }
      class fi {
        constructor(e, t) {
          ;(this._middlewares = {}), (this.verno = 0)
          const n = fi.dependencies
          ;(this._options = t = {
            addons: fi.addons,
            autoOpen: !0,
            indexedDB: n.indexedDB,
            IDBKeyRange: n.IDBKeyRange,
            ...t,
          }),
            (this._deps = {indexedDB: t.indexedDB, IDBKeyRange: t.IDBKeyRange})
          const {addons: r} = t
          ;(this._dbSchema = {}),
            (this._versions = []),
            (this._storeNames = []),
            (this._allTables = {}),
            (this.idbdb = null),
            (this._novip = this)
          const i = {
            dbOpenError: null,
            isBeingOpened: !1,
            onReadyBeingFired: null,
            openComplete: !1,
            dbReadyResolve: Pt,
            dbReadyPromise: null,
            cancelOpen: Pt,
            openCanceller: null,
            autoSchema: !0,
            PR1398_maxLoop: 3,
          }
          var o
          ;(i.dbReadyPromise = new rn(e => {
            i.dbReadyResolve = e
          })),
            (i.openCanceller = new rn((e, t) => {
              i.cancelOpen = t
            })),
            (this._state = i),
            (this.name = e),
            (this.on = Xn(
              this,
              'populate',
              'blocked',
              'versionchange',
              'close',
              {ready: [Tt, Pt]},
            )),
            (this.on.ready.subscribe = qe(
              this.on.ready.subscribe,
              e => (t, n) => {
                fi.vip(() => {
                  const r = this._state
                  if (r.openComplete)
                    r.dbOpenError || rn.resolve().then(t), n && e(t)
                  else if (r.onReadyBeingFired)
                    r.onReadyBeingFired.push(t), n && e(t)
                  else {
                    e(t)
                    const r = this
                    n ||
                      e(function e() {
                        r.on.ready.unsubscribe(t), r.on.ready.unsubscribe(e)
                      })
                  }
                })
              },
            )),
            (this.Collection =
              ((o = this),
              Zn(lr.prototype, function(e, t) {
                this.db = o
                let n = Gn,
                  r = null
                if (t)
                  try {
                    n = t()
                  } catch (e) {
                    r = e
                  }
                const i = e._ctx,
                  s = i.table,
                  a = s.hook.reading.fire
                this._ctx = {
                  table: s,
                  index: i.index,
                  isPrimKey:
                    !i.index ||
                    (s.schema.primKey.keyPath &&
                      i.index === s.schema.primKey.name),
                  range: n,
                  keysOnly: !1,
                  dir: 'next',
                  unique: '',
                  algorithm: null,
                  filter: null,
                  replayFilter: null,
                  justLimit: !0,
                  isMatch: null,
                  offset: 0,
                  limit: 1 / 0,
                  error: r,
                  or: i.or,
                  valueMapper: a !== Ct ? a : null,
                }
              }))),
            (this.Table = (function(e) {
              return Zn(Qn.prototype, function(t, n, r) {
                ;(this.db = e),
                  (this._tx = r),
                  (this.name = t),
                  (this.schema = n),
                  (this.hook = e._allTables[t]
                    ? e._allTables[t].hook
                    : Xn(null, {
                        creating: [Dt, Pt],
                        reading: [jt, Ct],
                        updating: [Lt, Pt],
                        deleting: [At, Pt],
                      }))
              })
            })(this)),
            (this.Transaction = (function(e) {
              return Zn(Sr.prototype, function(t, n, r, i, o) {
                ;(this.db = e),
                  (this.mode = t),
                  (this.storeNames = n),
                  (this.schema = r),
                  (this.chromeTransactionDurability = i),
                  (this.idbtrans = null),
                  (this.on = Xn(this, 'complete', 'error', 'abort')),
                  (this.parent = o || null),
                  (this.active = !0),
                  (this._reculock = 0),
                  (this._blockedFuncs = []),
                  (this._resolve = null),
                  (this._reject = null),
                  (this._waitingFor = null),
                  (this._waitingQueue = null),
                  (this._spinCount = 0),
                  (this._completion = new rn((e, t) => {
                    ;(this._resolve = e), (this._reject = t)
                  })),
                  this._completion.then(
                    () => {
                      ;(this.active = !1), this.on.complete.fire()
                    },
                    e => {
                      var t = this.active
                      return (
                        (this.active = !1),
                        this.on.error.fire(e),
                        this.parent
                          ? this.parent._reject(e)
                          : t && this.idbtrans && this.idbtrans.abort(),
                        In(e)
                      )
                    },
                  )
              })
            })(this)),
            (this.Version = (function(e) {
              return Zn(Wr.prototype, function(t) {
                ;(this.db = e),
                  (this._cfg = {
                    version: t,
                    storesSource: null,
                    dbschema: {},
                    tables: {},
                    contentUpgrade: null,
                  })
              })
            })(this)),
            (this.WhereClause = (function(e) {
              return Zn(wr.prototype, function(t, n, r) {
                ;(this.db = e),
                  (this._ctx = {table: t, index: ':id' === n ? null : n, or: r})
                const i = e._deps.indexedDB
                if (!i) throw new St.MissingAPI()
                ;(this._cmp = this._ascending = i.cmp.bind(i)),
                  (this._descending = (e, t) => i.cmp(t, e)),
                  (this._max = (e, t) => (i.cmp(e, t) > 0 ? e : t)),
                  (this._min = (e, t) => (i.cmp(e, t) < 0 ? e : t)),
                  (this._IDBKeyRange = e._deps.IDBKeyRange)
              })
            })(this)),
            this.on('versionchange', e => {
              e.newVersion > 0
                ? console.warn(
                    `Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`,
                  )
                : console.warn(
                    `Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`,
                  ),
                this.close()
            }),
            this.on('blocked', e => {
              !e.newVersion || e.newVersion < e.oldVersion
                ? console.warn(`Dexie.delete('${this.name}') was blocked`)
                : console.warn(
                    `Upgrade '${
                      this.name
                    }' blocked by other connection holding version ${e.oldVersion /
                      10}`,
                  )
            }),
            (this._maxKey = Cr(t.IDBKeyRange)),
            (this._createTransaction = (e, t, n, r) =>
              new this.Transaction(
                e,
                t,
                n,
                this._options.chromeTransactionDurability,
                r,
              )),
            (this._fireOnBlocked = e => {
              this.on('blocked').fire(e),
                Un.filter(
                  e => e.name === this.name && e !== this && !e._state.vcFired,
                ).map(t => t.on('versionchange').fire(e))
            }),
            this.use(Zr),
            this.use(ti),
            this.use(hi),
            this.use(ri),
            (this.vip = Object.create(this, {_vip: {value: !0}})),
            r.forEach(e => e(this))
        }
        version(e) {
          if (isNaN(e) || e < 0.1)
            throw new St.Type('Given version is not a positive number')
          if (
            ((e = Math.round(10 * e) / 10),
            this.idbdb || this._state.isBeingOpened)
          )
            throw new St.Schema('Cannot add version when database is open')
          this.verno = Math.max(this.verno, e)
          const t = this._versions
          var n = t.filter(t => t._cfg.version === e)[0]
          return (
            n ||
            ((n = new this.Version(e)),
            t.push(n),
            t.sort(Mr),
            n.stores({}),
            (this._state.autoSchema = !1),
            n)
          )
        }
        _whenReady(e) {
          return this.idbdb &&
            (this._state.openComplete || Zt.letThrough || this._vip)
            ? e()
            : new rn((e, t) => {
                if (this._state.openComplete)
                  return t(new St.DatabaseClosed(this._state.dbOpenError))
                if (!this._state.isBeingOpened) {
                  if (!this._options.autoOpen)
                    return void t(new St.DatabaseClosed())
                  this.open().catch(Pt)
                }
                this._state.dbReadyPromise.then(e, t)
              }).then(e)
        }
        use({stack: e, create: t, level: n, name: r}) {
          r && this.unuse({stack: e, name: r})
          const i = this._middlewares[e] || (this._middlewares[e] = [])
          return (
            i.push({stack: e, create: t, level: null == n ? 10 : n, name: r}),
            i.sort((e, t) => e.level - t.level),
            this
          )
        }
        unuse({stack: e, name: t, create: n}) {
          return (
            e &&
              this._middlewares[e] &&
              (this._middlewares[e] = this._middlewares[e].filter(e =>
                n ? e.create !== n : !!t && e.name !== t,
              )),
            this
          )
        }
        open() {
          return (function(e) {
            const t = e._state,
              {indexedDB: n} = e._deps
            if (t.isBeingOpened || e.idbdb)
              return t.dbReadyPromise.then(() =>
                t.dbOpenError ? In(t.dbOpenError) : e,
              )
            ct && (t.openCanceller._stackHolder = dt()),
              (t.isBeingOpened = !0),
              (t.dbOpenError = null),
              (t.openComplete = !1)
            const r = t.openCanceller
            function i() {
              if (t.openCanceller !== r)
                throw new St.DatabaseClosed('db.open() was cancelled')
            }
            let o = t.dbReadyResolve,
              s = null,
              a = !1
            return rn
              .race([
                r,
                ('undefined' == typeof navigator ? rn.resolve() : Yr()).then(
                  () =>
                    new rn((r, o) => {
                      if ((i(), !n)) throw new St.MissingAPI()
                      const u = e.name,
                        c = t.autoSchema
                          ? n.open(u)
                          : n.open(u, Math.round(10 * e.verno))
                      if (!c) throw new St.MissingAPI()
                      ;(c.onerror = _r(o)),
                        (c.onblocked = bn(e._fireOnBlocked)),
                        (c.onupgradeneeded = bn(r => {
                          if (
                            ((s = c.transaction),
                            t.autoSchema && !e._options.allowEmptyDB)
                          ) {
                            ;(c.onerror = kr), s.abort(), c.result.close()
                            const e = n.deleteDatabase(u)
                            e.onsuccess = e.onerror = bn(() => {
                              o(
                                new St.NoSuchDatabase(
                                  `Database ${u} doesnt exist`,
                                ),
                              )
                            })
                          } else {
                            s.onerror = _r(o)
                            var i =
                              r.oldVersion > Math.pow(2, 62) ? 0 : r.oldVersion
                            ;(a = i < 1),
                              (e._novip.idbdb = c.result),
                              $r(e, i / 10, s, o)
                          }
                        }, o)),
                        (c.onsuccess = bn(() => {
                          s = null
                          const n = (e._novip.idbdb = c.result),
                            i = Be(n.objectStoreNames)
                          if (i.length > 0)
                            try {
                              const r = n.transaction(
                                1 === (o = i).length ? o[0] : o,
                                'readonly',
                              )
                              t.autoSchema
                                ? (function({_novip: e}, t, n) {
                                    e.verno = t.version / 10
                                    const r = (e._dbSchema = qr(0, t, n))
                                    ;(e._storeNames = Be(
                                      t.objectStoreNames,
                                      0,
                                    )),
                                      Tr(e, [e._allTables], Ce(r), r)
                                  })(e, n, r)
                                : (Ur(e, e._dbSchema, r),
                                  (function(e, t) {
                                    const n = Ir(qr(0, e.idbdb, t), e._dbSchema)
                                    return !(
                                      n.add.length ||
                                      n.change.some(
                                        e => e.add.length || e.change.length,
                                      )
                                    )
                                  })(e, r) ||
                                    console.warn(
                                      'Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.',
                                    )),
                                Kr(e, r)
                            } catch (e) {}
                          var o
                          Un.push(e),
                            (n.onversionchange = bn(n => {
                              ;(t.vcFired = !0), e.on('versionchange').fire(n)
                            })),
                            (n.onclose = bn(t => {
                              e.on('close').fire(t)
                            })),
                            a &&
                              (function({indexedDB: e, IDBKeyRange: t}, n) {
                                !Hr(e) &&
                                  '__dbnames' !== n &&
                                  Vr(e, t)
                                    .put({name: n})
                                    .catch(Pt)
                              })(e._deps, u),
                            r()
                        }, o))
                    }),
                ),
              ])
              .then(
                () => (
                  i(),
                  (t.onReadyBeingFired = []),
                  rn
                    .resolve(zr(() => e.on.ready.fire(e.vip)))
                    .then(function n() {
                      if (t.onReadyBeingFired.length > 0) {
                        let r = t.onReadyBeingFired.reduce(Tt, Pt)
                        return (
                          (t.onReadyBeingFired = []),
                          rn.resolve(zr(() => r(e.vip))).then(n)
                        )
                      }
                    })
                ),
              )
              .finally(() => {
                ;(t.onReadyBeingFired = null), (t.isBeingOpened = !1)
              })
              .then(() => e)
              .catch(n => {
                t.dbOpenError = n
                try {
                  s && s.abort()
                } catch (e) {}
                return r === t.openCanceller && e._close(), In(n)
              })
              .finally(() => {
                ;(t.openComplete = !0), o()
              })
          })(this)
        }
        _close() {
          const e = this._state,
            t = Un.indexOf(this)
          if ((t >= 0 && Un.splice(t, 1), this.idbdb)) {
            try {
              this.idbdb.close()
            } catch (e) {}
            this._novip.idbdb = null
          }
          ;(e.dbReadyPromise = new rn(t => {
            e.dbReadyResolve = t
          })),
            (e.openCanceller = new rn((t, n) => {
              e.cancelOpen = n
            }))
        }
        close() {
          this._close()
          const e = this._state
          ;(this._options.autoOpen = !1),
            (e.dbOpenError = new St.DatabaseClosed()),
            e.isBeingOpened && e.cancelOpen(e.dbOpenError)
        }
        delete() {
          const e = arguments.length > 0,
            t = this._state
          return new rn((n, r) => {
            const i = () => {
              this.close()
              var e = this._deps.indexedDB.deleteDatabase(this.name)
              ;(e.onsuccess = bn(() => {
                !(function({indexedDB: e, IDBKeyRange: t}, n) {
                  !Hr(e) &&
                    '__dbnames' !== n &&
                    Vr(e, t)
                      .delete(n)
                      .catch(Pt)
                })(this._deps, this.name),
                  n()
              })),
                (e.onerror = _r(r)),
                (e.onblocked = this._fireOnBlocked)
            }
            if (e)
              throw new St.InvalidArgument(
                'Arguments not allowed in db.delete()',
              )
            t.isBeingOpened ? t.dbReadyPromise.then(i) : i()
          })
        }
        backendDB() {
          return this.idbdb
        }
        isOpen() {
          return null !== this.idbdb
        }
        hasBeenClosed() {
          const e = this._state.dbOpenError
          return e && 'DatabaseClosed' === e.name
        }
        hasFailed() {
          return null !== this._state.dbOpenError
        }
        dynamicallyOpened() {
          return this._state.autoSchema
        }
        get tables() {
          return Ce(this._allTables).map(e => this._allTables[e])
        }
        transaction() {
          const e = Jr.apply(this, arguments)
          return this._transaction.apply(this, e)
        }
        _transaction(e, t, n) {
          let r = Zt.trans
          ;(r && r.db === this && -1 === e.indexOf('!')) || (r = null)
          const i = -1 !== e.indexOf('?')
          let o, s
          e = e.replace('!', '').replace('?', '')
          try {
            if (
              ((s = t.map(e => {
                var t = e instanceof this.Table ? e.name : e
                if ('string' != typeof t)
                  throw new TypeError(
                    'Invalid table argument to Dexie.transaction(). Only Table or String are allowed',
                  )
                return t
              })),
              'r' == e || 'readonly' === e)
            )
              o = 'readonly'
            else {
              if ('rw' != e && 'readwrite' != e)
                throw new St.InvalidArgument('Invalid transaction mode: ' + e)
              o = 'readwrite'
            }
            if (r) {
              if ('readonly' === r.mode && 'readwrite' === o) {
                if (!i)
                  throw new St.SubTransaction(
                    'Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY',
                  )
                r = null
              }
              r &&
                s.forEach(e => {
                  if (r && -1 === r.storeNames.indexOf(e)) {
                    if (!i)
                      throw new St.SubTransaction(
                        'Table ' + e + ' not included in parent transaction.',
                      )
                    r = null
                  }
                }),
                i && r && !r.active && (r = null)
            }
          } catch (e) {
            return r
              ? r._promise(null, (t, n) => {
                  n(e)
                })
              : In(e)
          }
          const a = Qr.bind(null, this, o, s, r, n)
          return r
            ? r._promise(o, a, 'lock')
            : Zt.trans
            ? Kn(Zt.transless, () => this._whenReady(a))
            : this._whenReady(a)
        }
        table(e) {
          if (!Le(this._allTables, e))
            throw new St.InvalidTable(`Table ${e} does not exist`)
          return this._allTables[e]
        }
      }
      const di =
        'undefined' != typeof Symbol && 'observable' in Symbol
          ? Symbol.observable
          : '@@observable'
      class pi {
        constructor(e) {
          this._subscribe = e
        }
        subscribe(e, t, n) {
          return this._subscribe(
            e && 'function' != typeof e ? e : {next: e, error: t, complete: n},
          )
        }
        [di]() {
          return this
        }
      }
      function gi(e, t) {
        return (
          Ce(t).forEach(n => {
            ai(e[n] || (e[n] = new oi()), t[n])
          }),
          e
        )
      }
      let yi
      try {
        yi = {
          indexedDB:
            Pe.indexedDB ||
            Pe.mozIndexedDB ||
            Pe.webkitIndexedDB ||
            Pe.msIndexedDB,
          IDBKeyRange: Pe.IDBKeyRange || Pe.webkitIDBKeyRange,
        }
      } catch (Pe) {
        yi = {indexedDB: null, IDBKeyRange: null}
      }
      const vi = fi
      function mi(e) {
        let t = bi
        try {
          ;(bi = !0), xr.storagemutated.fire(e)
        } finally {
          bi = t
        }
      }
      Ke(vi, {
        ...Et,
        delete: e => new vi(e, {addons: []}).delete(),
        exists: e =>
          new vi(e, {addons: []})
            .open()
            .then(e => (e.close(), !0))
            .catch('NoSuchDatabaseError', () => !1),
        getDatabaseNames(e) {
          try {
            return (function({indexedDB: e, IDBKeyRange: t}) {
              return Hr(e)
                ? Promise.resolve(e.databases()).then(e =>
                    e.map(e => e.name).filter(e => '__dbnames' !== e),
                  )
                : Vr(e, t)
                    .toCollection()
                    .primaryKeys()
            })(vi.dependencies).then(e)
          } catch (e) {
            return In(new St.MissingAPI())
          }
        },
        defineClass: () =>
          function(e) {
            Re(this, e)
          },
        ignoreTransaction: e => (Zt.trans ? Kn(Zt.transless, e) : e()),
        vip: zr,
        async: function(e) {
          return function() {
            try {
              var t = Gr(e.apply(this, arguments))
              return t && 'function' == typeof t.then ? t : rn.resolve(t)
            } catch (e) {
              return In(e)
            }
          }
        },
        spawn: function(e, t, n) {
          try {
            var r = Gr(e.apply(n, t || []))
            return r && 'function' == typeof r.then ? r : rn.resolve(r)
          } catch (e) {
            return In(e)
          }
        },
        currentTransaction: {get: () => Zt.trans || null},
        waitFor: function(e, t) {
          const n = rn
            .resolve('function' == typeof e ? vi.ignoreTransaction(e) : e)
            .timeout(t || 6e4)
          return Zt.trans ? Zt.trans.waitFor(n) : n
        },
        Promise: rn,
        debug: {
          get: () => ct,
          set: e => {
            lt(e, 'dexie' === e ? () => !0 : zn)
          },
        },
        derive: Me,
        extend: Re,
        props: Ke,
        override: qe,
        Events: Xn,
        on: xr,
        liveQuery: function(e) {
          return new pi(t => {
            const n = ut(e)
            let r = !1,
              i = {},
              o = {}
            const s = {
              get closed() {
                return r
              },
              unsubscribe: () => {
                ;(r = !0), xr.storagemutated.unsubscribe(l)
              },
            }
            t.start && t.start(s)
            let a = !1,
              u = !1
            function c() {
              return Ce(o).some(
                e =>
                  i[e] &&
                  (function(e, t) {
                    const n = ui(t)
                    let r = n.next()
                    if (r.done) return !1
                    let i = r.value
                    const o = ui(e)
                    let s = o.next(i.from),
                      a = s.value
                    for (; !r.done && !s.done; ) {
                      if (ar(a.from, i.to) <= 0 && ar(a.to, i.from) >= 0)
                        return !0
                      ar(i.from, a.from) < 0
                        ? (i = (r = n.next(a.from)).value)
                        : (a = (s = o.next(i.from)).value)
                    }
                    return !1
                  })(i[e], o[e]),
              )
            }
            const l = e => {
                gi(i, e), c() && h()
              },
              h = () => {
                if (a || r) return
                i = {}
                const f = {},
                  d = (function(t) {
                    n && Pn()
                    const r = () => En(e, {subscr: t, trans: null}),
                      i = Zt.trans ? Kn(Zt.transless, r) : r()
                    return n && i.then(Cn, Cn), i
                  })(f)
                u || (xr('storagemutated', l), (u = !0)),
                  (a = !0),
                  Promise.resolve(d).then(
                    e => {
                      ;(a = !1),
                        r ||
                          (c() ? h() : ((i = {}), (o = f), t.next && t.next(e)))
                    },
                    e => {
                      ;(a = !1), t.error && t.error(e), s.unsubscribe()
                    },
                  )
              }
            return h(), s
          })
        },
        extendObservabilitySet: gi,
        getByKeyPath: He,
        setByKeyPath: ze,
        delByKeyPath: function(e, t) {
          'string' == typeof t
            ? ze(e, t, void 0)
            : 'length' in t &&
              [].map.call(t, function(t) {
                ze(e, t, void 0)
              })
        },
        shallowClone: Ye,
        deepClone: et,
        getObjectDiff: ei,
        cmp: ar,
        asap: We,
        minKey: -1 / 0,
        addons: [],
        connections: Un,
        errnames: kt,
        dependencies: yi,
        semVer: '3.2.1',
        version: '3.2.1'
          .split('.')
          .map(e => parseInt(e))
          .reduce((e, t, n) => e + t / Math.pow(10, 2 * n)),
      }),
        (vi.maxKey = Cr(vi.dependencies.IDBKeyRange)),
        'undefined' != typeof dispatchEvent &&
          'undefined' != typeof addEventListener &&
          (xr('storagemutated', e => {
            if (!bi) {
              let t
              Wn
                ? ((t = document.createEvent('CustomEvent')),
                  t.initCustomEvent('x-storagemutated-1', !0, !0, e))
                : (t = new CustomEvent('x-storagemutated-1', {detail: e})),
                (bi = !0),
                dispatchEvent(t),
                (bi = !1)
            }
          }),
          addEventListener('x-storagemutated-1', ({detail: e}) => {
            bi || mi(e)
          }))
      let bi = !1
      if ('undefined' != typeof BroadcastChannel) {
        const e = new BroadcastChannel('x-storagemutated-1')
        xr('storagemutated', t => {
          bi || e.postMessage(t)
        }),
          (e.onmessage = e => {
            e.data && mi(e.data)
          })
      } else if (
        'undefined' != typeof self &&
        'undefined' != typeof navigator
      ) {
        xr('storagemutated', e => {
          try {
            bi ||
              ('undefined' != typeof localStorage &&
                localStorage.setItem(
                  'x-storagemutated-1',
                  JSON.stringify({trig: Math.random(), changedParts: e}),
                ),
              'object' == typeof self.clients &&
                [
                  ...self.clients.matchAll({includeUncontrolled: !0}),
                ].forEach(t =>
                  t.postMessage({type: 'x-storagemutated-1', changedParts: e}),
                ))
          } catch (e) {}
        }),
          addEventListener('storage', e => {
            if ('x-storagemutated-1' === e.key) {
              const t = JSON.parse(e.newValue)
              t && mi(t.changedParts)
            }
          })
        const e = self.document && navigator.serviceWorker
        e &&
          e.addEventListener('message', function({data: e}) {
            e && 'x-storagemutated-1' === e.type && mi(e.changedParts)
          })
      }
      ;(rn.rejectionMapper = function(e, t) {
        if (
          !e ||
          e instanceof mt ||
          e instanceof TypeError ||
          e instanceof SyntaxError ||
          !e.name ||
          !Ot[e.name]
        )
          return e
        var n = new Ot[e.name](t || e.message, e)
        return (
          'stack' in e &&
            Ne(n, 'stack', {
              get: function() {
                return this.inner.stack
              },
            }),
          n
        )
      }),
        lt(ct, zn)
      class wi extends fi {
        constructor() {
          super('ServiceWorker'),
            this.version(1).stores({dynamicRouteRegistrations: '++,&pattern'}),
            (this.dynamicRouteRegistrations = this.table(
              'dynamicRouteRegistrations',
            ))
        }
      }
      var _i = function(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }
          function a(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }
          function u(e) {
            var t
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t)
                    })).then(s, a)
          }
          u((r = r.apply(e, t || [])).next())
        })
      }
      function ki(e) {
        return _i(this, void 0, void 0, function*() {
          const t = yield (function({imports: e = {}}) {
            return Ee(this, void 0, void 0, function*() {
              const t = Object.values(e),
                n = yield Promise.all(
                  t.map(e =>
                    Ee(this, void 0, void 0, function*() {
                      const t = (function(e) {
                          return e + '.buildmanifest.json'
                        })(e),
                        n = yield (function(e) {
                          return fetch(e)
                            .then(e => e.json())
                            .catch(() => null)
                        })(t)
                      return n
                        ? (function(e, t) {
                            var n, r
                            try {
                              const i = [],
                                o = (function(e) {
                                  const t = (e.origin + e.pathname).split('/')
                                  return (t[t.length - 1] = ''), t.join('/')
                                })(new URL(e))
                              for (const e of null !== (n = t.chunks) &&
                              void 0 !== n
                                ? n
                                : [])
                                for (const t of null !== (r = e.files) &&
                                void 0 !== r
                                  ? r
                                  : [])
                                  i.push(new URL(t, o).toString())
                              return i
                            } catch (e) {
                              return []
                            }
                          })(e, n)
                        : []
                    }),
                  ),
                )
              return Oe(n)
            })
          })(e)
          yield (function(e) {
            return _i(this, void 0, void 0, function*() {
              const t = yield caches.open(he),
                n = (yield t.keys()).map(e => e.url),
                r = yield new wi().dynamicRouteRegistrations.toArray(),
                i = n.filter(
                  t =>
                    !pe.includes(t) &&
                    !e.includes(t) &&
                    !r.some(e => new RegExp(e.pattern).test(t)),
                )
              console.info(
                '[SW] Removing the following expired URLs from the cache: ',
                i,
              ),
                console.debug(
                  '[SW] The following URLs were known and not invalidated: ',
                  pe,
                  e,
                  r,
                ),
                yield Promise.all(i.map(e => t.delete(e)))
            })
          })(t),
            yield xi(t)
        })
      }
      function xi(e) {
        return _i(this, void 0, void 0, function*() {
          if (0 === e.length) return
          const t = yield caches.open(he),
            n = yield Promise.all(
              e.map(e =>
                _i(this, void 0, void 0, function*() {
                  try {
                    return (
                      yield (function(e, t = {}) {
                        return P(this, void 0, void 0, function*() {
                          let {shouldRetry: n, getDelay: r, onError: i} = t
                          ;(n =
                            null != n
                              ? n
                              : e =>
                                  (function(e, t) {
                                    return e <= 5
                                  })(e)),
                            (r =
                              null != r
                                ? r
                                : e =>
                                    (function(e, t, n = !1) {
                                      const r = n ? e + 1 : e
                                      return 1e3 * Math.pow(2, r)
                                    })(e))
                          let o,
                            s = 0
                          do {
                            try {
                              return yield C(r(s)), yield e()
                            } catch (e) {
                              null == i || i(e, s), (o = e)
                            }
                          } while (n(s++))
                          throw o
                        })
                      })(() => t.add(e), {
                        onError: (t, n) =>
                          console.debug(
                            `[SW] Failure attempt ${n} at caching "${e}". Error: `,
                            t,
                          ),
                      }),
                      {url: e, success: !0}
                    )
                  } catch (t) {
                    return {url: e, success: !1}
                  }
                }),
              ),
            ),
            r = n.filter(e => e.success),
            i = n.filter(e => !e.success)
          r.length > 0 &&
            console.debug(
              `[SW] Successfully added ${r.length} URLs to the OMRS cache. URLs: `,
              r.map(e => e.url),
            ),
            i.length > 0 &&
              console.error(
                `[SW] Failed to cache ${i.length} URLs. URLs: `,
                i.map(e => e.url),
              )
        })
      }
      var Si = function(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }
          function a(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }
          function u(e) {
            var t
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t)
                    })).then(s, a)
          }
          u((r = r.apply(e, t || [])).next())
        })
      }
      const Oi = {
        onImportMapChanged: function({importMap: e}) {
          return Si(this, void 0, void 0, function*() {
            yield ki(e)
          })
        },
        clearDynamicRoutes: function() {
          return Si(this, void 0, void 0, function*() {
            yield new wi().dynamicRouteRegistrations.clear()
          })
        },
        registerDynamicRoute: function({pattern: e, url: t, strategy: n}) {
          return Si(this, void 0, void 0, function*() {
            let r = e
            if ((!r && t && (r = `^${E(t)}$`), r)) {
              const e = {pattern: r, strategy: n}
              yield new wi().dynamicRouteRegistrations.put(e)
            }
          })
        },
      }
      n(344)
      const Ei = ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'],
        Pi = e => (e && 'object' == typeof e ? e : {handle: e})
      class Ci {
        constructor(e, t) {
          let n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : 'GET'
          ;(this.handler = Pi(t)), (this.match = e), (this.method = n)
        }
        setCatchHandler(e) {
          this.catchHandler = Pi(e)
        }
      }
      class ji extends Ci {
        constructor(e, t, n) {
          super(
            t => {
              let {url: n} = t
              const r = e.exec(n.href)
              if (r && (n.origin === location.origin || 0 === r.index))
                return r.slice(1)
            },
            t,
            n,
          )
        }
      }
      class Ri {
        constructor() {
          ;(this._routes = new Map()), (this._defaultHandlerMap = new Map())
        }
        get routes() {
          return this._routes
        }
        addFetchListener() {
          self.addEventListener('fetch', e => {
            const {request: t} = e,
              n = this.handleRequest({request: t, event: e})
            n && e.respondWith(n)
          })
        }
        addCacheListener() {
          self.addEventListener('message', e => {
            if (e.data && 'CACHE_URLS' === e.data.type) {
              const {payload: t} = e.data,
                n = Promise.all(
                  t.urlsToCache.map(t => {
                    'string' == typeof t && (t = [t])
                    const n = new Request(...t)
                    return this.handleRequest({request: n, event: e})
                  }),
                )
              e.waitUntil(n),
                e.ports &&
                  e.ports[0] &&
                  n.then(() => e.ports[0].postMessage(!0))
            }
          })
        }
        handleRequest(e) {
          let {request: t, event: n} = e
          const r = new URL(t.url, location.href)
          if (!r.protocol.startsWith('http')) return
          const i = r.origin === location.origin,
            {params: o, route: s} = this.findMatchingRoute({
              event: n,
              request: t,
              sameOrigin: i,
              url: r,
            })
          let a = s && s.handler
          const u = t.method
          if (
            (!a &&
              this._defaultHandlerMap.has(u) &&
              (a = this._defaultHandlerMap.get(u)),
            !a)
          )
            return
          let c
          try {
            c = a.handle({url: r, request: t, event: n, params: o})
          } catch (e) {
            c = Promise.reject(e)
          }
          const l = s && s.catchHandler
          return (
            c instanceof Promise &&
              (this._catchHandler || l) &&
              (c = c.catch(async e => {
                if (l)
                  try {
                    return await l.handle({
                      url: r,
                      request: t,
                      event: n,
                      params: o,
                    })
                  } catch (t) {
                    t instanceof Error && (e = t)
                  }
                if (this._catchHandler)
                  return this._catchHandler.handle({
                    url: r,
                    request: t,
                    event: n,
                  })
                throw e
              })),
            c
          )
        }
        findMatchingRoute(e) {
          let {url: t, sameOrigin: n, request: r, event: i} = e
          const o = this._routes.get(r.method) || []
          for (const e of o) {
            let o
            const s = e.match({url: t, sameOrigin: n, request: r, event: i})
            if (s)
              return (
                (o = s),
                ((Array.isArray(o) && 0 === o.length) ||
                  (s.constructor === Object && 0 === Object.keys(s).length) ||
                  'boolean' == typeof s) &&
                  (o = void 0),
                {route: e, params: o}
              )
          }
          return {}
        }
        setDefaultHandler(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 'GET'
          this._defaultHandlerMap.set(t, Pi(e))
        }
        setCatchHandler(e) {
          this._catchHandler = Pi(e)
        }
        registerRoute(e) {
          this._routes.has(e.method) || this._routes.set(e.method, []),
            this._routes.get(e.method).push(e)
        }
        unregisterRoute(t) {
          if (!this._routes.has(t.method))
            throw new e('unregister-route-but-not-found-with-method', {
              method: t.method,
            })
          const n = this._routes.get(t.method).indexOf(t)
          if (!(n > -1)) throw new e('unregister-route-route-not-registered')
          this._routes.get(t.method).splice(n, 1)
        }
      }
      let Di
      const Ai = () => (
        Di || ((Di = new Ri()), Di.addFetchListener(), Di.addCacheListener()),
        Di
      )
      function Li(e) {
        return 'string' == typeof e ? new Request(e) : e
      }
      n(921)
      class Ki {
        constructor(e, t) {
          ;(this._cacheKeys = {}),
            Object.assign(this, t),
            (this.event = t.event),
            (this._strategy = e),
            (this._handlerDeferred = new s()),
            (this._extendLifetimePromises = []),
            (this._plugins = [...e.plugins]),
            (this._pluginStateMap = new Map())
          for (const e of this._plugins) this._pluginStateMap.set(e, {})
          this.event.waitUntil(this._handlerDeferred.promise)
        }
        async fetch(t) {
          const {event: n} = this
          let r = Li(t)
          if (
            'navigate' === r.mode &&
            n instanceof FetchEvent &&
            n.preloadResponse
          ) {
            const e = await n.preloadResponse
            if (e) return e
          }
          const i = this.hasCallback('fetchDidFail') ? r.clone() : null
          try {
            for (const e of this.iterateCallbacks('requestWillFetch'))
              r = await e({request: r.clone(), event: n})
          } catch (t) {
            if (t instanceof Error)
              throw new e('plugin-error-request-will-fetch', {
                thrownErrorMessage: t.message,
              })
          }
          const o = r.clone()
          try {
            let e
            e = await fetch(
              r,
              'navigate' === r.mode ? void 0 : this._strategy.fetchOptions,
            )
            for (const t of this.iterateCallbacks('fetchDidSucceed'))
              e = await t({event: n, request: o, response: e})
            return e
          } catch (e) {
            throw (i &&
              (await this.runCallbacks('fetchDidFail', {
                error: e,
                event: n,
                originalRequest: i.clone(),
                request: o.clone(),
              })),
            e)
          }
        }
        async fetchAndCachePut(e) {
          const t = await this.fetch(e),
            n = t.clone()
          return this.waitUntil(this.cachePut(e, n)), t
        }
        async cacheMatch(e) {
          const t = Li(e)
          let n
          const {cacheName: r, matchOptions: i} = this._strategy,
            o = await this.getCacheKey(t, 'read'),
            s = Object.assign(Object.assign({}, i), {cacheName: r})
          n = await caches.match(o, s)
          for (const e of this.iterateCallbacks('cachedResponseWillBeUsed'))
            n =
              (await e({
                cacheName: r,
                matchOptions: i,
                cachedResponse: n,
                request: o,
                event: this.event,
              })) || void 0
          return n
        }
        async cachePut(n, r) {
          const i = Li(n)
          await a(0)
          const s = await this.getCacheKey(i, 'write')
          if (!r)
            throw new e('cache-put-with-no-response', {
              url:
                ((u = s.url),
                new URL(String(u), location.href).href.replace(
                  new RegExp(`^${location.origin}`),
                  '',
                )),
            })
          var u
          const c = await this._ensureResponseSafeToCache(r)
          if (!c) return !1
          const {cacheName: l, matchOptions: h} = this._strategy,
            f = await self.caches.open(l),
            d = this.hasCallback('cacheDidUpdate'),
            p = d
              ? await (async function(e, t, n, r) {
                  const i = o(t.url, n)
                  if (t.url === i) return e.match(t, r)
                  const s = Object.assign(Object.assign({}, r), {
                      ignoreSearch: !0,
                    }),
                    a = await e.keys(t, s)
                  for (const t of a) if (i === o(t.url, n)) return e.match(t, r)
                })(f, s.clone(), ['__WB_REVISION__'], h)
              : null
          try {
            await f.put(s, d ? c.clone() : c)
          } catch (e) {
            if (e instanceof Error)
              throw ('QuotaExceededError' === e.name &&
                (await (async function() {
                  for (const e of t) await e()
                })()),
              e)
          }
          for (const e of this.iterateCallbacks('cacheDidUpdate'))
            await e({
              cacheName: l,
              oldResponse: p,
              newResponse: c.clone(),
              request: s,
              event: this.event,
            })
          return !0
        }
        async getCacheKey(e, t) {
          const n = `${e.url} | ${t}`
          if (!this._cacheKeys[n]) {
            let r = e
            for (const e of this.iterateCallbacks('cacheKeyWillBeUsed'))
              r = Li(
                await e({
                  mode: t,
                  request: r,
                  event: this.event,
                  params: this.params,
                }),
              )
            this._cacheKeys[n] = r
          }
          return this._cacheKeys[n]
        }
        hasCallback(e) {
          for (const t of this._strategy.plugins) if (e in t) return !0
          return !1
        }
        async runCallbacks(e, t) {
          for (const n of this.iterateCallbacks(e)) await n(t)
        }
        *iterateCallbacks(e) {
          for (const t of this._strategy.plugins)
            if ('function' == typeof t[e]) {
              const n = this._pluginStateMap.get(t),
                r = r => {
                  const i = Object.assign(Object.assign({}, r), {state: n})
                  return t[e](i)
                }
              yield r
            }
        }
        waitUntil(e) {
          return this._extendLifetimePromises.push(e), e
        }
        async doneWaiting() {
          let e
          for (; (e = this._extendLifetimePromises.shift()); ) await e
        }
        destroy() {
          this._handlerDeferred.resolve(null)
        }
        async _ensureResponseSafeToCache(e) {
          let t = e,
            n = !1
          for (const e of this.iterateCallbacks('cacheWillUpdate'))
            if (
              ((t =
                (await e({
                  request: this.request,
                  response: t,
                  event: this.event,
                })) || void 0),
              (n = !0),
              !t)
            )
              break
          return n || (t && 200 !== t.status && (t = void 0)), t
        }
      }
      class Ti {
        constructor() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          ;(this.cacheName = i(e.cacheName)),
            (this.plugins = e.plugins || []),
            (this.fetchOptions = e.fetchOptions),
            (this.matchOptions = e.matchOptions)
        }
        handle(e) {
          const [t] = this.handleAll(e)
          return t
        }
        handleAll(e) {
          e instanceof FetchEvent && (e = {event: e, request: e.request})
          const t = e.event,
            n =
              'string' == typeof e.request ? new Request(e.request) : e.request,
            r = 'params' in e ? e.params : void 0,
            i = new Ki(this, {event: t, request: n, params: r}),
            o = this._getResponse(i, n, t)
          return [o, this._awaitComplete(o, i, n, t)]
        }
        async _getResponse(t, n, r) {
          let i
          await t.runCallbacks('handlerWillStart', {event: r, request: n})
          try {
            if (((i = await this._handle(n, t)), !i || 'error' === i.type))
              throw new e('no-response', {url: n.url})
          } catch (e) {
            if (e instanceof Error)
              for (const o of t.iterateCallbacks('handlerDidError'))
                if (((i = await o({error: e, event: r, request: n})), i)) break
            if (!i) throw e
          }
          for (const e of t.iterateCallbacks('handlerWillRespond'))
            i = await e({event: r, request: n, response: i})
          return i
        }
        async _awaitComplete(e, t, n, r) {
          let i, o
          try {
            i = await e
          } catch (o) {}
          try {
            await t.runCallbacks('handlerDidRespond', {
              event: r,
              request: n,
              response: i,
            }),
              await t.doneWaiting()
          } catch (e) {
            e instanceof Error && (o = e)
          }
          if (
            (await t.runCallbacks('handlerDidComplete', {
              event: r,
              request: n,
              response: i,
              error: o,
            }),
            t.destroy(),
            o)
          )
            throw o
        }
      }
      const Ni = {
        cacheWillUpdate: async e => {
          let {response: t} = e
          return 200 === t.status || 0 === t.status ? t : null
        },
      }
      function Mi(e) {
        var t
        const n = +(null !== (t = $i(e, 'x-omrs-offline-response-status')) &&
        void 0 !== t
          ? t
          : '')
        return isNaN(n) || n < 200 || n > 599 ? 503 : n
      }
      function $i(e, t) {
        return e.get(t)
      }
      function Ii(e) {
        const t = {}
        return e.forEach((e, n) => (t[n] = e)), t
      }
      var Fi = function(e, t, n, r) {
        return new (n || (n = Promise))(function(i, o) {
          function s(e) {
            try {
              u(r.next(e))
            } catch (e) {
              o(e)
            }
          }
          function a(e) {
            try {
              u(r.throw(e))
            } catch (e) {
              o(e)
            }
          }
          function u(e) {
            var t
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function(e) {
                      e(t)
                    })).then(s, a)
          }
          u((r = r.apply(e, t || [])).next())
        })
      }
      const Bi = new (class extends Ti {
          constructor() {
            let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {}
            super(e),
              (this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0)
          }
          async _handle(t, n) {
            let r, i
            try {
              const e = [n.fetch(t)]
              if (this._networkTimeoutSeconds) {
                const t = a(1e3 * this._networkTimeoutSeconds)
                e.push(t)
              }
              if (((i = await Promise.race(e)), !i))
                throw new Error(
                  `Timed out the network response after ${this._networkTimeoutSeconds} seconds.`,
                )
            } catch (e) {
              e instanceof Error && (r = e)
            }
            if (!i) throw new e('no-response', {url: t.url, error: r})
            return i
          }
        })(),
        qi = new (class extends Ti {
          async _handle(t, n) {
            const r = await n.cacheMatch(t)
            if (!r) throw new e('no-response', {url: t.url})
            return r
          }
        })({cacheName: he}),
        Ui = new (class extends Ti {
          constructor() {
            let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {}
            super(e),
              this.plugins.some(e => 'cacheWillUpdate' in e) ||
                this.plugins.unshift(Ni),
              (this._networkTimeoutSeconds = e.networkTimeoutSeconds || 0)
          }
          async _handle(t, n) {
            const r = [],
              i = []
            let o
            if (this._networkTimeoutSeconds) {
              const {id: e, promise: s} = this._getTimeoutPromise({
                request: t,
                logs: r,
                handler: n,
              })
              ;(o = e), i.push(s)
            }
            const s = this._getNetworkPromise({
              timeoutId: o,
              request: t,
              logs: r,
              handler: n,
            })
            i.push(s)
            const a = await n.waitUntil(
              (async () => (await n.waitUntil(Promise.race(i))) || (await s))(),
            )
            if (!a) throw new e('no-response', {url: t.url})
            return a
          }
          _getTimeoutPromise(e) {
            let t,
              {request: n, logs: r, handler: i} = e
            return {
              promise: new Promise(e => {
                t = setTimeout(async () => {
                  e(await i.cacheMatch(n))
                }, 1e3 * this._networkTimeoutSeconds)
              }),
              id: t,
            }
          }
          async _getNetworkPromise(e) {
            let t,
              n,
              {timeoutId: r, request: i, logs: o, handler: s} = e
            try {
              n = await s.fetchAndCachePut(i)
            } catch (e) {
              e instanceof Error && (t = e)
            }
            return (
              r && clearTimeout(r), (!t && n) || (n = await s.cacheMatch(i)), n
            )
          }
        })({cacheName: he}),
        Wi = 'network-only-or-cache-only',
        Vi = {
          'network-first': e => Ui.handle(e),
          'network-only-or-cache-only': e =>
            Fi(void 0, void 0, void 0, function*() {
              try {
                return yield Bi.handle(e)
              } catch (t) {
                return yield qi.handle(e)
              }
            }),
        }
      function Hi(e) {
        return Fi(this, void 0, void 0, function*() {
          try {
            return yield Bi.handle(e)
          } catch (e) {
            const t = yield caches.open(he),
              n = yield t.match(de)
            return null != n ? n : Response.error()
          }
        })
      }
      function zi(e) {
        var t
        return Fi(this, void 0, void 0, function*() {
          const {request: n} = e,
            r = yield n.clone(),
            i =
              'GET' === e.request.method
                ? yield (function({request: e}) {
                    var t
                    return Fi(this, void 0, void 0, function*() {
                      return null !==
                        ((n = e.headers),
                        (t = $i(n, 'x-omrs-offline-caching-strategy'))) &&
                        void 0 !== t
                        ? t
                        : yield (function(e) {
                            var t
                            return Fi(this, void 0, void 0, function*() {
                              const n = new wi(),
                                r = yield n.dynamicRouteRegistrations.toArray(),
                                i = le(
                                  r
                                    .filter(t => new RegExp(t.pattern).test(e))
                                    .map(e => {
                                      var t
                                      return null !== (t = e.strategy) &&
                                        void 0 !== t
                                        ? t
                                        : 'network-first'
                                    }),
                                )
                              return i.length <= 1
                                ? i[0]
                                : null !==
                                    (t = [
                                      'network-first',
                                      'network-only-or-cache-only',
                                    ].find(e => i.some(t => t === e))) &&
                                  void 0 !== t
                                ? t
                                : Wi
                            })
                          })(e.url)
                      var n
                    })
                  })(e)
                : Wi,
            o = null !== (t = Vi[i]) && void 0 !== t ? t : Vi[Wi]
          try {
            return yield o(e)
          } catch (e) {
            return (
              console.warn(
                '[SW] Could not handle the request to %s (using handler %s).',
                n.url,
                i,
                e,
              ),
              (function(e) {
                !(function(e, t, n, r) {
                  new (n || (n = Promise))(function(i, o) {
                    function s(e) {
                      try {
                        u(r.next(e))
                      } catch (e) {
                        o(e)
                      }
                    }
                    function a(e) {
                      try {
                        u(r.throw(e))
                      } catch (e) {
                        o(e)
                      }
                    }
                    function u(e) {
                      var t
                      e.done
                        ? i(e.value)
                        : ((t = e.value),
                          t instanceof n
                            ? t
                            : new n(function(e) {
                                e(t)
                              })).then(s, a)
                    }
                    u((r = r.apply(e, t || [])).next())
                  })
                })(this, void 0, void 0, function*() {
                  const t = yield self.clients.matchAll({type: 'window'})
                  for (const n of t) n.postMessage(e)
                })
              })({
                type: 'networkRequestFailed',
                request: {
                  url: n.url,
                  method: n.method,
                  body: yield r.text(),
                  headers: Ii(n.headers),
                },
              }),
              new Response(
                (function(e) {
                  var t
                  return null !== (t = $i(e, 'x-omrs-offline-response-body')) &&
                    void 0 !== t
                    ? t
                    : void 0
                })(n.headers),
                {status: Mi(n.headers)},
              )
            )
          }
        })
      }
      var Yi
      ;(self.__WB_DISABLE_DEV_LOGS = !0),
        (Yi = {prefix: 'omrs'}),
        (e => {
          for (const t of Object.keys(r)) e(t)
        })(e => {
          'string' == typeof Yi[e] && (r[e] = Yi[e])
        }),
        (function() {
          !(function(e, t, n) {
            let r
            ;(r = e instanceof RegExp ? new ji(e, t, n) : new Ci(e, t, n)),
              Ai().registerRoute(r)
          })(({request: e}) => 'navigate' === e.mode, Hi)
          const e = Ai()
          for (const t of Ei) e.setDefaultHandler(zi, t)
        })(),
        self.addEventListener('message', function(e) {
          var t, n, r, i, o, s
          return Si(this, void 0, void 0, function*() {
            const a =
              Oi[
                null !==
                  (r =
                    null ===
                      (n =
                        null === (t = e.data) || void 0 === t
                          ? void 0
                          : t.type) || void 0 === n
                      ? void 0
                      : n.toString()) && void 0 !== r
                  ? r
                  : ''
              ]
            if (a)
              try {
                c({success: !0, result: yield a(e.data)})
              } catch (e) {
                u(
                  null !==
                    (s =
                      null !== (o = null == e ? void 0 : e.message) &&
                      void 0 !== o
                        ? o
                        : null == e
                        ? void 0
                        : e.toString()) && void 0 !== s
                    ? s
                    : 'Unknown error.',
                )
              }
            else
              u(
                `Received an unknown message of type "${
                  null === (i = e.data) || void 0 === i ? void 0 : i.type
                } which cannot be handled.`,
              )
            function u(e) {
              console.warn('[SW] Handling a message resulted in an error.', e),
                c({success: !1, error: e})
            }
            function c(t) {
              e.ports[0].postMessage(null != t ? t : {})
            }
          })
        }),
        self.addEventListener('install', e => {
          self.skipWaiting(), e.waitUntil(xi(pe))
        })
    })()
})()
//# sourceMappingURL=service-worker.js.map
