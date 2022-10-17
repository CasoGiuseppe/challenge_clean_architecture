export type ILoaderType = {
  state: boolean;
};

export interface INotificationType {
  state: boolean;
  type?: string;
  message?: string;
}

export interface ICosmeticStore {
  hasLoader: ILoaderType;
  hasNotification: INotificationType;
}
