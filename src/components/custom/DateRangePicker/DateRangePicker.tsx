'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn, dateToYYYYMMDD } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { UseFormReturn } from 'react-hook-form';

export function DateRangePicker({
  className,
  methods,
  disabled = false,
  fromDate,
  endDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  methods: UseFormReturn<any>;
  disabled?: boolean;
  fromDate?: string;
  endDate?: string;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });

  React.useEffect(() => {
    if (fromDate && endDate) {
      setDate({
        from: new Date(fromDate),
        to: new Date(endDate),
      });
    }
  }, [fromDate, endDate]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
            disabled={disabled}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0 min-h-[350px] md:h-auto overflow-y-auto'
          align='start'
        >
          <Calendar
            className='hidden md:block'
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => {
              setDate(date);
              if (date?.from && date?.to) {
                methods.setValue('arrival_date', dateToYYYYMMDD(date?.from));
                methods.setValue('departure_date', dateToYYYYMMDD(date?.to));
              }
            }}
            numberOfMonths={2}
          />

          <Calendar
            className='block md:hidden'
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => {
              setDate(date);
              if (date?.from && date?.to) {
                methods.setValue('arrival_date', dateToYYYYMMDD(date?.from));
                methods.setValue('departure_date', dateToYYYYMMDD(date?.to));
              }
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
