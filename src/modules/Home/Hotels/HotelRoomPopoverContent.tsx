import React from 'react';
import HotelRoomGuestInfo from './HotelRoomGuestInfo';

function HotelRoomPopoverContent() {
  return (
    <div className='flex flex-col gap-3'>
      <HotelRoomGuestInfo title='Rooms' formName='room_qty' />
      <HotelRoomGuestInfo title='Adults' formName='adults' />
      <HotelRoomGuestInfo title='Children' formName='children' />
    </div>
  );
}

export default HotelRoomPopoverContent;
