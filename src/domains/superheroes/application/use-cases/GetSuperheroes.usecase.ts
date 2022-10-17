import type { SuperheroesRepository } from "../../core/repository/Superheroes.repository";
import { SuperheroesView } from "../Superheroes.view";

export class GetSuperheroesUseCase {
  constructor(private readonly superheroesRepository: SuperheroesRepository) { }
  async execute(page: string | null): Promise<SuperheroesView> {
    try {
      // 1. launch loader
      this.superheroesRepository.loaderVisibility(true);

      // 1. get heroes from API call
      const heroes = await this.superheroesRepository.getResponseAPIByPage(
        page
      );

      // 2. transform data to public domanin contract
      const domainView = SuperheroesView.fromDomainProperties(heroes);

      console.log(domainView);
      // 3. save domain data on store
      this.superheroesRepository.persistDataOnStorage(domainView);
      return domainView;
    } catch (e) {
      throw new Error(e as string);
    } finally {
      this.superheroesRepository.loaderVisibility(false);
    }
  }
}
