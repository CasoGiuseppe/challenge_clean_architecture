import type { SuperheroesView } from "../../application/Superheroes.view";
import type { PersistDataRepository } from "../../core/repository/Superheroes.repository";
import type { Navigation } from "./store/types";
import type { SuperheroesStore } from "./store";
import { CHANGE_HEROES_LIST, CHANGE_HEROES_NAVIGATION } from "./store/actions";

export class PersistDataAdapter implements PersistDataRepository {
  constructor(private readonly store: SuperheroesStore) { }

  // controller to store data
  persistDataOnStorage(data: SuperheroesView): void {
    this.store[CHANGE_HEROES_LIST](data.tableResults);
    this.store[CHANGE_HEROES_NAVIGATION](
      "next" as Navigation,
      data.navigationNext
    );
    this.store[CHANGE_HEROES_NAVIGATION](
      "previous" as Navigation,
      data.navigationPrev
    );
  }

  // controler to get key store exist value
  getStorageKeyInStore(key: string): string | null {
    return this.store[key as keyof typeof this.store] !== null
      ? (this.store[key as keyof typeof this.store] as string)
      : null;
  }
}
