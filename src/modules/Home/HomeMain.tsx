'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import HotelsAttributes from './Hotels/HotelsAttributes';
import FlightsAttributes from './Flights/FlightsAttributes';
import { useForm } from 'react-hook-form';
import {
  FlightType,
  HotelType,
  TabType,
  TabsObjectType,
} from './query/home.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

function HomeMain() {
  const [tab, setTab] = useState<TabType>('hotels');
  const router = useRouter();

  const handleSetTab = (tab: TabType) => {
    setTab(tab);
  };

  const Tabs: TabsObjectType[] = [
    {
      tabName: 'Hotel',
      value: 'hotels',
      icon: 'https://gozayaan.com/img/icon-Hotel.5d80c2e2.svg',
    },
    {
      tabName: 'Flight',
      value: 'flights',
      icon: 'https://gozayaan.com/img/icon-Flight.bc448c56.svg',
    },
  ];

  return (
    <main
      className={`p-4 min-h-dvh flex flex-col gap-3 justify-center items-center`}
    >
      <div className='bg-white rounded-[10px] pt-12 pb-6 px-4 md:pt-16 md:px-5 md:pb-6 relative'>
        <div className='absolute -top-[40px] left-[38px] md:-top-9 md:left-[210px] right-0 w-[250px] md:w-[300px] shadow-xl rounded-[10px] bg-white md:px-[40px] px-3 flex justify-center gap-3 md:gap-6 items-center py-4 md:py-5'>
          {Tabs?.map((item) => (
            <div
              className={cn(
                'flex justify-center items-center gap-2 cursor-pointer pb-2',
                {
                  'underline underline-offset-8 decoration-yellow decoration-2':
                    tab === item.value,
                }
              )}
              key={item.value}
              onClick={() => handleSetTab(item.value)}
            >
              <input
                type='radio'
                name='site_name'
                value={item.value}
                checked={tab === item.value}
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSetTab(item.value);
                }}
              />
              <div className='flex items-center gap-1'>
                <Image
                  src={item.icon}
                  width={24}
                  height={24}
                  alt={item.value}
                />
                <p>{item.tabName}</p>
              </div>
            </div>
          ))}
        </div>
        {tab === 'hotels' && <HotelsAttributes />}
        {tab === 'flights' && <FlightsAttributes />}
      </div>
    </main>
  );
}

export default HomeMain;
