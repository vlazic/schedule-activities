import React from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { IActivity } from "../types/activity";
import { $ActivityIcon } from "./ActivityIcon";

interface IActivityDay {
  activities: IActivity[];
}

const defaults = {
  maxPlaceholderActivities: 4,
  iconSize: 60,
};

export const ActivityDay: React.FC<IActivityDay> = ({ activities }) => {
  const date = activities[0].startTime;
  return (
    <$ActivityDay>
      <$ActivityDayInMonth>
        {date.monthLong} {date.day}
      </$ActivityDayInMonth>

      <$ActivityDayInWeek>{date.weekdayLong}</$ActivityDayInWeek>

      <$ActivityIcons>
        {activities.map((activity) => (
          <$ActivityIconWrapper key={activity.startTime.toMillis()}>
            <$ActivityIcon activity={activity.name} size={defaults.iconSize} />
            <$ActivityTime>
              {activity.startTime.toLocaleString(DateTime.TIME_SIMPLE)}
            </$ActivityTime>
          </$ActivityIconWrapper>
        ))}
        {Array.from({
          length: defaults.maxPlaceholderActivities - activities.length,
        }).map((_, index) => (
          <$ActivityIconWrapper key={index}>
            <$ActivityPlaceholder />
          </$ActivityIconWrapper>
        ))}
      </$ActivityIcons>
    </$ActivityDay>
  );
};

const $ActivityDay = styled.div``;

const $ActivityDayInMonth = styled.div`
  font-size: 11px;
  font-family: sans-serif;
  text-transform: uppercase;
  letter-spacing: 2.1px;
  color: #6e8ca0;
`;
const $ActivityDayInWeek = styled.strong``;
const $ActivityIcons = styled.div`
  display: flex;
  padding-bottom: 1em;
  width: 100%;
  overflow-y: auto;
`;
const $ActivityIconWrapper = styled.div`
  padding: 11px;
`;
const $ActivityTime = styled.div`
  margin-top: 1em;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0px;
  color: #8d8c8c;
`;
const $ActivityPlaceholder = styled.div`
  width: ${defaults.iconSize}px;
  height: ${defaults.iconSize}px;

  background: #f0f3f4 0% 0% no-repeat padding-box;
  border: 1px dashed #c8d1d3;
  border-radius: 50%;
  opacity: 1;
`;
