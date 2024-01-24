import { useQuery } from '@tanstack/react-query';
import { moduleName } from '../moduleInfo';
import { getHotelDestSearchApi } from '../utils/apiRoutes';
import { urlFormatter } from '@/lib/utils';
import { SearchHotelSuccessResp } from './homeHotelsApiQueryTypes.type';
import { X_RAPID_API_HOST, X_RAPID_API_KEY } from '@/lib/variables';
import { DUMMY } from './dummyData';

export type PropType = {
  searchQuery: string;
};

export type SearchHotelsByParamsProps = {
  dest_id: string;
  search_type: 'CITY';
  arrival_date: string;
  departure_date: string;
  adults: number;
  room_qty: number;
};

const fetchSearchHotels = ({ searchQuery }: PropType) => {
  const url =
    urlFormatter(getHotelDestSearchApi()) +
    new URLSearchParams({
      query: searchQuery,
    });
  // NOTE: using for dev purpose as Rapid API has limited request (only 50 request) for free account
  // return { ...DUMMY } as unknown as Promise<SearchHotelSuccessResp>;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': X_RAPID_API_HOST,
      'X-RapidAPI-Key': X_RAPID_API_KEY,
    },
  }).then((res) => {
    return res.json();
  }) as Promise<SearchHotelSuccessResp>;
};

export const useSearchHotelQuery = ({ searchQuery }: PropType) => {
  const query = useQuery({
    queryKey: [moduleName, 'view-hotel', searchQuery],
    queryFn: () => fetchSearchHotels({ searchQuery }),
    select: (res) => res?.data,
  });
  return { ...query };
};
