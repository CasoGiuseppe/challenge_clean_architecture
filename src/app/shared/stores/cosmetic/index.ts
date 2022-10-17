import { defineStore } from "pinia";
import { BASE_COSMETIC_STORE } from "@/app/partials/constants";

// actions
import { CHANGE_LOADER_STATE, CHANGE_NOTIFICATION_STATE } from "./actions";

// getters
import getters from "./getters";
import type { ILoaderType, INotificationType } from "../types";

// types
export const useCosmeticStore = defineStore({
  id: "cosmetic",
  state: () => BASE_COSMETIC_STORE,

  actions: {
    [CHANGE_LOADER_STATE]({ state = false }: ILoaderType): void {
      this.hasLoader.state = state;
    },

    [CHANGE_NOTIFICATION_STATE]({
      state = false,
      type = undefined,
      message = "notification",
    }: INotificationType): void {
      this.hasNotification.state = state;
      this.hasNotification.type = type;
      this.hasNotification.message = message;
    },
  },

  getters,
});

const definedStore = useCosmeticStore();
export type CommonCosmeticStore = typeof definedStore;
