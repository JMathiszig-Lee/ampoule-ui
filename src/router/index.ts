import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Start from '../views/Start.vue'
import Session from '../views/Session.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/session/new',
    name: 'Start',
    component: Start
  },
  {
    path: '/session/:SessionId',
    name: 'Run Test',
    component: Session
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
