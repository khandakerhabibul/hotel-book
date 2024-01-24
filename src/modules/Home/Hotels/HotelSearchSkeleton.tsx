import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

function HotelSearchSkeleton() {
  return (
    <div className='flex items-center space-x-4'>
      <Skeleton className='h-[40px] w-[40px] ' />
      <Skeleton className='h-4 w-[140px]' />
      <Skeleton className='h-4 w-[40px]' />
    </div>
  );
}

export default HotelSearchSkeleton;
