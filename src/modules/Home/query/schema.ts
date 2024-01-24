import { z } from 'zod';

export const hotelSchema = z.literal('hotels');
export const flightSchema = z.literal('flights');
export const tabSchema = z.union([hotelSchema, flightSchema]);

export const hotelsAttributesSchema = z.object({
  dest_id: z.number(),
  search_type: z.string(),
  arrival_date: z.string(),
  departure_date: z.string(),
  adults: z.number(),
  children: z.number(),
  room_qty: z.number(),
  price_min: z.number().optional(),
  price_max: z.number().optional(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
});

export const flightsAttributesSchema = z.object({
  dest_id: z.number(),
  search_type: z.string(),
  arrival_date: z.string(),
  departure_date: z.string(),
  adults: z.number(),
  children: z.number(),
  room_qty: z.number(),
});

export const hotelPriceSchema = z
  .object({
    price_min: z.number().optional(),
    price_max: z.number().optional(),
  })
  .default({
    price_min: 100,
    price_max: 100000,
  });
