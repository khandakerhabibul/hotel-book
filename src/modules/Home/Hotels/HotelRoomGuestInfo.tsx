import React from 'react';
import { useFormContext } from 'react-hook-form';
import { HotelAttributesFormType } from '../query/home.types';
import AddIcon from '@/components/common/AddIcon';
import RemoveIcon from '@/components/common/RemoveIcon';

type IncreaseDecreaseNameType = 'adults' | 'children' | 'room_qty';

type RoomInfoProps = {
  title: string;
  formName: IncreaseDecreaseNameType;
};
function HotelRoomGuestInfo({ title, formName }: RoomInfoProps) {
  const methods = useFormContext<HotelAttributesFormType>();

  const handleIncrease = () => {
    const increasedVal = Number(methods.watch(formName)) + 1;
    methods.setValue(formName, increasedVal);
  };

  const handleDecrease = () => {
    const decreasedVal = Number(methods.watch(formName)) - 1;
    if (decreasedVal < 0) {
      return;
    }
    methods.setValue(formName, decreasedVal);
  };

  return (
    <div className='flex justify-between items-center'>
      <p className='text-sm text-dark-blue font-medium'>{title}</p>
      <div className='flex items-center justify-center gap-2'>
        <div onClick={() => handleDecrease()}>
          <RemoveIcon />
        </div>
        <p className='w-[30px] text-center text-sm text-dark-blue'>
          {methods.watch(formName)}
        </p>
        <div onClick={() => handleIncrease()}>
          <AddIcon />
        </div>
      </div>
    </div>
  );
}

export default HotelRoomGuestInfo;
