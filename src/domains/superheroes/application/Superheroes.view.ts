import type { Superheroes } from "../core/Superheroes";
import type { SuperheroesResults } from "../core/Superheroes.types";

export class SuperheroesView {
  private constructor(
    public readonly next: string | null,
    public readonly previous: null | string,
    public readonly results: SuperheroesResults[]
  ) { }

  static fromDomainProperties(superheroe: Superheroes) {
    const { next, previous, results } = superheroe.props;
    return new SuperheroesView(next, previous, results);
  }

  get tableResults() {
    return this.results.map((node: SuperheroesResults) => {
      const createdDate = new Date(node.created);
      return { ...node, ...{ created: createdDate.toLocaleDateString() } };
    });
  }

  get navigationPrev() {
    return this.previous;
  }

  get navigationNext() {
    return this.next;
  }
}
