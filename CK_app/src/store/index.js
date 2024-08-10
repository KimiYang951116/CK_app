import { createStore } from "vuex";
import youbikeModule from "./modules/youbike";
import newsModule from "./modules/news";
import scheduleModule from "./modules/schedule";
import todoModule from "./modules/todo";
import foodModule from "./modules/food";
import accountModule from "./modules/account";
import { localStoragePlugin } from "./localStoragePlugin";

const storeWatcherPlugin = (store) => {
  store.watch(
    (state) => state,
    (newValue) => {
      console.log(
        "Store scheduleData changed:",
        JSON.parse(JSON.stringify(newValue))
      );
    },
    { deep: true }
  );
};

const modules = {
  youbike: youbikeModule,
  news: newsModule,
  schedule: scheduleModule,
  todo: todoModule,
  food: foodModule,
  account: accountModule,
};

export default createStore({
  plugins: [storeWatcherPlugin, localStoragePlugin],
  modules,
  mutations: {
    CLEAR_DATA(state) {
      // Clear localStorage
      localStorage.removeItem("store");

      // Reset module states
      Object.keys(modules).forEach((moduleName) => {
        const moduleState = modules[moduleName].state;
        if (typeof moduleState === "function") {
          state[moduleName] = moduleState();
        } else {
          state[moduleName] = { ...moduleState };
        }
      });

      console.log("Data cleared from state and localStorage");
    },
  },
  actions: {
    clearALL({ commit }) {
      commit("CLEAR_DATA");
    },
  },
});
