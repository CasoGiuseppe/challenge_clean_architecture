import type { HTTPService } from "@/app/shared/services/http/http.services";
import type { NotificationService } from "@/app/shared/services/notification/notification.services";
import type { UUIDService } from "@/app/shared/services/uuid/uuid.services";
import type { SuperheroesRepository } from "../core/repository/Superheroes.repository";
import type { Superheroes } from "../core/Superheroes";
import type { SuperheroesResults } from "../core/Superheroes.types";
import type { SuperheroesStore } from "./store";
import type { Navigation } from "./store/types";
import type { SuperheroesView } from "../application/Superheroes.view";

import { API_NAMESPACE } from "@/app/partials/constants";
import { CHANGE_HEROES_LIST, CHANGE_HEROES_NAVIGATION } from "./store/actions";
import { SuperheroesAdapter } from "./Superheroes.adapter";

export class SuperheroesController implements SuperheroesRepository {
  constructor(
    private readonly client: HTTPService,
    private readonly store: SuperheroesStore,
    private readonly notification: NotificationService,
    private readonly uuid: UUIDService
  ) { }

  // controller to get API data
  // return an domain superheroe instance
  async getResponseAPIByPage(page: string | null): Promise<Superheroes> {
    // const heroesInStore = Object.assign(
    //   [],
    //   this.store.table.map(
    //     <T extends object & { skin?: string; eyes?: string }>({
    //       skin: skin_color,
    //       eyes: eye_color,
    //       birth: birth_year,
    //       ...t
    //     }: {
    //       skin: string;
    //       eyes: string;
    //       birth: string;
    //       t: T;
    //     }): T => ({ skin_color, eye_color, birth_year, ...(t as object as T) })
    //   )
    // );
    try {
      // 1. launch API endpoint to get json response
      const response = await this.client.get<SuperheroesAdapter>(
        page || `${API_NAMESPACE}people`
      );

      // 2. adapt API response to domain model
      const { results, next, previous } = response;
      const instance = new SuperheroesAdapter(next, previous, [
        ...results.map((node: SuperheroesResults) => {
          return {
            ...{ id: this.uuid.create() },
            ...node,
          };
        }),
      ]);
      return instance.parseToDomain();
    } catch (e) {
      throw new Error(e as string);
    }
  }

  // controller to handle loader state
  loaderVisibility(state: boolean): void {
    if (this.notification) this.notification.loader({ state });
  }

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
