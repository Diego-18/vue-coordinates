export const state = () => ({
  coordOrigin: [],
  coordDestination: [],
})

export const getters = {
  getOrigin(state) {
    return state.coordOrigin
  },

  getDestination(state) {
    return state.coordDestination
  },
}

export const actions = {
  addCoordOrigin({ commit }, data) {
    commit('addOrigin', data)
  },

  removeCoordOrigin({ commit }) {
    commit('removeOrigin')
  },

  addCoordDestination({ commit }, data) {
    commit('addDestination', data)
  },

  removeCoordDestination({ commit }) {
    commit('removeDestination')
  },
}

export const mutations = {
  addOrigin(state, data) {
    // if (data) {
    //   state.coordOrigin.push(data)
    // } else {
    state.coordOrigin.push(data)
    // }
  },

  removeOrigin(state) {
    state.coordOrigin = []
  },

  addDestination(state, data) {
    if (data[0]) {
      state.coordDestination.push(data[0])
    } else {
      state.coordDestination.push(data)
    }
  },

  removeDestination(state) {
    state.coordDestination = []
  },
}
