export interface ISuperheroesStoreType {
  next: Navigation | unknown;
  previous: Navigation | unknown;
  table: Record<string, any>;
}

export enum Navigation {
  next = "next",
  previous = "previous",
}
