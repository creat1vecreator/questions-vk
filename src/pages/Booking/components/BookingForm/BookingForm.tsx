import React, { BaseSyntheticEvent, FC, useMemo, useState } from 'react';
import {
  Button,
  DateInput,
  FormItem,
  FormLayout,
  Group,
  Panel,
  PanelHeader,
  Select,
  Textarea,
  View,
} from '@vkontakte/vkui';
import {
  DEFAULT_BOOKING_STATE,
  DEFAULT_STATUSES_STATE,
  FLOOR_SELECT_OPTIONS,
  RANGE_TIME_OPTIONS,
  ROOM_SELECT_OPTIONS,
  TOWER_SELECT_OPTIONS,
} from './constants';
import { IBookingFormState, TStatusesFormState } from './types';
import { convertDateToUtc, convertUtcToDate } from './utils';
import styles from './styles.module.scss'; // TODO BUG IN VK UIKIT. vkuiPopper IS UNDER OTHER FIELDS.

// TODO BUG IN VK UIKIT. vkuiPopper IS UNDER OTHER FIELDS.
// TODO BUG IN VK UIKIT DOCS DateInput. ((value?: Date | undefined) => void) | undefined -> (callBack?: (value?: Date) => void)

// TODO I WANT. WHY WHEN I PUT ID PROP IN SELECT OR OTHER, IT DOES NOT RENDERS IN DOM. USING FUNC OF handleBookingFormState COULD BE SIMPLER. I DO NOT NEED UNNECESSARY CONSTRUCTIONS SUCH AS onChange={(event) => handleBookingFormState(event, 'tower')}
// TODO I WANT. VALIDATION OF FORMS.
// TODO I WANT. VALIDATION OF FORMS. WHY IT DOES NOT EXISTS MODES IN DATEINPUT? SUCH AS TIME, YEAR, AND OTHERS.

// TODO FOR ME. VALIDATION WITH LIBS SUCH AS FORMIK, REACT-HOOK-FORM. CODE WILL BE MORE SIMPLE.
export const BookingForm: FC = () => {
  const [bookingFormState, setBookingFormState] = useState<IBookingFormState>(
    DEFAULT_BOOKING_STATE,
  );
  const [bookingFormStatuses, setBookingFormStatuses] =
    useState<TStatusesFormState>(DEFAULT_STATUSES_STATE);

  const isBookingDisabled = useMemo(() => {
    return (
      Object.entries(bookingFormStatuses).filter(
        ([fieldName, fieldStatus]) =>
          fieldName !== 'comments' && fieldStatus !== 'valid',
      ).length > 0
    );
  }, [bookingFormStatuses]);

  const handleBookingFormState = (event: BaseSyntheticEvent, id: string) => {
    setBookingFormState((currentBookingFormState) => ({
      ...currentBookingFormState,
      [id]: event.target.value,
    }));
    setBookingFormStatuses((currentBookingFormStatuses) => ({
      ...currentBookingFormStatuses,
      [id]: 'valid',
    }));
  };
  const handleChangeDay = (value?: Date | undefined) => {
    const isValue = !!value;
    setBookingFormState((currentBookingFormState) => ({
      ...currentBookingFormState,
      day: isValue ? convertDateToUtc(value) : '',
    }));
    setBookingFormStatuses((currentBookingFormStatuses) => ({
      ...currentBookingFormStatuses,
      day: isValue ? 'valid' : 'error',
    }));
  };
  const handleClearBookingFormState = () => {
    setBookingFormState(DEFAULT_BOOKING_STATE);
    setBookingFormStatuses(DEFAULT_STATUSES_STATE);
  };
  const handleBook = () => {
    if (!isBookingDisabled)
      console.log('JSON to send', JSON.stringify(bookingFormState));
    else console.log('please fill all required fields');
  };

  return (
    <View activePanel="new-user">
      <Panel id="new-user">
        <PanelHeader>Забронируйте переговорную</PanelHeader>
        <Group>
          <FormLayout>
            <FormItem
              top="Выберите башню *"
              status={bookingFormStatuses.tower}
              onChange={(event) => handleBookingFormState(event, 'tower')}
            >
              <Select
                options={TOWER_SELECT_OPTIONS}
                value={bookingFormState.tower}
              />
            </FormItem>

            <FormItem
              top="Выберите этаж *"
              status={bookingFormStatuses.floor}
              onChange={(event) => handleBookingFormState(event, 'floor')}
            >
              <Select
                id="floor"
                options={FLOOR_SELECT_OPTIONS}
                value={bookingFormState.floor}
              />
            </FormItem>

            <FormItem
              top="Выберите комнату *"
              status={bookingFormStatuses.room}
              onChange={(event) => handleBookingFormState(event, 'room')}
            >
              <Select
                id="room"
                options={ROOM_SELECT_OPTIONS}
                value={bookingFormState.room}
              />
            </FormItem>

            <FormItem
              top="Выберите день бронирования *"
              className={styles.BookingForm__calendar}
              status={bookingFormStatuses.day}
            >
              <DateInput
                value={convertUtcToDate(bookingFormState.day)}
                calendarPlacement="auto"
                onChange={handleChangeDay}
              />
            </FormItem>
            <FormItem
              top="Выберите временной промежуток *"
              onChange={(event) => handleBookingFormState(event, 'rangeTime')}
              status={bookingFormStatuses.rangeTime}
            >
              <Select
                options={RANGE_TIME_OPTIONS}
                value={bookingFormState.rangeTime}
              />
            </FormItem>

            <FormItem top="Комментарий">
              <Textarea
                id="comments"
                placeholder="Введите комментарий"
                value={bookingFormState.comments}
                onChange={(event) => handleBookingFormState(event, 'comments')}
              />
            </FormItem>

            <div className={styles.BookingForm__handleButtons}>
              <Button onClick={handleClearBookingFormState} mode="secondary">
                Очистить форму
              </Button>
              <Button onClick={handleBook} disabled={isBookingDisabled}>
                Забронировать
              </Button>
            </div>
          </FormLayout>
        </Group>
      </Panel>
    </View>
  );
};
