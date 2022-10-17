import type { NotificationService } from "@/app/shared/services/notification/notification.services";
import type { NotificationRepository } from "../../core/repository/Superheroes.repository";

export class NotificationAdapter implements NotificationRepository {
  constructor(private readonly notification: NotificationService) { }

  // controller to handle loader state
  loaderVisibility(state: boolean): void {
    if (this.notification) this.notification.loader({ state });
  }
}
