import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home';
import Vent from './pages/Vent';
import Orchestra from './pages/Orchestra';
import Voix from './pages/Voix';
import Percussions from './pages/Percu';
import Percussions2 from './pages/Percussions2';
import Cordes from './pages/Cordes';
import store from './store';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/orchestre', component: Orchestra },
  { path: '/vent', component: Vent },
  { path: '/voix', component: Voix },
  { path: '/percussions', component: Percussions },
  { path: '/percussions/2', component: Percussions2 },
  { path: '/cordes', component: Cordes },
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
