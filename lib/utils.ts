import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'

import { UrlQueryParams, RemoveUrlQueryParams } from '@/types'

// Utility function to combine Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats a date string or Date object into various formats: full date-time, date only, and time only
export const formatDateTime = (dateInput: string | Date) => {
  const date = new Date(dateInput)

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  }

  const formattedDateTime: string = date.toLocaleString('en-US', dateTimeOptions)
  const formattedDate: string = date.toLocaleString('en-US', dateOptions)
  const formattedTime: string = date.toLocaleString('en-US', timeOptions)

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  }
}

// Converts a file object to a URL for display
export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

// Formats a string price into USD currency format
export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return formattedPrice
}

// Forms a URL query string with new parameters or updates existing ones
export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  // Check if window is defined to avoid issues in SSR environments
  if (typeof window !== 'undefined') {
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }
}

// Removes specific keys from a URL query string
export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })

  // Check if window is defined to avoid issues in SSR environments
  if (typeof window !== 'undefined') {
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }
}

// Handles errors by logging and throwing a detailed error message
export const handleError = (error: unknown) => {
  console.error(error)

  let errorMessage = 'An error occurred'
  if (typeof error === 'string') {
    errorMessage = error
  } else {
    try {
      errorMessage = JSON.stringify(error)
    } catch (jsonError) {
      errorMessage = 'Error could not be serialized'
    }
  }

  throw new Error(errorMessage)
}
