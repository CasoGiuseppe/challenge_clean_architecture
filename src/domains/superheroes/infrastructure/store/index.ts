import { defineStore } from "pinia";
import { BASE_HEROES_STORE } from "./constants";

// getters
import getters from "./getters";

// actions
import { CHANGE_HEROES_LIST, CHANGE_HEROES_NAVIGATION } from "./actions";

import type { Navigation } from "./types";

export const useHeroesStore = defineStore({
  id: "heroes",
  state: () => BASE_HEROES_STORE,

  actions: {
    [CHANGE_HEROES_LIST](list: Record<string, any>) {
      this.table = list;
    },

    [CHANGE_HEROES_NAVIGATION](type: Navigation, value: string | null) {
      this[type] = value;
    },
  },

  getters,
});

const definedStore = useHeroesStore();
export type SuperheroesStore = typeof definedStore;
