import { DateTime } from "luxon";
import { activityDurations, activityTypes } from "../consts";

export type IActivityTypes = typeof activityTypes[number];

export type IActivityDurations = typeof activityDurations[number];

export interface IActivity {
  // name of activity, eg: Surfing, Hiking...
  name: IActivityTypes;
  // location of activity, eg: Belgrade, Zagreb...
  location?: string;
  // starting date of this activity
  startTime: DateTime;
  // duration in minutes
  duration: IActivityDurations;
}
