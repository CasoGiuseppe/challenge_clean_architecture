import type { SuperheroesResults } from "../../core/Superheroes.types";
import type { ISuperheroesStoreType } from "./types";

export const BASE_HEROES_STORE: ISuperheroesStoreType = {
  next: null,
  previous: null,
  table: [] as SuperheroesResults[],
};
