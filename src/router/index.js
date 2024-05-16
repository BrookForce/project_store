import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';  // adjust the path if necessary

const auth = getAuth(app);

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import('../views/AboutView.vue')
    },
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: function () {
      return import('../views/RegisterView.vue')
    }
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: function () {
      return import('../views/signinView.vue')
    }
  }
]

const router = new Router({
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(getAuth(), user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    getCurrentUser().then(user => {
      if (user) {
        next();
      } else {
        next({
          path: '/sign-in',
          query: { redirect: to.fullPath }
        });
      }
    });
  } else {
    next();
  }
});

export default router