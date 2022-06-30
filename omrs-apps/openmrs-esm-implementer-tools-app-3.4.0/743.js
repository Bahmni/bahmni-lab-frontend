;(self.webpackChunk_openmrs_esm_implementer_tools_app =
  self.webpackChunk_openmrs_esm_implementer_tools_app || []).push([
  [743],
  {
    5743: (e, t, n) => {
      'use strict'
      n.r(t),
        n.d(t, {
          I18nContext: () => N,
          I18nextProvider: () => ue,
          Trans: () => J,
          Translation: () => se,
          composeInitialProps: () => z,
          date: () => me,
          getDefaults: () => D,
          getI18n: () => A,
          getInitialProps: () => L,
          initReactI18next: () => T,
          number: () => ge,
          plural: () => be,
          select: () => he,
          selectOrdinal: () => ve,
          setDefaults: () => I,
          setI18n: () => C,
          time: () => ye,
          useSSR: () => le,
          useTranslation: () => ne,
          withSSR: () => de,
          withTranslation: () => ae,
        })
      var r = n(6017)
      function o(e, t) {
        if (null == e) return {}
        var n,
          o,
          i = (0, r.Z)(e, t)
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e)
          for (o = 0; o < a.length; o++)
            (n = a[o]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (i[n] = e[n]))
        }
        return i
      }
      function i(e) {
        return (
          (i =
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
          i(e)
        )
      }
      function a(e, t, n) {
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
      var c = n(6983),
        s = n.n(c),
        u = n(1432),
        l = n.n(u),
        p = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g
      function f(e) {
        var t = {
            type: 'tag',
            name: '',
            voidElement: !1,
            attrs: {},
            children: [],
          },
          n = e.match(/<\/?([^\s]+?)[/\s>]/)
        if (
          n &&
          ((t.name = n[1]),
          (l()[n[1]] || '/' === e.charAt(e.length - 2)) && (t.voidElement = !0),
          t.name.startsWith('!--'))
        ) {
          var r = e.indexOf('--\x3e')
          return {type: 'comment', comment: -1 !== r ? e.slice(4, r) : ''}
        }
        for (var o = new RegExp(p), i = null; null !== (i = o.exec(e)); )
          if (i[0].trim())
            if (i[1]) {
              var a = i[1].trim(),
                c = [a, '']
              a.indexOf('=') > -1 && (c = a.split('=')),
                (t.attrs[c[0]] = c[1]),
                o.lastIndex--
            } else
              i[2] &&
                (t.attrs[i[2]] = i[3].trim().substring(1, i[3].length - 1))
        return t
      }
      var d = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,
        m = /^\s*$/,
        y = Object.create(null)
      function g(e, t) {
        switch (t.type) {
          case 'text':
            return e + t.content
          case 'tag':
            return (
              (e +=
                '<' +
                t.name +
                (t.attrs
                  ? (function(e) {
                      var t = []
                      for (var n in e) t.push(n + '="' + e[n] + '"')
                      return t.length ? ' ' + t.join(' ') : ''
                    })(t.attrs)
                  : '') +
                (t.voidElement ? '/>' : '>')),
              t.voidElement
                ? e
                : e + t.children.reduce(g, '') + '</' + t.name + '>'
            )
          case 'comment':
            return e + '\x3c!--' + t.comment + '--\x3e'
        }
      }
      var h = {
        parse: function(e, t) {
          t || (t = {}), t.components || (t.components = y)
          var n,
            r = [],
            o = [],
            i = -1,
            a = !1
          if (0 !== e.indexOf('<')) {
            var c = e.indexOf('<')
            r.push({type: 'text', content: -1 === c ? e : e.substring(0, c)})
          }
          return (
            e.replace(d, function(c, s) {
              if (a) {
                if (c !== '</' + n.name + '>') return
                a = !1
              }
              var u,
                l = '/' !== c.charAt(1),
                p = c.startsWith('\x3c!--'),
                d = s + c.length,
                y = e.charAt(d)
              if (p) {
                var g = f(c)
                return i < 0 ? (r.push(g), r) : ((u = o[i]).children.push(g), r)
              }
              if (
                (l &&
                  (i++,
                  'tag' === (n = f(c)).type &&
                    t.components[n.name] &&
                    ((n.type = 'component'), (a = !0)),
                  n.voidElement ||
                    a ||
                    !y ||
                    '<' === y ||
                    n.children.push({
                      type: 'text',
                      content: e.slice(d, e.indexOf('<', d)),
                    }),
                  0 === i && r.push(n),
                  (u = o[i - 1]) && u.children.push(n),
                  (o[i] = n)),
                (!l || n.voidElement) &&
                  (i > -1 &&
                    (n.voidElement || n.name === c.slice(2, -1)) &&
                    (i--, (n = -1 === i ? r : o[i])),
                  !a && '<' !== y && y))
              ) {
                u = -1 === i ? r : o[i].children
                var h = e.indexOf('<', d),
                  b = e.slice(d, -1 === h ? void 0 : h)
                m.test(b) && (b = ' '),
                  ((h > -1 && i + u.length >= 0) || ' ' !== b) &&
                    u.push({type: 'text', content: b})
              }
            }),
            r
          )
        },
        stringify: function(e) {
          return e.reduce(function(e, t) {
            return e + g('', t)
          }, '')
        },
      }
      const b = h
      var v = ''.replace,
        O = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,
        j = {
          '&amp;': '&',
          '&#38;': '&',
          '&lt;': '<',
          '&#60;': '<',
          '&gt;': '>',
          '&#62;': '>',
          '&apos;': "'",
          '&#39;': "'",
          '&quot;': '"',
          '&#34;': '"',
        }
      function w(e) {
        return j[e]
      }
      function P(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n]
          ;(r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
      }
      function E(e, t) {
        var n = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e)
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            })),
            n.push.apply(n, r)
        }
        return n
      }
      function x(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {}
          t % 2
            ? E(Object(n), !0).forEach(function(t) {
                a(e, t, n[t])
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : E(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                )
              })
        }
        return e
      }
      var S,
        k = {
          bindI18n: 'languageChanged',
          bindI18nStore: '',
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: !0,
          transWrapTextNodes: '',
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
          useSuspense: !0,
        },
        N = s().createContext()
      function I() {
        var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        k = x(x({}, k), e)
      }
      function D() {
        return k
      }
      var R = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function')
          })(this, e),
            (this.usedNamespaces = {})
        }
        var t, n
        return (
          (t = e),
          (n = [
            {
              key: 'addUsedNamespaces',
              value: function(e) {
                var t = this
                e.forEach(function(e) {
                  t.usedNamespaces[e] || (t.usedNamespaces[e] = !0)
                })
              },
            },
            {
              key: 'getUsedNamespaces',
              value: function() {
                return Object.keys(this.usedNamespaces)
              },
            },
          ]) && P(t.prototype, n),
          Object.defineProperty(t, 'prototype', {writable: !1}),
          e
        )
      })()
      function C(e) {
        S = e
      }
      function A() {
        return S
      }
      var T = {
        type: '3rdParty',
        init: function(e) {
          I(e.options.react), C(e)
        },
      }
      function z(e) {
        return function(t) {
          return new Promise(function(n) {
            var r = L()
            e.getInitialProps
              ? e.getInitialProps(t).then(function(e) {
                  n(x(x({}, e), r))
                })
              : n(r)
          })
        }
      }
      function L() {
        var e = A(),
          t = e.reportNamespaces ? e.reportNamespaces.getUsedNamespaces() : [],
          n = {},
          r = {}
        return (
          e.languages.forEach(function(n) {
            ;(r[n] = {}),
              t.forEach(function(t) {
                r[n][t] = e.getResourceBundle(n, t) || {}
              })
          }),
          (n.initialI18nStore = r),
          (n.initialLanguage = e.language),
          n
        )
      }
      function _() {
        if (console && console.warn) {
          for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
            n[r] = arguments[r]
          'string' == typeof n[0] && (n[0] = 'react-i18next:: '.concat(n[0])),
            (e = console).warn.apply(e, n)
        }
      }
      var B = {}
      function U() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n]
        ;('string' == typeof t[0] && B[t[0]]) ||
          ('string' == typeof t[0] && (B[t[0]] = new Date()),
          _.apply(void 0, t))
      }
      function H(e, t, n) {
        e.loadNamespaces(t, function() {
          e.isInitialized
            ? n()
            : e.on('initialized', function t() {
                setTimeout(function() {
                  e.off('initialized', t)
                }, 0),
                  n()
              })
        })
      }
      function K(e, t) {
        var n =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
        if (!t.languages || !t.languages.length)
          return U('i18n.languages were undefined or empty', t.languages), !0
        var r = t.languages[0],
          o = !!t.options && t.options.fallbackLng,
          i = t.languages[t.languages.length - 1]
        if ('cimode' === r.toLowerCase()) return !0
        var a = function(e, n) {
          var r = t.services.backendConnector.state[''.concat(e, '|').concat(n)]
          return -1 === r || 2 === r
        }
        return !(
          (n.bindI18n &&
            n.bindI18n.indexOf('languageChanging') > -1 &&
            t.services.backendConnector.backend &&
            t.isLanguageChangingTo &&
            !a(t.isLanguageChangingTo, e)) ||
          (!t.hasResourceBundle(r, e) &&
            t.services.backendConnector.backend &&
            (!a(r, e) || (o && !a(i, e))))
        )
      }
      function V(e) {
        return (
          e.displayName ||
          e.name ||
          ('string' == typeof e && e.length > 0 ? e : 'Unknown')
        )
      }
      var F = ['format'],
        W = [
          'children',
          'count',
          'parent',
          'i18nKey',
          'context',
          'tOptions',
          'values',
          'defaults',
          'components',
          'ns',
          'i18n',
          't',
          'shouldUnescape',
        ]
      function M(e, t) {
        var n = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e)
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            })),
            n.push.apply(n, r)
        }
        return n
      }
      function $(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {}
          t % 2
            ? M(Object(n), !0).forEach(function(t) {
                a(e, t, n[t])
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : M(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                )
              })
        }
        return e
      }
      function Z(e, t) {
        if (!e) return !1
        var n = e.props ? e.props.children : e.children
        return t ? n.length > 0 : !!n
      }
      function q(e) {
        return e
          ? e && e.children
            ? e.children
            : e.props && e.props.children
          : []
      }
      function Y(e) {
        return Array.isArray(e) ? e : [e]
      }
      function G(e, t) {
        if (!e) return ''
        var n = '',
          r = Y(e),
          a =
            t.transSupportBasicHtmlNodes && t.transKeepBasicHtmlNodesFor
              ? t.transKeepBasicHtmlNodesFor
              : []
        return (
          r.forEach(function(e, r) {
            if ('string' == typeof e) n += ''.concat(e)
            else if (s().isValidElement(e)) {
              var c = Object.keys(e.props).length,
                u = a.indexOf(e.type) > -1,
                l = e.props.children
              if (!l && u && 0 === c) n += '<'.concat(e.type, '/>')
              else if (l || (u && 0 === c))
                if (e.props.i18nIsDynamicList)
                  n += '<'.concat(r, '></').concat(r, '>')
                else if (u && 1 === c && 'string' == typeof l)
                  n += '<'
                    .concat(e.type, '>')
                    .concat(l, '</')
                    .concat(e.type, '>')
                else {
                  var p = G(l, t)
                  n += '<'
                    .concat(r, '>')
                    .concat(p, '</')
                    .concat(r, '>')
                }
              else n += '<'.concat(r, '></').concat(r, '>')
            } else if (null === e)
              _(
                'Trans: the passed in value is invalid - seems you passed in a null child.',
              )
            else if ('object' === i(e)) {
              var f = e.format,
                d = o(e, F),
                m = Object.keys(d)
              if (1 === m.length) {
                var y = f ? ''.concat(m[0], ', ').concat(f) : m[0]
                n += '{{'.concat(y, '}}')
              } else
                _(
                  'react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.',
                  e,
                )
            } else
              _(
                'Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.',
                e,
              )
          }),
          n
        )
      }
      function J(e) {
        var t = e.children,
          n = e.count,
          r = e.parent,
          a = e.i18nKey,
          u = e.context,
          l = e.tOptions,
          p = void 0 === l ? {} : l,
          f = e.values,
          d = e.defaults,
          m = e.components,
          y = e.ns,
          g = e.i18n,
          h = e.t,
          j = e.shouldUnescape,
          P = o(e, W),
          E = (0, c.useContext)(N) || {},
          x = E.i18n,
          S = E.defaultNS,
          k = g || x || A()
        if (!k)
          return (
            U(
              'You will need to pass in an i18next instance by using i18nextReactModule',
            ),
            t
          )
        var I =
          h ||
          k.t.bind(k) ||
          function(e) {
            return e
          }
        u && (p.context = u)
        var R = $($({}, D()), k.options && k.options.react),
          C = y || I.ns || S || (k.options && k.options.defaultNS)
        C = 'string' == typeof C ? [C] : C || ['translation']
        var T = d || G(t, R) || R.transEmptyNodeValue || a,
          z = R.hashTransKey,
          L = a || (z ? z(T) : T),
          _ = f
            ? p.interpolation
            : {
                interpolation: $(
                  $({}, p.interpolation),
                  {},
                  {prefix: '#$?', suffix: '?$#'},
                ),
              },
          B = $(
            $($($({}, p), {}, {count: n}, f), _),
            {},
            {defaultValue: T, ns: C},
          ),
          H = (function(e, t, n, r, o, a) {
            if ('' === t) return []
            var c = r.transKeepBasicHtmlNodesFor || [],
              u = t && new RegExp(c.join('|')).test(t)
            if (!e && !u) return [t]
            var l = {}
            !(function e(t) {
              Y(t).forEach(function(t) {
                'string' != typeof t &&
                  (Z(t)
                    ? e(q(t))
                    : 'object' !== i(t) ||
                      s().isValidElement(t) ||
                      Object.assign(l, t))
              })
            })(e)
            var p = b.parse('<0>'.concat(t, '</0>')),
              f = $($({}, l), o)
            function d(e, t, n) {
              var r = q(e),
                o = y(r, t.children, n)
              return (function(e) {
                return (
                  '[object Array]' === Object.prototype.toString.call(e) &&
                  e.every(function(e) {
                    return s().isValidElement(e)
                  })
                )
              })(r) && 0 === o.length
                ? r
                : o
            }
            function m(e, t, n, r, o) {
              e.dummy && (e.children = t),
                n.push(
                  s().cloneElement(
                    e,
                    $($({}, e.props), {}, {key: r}),
                    o ? void 0 : t,
                  ),
                )
            }
            function y(t, o, l) {
              var p = Y(t)
              return Y(o).reduce(function(t, o, g) {
                var h,
                  b,
                  j,
                  P,
                  E =
                    o.children &&
                    o.children[0] &&
                    o.children[0].content &&
                    n.services.interpolator.interpolate(
                      o.children[0].content,
                      f,
                      n.language,
                    )
                if ('tag' === o.type) {
                  var x = p[parseInt(o.name, 10)]
                  !x && 1 === l.length && l[0][o.name] && (x = l[0][o.name]),
                    x || (x = {})
                  var S =
                      0 !== Object.keys(o.attrs).length
                        ? ((b = {props: o.attrs}),
                          ((P = $({}, (j = x))).props = Object.assign(
                            b.props,
                            j.props,
                          )),
                          P)
                        : x,
                    k = s().isValidElement(S),
                    N = k && Z(o, !0) && !o.voidElement,
                    I = u && 'object' === i(S) && S.dummy && !k,
                    D =
                      'object' === i(e) &&
                      null !== e &&
                      Object.hasOwnProperty.call(e, o.name)
                  if ('string' == typeof S) {
                    var R = n.services.interpolator.interpolate(
                      S,
                      f,
                      n.language,
                    )
                    t.push(R)
                  } else if (Z(S) || N) m(S, d(S, o, l), t, g)
                  else if (I) {
                    var C = y(p, o.children, l)
                    t.push(
                      s().cloneElement(S, $($({}, S.props), {}, {key: g}), C),
                    )
                  } else if (Number.isNaN(parseFloat(o.name)))
                    if (D) m(S, d(S, o, l), t, g, o.voidElement)
                    else if (
                      r.transSupportBasicHtmlNodes &&
                      c.indexOf(o.name) > -1
                    )
                      if (o.voidElement)
                        t.push(
                          s().createElement(o.name, {
                            key: ''.concat(o.name, '-').concat(g),
                          }),
                        )
                      else {
                        var A = y(p, o.children, l)
                        t.push(
                          s().createElement(
                            o.name,
                            {key: ''.concat(o.name, '-').concat(g)},
                            A,
                          ),
                        )
                      }
                    else if (o.voidElement) t.push('<'.concat(o.name, ' />'))
                    else {
                      var T = y(p, o.children, l)
                      t.push(
                        '<'
                          .concat(o.name, '>')
                          .concat(T, '</')
                          .concat(o.name, '>'),
                      )
                    }
                  else if ('object' !== i(S) || k)
                    1 === o.children.length && E
                      ? t.push(
                          s().cloneElement(
                            S,
                            $($({}, S.props), {}, {key: g}),
                            E,
                          ),
                        )
                      : t.push(
                          s().cloneElement(S, $($({}, S.props), {}, {key: g})),
                        )
                  else {
                    var z = o.children[0] ? E : null
                    z && t.push(z)
                  }
                } else if ('text' === o.type) {
                  var L = r.transWrapTextNodes,
                    _ = a
                      ? ((h = n.services.interpolator.interpolate(
                          o.content,
                          f,
                          n.language,
                        )),
                        v.call(h, O, w))
                      : n.services.interpolator.interpolate(
                          o.content,
                          f,
                          n.language,
                        )
                  L
                    ? t.push(
                        s().createElement(
                          L,
                          {key: ''.concat(o.name, '-').concat(g)},
                          _,
                        ),
                      )
                    : t.push(_)
                }
                return t
              }, [])
            }
            return q(y([{dummy: !0, children: e || []}], p, Y(e || []))[0])
          })(m || t, L ? I(L, B) : T, k, R, B, j),
          K = void 0 !== r ? r : R.defaultTransParent
        return K ? s().createElement(K, P, H) : H
      }
      function Q(e, t) {
        ;(null == t || t > e.length) && (t = e.length)
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
        return r
      }
      function X(e, t) {
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
                i = [],
                a = !0,
                c = !1
              try {
                for (
                  n = n.call(e);
                  !(a = (r = n.next()).done) &&
                  (i.push(r.value), !t || i.length !== t);
                  a = !0
                );
              } catch (e) {
                ;(c = !0), (o = e)
              } finally {
                try {
                  a || null == n.return || n.return()
                } finally {
                  if (c) throw o
                }
              }
              return i
            }
          })(e, t) ||
          (function(e, t) {
            if (e) {
              if ('string' == typeof e) return Q(e, t)
              var n = Object.prototype.toString.call(e).slice(8, -1)
              return (
                'Object' === n && e.constructor && (n = e.constructor.name),
                'Map' === n || 'Set' === n
                  ? Array.from(e)
                  : 'Arguments' === n ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? Q(e, t)
                  : void 0
              )
            }
          })(e, t) ||
          (function() {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            )
          })()
        )
      }
      function ee(e, t) {
        var n = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e)
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            })),
            n.push.apply(n, r)
        }
        return n
      }
      function te(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {}
          t % 2
            ? ee(Object(n), !0).forEach(function(t) {
                a(e, t, n[t])
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : ee(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                )
              })
        }
        return e
      }
      function ne(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = t.i18n,
          r = (0, c.useContext)(N) || {},
          o = r.i18n,
          i = r.defaultNS,
          a = n || o || A()
        if ((a && !a.reportNamespaces && (a.reportNamespaces = new R()), !a)) {
          U(
            'You will need to pass in an i18next instance by using initReactI18next',
          )
          var s = function(e) {
              return Array.isArray(e) ? e[e.length - 1] : e
            },
            u = [s, {}, !1]
          return (u.t = s), (u.i18n = {}), (u.ready = !1), u
        }
        a.options.react &&
          void 0 !== a.options.react.wait &&
          U(
            'It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.',
          )
        var l = te(te(te({}, D()), a.options.react), t),
          p = l.useSuspense,
          f = l.keyPrefix,
          d = e || i || (a.options && a.options.defaultNS)
        ;(d = 'string' == typeof d ? [d] : d || ['translation']),
          a.reportNamespaces.addUsedNamespaces &&
            a.reportNamespaces.addUsedNamespaces(d)
        var m =
          (a.isInitialized || a.initializedStoreOnce) &&
          d.every(function(e) {
            return K(e, a, l)
          })
        function y() {
          return a.getFixedT(null, 'fallback' === l.nsMode ? d : d[0], f)
        }
        var g = (0, c.useState)(y),
          h = X(g, 2),
          b = h[0],
          v = h[1],
          O = (0, c.useRef)(!0)
        ;(0, c.useEffect)(
          function() {
            var e = l.bindI18n,
              t = l.bindI18nStore
            function n() {
              O.current && v(y)
            }
            return (
              (O.current = !0),
              m ||
                p ||
                H(a, d, function() {
                  O.current && v(y)
                }),
              e && a && a.on(e, n),
              t && a && a.store.on(t, n),
              function() {
                ;(O.current = !1),
                  e &&
                    a &&
                    e.split(' ').forEach(function(e) {
                      return a.off(e, n)
                    }),
                  t &&
                    a &&
                    t.split(' ').forEach(function(e) {
                      return a.store.off(e, n)
                    })
              }
            )
          },
          [a, d.join()],
        )
        var j = (0, c.useRef)(!0)
        ;(0, c.useEffect)(
          function() {
            O.current && !j.current && v(y), (j.current = !1)
          },
          [a],
        )
        var w = [b, a, m]
        if (((w.t = b), (w.i18n = a), (w.ready = m), m)) return w
        if (!m && !p) return w
        throw new Promise(function(e) {
          H(a, d, function() {
            e()
          })
        })
      }
      var re = ['forwardedRef']
      function oe(e, t) {
        var n = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e)
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            })),
            n.push.apply(n, r)
        }
        return n
      }
      function ie(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {}
          t % 2
            ? oe(Object(n), !0).forEach(function(t) {
                a(e, t, n[t])
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : oe(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                )
              })
        }
        return e
      }
      function ae(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
        return function(n) {
          function r(r) {
            var i = r.forwardedRef,
              a = o(r, re),
              c = X(ne(e, a), 3),
              u = c[0],
              l = c[1],
              p = c[2],
              f = ie(ie({}, a), {}, {t: u, i18n: l, tReady: p})
            return (
              t.withRef && i
                ? (f.ref = i)
                : !t.withRef && i && (f.forwardedRef = i),
              s().createElement(n, f)
            )
          }
          return (
            (r.displayName = 'withI18nextTranslation('.concat(V(n), ')')),
            (r.WrappedComponent = n),
            t.withRef
              ? s().forwardRef(function(e, t) {
                  return s().createElement(
                    r,
                    Object.assign({}, e, {forwardedRef: t}),
                  )
                })
              : r
          )
        }
      }
      var ce = ['ns', 'children']
      function se(e) {
        var t = e.ns,
          n = e.children,
          r = X(ne(t, o(e, ce)), 3),
          i = r[0],
          a = r[1],
          c = r[2]
        return n(i, {i18n: a, lng: a.language}, c)
      }
      function ue(e) {
        var t = e.i18n,
          n = e.defaultNS,
          r = e.children,
          o = (0, c.useMemo)(
            function() {
              return {i18n: t, defaultNS: n}
            },
            [t, n],
          )
        return (0, c.createElement)(N.Provider, {value: o}, r)
      }
      function le(e, t) {
        var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          r = n.i18n,
          o = (0, c.useContext)(N) || {},
          i = o.i18n,
          a = r || i || A()
        ;(a.options && a.options.isClone) ||
          (e &&
            !a.initializedStoreOnce &&
            ((a.services.resourceStore.data = e),
            (a.options.ns = Object.values(e).reduce(function(e, t) {
              return (
                Object.keys(t).forEach(function(t) {
                  e.indexOf(t) < 0 && e.push(t)
                }),
                e
              )
            }, a.options.ns)),
            (a.initializedStoreOnce = !0),
            (a.isInitialized = !0)),
          t &&
            !a.initializedLanguageOnce &&
            (a.changeLanguage(t), (a.initializedLanguageOnce = !0)))
      }
      var pe = ['initialI18nStore', 'initialLanguage']
      function fe(e, t) {
        var n = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e)
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            })),
            n.push.apply(n, r)
        }
        return n
      }
      function de() {
        return function(e) {
          function t(t) {
            var n = t.initialI18nStore,
              r = t.initialLanguage,
              i = o(t, pe)
            return (
              le(n, r),
              s().createElement(
                e,
                (function(e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {}
                    t % 2
                      ? fe(Object(n), !0).forEach(function(t) {
                          a(e, t, n[t])
                        })
                      : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(
                          e,
                          Object.getOwnPropertyDescriptors(n),
                        )
                      : fe(Object(n)).forEach(function(t) {
                          Object.defineProperty(
                            e,
                            t,
                            Object.getOwnPropertyDescriptor(n, t),
                          )
                        })
                  }
                  return e
                })({}, i),
              )
            )
          }
          return (
            (t.getInitialProps = z(e)),
            (t.displayName = 'withI18nextSSR('.concat(V(e), ')')),
            (t.WrappedComponent = e),
            t
          )
        }
      }
      var me = function() {
          return ''
        },
        ye = function() {
          return ''
        },
        ge = function() {
          return ''
        },
        he = function() {
          return ''
        },
        be = function() {
          return ''
        },
        ve = function() {
          return ''
        }
    },
    1432: e => {
      e.exports = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      }
    },
    6017: (e, t, n) => {
      'use strict'
      function r(e, t) {
        if (null == e) return {}
        var n,
          r,
          o = {},
          i = Object.keys(e)
        for (r = 0; r < i.length; r++)
          (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n])
        return o
      }
      n.d(t, {Z: () => r})
    },
  },
])
