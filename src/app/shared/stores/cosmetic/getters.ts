export const GET_LOADER_STATE = "getLoaderState";
export const GET_NOTIFICATION_MODE = "getNotificationState";
export default {
  [GET_LOADER_STATE]: (state: any): void => state.hasLoader,
  [GET_NOTIFICATION_MODE]: (state: any): void => state.hasNotification,
};
