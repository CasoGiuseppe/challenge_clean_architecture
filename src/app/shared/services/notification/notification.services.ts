import type { CommonCosmeticStore } from "../../stores/cosmetic";
import {
  CHANGE_LOADER_STATE,
  CHANGE_NOTIFICATION_STATE,
} from "../../stores/cosmetic/actions";
import type { ILoaderType, INotificationType } from "../../stores/types";

export class NotificationService {
  constructor(private readonly store: CommonCosmeticStore) { }

  loader({ state }: ILoaderType): void {
    this.store[CHANGE_LOADER_STATE]({ state });
  }

  notify({ state, type, message }: INotificationType): void {
    this.store[CHANGE_NOTIFICATION_STATE]({ state, type, message });
  }
}
