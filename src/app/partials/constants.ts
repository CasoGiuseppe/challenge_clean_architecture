import type { ICosmeticStore } from "@/app/shared/types";

export const API_NAMESPACE: string = import.meta.env.VITE_APP_API_NAMESPACE;
export const BASE_COSMETIC_STORE: ICosmeticStore = {
  hasLoader: {
    state: false,
  },
  hasNotification: {
    state: false,
    type: undefined,
    message: undefined,
  },
};

export const BASE_ENDPOINT: string = "people/";
