import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);
  let interval = seconds / 31536000; // Number of seconds in a year

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000; // Number of seconds in a month
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400; // Number of seconds in a day
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600; // Number of seconds in an hour
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60; // Number of seconds in a minute
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M"; // Divides by 1,000,000 and appends "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K"; // Divides by 1,000 and appends "K"
  } else {
    return num?.toString(); // Returns the number as a string if less than 1,000
  }
};

// export function getJoinedDate(date: Date): string {
//   const monthNames: string[] = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const month: string = monthNames[date.getMonth()];
//   const year: number = date.getFullYear();

//   return `${month} ${year}`;
// }
export function getJoinedDate(date?: Date): string {
  // Default month names
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Check if date is a valid Date object
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid date"; // Return a default or error message
  }

  const month: string = monthNames[date.getMonth()];
  const year: number = date.getFullYear();

  return `${month} ${year}`;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};



interface BadgeParam {
  criteria: Array<{
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }>;
}

interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}


interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[]
}

export const assignBadges = (params: BadgeParam) => {
const badgeCounts: BadgeCounts = {
  GOLD: 0,
  SILVER:0,
  BRONZE: 0 ,
}
const { criteria } = params;
criteria.forEach((item) => {
  const { type, count } = item;
  const badgeLevels: any = BADGE_CRITERIA[type];
  Object.keys(badgeLevels).forEach((level: any) => {
    if (count >= badgeLevels[level]) {
      badgeCounts[level as keyof BadgeCounts] += 1;
      }
      });
    })
    return badgeCounts;
}