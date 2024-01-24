import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const urlFormatter = (url: string) => {
  return `${process.env.url}${url}?`;
};

export const dateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isPastDate = (targetDate: Date) => {
  // Create Date objects for the target date and current date
  const currentDate = new Date();
  const targetDateObj = new Date(targetDate);

  // Set hours, minutes, seconds, and milliseconds to 0 for accurate date comparison
  currentDate.setHours(0, 0, 0, 0);
  targetDateObj.setHours(0, 0, 0, 0);

  // Compare the two dates
  return targetDateObj < currentDate;
};
