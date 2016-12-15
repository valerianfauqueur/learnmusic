import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  orchestra: {
    sing: {
      show: false,
      locked: false,
    },
    wind: {
      show: false,
      locked: true,
    },
    percu: {
      show: false,
      locked: true,
    },
    cordes: {
      show: false,
      locked: true,
    },
  },
  welcomeMsg: true,
  showGame: {
    sing: false,
    wind: false,
    percu: false,
    cordes: false,
  },
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const mutations = {
  updateOrchestra(state, { type }) {
    switch (type) {
      case 'cordes':
        state.orchestra.cordes.show = true;
        break;
      case 'percu':
        state.orchestra.percu.show = true;
        state.orchestra.corde.locked = false;
        break;
      case 'sing':
        state.orchestra.sing.show = false;
        state.orchestra.wind.locked = false;
        break;
      case 'wind':
        state.orchestra.wind.show = true;
        state.orchestra.percu.locked = false;
        break;
      default:
        break;
    }
  },

  updateDescMsg(state, { game }) {
    if (state.showGame.sing) {
      state.showGame.sing = false;
    } else if (state.showGame.wind) {
      state.showGame.wind = false;
    } else if (state.showGame.percu) {
      state.showGame.percu = false;
    } else if (state.showGame.cordes) {
      state.showGame.cordes = false;
    } else if (state.welcomeMsg) {
      state.welcomeMsg = false;
    }

    switch (game) {
      case 'sing':
        state.showGame.sing = true;
        break;
      case 'wind':
        state.showGame.wind = true;
        break;
      case 'percu':
        state.showGame.percu = true;
        break;
      case 'cordes':
        state.showGame.cordes = true;
        break;
      default:
        break;
    }
  },
};

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  updateOrchestra: ({ commit }, type) => commit('updateOrchestra', { type }),
  updateDescMsg: ({ commit }, game) => commit('updateDescMsg', { game }),
};

// getters are functions
const getters = {
  orchestra: state => state.orchestra,
  showGame: state => state.showGame,
  welcomeMsg: state => state.welcomeMsg,
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
