'use strict'
;(self.webpackChunk_openmrs_esm_implementer_tools_app =
  self.webpackChunk_openmrs_esm_implementer_tools_app || []).push([
  [105],
  {
    1930: (e, t, l) => {
      l.d(t, {Z: () => r})
      var o = l(361),
        n = l.n(o)()(function(e) {
          return e[1]
        })
      n.push([
        e.id,
        ':root{--brand-01: #005d5d;--brand-02: #004144;--brand-03: #007d79}.-esm-implementer-tools__implementer-tools-styles__productiveHeading01___yQVkG{font-size:.875rem;font-weight:600;line-height:1.29;letter-spacing:.16px}.-esm-implementer-tools__implementer-tools-styles__productiveHeading02___9ouKT{font-size:1rem;font-weight:600;line-height:1.375;letter-spacing:0}.-esm-implementer-tools__implementer-tools-styles__bodyShort01___Be-sL{font-size:.875rem;font-weight:400;line-height:1.29;letter-spacing:.16px}.-esm-implementer-tools__implementer-tools-styles__toolStyles___g9u4a{background-color:transparent}',
        '',
      ]),
        (n.locals = {
          productiveHeading01:
            '-esm-implementer-tools__implementer-tools-styles__productiveHeading01___yQVkG',
          productiveHeading02:
            '-esm-implementer-tools__implementer-tools-styles__productiveHeading02___9ouKT',
          bodyShort01:
            '-esm-implementer-tools__implementer-tools-styles__bodyShort01___Be-sL',
          toolStyles:
            '-esm-implementer-tools__implementer-tools-styles__toolStyles___g9u4a',
        })
      const r = n
    },
    4105: (e, t, l) => {
      l.r(t), l.d(t, {default: () => L})
      var o = l(6983),
        n = l.n(o),
        r = l(2680),
        s = l(8251),
        i = n().createElement('path', {
          d:
            'M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z',
        })
      const m = n().forwardRef(function(e, t) {
        var l = e.children,
          o = (0, s._)(e, ['children'])
        return n().createElement(
          s.I,
          (0, s.a)(
            {
              width: 20,
              height: 20,
              viewBox: '0 0 32 32',
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'currentColor',
              ref: t,
            },
            o,
          ),
          i,
          l,
        )
      })
      var a = n().createElement('path', {
        d:
          'M12.1,2A9.8,9.8,0,0,0,6.7,3.6L13.1,10a2.1,2.1,0,0,1,.2,3,2.1,2.1,0,0,1-3-.2L3.7,6.4A9.84,9.84,0,0,0,2,12.1,10.14,10.14,0,0,0,12.1,22.2a10.9,10.9,0,0,0,2.6-.3l6.7,6.7a5,5,0,0,0,7.1-7.1l-6.7-6.7a10.9,10.9,0,0,0,.3-2.6A10,10,0,0,0,12.1,2Zm8,10.1a7.61,7.61,0,0,1-.3,2.1l-.3,1.1.8.8L27,22.8a2.88,2.88,0,0,1,.9,2.1A2.72,2.72,0,0,1,27,27a2.9,2.9,0,0,1-4.2,0l-6.7-6.7-.8-.8-1.1.3a7.61,7.61,0,0,1-2.1.3,8.27,8.27,0,0,1-5.7-2.3A7.63,7.63,0,0,1,4,12.1a8.33,8.33,0,0,1,.3-2.2l4.4,4.4a4.14,4.14,0,0,0,5.9.2,4.14,4.14,0,0,0-.2-5.9L10,4.2a6.45,6.45,0,0,1,2-.3,8.27,8.27,0,0,1,5.7,2.3A8.49,8.49,0,0,1,20.1,12.1Z',
      })
      const _ = n().forwardRef(function(e, t) {
        var l = e.children,
          o = (0, s._)(e, ['children'])
        return n().createElement(
          s.I,
          (0, s.a)(
            {
              width: 24,
              height: 24,
              viewBox: '0 0 32 32',
              xmlns: 'http://www.w3.org/2000/svg',
              fill: 'currentColor',
              ref: t,
            },
            o,
          ),
          a,
          l,
        )
      })
      var p = l(9784),
        c = l(7644),
        d = l(1004),
        u = l(487),
        h = l.n(u),
        g = l(631),
        f = l.n(g),
        y = l(2052),
        w = l.n(y),
        v = l(4010),
        b = l.n(v),
        A = l(1469),
        T = l.n(A),
        E = l(9329),
        S = l.n(E),
        k = l(1930),
        H = {}
      ;(H.styleTagTransform = S()),
        (H.setAttributes = b()),
        (H.insert = w().bind(null, 'head')),
        (H.domAPI = f()),
        (H.insertStyleElement = T()),
        h()(k.Z, H)
      const I = k.Z && k.Z.locals ? k.Z.locals : void 0,
        L = function() {
          var e = (0, r.useTranslation)().t,
            t = (0, c.useStore)(d.wT).isOpen
          return n().createElement(
            c.UserHasAccess,
            {privilege: 'coreapps.systemAdministration'},
            n().createElement(
              p.HeaderGlobalAction,
              {
                'aria-label': e('implementerTools', 'Implementer Tools'),
                'aria-labelledby': 'Implementer Tools',
                className: I.toolStyles,
                name: 'ImplementerToolsIcon',
                onClick: d.zI,
              },
              t ? n().createElement(m, null) : n().createElement(_, null),
            ),
          )
        }
    },
  },
])
