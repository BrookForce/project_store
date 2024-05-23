import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import SearchHistoryView from '../views/SearchHistoryView.vue';
import SigninView from '../views/SigninView.vue';
import RegisterView from '../views/RegisterView.vue';
import CartView from '../views/CartView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: CartView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SigninView,
  },
  {
    path: '/search-history',
    name: 'search-history',
    component: SearchHistoryView,
  },
];

const router = new Router({
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    getCurrentUser().then((user) => {
      if (user) {
        next();
      } else {
        next({
          path: '/sign-in',
          query: { redirect: to.fullPath },
        });
      }
    });
  } else {
    next();
  }
});

export default router;
