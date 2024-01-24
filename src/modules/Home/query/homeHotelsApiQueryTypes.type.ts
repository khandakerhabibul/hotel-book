export interface SearchHotelSuccessResp {
  status: boolean;
  message: string;
  timestamp: number;
  data?: SearchHotelDataEntity[] | null;
}
export interface SearchHotelDataEntity {
  dest_id: string;
  search_type: string;
  region: string;
  hotels: number;
  type: string;
  name: string;
  cc1: string;
  city_ufi?: number | null;
  lc: string;
  latitude: number;
  longitude: number;
  label: string;
  roundtrip: string;
  city_name: string;
  dest_type: string;
  nr_hotels: number;
  country: string;
  image_url?: string | null;
}
