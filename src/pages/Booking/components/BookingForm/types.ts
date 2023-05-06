type TTower = 'A' | 'B' | '';
type TStatus = 'default' | 'error' | 'valid';

export interface IBookingFormState {
  tower: TTower;
  floor: string;
  room: string;
  day?: string;
  rangeTime: string;
  comments: string;
}

export type TStatusesFormState = Record<keyof IBookingFormState, TStatus>;
