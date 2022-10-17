import type { SuperheroesView } from "../../application/Superheroes.view";
import type { Superheroes } from "../Superheroes";

export interface ManageDataRepository {
  getResponseAPIByPage(page: string | null): Promise<Superheroes>;
}

export interface PersistDataRepository {
  persistDataOnStorage(data: SuperheroesView): void;
  getStorageKeyInStore(key: string): string | null;
}

export interface NotificationRepository {
  loaderVisibility(state: boolean): void;
}
