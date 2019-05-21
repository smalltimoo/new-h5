
export default {
  state: {
    intervals: null
  },
  getters: {
    getIntervals: state => {
      return state.intervals;
    }
  },
  mutations: {
    setIntervals(state, payload) {
      state.intervals = --payload;
    }
  },
  actions: {
    setIntervals(context, payload) {
        let timer = setInterval(() => {
            context.commit('setIntervals', context.state.intervals||payload);
            context.state.intervals === 1 && clearTimeout(timer);
        }, 1000);
      
    }
  }
};
