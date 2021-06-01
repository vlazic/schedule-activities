import { IActivityTypes } from "./types/activity";

const routes = {
  dashboard: "/",
  schedule: "/schedule",
  track: (activity: IActivityTypes | string) => `/track/${activity}`,
};

export default routes;
