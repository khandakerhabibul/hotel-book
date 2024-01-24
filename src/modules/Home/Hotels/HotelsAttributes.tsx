import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HotelAttributesFormType, HotelPriceType } from '../query/home.types';
import { hotelsAttributesSchema } from '../query/schema';
import debounce from 'lodash.debounce';
import { DateRangePicker } from '@/components/custom/DateRangePicker/DateRangePicker';
import { defaultValuesForHotels } from '../query/defaultValues';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import ReactHookFormProvider from '@/lib/ReactHookFormProvider';
import HotelRoomPopoverContent from './HotelRoomPopoverContent';
import { useSearchHotelQuery } from '../query/homeHotels.query';
import { DEBOUNCE_DELAY } from '@/lib/variables';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import HotelSearchSkeleton from './HotelSearchSkeleton';
import { SearchHotelDataEntity } from '../query/homeHotelsApiQueryTypes.type';

function HotelsAttributes() {
  const methods = useForm<HotelAttributesFormType & HotelPriceType>({
    defaultValues: defaultValuesForHotels,
    resolver: zodResolver(hotelsAttributesSchema),
  });

  const router = useRouter();

  const [searchHotel, setSearchHotel] = useState<string>('dhaka');
  const [destData, setDestData] = useState<SearchHotelDataEntity | null>(null);

  const [popOpen, setPopOpen] = useState<boolean>(false);

  const { toast } = useToast();

  const {
    data: searchedDestinations,
    isLoading,
    isFetching,
  } = useSearchHotelQuery({
    searchQuery: searchHotel,
  });

  const selectedCity = searchedDestinations?.find(
    (item) => item?.dest_id === methods.watch('dest_id')?.toString()
  );

  useEffect(() => {
    if (selectedCity?.city_name) {
      setDestData(selectedCity);
    }
  }, [selectedCity]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchHotel(e.target.value);
  };

  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearchChange, DEBOUNCE_DELAY),
    []
  );

  const totalRooms = methods.watch('room_qty');
  const totalGuests =
    Number(methods.watch('adults')) + Number(methods.watch('children'));

  const handleRoute = () => {
    const data = methods.getValues();

    const queryParams = new URLSearchParams(
      JSON.parse(
        JSON.stringify({
          ...data,
          city: destData?.city_name,
          country: destData?.country,
        })
      )
    ).toString();

    if (methods.watch('dest_id') === null) {
      toast({
        variant: 'destructive',
        description: 'Please select your destination!',
      });
    } else if (totalRooms === 0) {
      toast({
        variant: 'destructive',
        description: 'Select at least 1 room!',
      });
    } else if (totalGuests === 0) {
      toast({
        variant: 'destructive',
        description: 'Guest cannot be empty!',
      });
    } else {
      router.push(`/hotels?${queryParams}`);
    }
  };

  return (
    <ReactHookFormProvider methods={methods}>
      <div className='w-[290px] md:w-[680px] flex flex-col md:flex-row gap-4 md:gap-6'>
        <Popover open={popOpen} onOpenChange={setPopOpen}>
          <PopoverTrigger asChild>
            <div className='cursor-pointer flex-1 border border-solid p-2 rounded-md'>
              <p className='text-xs text-dark-blue mb-2 font-normal text-center'>
                Destination - City
              </p>
              <h3 className='font-semibold text-lg mb-1 text-dark-blue text-center'>
                {destData?.city_name}
              </h3>
              <p className='text-xs text-dark-blue font-normal text-center'>
                {destData?.country}
              </p>
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div>
              <Input
                onChange={debouncedHandleSearch}
                type='text'
                placeholder='Search your destination'
              />

              <div className='flex flex-col w-full gap-2 h-[200px] overflow-y-auto mt-4'>
                {isLoading || isFetching
                  ? [1, 2, 3, 4]?.map((_i) => <HotelSearchSkeleton key={_i} />)
                  : searchedDestinations?.map((dest) => (
                      <div
                        key={dest?.dest_id}
                        className='w-full flex items-center gap-4 cursor-pointer'
                        onClick={() => {
                          methods.setValue('dest_id', Number(dest?.dest_id));
                          setDestData(dest);
                          setPopOpen(false);
                        }}
                      >
                        {dest?.image_url && (
                          <Image
                            src={dest?.image_url}
                            width={40}
                            height={40}
                            alt={dest?.city_name}
                          />
                        )}
                        <p className='text-sm text-dark-blue font-semibold'>
                          {dest?.city_name}
                        </p>
                        <p className='text-xs'>Hotels - {dest?.hotels}</p>
                      </div>
                    ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className='flex-1 border border-solid p-2 rounded-md'>
          <p className='text-xs text-dark-blue mb-2 text-center font-normal'>
            Check in - Check out
          </p>
          <DateRangePicker methods={methods} />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div className='cursor-pointer flex-1 border border-solid p-2 rounded-md'>
              <p className='text-xs text-dark-blue mb-2 font-normal text-center'>
                Rooms & Guests
              </p>
              <p className='text-center text-sm'>
                <span className='text-dark-blue font-semibold text-lg'>
                  {totalRooms}
                </span>{' '}
                room{totalRooms == 1 ? '' : 's'},{' '}
                <span className='text-dark-blue font-semibold text-lg'>
                  {totalGuests}
                </span>{' '}
                guest{totalGuests == 1 ? '' : 's'}
              </p>
              <p className='text-xs text-dark-blue font-normal text-center'>
                {methods.watch('adults')} adult{' '}
                {methods.watch('children')
                  ? `, ${methods.watch('children')} children`
                  : ''}
              </p>
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <HotelRoomPopoverContent />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        className={
          'bg-yellow text-dark-blue md:text-lg w-[150px] h-[50px] hover:text-white absolute -bottom-14 left-[95px] md:left-[290px]'
        }
        onClick={handleRoute}
      >
        Search
      </Button>
    </ReactHookFormProvider>
  );
}

export default HotelsAttributes;
