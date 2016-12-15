import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home';
import Frequency from './pages/Frequency';
import Vibration from './pages/Vibration';
import store from './store';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/frequency', component: Frequency },
  { path: '/vibration', component: Vibration },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash };
    /* eslint-disable no-else-return */
    } else {
      return { x: 0, y: 0 };
    }
  },
});

const app = new Vue({
  router,
  store,
}).$mount('#app');
