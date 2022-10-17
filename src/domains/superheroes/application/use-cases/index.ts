import type { ManageDataAdapter } from "../../infrastructure/manageDataAdapter/ManageData.adapter";
import type { NotificationAdapter } from "../../infrastructure/notificationAdapter/Notification.adapter";
import type { PersistDataAdapter } from "../../infrastructure/persistDataAdapter/PersistData.adapter";
import { GetSuperheroesUseCase } from "./GetSuperheroes.usecase";
import { NavigationPerPages } from "./NavigationPerPages.usecases";

export class SuperheroesService {
  private readonly getSuperheroesUseCase: GetSuperheroesUseCase;
  private readonly navigationPerPage: NavigationPerPages;
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
    this.navigationPerPage = new NavigationPerPages(
      this.manageDataAdapter,
      this.notificatioAdapter,
      this.persistDataAdapter
    );
  }

  async getResponseAPIByPage(page: string | null = null) {
    return await this.getSuperheroesUseCase.execute(page);
  }

  async navigateByPage(navigationType: string) {
    return this.navigationPerPage.execute(navigationType);
  }
}
