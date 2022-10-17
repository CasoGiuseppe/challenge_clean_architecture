import type { Gender } from "./Superheroes.enums";

export type SuperheroeTypes = {
  next: string | null;
  previous: null | string;
  results: SuperheroesResults[];
};

export type SuperheroesResults = {
  id: UniqueId;
  name: string;
  height: string;
  skin: string;
  eyes: string;
  birth: string;
  gender: Gender;
  created: Date;
  url: string;
};
