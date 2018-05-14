import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    isAdminLoggedIn: false,
    adminDetails: {},
    currentCase: {},
    AvailAmb: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isAdminLoggedIn = true
      } else {
        state.isAdminLoggedIn = false
        state.adminDetails = {}
      }
    },
    setAdmin (state, adminDetails) {
      state.adminDetails = adminDetails
    },
    keepCurrentCase (state, currentCase) {
      state.currentCase = currentCase
    },
    keepAvailAmb (state, AvailAmb) {
      state.AvailAmb = AvailAmb
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setAdmin ({commit}, adminDetails) {
      commit('setAdmin', adminDetails)
    },
    keepCurrentCase ({commit}, currentCase) {
      commit('keepCurrentCase', currentCase)
    },
    keepAvailAmb ({commit}, AvailAmb) {
      commit('keepAvailAmb', AvailAmb)
    }
  }
})
