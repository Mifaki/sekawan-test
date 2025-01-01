import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LogInfo = (msg: string) => console.debug(`[Info]: ${msg}`);
export const LogError = (msg: string) => console.error(`[Error]: ${msg}`);

export const formatToIDR = (value: string) => {
  const number = value.replace(/\./g, '');
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const unformatFromIDR = (value: string) => {
  return value.replace(/\./g, '');
};

export const formatDateTime = (dateTime: string) => {
  try {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    }).format(date);
  } catch (error) {
    console.error(`Invalid date-time format: ${dateTime}`);
    return dateTime;
  }
};
