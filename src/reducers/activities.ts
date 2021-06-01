// import { STATUSES, STATUS_LABELS } from "../lib/consts";
// import { ISortKey, ISortOrder } from "../types/sort";
import { Action } from "redux";
import { IActivity } from "../types/activity";
import { DateTime } from "luxon";

export interface IAddActivityAction extends Action<"ADD_ACTIVITY"> {
  activity: IActivity;
}

export interface IRemoveAllActivitiesAction
  extends Action<"REMOVE_ALL_ACTIVITIES"> {}

export type IActivitiesActions =
  | IAddActivityAction
  | IRemoveAllActivitiesAction;

export type IActivitiesState = IActivity[];

// populate state with fake data
export const activitiesState: IActivitiesState = [
  {
    name: "Weights",
    location: "Zagreb",
    duration: 45,
    startTime: DateTime.fromJSDate(new Date()).minus({ days: 1, minutes: 122 }),
  },
  {
    name: "Hiking",
    location: "Belgrade",
    duration: 15,
    startTime: DateTime.fromJSDate(new Date()).minus({ days: 1 }),
  },
  {
    name: "Surfing",
    location: "Loviste",
    duration: 30,
    startTime: DateTime.fromJSDate(new Date()).plus({ minutes: 30 }),
  },
  {
    name: "Hiking",
    location: "Istra",
    duration: 120,
    startTime: DateTime.fromJSDate(new Date()).plus({ minutes: 180 }),
  },
  {
    name: "Weights",
    location: "Paris",
    duration: 120,
    startTime: DateTime.fromJSDate(new Date()).plus({ days: 1, hours: 5 }),
  },
];

const activitiesReducer = (
  state: IActivitiesState = activitiesState,
  action: IActivitiesActions,
) => {
  switch (action.type) {
    case "ADD_ACTIVITY": {
      if (action.activity) return [...state, action.activity];

      return state;
    }
    case "REMOVE_ALL_ACTIVITIES": {
      return [];
    }

    default:
      return state;
  }
};

export default activitiesReducer;
