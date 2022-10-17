import { Superheroes } from "../core/Superheroes";
import type { SuperheroesResults } from "../core/Superheroes.types";

export class SuperheroesAdapter {
  constructor(
    public readonly next: string,
    public readonly previous: string,
    public readonly results: SuperheroesResults[]
  ) { }

  parseToDomain(): Superheroes {
    return Superheroes.createDomainInstance({
      next: this.next,
      previous: this.previous,
      results: this.results.map(this.parseResults),
    });
  }

  private parseResults(result: Record<string, any>): SuperheroesResults {
    const {
      id,
      name,
      height,
      skin_color,
      eye_color,
      birth_year,
      gender,
      created,
      url,
    } = result;
    return {
      id,
      name,
      height,
      skin: skin_color,
      eyes: eye_color,
      birth: birth_year,
      gender,
      created: new Date(created),
      url,
    };
  }
}
