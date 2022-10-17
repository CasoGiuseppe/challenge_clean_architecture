import type { SuperheroesView } from "../../application/Superheroes.view";
import type { Superheroes } from "../Superheroes";

interface ManageData {
  getResponseAPIByPage(page: string | null): Promise<Superheroes>;
}

interface PersistData {
  persistDataOnStorage(data: SuperheroesView): void;
  getStorageKeyInStore(key: string): string | null;
}

interface Notification {
  loaderVisibility(state: boolean): void;
}

export interface SuperheroesRepository
  extends PersistData,
  ManageData,
  Notification { }
