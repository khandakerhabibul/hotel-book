'use client';
import { useInfiniteScrollDataQuery } from '@/lib/hooks/useInfiniteScrollDataQuery';
import { useSearchParams } from 'next/navigation';
import React, { useMemo, useRef, useState } from 'react';
import { SearchHotelsByParamsSuccessResp } from '../Home/query/searchHotelByParams.types';
import { moduleName } from './moduleInfo';
import useInfiniteScrollHook from '@/lib/hooks/useInifniteScrollHook';
import HotelCard from './HotelCard';
import { useForm } from 'react-hook-form';
import {
  HotelAttributesFormType,
  HotelPriceType,
} from '../Home/query/home.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { hotelsAttributesSchema } from '../Home/query/schema';
import ReactHookFormProvider from '@/lib/ReactHookFormProvider';
import HotelDesktopViewFilter from './HotelDesktopViewFilter';
import HotelMobileViewFilter from './HotelMobileViewFilter';
import { HotelFilterModal } from './HotelFilterModal';
import { Skeleton } from '@/components/ui/skeleton';

function HotelsMain() {
  // NOTE: All the queries in the url
  const searchParams = useSearchParams();
  const dest_id = Number(searchParams.get('dest_id')) ?? NaN;
  const search_type = 'CITY';
  const arrival_date = searchParams.get('arrival_date') ?? '';
  const departure_date = searchParams.get('departure_date') ?? '';
  const adults = Number(searchParams.get('adults')) ?? NaN;
  const children = Number(searchParams.get('children')) ?? NaN;
  const room_qty = Number(searchParams.get('room_qty')) ?? NaN;
  const price_min = Number(searchParams.get('price_min')) ?? 100;
  const price_max = Number(searchParams.get('price_max')) ?? 100000;
  const city = searchParams.get('city') ?? '';
  const country = searchParams.get('country') ?? '';

  const queryParams = {
    dest_id,
    search_type,
    arrival_date,
    departure_date,
    adults,
    room_qty,
    price_min,
    price_max,
  };

  const queryParamData: HotelAttributesFormType & HotelPriceType = useMemo(
    () => ({
      ...queryParams,
      children,
      city,
      country,
    }),
    [
      {
        ...queryParams,
        children,
        city,
        country,
      },
    ]
  );

  const methods = useForm<HotelAttributesFormType & HotelPriceType>({
    defaultValues: queryParamData,
    resolver: zodResolver(hotelsAttributesSchema),
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    data: hotelList,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScrollDataQuery<SearchHotelsByParamsSuccessResp>({
    moduleName,
    apiUrl: '/hotels/searchHotels',
    queryParams: { ...queryParams },
  });

  const handleScrollCallback = () => {
    if (isFetching || isLoading || isFetchingNextPage) {
      return;
    }

    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useInfiniteScrollHook({
    container: scrollRef,
    callback: handleScrollCallback,
    offset: 200,
  });

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenFilterModal = () => {
    setOpen(true);
  };

  return (
    <ReactHookFormProvider methods={methods}>
      <div className='relative overflow-hidden rounded-lg bg-white max-w-[1280px] w-full'>
        <div className='p-2 md:p-4 bg-white shadow-xl sticky top-0 left-0 border-b'>
          <HotelMobileViewFilter
            handleOpenFilterModal={handleOpenFilterModal}
          />
          <HotelDesktopViewFilter
            handleOpenFilterModal={handleOpenFilterModal}
          />
          <HotelFilterModal open={open} setOpen={setOpen} />
        </div>
        <div
          ref={scrollRef}
          className='p-2 md:p-4 h-[85vh] md:h-[80vh] overflow-y-auto grid grid-cols-1 max-[1049px]:grid-cols-1 min-[1050px]:grid-cols-2 gap-4'
        >
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((_i) => (
                <Skeleton className='w-full h-[150px]' key={_i} />
              ))
            : hotelList?.pages?.map((page, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {page?.data?.hotels?.map((hotel) => {
                      return <HotelCard hotel={hotel} key={hotel?.hotel_id} />;
                    })}
                    {(isFetching || isFetchingNextPage || isLoading) &&
                      [1, 2].map((_i) => (
                        <Skeleton className='w-full h-[150px]' key={_i} />
                      ))}
                  </React.Fragment>
                );
              })}
        </div>
      </div>
    </ReactHookFormProvider>
  );
}

export default HotelsMain;
