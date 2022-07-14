export interface AlertState {
  show: boolean;
  type: 'error' | 'info' | 'warning' | 'success';
  message?: string;
}

export enum AlertTypes {
  HIDE = 'HIDE',
  SHOW = 'SHOW',
}