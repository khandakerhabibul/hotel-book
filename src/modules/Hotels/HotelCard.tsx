import React from 'react';
import { HotelsEntity } from '../Home/query/searchHotelByParams.types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import StarIcon from '@/components/common/StarIcon';
import { MapPinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  hotel: HotelsEntity;
};

function HotelCard({ hotel }: Props) {
  const property = hotel?.property;
  const priceBreakdown = property?.priceBreakdown;

  const strikethroughPrice = priceBreakdown?.strikethroughPrice;
  const grossPrice = priceBreakdown?.grossPrice;

  const offPercentage = () => {
    if (strikethroughPrice?.value && grossPrice?.value) {
      return `${(
        ((Number(strikethroughPrice?.value) - Number(grossPrice?.value)) /
          Number(strikethroughPrice?.value)) *
        100
      ).toFixed(0)}% off`;
    }

    return '';
  };

  return (
    <div
      className={cn(
        'border py-3 px-2 rounded-md flex flex-col md:flex-row gap-3'
      )}
    >
      <div>
        {property?.photoUrls?.[0] ? (
          <>
            <Image
              src={property?.photoUrls?.[0]}
              width={180}
              height={180}
              className='hidden md:block rounded-md'
              alt={property?.name}
            />
            <Image
              src={property?.photoUrls?.[0]}
              width={100}
              height={100}
              className='block w-full h-[150px] md:hidden rounded-md object-cover'
              alt={property?.name}
            />
          </>
        ) : (
          <div className='w-full md:w-[100px] h-[100px] md:h-[200px] border rounded-md'></div>
        )}
      </div>
      <div className='flex-1 flex flex-col gap-2'>
        <h2 className='font-bold md:text-xl text-dark-blue'>
          {property?.name}
        </h2>
        <div className='flex text-sm flex-col md:flex-row gap-1 md:justify-between h-full'>
          <div className='flex flex-col items-start gap-2'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-2 border rounded-sm py-[2px] px-1'>
                <StarIcon /> <p>{property?.reviewScore}</p>
              </div>
              <div className='flex items-center gap-1 capitalize'>
                <MapPinIcon className='w-4 h-4 text-[gray]' />{' '}
                <p>{property?.countryCode}</p>
              </div>
            </div>
            <div className='flex md:flex-col md:gap-3 gap-2'>
              <p className='text-dark-blue'>
                <span className='font-semibold bg-yellow text-dark-blue p-1 rounded text-xs'>
                  {property?.reviewScoreWord}
                </span>
              </p>
              <p className='text-dark-blue'>
                Review counted{' '}
                <span className='font-semibold px-2 border border-dark-blue text-dark-blue p-1 rounded text-xs'>
                  {property?.reviewCount}
                </span>
              </p>
            </div>
            <div className='hidden md:flex h-full items-end'>
              <Button className='bg-dark-blue text-white'>Book Now</Button>
            </div>
          </div>
          <div className='flex flex-col gap-1 md:items-end md:justify-end h-full md:max-w-[120px]'>
            <p className='text-xs text-right'>Per room</p>

            {strikethroughPrice?.value && (
              <div className='flex flex-col items-end'>
                <div className='bg-[#FD7E13] w-[60px] rounded-full p-1'>
                  <p className='text-xs text-center text-white font-semibold'>
                    {offPercentage()}
                  </p>
                </div>
                <p className='text-[red] line-through text-right'>
                  {strikethroughPrice?.currency}{' '}
                  {strikethroughPrice?.value?.toFixed(2)}
                </p>
              </div>
            )}
            <div className='flex justify-between'>
              <div className='flex md:hidden h-full items-end'>
                <Button className='bg-dark-blue text-white'>Book Now</Button>
              </div>
              <div className='flex flex-col items-end justify-end'>
                <p className='text-lg font-bold text-right text-dark-blue'>
                  {grossPrice?.currency} {grossPrice?.value?.toFixed(2)}
                </p>
                {priceBreakdown?.benefitBadges?.map((badge) => (
                  <div key={badge?.identifier}>
                    <p className='line-clamp-1 text-xs'>{badge?.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
