import type { SuperheroesResults } from "../../core/Superheroes.types";
export const GET_HEROES_TABLE = "getHeroesTable";

export default {
  [GET_HEROES_TABLE]: (state: Record<string, any>): SuperheroesResults[] =>
    state.table,
};
