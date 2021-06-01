import { IActivityCardProps } from "./components/ActivityCard";

// default activities
export const activityTypes = [
  "Surfing",
  "Hiking",
  "Weights",
  "Spinning",
] as const;

// duration of activity (in minutes)
export const activityDurations = [15, 30, 45, 60, 75, 90, 105, 120] as const;

export enum TimeUnits {
  second = 1000,
  minute = 60 * second,
  hour = 60 * minute,
  day = 24 * hour,
  month = 31 * day,
}

export const activityCards: IActivityCardProps[] = [
  {
    name: "Surfing",
    location: "Ocean Beach",
  },
  {
    name: "Hiking",
    location: "Belgrade",
  },
  {
    name: "Weights",
    location: "Zagreb",
  },
  {
    name: "Spinning",
    location: "Tobbey Pines",
  },
];
