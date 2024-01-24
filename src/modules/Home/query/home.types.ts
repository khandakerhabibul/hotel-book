import { z } from 'zod';
import {
  flightSchema,
  flightsAttributesSchema,
  hotelPriceSchema,
  hotelSchema,
  hotelsAttributesSchema,
  tabSchema,
} from './schema';

export type FormType = {
  tab: TabType;
};

export type HotelType = z.infer<typeof hotelSchema>;
export type FlightType = z.infer<typeof flightSchema>;

export type TabType = z.infer<typeof tabSchema>;

export type HotelAttributesFormType = z.infer<typeof hotelsAttributesSchema>;
export type FlightAttributesFormType = z.infer<typeof flightsAttributesSchema>;

export type HotelPriceType = z.infer<typeof hotelPriceSchema>;


export type TabsObjectType = {
  tabName: string;
  value: HotelType | FlightType;
  icon: string;
};
