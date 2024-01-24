import { dateToYYYYMMDD } from '@/lib/utils';
import { HotelAttributesFormType, HotelPriceType } from './home.types';
import { addDays } from 'date-fns';

export const defaultValuesForHotels: HotelAttributesFormType & HotelPriceType =
  {
    dest_id: -2737683, // Note: Default value from RapidApi for Dhaka
    search_type: 'CITY',
    arrival_date: dateToYYYYMMDD(new Date()),
    departure_date: dateToYYYYMMDD(addDays(new Date(), 2)),
    adults: 1,
    children: 0,
    room_qty: 1,
    city: null,
    country: null,
    price_min: 100,
    price_max: 100000,
  };
