export interface IMainAPI {
  send: (channel: string, ...args: any[]) => boolean;
  receive: (channel: string, func: Function) => boolean;
  get: <T>(channel: string, callbackFunc?: Function, ...args: any[]) => Promise<T[]>;
}

declare global {
  interface Window {
    main: IMainAPI;
  }
}
