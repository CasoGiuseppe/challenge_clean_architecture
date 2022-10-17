import { API_NAMESPACE } from "@/app/partials";
import type { HTTPService } from "@/app/shared/services/http/http.services";
import type { UUIDService } from "@/app/shared/services/uuid/uuid.services";
import type { ManageDataRepository } from "../../core/repository/Superheroes.repository";
import type { Superheroes } from "../../core/Superheroes";
import type { SuperheroesResults } from "../../core/Superheroes.types";
import { SuperheroesAdapter } from "../Superheroes.adapter";

export class ManageDataAdapter implements ManageDataRepository {
  constructor(
    private readonly client: HTTPService,
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
}
