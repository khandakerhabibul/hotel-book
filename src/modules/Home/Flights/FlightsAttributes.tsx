import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlightAttributesFormType } from '../query/home.types';
import { flightsAttributesSchema } from '../query/schema';
import { SorryModal } from '@/components/custom/SorryModal/SorryModal';

function FlightsAttributes() {
  const methods = useForm<FlightAttributesFormType>({
    resolver: zodResolver(flightsAttributesSchema),
  });

  const router = useRouter();

  const handleRoute = () => {
    router.push('/flights');
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <SorryModal open={open} setOpen={setOpen} />
      <div className='w-[290px] md:w-[680px] flex flex-col md:flex-row gap-4 md:gap-6'>
        <div className='flex-1 border border-solid p-2 rounded-md'>
          Destination
        </div>
        <div className='flex-1 border border-solid p-2 rounded-md'>
          Journey Date
        </div>
        <div className='flex-1 border border-solid p-2 rounded-md'>Person</div>
      </div>
      <Button
        className={
          'bg-yellow text-dark-blue md:text-lg w-[150px] h-[50px] hover:text-white absolute -bottom-14 left-[95px] md:left-[290px]'
        }
        onClick={handleRoute}
      >
        Search
      </Button>
    </>
  );
}

export default FlightsAttributes;
