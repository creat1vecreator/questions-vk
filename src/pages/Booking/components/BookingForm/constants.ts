import { CustomSelectOptionInterface } from '@vkontakte/vkui/dist/components/CustomSelect/CustomSelect';
import { IBookingFormState, TStatusesFormState } from './types';

import { clearUndefinedSelectOptions } from '@/pages/Booking/components/BookingForm/utils'; // default states

// default states
export const DEFAULT_BOOKING_STATE: IBookingFormState = {
  tower: '',
  floor: '',
  room: '',
  day: '',
  rangeTime: '',
  comments: '',
};
export const DEFAULT_STATUSES_STATE: TStatusesFormState = {
  tower: 'default',
  floor: 'default',
  room: 'default',
  day: 'default',
  rangeTime: 'default',
  comments: 'default',
};

// select options
export const FLOOR_SELECT_OPTIONS: CustomSelectOptionInterface[] =
  clearUndefinedSelectOptions(
    Array.from({
      length: 28,
    }).map((undefined, index) => {
      if (index >= 3) return { label: `${index}`, value: index };
    }),
  );

export const ROOM_SELECT_OPTIONS: CustomSelectOptionInterface[] =
  clearUndefinedSelectOptions(
    Array.from({
      length: 11,
    }).map((undefined, index) => {
      if (index > 0) return { label: `${index}`, value: index };
    }),
  );

export const TOWER_SELECT_OPTIONS: CustomSelectOptionInterface[] = [
  { label: 'Башня А', value: 'A' },
  { label: 'Башня Б', value: 'B' },
];

export const RANGE_TIME_OPTIONS: CustomSelectOptionInterface[] =
  clearUndefinedSelectOptions(
    Array.from({
      length: 20,
    }).map((undefined, index) => {
      if (index > 7) {
        const rangeTime = `${
          index >= 10 ? `${index}:00 - ` : `0${index}:00 - `
        }${index + 2}:00`;

        return {
          label: rangeTime,
          value: rangeTime,
        };
      }
    }),
  );
