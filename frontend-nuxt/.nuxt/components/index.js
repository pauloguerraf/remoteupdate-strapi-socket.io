import { wrapFunctional } from './utils'

export { default as Logo } from '../..\\components\\Logo.vue'
export { default as NavBar } from '../..\\components\\NavBar.vue'
export { default as Notification } from '../..\\components\\Notification.vue'

export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyNavBar = import('../..\\components\\NavBar.vue' /* webpackChunkName: "components/nav-bar" */).then(c => wrapFunctional(c.default || c))
export const LazyNotification = import('../..\\components\\Notification.vue' /* webpackChunkName: "components/notification" */).then(c => wrapFunctional(c.default || c))
