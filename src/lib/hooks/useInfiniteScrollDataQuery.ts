import { useInfiniteQuery } from '@tanstack/react-query';
import { urlFormatter } from '../utils';
import { X_RAPID_API_HOST, X_RAPID_API_KEY } from '../variables';
import { DUMMY_PAGINATED } from './dummyDataPaginated';

type TData = Record<string, any>;

type Props = {
  apiUrl: string;
  queryParams: {
    [key: string]: string | number | boolean;
  };
  pageParam: number;
};

const fetchSearchHotels = <T>({ apiUrl, queryParams, pageParam }: Props) => {
  const queries = { ...queryParams };
  if (!queries?.price_max) {
    delete queries.price_max;
  }
  if (!queries?.price_min) {
    delete queries.price_min;
  }
  const url =
    urlFormatter(apiUrl) +
    new URLSearchParams({
      ...queries,
      page_number: pageParam?.toString(),
    });

  // NOTE: using for dev purpose as Rapid API has limited request (only 50 request) for free account
  // return { ...DUMMY_PAGINATED, page: pageParam } as unknown as Promise<T>;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Host': X_RAPID_API_HOST,
      'X-RapidAPI-Key': X_RAPID_API_KEY,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((response) => ({ ...response, page: pageParam })) as Promise<T>;
};

export const useInfiniteScrollDataQuery = <T extends TData>({
  moduleName,
  apiUrl,
  queryParams,
}: Pick<Props, 'apiUrl' | 'queryParams'> & { moduleName: string }) => {
  const query = useInfiniteQuery({
    queryKey: [moduleName, 'view-infinite-scroll-data', apiUrl, queryParams],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchHotels<T>({ apiUrl, queryParams, pageParam }),
    getNextPageParam: (lastPage, _pages) => {
      const nextPageNumber = lastPage?.page + 1;

      // NOTE: USING Booking.com Rapid API, here no pagination info is available from the response
      // unable to detect if the next page is available or not from the api response
      // so by default increasing next page number by 1
      // if the next page number is greater than 3, then return undefined

      // Also I have limited page limit to 3 for dev purpose as
      // Rapid API has limited request (only 50 request) for free account
      if (nextPageNumber && nextPageNumber <= 3) {
        return nextPageNumber;
      }

      return undefined;
    },
    initialPageParam: 1,
  });
  return { ...query };
};
