'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useSearchHotelQuery } from '../Home/query/homeHotels.query';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { DEBOUNCE_DELAY } from '@/lib/variables';
import debounce from 'lodash.debounce';
import { useFormContext } from 'react-hook-form';
import {
  HotelAttributesFormType,
  HotelPriceType,
} from '../Home/query/home.types';
import Image from 'next/image';
import HotelSearchSkeleton from '../Home/Hotels/HotelSearchSkeleton';
import { cn, isPastDate } from '@/lib/utils';
import { DateRangePicker } from '@/components/custom/DateRangePicker/DateRangePicker';
import HotelRoomPopoverContent from '../Home/Hotels/HotelRoomPopoverContent';
import ReactHookFormProvider from '@/lib/ReactHookFormProvider';
import HotelRoomGuestInfo from '../Home/Hotels/HotelRoomGuestInfo';
import { SearchHotelDataEntity } from '../Home/query/homeHotelsApiQueryTypes.type';
import { useToast } from '@/components/ui/use-toast';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function HotelFilterModal({ open, setOpen }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get('city') ?? 'dhaka';
  const [searchHotel, setSearchHotel] = useState<string>(city);

  const methods = useFormContext<HotelAttributesFormType & HotelPriceType>();

  const {
    data: searchedDestinations,
    isLoading,
    isFetching,
  } = useSearchHotelQuery({
    searchQuery: searchHotel,
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchHotel(e.target.value);
  };

  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearchChange, DEBOUNCE_DELAY),
    []
  );

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const { toast } = useToast();

  const handleApplyFilter = () => {
    const arrival_date = methods.watch('arrival_date');
    const departure_date = methods.watch('departure_date');

    if (
      isPastDate(new Date(arrival_date)) ||
      isPastDate(new Date(departure_date))
    ) {
      toast({
        variant: 'destructive',
        description: 'Arrival and departure date cannot be in the past!',
      });
      return;
    }

    const queryParams = new URLSearchParams(
      JSON.parse(
        JSON.stringify({
          ...methods.getValues(),
        })
      )
    ).toString();
    router.replace(`/hotels?${queryParams}`);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='w-[calc(100%-1rem)] pt-4 px-2 rounded-md md:w-[500px]'>
        <div className='flex p-4 md:p-5 shadow-lg flex-col gap-4 h-[50vh] overflow-y-auto'>
          <div onFocus={onFocus} onBlur={onBlur} tabIndex={0}>
            <div className='relative mb-2'>
              <Input
                onChange={debouncedHandleSearch}
                type='text'
                placeholder='Search your destination'
                className='shadow-sm'
              />
              <div
                className={cn(
                  'absolute shadow-md p-1 border bg-white left-0 top-8 md:top-7 h-[200px] overflow-y-auto w-full  mt-4',
                  {
                    'flex flex-col gap-2': focused,
                    hidden: !focused,
                  }
                )}
              >
                {isLoading || isFetching
                  ? [1, 2, 3, 4]?.map((_i) => <HotelSearchSkeleton key={_i} />)
                  : searchedDestinations?.map((dest) => (
                      <div
                        key={dest?.dest_id}
                        className='w-full flex items-center gap-4 cursor-pointer'
                        onClick={(e) => {
                          methods.setValue('dest_id', Number(dest?.dest_id));
                          methods.setValue('city', dest?.city_name);
                          methods.setValue('country', dest?.country);
                          onBlur();
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
                          {dest?.label}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
            <div className='border p-2'>
              <p className='text-xs text-dark-blue mb-2 font-normal text-center'>
                Destination - City
              </p>
              <h3 className='font-semibold text-lg mb-1 text-dark-blue text-center'>
                {methods.watch('city')}
              </h3>
              <p className='text-xs text-dark-blue font-normal text-center'>
                {methods.watch('country')}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3 px-1'>
            <div>
              <p className='text-xs text-dark-blue mb-2 text-center font-normal'>
                Min rent
              </p>
              <Input
                // onChange={(e) => {}}
                {...methods.register('price_min')}
                type='text'
                placeholder='Minimum rent'
              />
            </div>
            <div className='pt-8'>
              <p className='text-xs text-dark-blue mb-2 text-center font-normal'>
                To
              </p>
            </div>
            <div>
              <p className='text-xs text-dark-blue mb-2 text-center font-normal'>
                Max rent
              </p>
              <Input
                // onChange={(e) => {}}
                {...methods.register('price_max')}
                type='text'
                placeholder='Maximum rent'
              />
            </div>
          </div>
          <div className=''>
            <p className='text-xs text-dark-blue mb-2 text-center font-normal'>
              Check in - Check out
            </p>
            <DateRangePicker
              fromDate={methods.watch('arrival_date')}
              endDate={methods.watch('departure_date')}
              methods={methods}
            />
          </div>
          <ReactHookFormProvider methods={methods}>
            <div className='flex flex-col gap-3'>
              <HotelRoomGuestInfo title='Rooms' formName='room_qty' />
              <HotelRoomGuestInfo title='Adults' formName='adults' />
              <HotelRoomGuestInfo title='Children' formName='children' />
            </div>
          </ReactHookFormProvider>
        </div>
        <AlertDialogFooter className='pt-1'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction onClick={handleApplyFilter}>

          </AlertDialogAction> */}

          <Button onClick={handleApplyFilter}> Apply Filter</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
