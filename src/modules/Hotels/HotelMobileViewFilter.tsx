import { Button } from '@/components/ui/button';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HotelAttributesFormType } from '../Home/query/home.types';

type Props = {
  handleOpenFilterModal: () => void;
};

function HotelMobileViewFilter({ handleOpenFilterModal }: Props) {
  const methods = useFormContext<HotelAttributesFormType>();

  const totalRooms = methods.watch('room_qty');
  const totalGuests =
    Number(methods.watch('adults')) + Number(methods.watch('children'));

  return (
    <div className='flex md:hidden items-center gap-2 line-clamp-1'>
      <Button
        onClick={handleOpenFilterModal}
        className='bg-yellow w-[120px] text-xl font-bold hover:text-white  text-dark-blue'
      >
        Filter
      </Button>
      <h3 className='font-semibold text-lg mb-1 text-dark-blue text-center'>
        {methods.watch('city')},
      </h3>
      <p className='text-sm text-dark-blue font-normal text-center'>
        {methods.watch('country')},
      </p>
      <p className='text-sm text-center'>
        <span className='text-dark-blue font-semibold text-lg'>
          {totalRooms}
        </span>{' '}
        room{totalRooms == 1 ? '' : 's'}
      </p>
    </div>
  );
}

export default HotelMobileViewFilter;
