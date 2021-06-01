import { combineReducers } from "redux";
import activitiesReducer, { IActivitiesActions } from "./activities";

export const reducers = combineReducers({
  activities: activitiesReducer,
});

export type IState = ReturnType<typeof reducers>;
export type IActions = IActivitiesActions /* | ... */;
