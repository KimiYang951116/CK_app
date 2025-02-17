import { createStore } from "vuex";
import youbikeModule from "./modules/youbike";
import newsModule from "./modules/news";
import scheduleModule from "./modules/schedule";
import todoModule from "./modules/todo";
import foodModule from "./modules/food";
import accountModule from "./modules/account";
import { localStoragePlugin } from "./localStoragePlugin";

export default createStore({
  plugins: [localStoragePlugin],
  modules: {
    youbike: youbikeModule,
    news: newsModule,
    schedule: scheduleModule,
    todo: todoModule,
    food: foodModule,
    account: accountModule
  },
  state: () => ({
    userClass: "217",
    lastClearedTime: null,
  }),
  mutations: {
    CLEAR_DATA(state) {
      localStorage.removeItem("store");

      // Reset the root state
      Object.keys(state).forEach((key) => {
        if (key !== "userClass" && key !== "lastClearedTime") {
          state[key] = undefined;
        }
      });

      // Reset module states
      Object.keys(this._modules.root._children).forEach((moduleName) => {
        const moduleState = this._modules.root._children[moduleName].state;
        if (typeof moduleState === "function") {
          state[moduleName] = moduleState();
        } else {
          state[moduleName] = { ...moduleState };
        }
      });

      // Reset root state properties
      state.userClass = "217";
      state.lastClearedTime = null;

      console.log("Data cleared from state and localStorage");
    },
  },
  actions: {
    clearALL({ commit }) {
      commit("CLEAR_DATA");
    },
  },
});
