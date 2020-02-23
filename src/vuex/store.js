import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    appLoaded: false,
    users: []
  },
  getters: {},
  mutations: {
    SET_USERS_TO_STATE(state, users) {
      state.users = users;
      state.appLoaded = true;
    }
  },
  actions: {
    FETCH_USERS({commit}) {
      return axios.get('http://localhost:3000/users')
        .then((res) => {
          commit('SET_USERS_TO_STATE', res.data)
        })
    },
    ADD_NEW_USER({}, user) {
      return axios.post('http://localhost:3000/users', user)
    }
  }
})

export function useStore() {
  return store;
}
