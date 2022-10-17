import type { ManageDataAdapter } from "../../infrastructure/manageDataAdapter/ManageData.adapter";
import type { NotificationAdapter } from "../../infrastructure/notificationAdapter/Notification.adapter";
import type { PersistDataAdapter } from "../../infrastructure/persistDataAdapter/PersistData.adapter";
import { SuperheroesView } from "../Superheroes.view";

export class GetSuperheroesUseCase {
  constructor(
    private readonly manageDataAdapter: ManageDataAdapter,
    private readonly notificationAdapter: NotificationAdapter,
    private readonly persistDataAdapter: PersistDataAdapter
  ) { }
  async execute(page: string | null): Promise<SuperheroesView> {
    try {
      // 1. launch loader
      this.notificationAdapter.loaderVisibility(true);

      // 1. get heroes from API call
      const heroes = await this.manageDataAdapter.getResponseAPIByPage(page);

      // 2. transform data to public domanin contract
      const domainView = SuperheroesView.fromDomainProperties(heroes);

      console.log(domainView);
      // 3. save domain data on store
      this.persistDataAdapter.persistDataOnStorage(domainView);
      return domainView;
    } catch (e) {
      throw new Error(e as string);
    } finally {
      this.notificationAdapter.loaderVisibility(false);
    }
  }
}
