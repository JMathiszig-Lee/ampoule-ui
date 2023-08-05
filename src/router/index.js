import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Start from '../views/Start.vue'
import Session from '../views/Session.vue'

// Vue.use(VueRouter)

const routes =  [
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
