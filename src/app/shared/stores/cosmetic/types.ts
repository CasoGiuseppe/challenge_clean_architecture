export type ILoaderStore = {
  state: boolean;
};

export interface INotificationStore {
  state: boolean;
  type?: any | string;
  message?: any | string;
}
