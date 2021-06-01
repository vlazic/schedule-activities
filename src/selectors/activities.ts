import { DateTime } from "luxon";
import { IState } from "../reducers";
import { IActivity, IActivityDurations } from "../types/activity";
import { TimeUnits } from "../consts";

const splitActivitiesPerDays = (activities: IActivity[]): IActivity[][] => {
  return Object.values(
    activities.reduce(
      (day, activity) => {
        const currentDay = activity.startTime.toLocaleString(
          DateTime.DATE_FULL,
        );

        if (day[currentDay]) {
          day[currentDay].push(activity);
        } else {
          day[currentDay] = [activity];
        }

        return day;
      },
      {} as {
        [key: string]: IActivity[];
      },
    ),
  );
};

export const getActivities = (state: IState) => state.activities;

export const getPastActivities = (state: IState) =>
  state.activities.filter(
    (activity) => activity.startTime.toMillis() - new Date().valueOf() < 0,
  );
export const getScheduledActivities = (state: IState) =>
  state.activities.filter(
    (activity) => activity.startTime.toMillis() - new Date().valueOf() >= 0,
  );

export const getPastActivitiesGroupedByDay = (state: IState) =>
  splitActivitiesPerDays(getPastActivities(state));
export const getScheduledActivitiesGroupedByDay = (state: IState) =>
  splitActivitiesPerDays(getScheduledActivities(state));

export const getAvailableSlots = (
  state: IState,
  duration: IActivityDurations,
) => {
  const timeSlotIncrement = TimeUnits.minute * 15;
  const maxActivities = 10;
  const freeTimeSlots = [];
  const scheduledActivities = getScheduledActivities(state);

  // start scheduling starting from next quarter hour
  const startingTimeSlotDate = new Date();
  startingTimeSlotDate.setMilliseconds(
    Math.round(startingTimeSlotDate.getMilliseconds() / 1000) * 1000,
  );
  startingTimeSlotDate.setSeconds(
    Math.round(startingTimeSlotDate.getSeconds() / 60) * 60,
  );
  startingTimeSlotDate.setMinutes(
    Math.round(startingTimeSlotDate.getMinutes() / 15) * 15 + 15,
  );
  const timeSlot = {
    start: startingTimeSlotDate.valueOf(),
    end: startingTimeSlotDate.valueOf() + duration * TimeUnits.minute,
  };

  // start with closest quarter hour and find next available time slot
  while (freeTimeSlots.length < maxActivities) {
    if (freeSlot(scheduledActivities, timeSlot.start, timeSlot.end)) {
      freeTimeSlots.push(timeSlot.start);
    }
    timeSlot.start += timeSlotIncrement;
    timeSlot.end += timeSlotIncrement;
  }

  function freeSlot(
    activities: IActivity[],
    startTime: number,
    endTime: number,
  ) {
    // loop over scheduled activities and skip if...
    for (let i = 0; i < activities.length; i++) {
      const activityStartTime = activities[i].startTime.toMillis();
      const activityEndTime =
        activities[i].startTime.toMillis() +
        activities[i].duration * TimeUnits.minute;

      // ... activity time begins during proposed activity
      if (activityStartTime > startTime && activityStartTime < endTime)
        return false;

      // ... activity time ends during proposed activity
      if (activityEndTime > startTime && activityEndTime < endTime)
        return false;

      // ... activity time starts before and ends after proposed activity
      if (activityStartTime < startTime && activityEndTime > endTime)
        return false;
    }

    return true;
  }

  return freeTimeSlots.map((time) => DateTime.fromMillis(time));
};
