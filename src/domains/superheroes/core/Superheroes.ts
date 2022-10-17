import type { SuperheroeTypes, SuperheroesResults } from "./Superheroes.types";

export class Superheroes {
  private constructor(
    private readonly next: string | null,
    private readonly previous: null | string,
    private readonly results: SuperheroesResults[]
  ) { }

  // create a new instance of domain model
  static createDomainInstance(props: SuperheroeTypes) {
    const { next, previous, results } = props;
    return new Superheroes(next, previous, results);
  }

  // get domian props
  get props(): SuperheroeTypes {
    return {
      next: this.next,
      previous: this.previous,
      results: this.results,
    };
  }
}
