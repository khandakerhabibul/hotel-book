'use client';
import { SorryModal } from '@/components/custom/SorryModal/SorryModal';
import React, { useEffect, useState } from 'react';

function FlightsMain() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className='relative overflow-hidden rounded-lg min-h-[80vh] p-6 bg-white max-w-[1280px] w-full'>
      Flights
      <SorryModal open={open} setOpen={setOpen} fromFlightPage />
    </div>
  );
}

export default FlightsMain;
