import Vue from "vue"
import VueRouter from "vue-router"
import store from "../store"
import fb from "../firebase"

import Dashboard from "../views/Dashboard.vue"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import(/* webpackChunkName: "about" */ "../views/Signup.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/Error404.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth.currentUser
  if (currentUser) {
    store.commit("setCurrentUser", currentUser)
    store.dispatch("fetchUserProfile")
  }
  fb.auth.onAuthStateChanged(user => {
    if (user) {
      store.commit("setCurrentUser", user)
      store.dispatch("fetchUserProfile")
    }
  })

  if ((to.path === '/login' || to.path === '/') && currentUser) {
    next('/dashboard')
  }
  if (requiresAuth && !currentUser) {
    next("/")
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
