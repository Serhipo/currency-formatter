import { format } from 'date-fns';

/**
 * Return formatted string (dd/MM/yyyy hh:mm:a) from date .
 *
 * @property {Date | string} date
 */
export const getFormattedDate = (date?: string | Date) =>
  date ? format(new Date(date), 'dd/MM/yyyy hh:mm:a') : null;
