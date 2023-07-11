import { createStore } from "vuex";
export default createStore({
  // namespaced: true,
  state() {
    return {
        isLoggedIn: false,
        user: {
            name: null,
            email: null
        }
    };
  },
  getters: {
    isLoggedIn: (state) => {
      return state.user !== null;
    },
  },
  mutations: {
    setUser(state, payload) {
        state.user = payload;
    },
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
  },
  actions: {

  },
});
