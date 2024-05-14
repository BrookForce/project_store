import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  {
    path: '/register',
    name: 'register',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
    }
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/signinView.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router