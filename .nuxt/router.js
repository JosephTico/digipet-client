import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _2cd0d28a = () => interopDefault(import('../pages/care.vue' /* webpackChunkName: "pages/care" */))
const _22edd7e5 = () => interopDefault(import('../pages/caredata.vue' /* webpackChunkName: "pages/caredata" */))
const _6abb8424 = () => interopDefault(import('../pages/carerequest.vue' /* webpackChunkName: "pages/carerequest" */))
const _34b89999 = () => interopDefault(import('../pages/caresrecord.vue' /* webpackChunkName: "pages/caresrecord" */))
const _50fd96dc = () => interopDefault(import('../pages/confirmpay.vue' /* webpackChunkName: "pages/confirmpay" */))
const _7b7898e2 = () => interopDefault(import('../pages/mainscreen.vue' /* webpackChunkName: "pages/mainscreen" */))
const _38758ade = () => interopDefault(import('../pages/report.vue' /* webpackChunkName: "pages/report" */))
const _51816241 = () => interopDefault(import('../pages/schedule.vue' /* webpackChunkName: "pages/schedule" */))
const _1e51c508 = () => interopDefault(import('../pages/signpet.vue' /* webpackChunkName: "pages/signpet" */))
const _b233d67c = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _34e5f3ee = () => interopDefault(import('../pages/signupconfirm.vue' /* webpackChunkName: "pages/signupconfirm" */))
const _28bffb18 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/care",
      component: _2cd0d28a,
      name: "care"
    }, {
      path: "/caredata",
      component: _22edd7e5,
      name: "caredata"
    }, {
      path: "/carerequest",
      component: _6abb8424,
      name: "carerequest"
    }, {
      path: "/caresrecord",
      component: _34b89999,
      name: "caresrecord"
    }, {
      path: "/confirmpay",
      component: _50fd96dc,
      name: "confirmpay"
    }, {
      path: "/mainscreen",
      component: _7b7898e2,
      name: "mainscreen"
    }, {
      path: "/report",
      component: _38758ade,
      name: "report"
    }, {
      path: "/schedule",
      component: _51816241,
      name: "schedule"
    }, {
      path: "/signpet",
      component: _1e51c508,
      name: "signpet"
    }, {
      path: "/signup",
      component: _b233d67c,
      name: "signup"
    }, {
      path: "/signupconfirm",
      component: _34e5f3ee,
      name: "signupconfirm"
    }, {
      path: "/",
      component: _28bffb18,
      name: "index"
    }],

    fallback: false
  })
}
