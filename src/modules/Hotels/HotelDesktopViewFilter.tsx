import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HotelAttributesFormType } from '../Home/query/home.types';
import { DateRangePicker } from '@/components/custom/DateRangePicker/DateRangePicker';
import { Button } from '@/components/ui/button';

type Props = {
  handleOpenFilterModal: () => void;
};

function HotelDesktopViewFilter({ handleOpenFilterModal }: Props) {
  const methods = useFormContext<HotelAttributesFormType>();

  const totalRooms = methods.watch('room_qty');
  const totalGuests =
    Number(methods.watch('adults')) + Number(methods.watch('children'));

  return (
    <div className='hidden md:flex w-full flex-col md:flex-row gap-4 md:gap-6'>
      <div className='flex-1 border border-solid p-2 rounded-md'>
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
      <div className='flex-1 border border-solid p-2 rounded-md'>
        <p className='text-xs text-dark-blue mb-2 text-center font-normal'>
          Check in - Check out
        </p>
        <DateRangePicker disabled methods={methods} />
      </div>
      <div className='flex-1 border border-solid p-2 rounded-md'>
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
      <Button
        onClick={handleOpenFilterModal}
        className='bg-yellow w-[120px] text-xl font-bold hover:text-white h-[88px] text-dark-blue'
      >
        Filter
      </Button>
    </div>
  );
}

export default HotelDesktopViewFilter;
