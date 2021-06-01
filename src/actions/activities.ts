import { IActivity } from "../types/activity";
import {
  IAddActivityAction,
  IRemoveAllActivitiesAction,
} from "../reducers/activities";

export type IAddActivity = (activity: IActivity) => IAddActivityAction;
export type IRemoveAllActivities = () => IRemoveAllActivitiesAction;

export const addActivity: IAddActivity = (activity) => ({
  type: "ADD_ACTIVITY",
  activity,
});
export const removeAllActivities: IRemoveAllActivities = () => ({
  type: "REMOVE_ALL_ACTIVITIES",
});
