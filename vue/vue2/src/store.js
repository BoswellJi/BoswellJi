import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  name: "Boswell",
  age: 21,
};

const getters = {
  getterAge(state) {
    return state.age + 1;
  },
};

const mutations = {
  addAge(state) {
    state.age++;
  },
};

const actions = {
  getAge({ state, commit }) {
    commit("addAge");
  },
};

const modules = {
  mod1: {
    namespaced:true,
    state: {
      mod1Name: "mod1",
    },
    getters: {
      getterMod1Name(state) {
        return state.mod1Name + "test";
      },
    },
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  devtools: false
});
