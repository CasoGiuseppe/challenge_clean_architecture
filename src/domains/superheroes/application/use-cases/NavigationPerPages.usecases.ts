import type { ManageDataAdapter } from "../../infrastructure/manageDataAdapter/ManageData.adapter";
import type { NotificationAdapter } from "../../infrastructure/notificationAdapter/Notification.adapter";
import type { PersistDataAdapter } from "../../infrastructure/persistDataAdapter/PersistData.adapter";
import type { SuperheroesView } from "../Superheroes.view";
import { GetSuperheroesUseCase } from "./GetSuperheroes.usecase";
export class NavigationPerPages {
  private readonly getSuperheroesUseCase: GetSuperheroesUseCase;
  constructor(
    private readonly manageDataAdapter: ManageDataAdapter,
    private readonly notificatioAdapter: NotificationAdapter,
    private readonly persistDataAdapter: PersistDataAdapter
  ) {
    this.getSuperheroesUseCase = new GetSuperheroesUseCase(
      this.manageDataAdapter,
      this.notificatioAdapter,
      this.persistDataAdapter
    );
  }
  async execute(navigationType: string): Promise<SuperheroesView | undefined> {
    const newPageURL =
      this.persistDataAdapter.getStorageKeyInStore(navigationType);
    if (newPageURL) return await this.getSuperheroesUseCase.execute(newPageURL);
  }
}
