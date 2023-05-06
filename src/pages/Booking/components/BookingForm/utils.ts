import { CustomSelectOptionInterface } from '@vkontakte/vkui/dist/components/CustomSelect/CustomSelect';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export const clearUndefinedSelectOptions = (
  selectOptions: (CustomSelectOptionInterface | undefined)[],
): CustomSelectOptionInterface[] =>
  selectOptions.filter(Boolean) as CustomSelectOptionInterface[];

export const convertDateToUtc = (date?: Date): string =>
  dayjs(date).utc().format();

export const convertUtcToDate = (date?: string): Date | undefined =>
  date ? dayjs(date).utc().toDate() : undefined;
