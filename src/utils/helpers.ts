import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseDate = (date: string) =>
  new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  }).format(new Date(date));

export const getRandomString = (strings: string[]): string => {
  if (strings.length === 0) {
    throw new Error('El arreglo no puede estar vacío');
  }
  const randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
}

/**
 * Pausa la ejecución por un número de milisegundos
 * @param ms Tiempo en milisegundos
 */
export const delay = (ms: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};