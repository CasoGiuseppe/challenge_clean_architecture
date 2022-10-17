import type { SuperheroesRepository } from "../../core/repository/Superheroes.repository";
import { GetSuperheroesUseCase } from "./GetSuperheroes.usecase";
import { NavigationPerPages } from "./NavigationPerPages.usecases";

export class SuperheroesService {
  private readonly getSuperheroesUseCase: GetSuperheroesUseCase;
  private readonly navigationPerPage: NavigationPerPages;
  constructor(private readonly superheroesRepository: SuperheroesRepository) {
    this.getSuperheroesUseCase = new GetSuperheroesUseCase(
      superheroesRepository
    );
    this.navigationPerPage = new NavigationPerPages(this.superheroesRepository);
  }

  async getResponseAPIByPage(page: string | null = null) {
    return await this.getSuperheroesUseCase.execute(page);
  }

  async navigateByPage(navigationType: string) {
    return this.navigationPerPage.execute(navigationType);
  }
}
