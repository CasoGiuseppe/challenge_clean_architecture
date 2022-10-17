import type { SuperheroesRepository } from "../../core/repository/Superheroes.repository";
import type { SuperheroesView } from "../Superheroes.view";
import { GetSuperheroesUseCase } from "./GetSuperheroes.usecase";
export class NavigationPerPages {
  private readonly getSuperheroesUseCase: GetSuperheroesUseCase;
  constructor(private readonly superheroesRepository: SuperheroesRepository) {
    this.getSuperheroesUseCase = new GetSuperheroesUseCase(
      superheroesRepository
    );
  }
  async execute(navigationType: string): Promise<SuperheroesView | undefined> {
    const newPageURL =
      this.superheroesRepository.getStorageKeyInStore(navigationType);
    if (newPageURL) return await this.getSuperheroesUseCase.execute(newPageURL);
  }
}
