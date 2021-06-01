import React, { useState } from "react";
import styled from "styled-components";

import { $ActivityIcon } from "./ActivityIcon";
import { activityDurations, activityTypes } from "../consts";
import { $OrangeButton } from "./widgets/Button";
import Select from "./widgets/Select";
import { IActivityDurations, IActivityTypes } from "../types/activity";
import $Link from "./widgets/Link";
import routes from "../routes";
import { getAvailableSlots } from "../selectors/activities";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../reducers";
import { addActivity } from "../actions/activities";
import { DateTime } from "luxon";
import { useHistory } from "react-router-dom";

const defaults = {
  iconSize: 60,
};

const ScheduleActivity: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activity, setActivity] = useState<IActivityTypes>("Surfing");
  const [duration, setDuration] = useState<IActivityDurations>(15);
  const [startTime, setStartTime] = useState<DateTime>();
  const scheduledActivities = useSelector((state: IState) =>
    getAvailableSlots(state, duration),
  );

  const dispatchAddActivity = () => {
    dispatch(addActivity({ name: activity, duration, startTime: startTime! }));
    history.push(routes.dashboard);
  };

  return (
    <$ScheduleActivity>
      <$Link to={routes.dashboard}>
        <$CloseButton> ✕ </$CloseButton>
      </$Link>
      <$ScheduleActivityTitle>Schedule your activity</$ScheduleActivityTitle>
      <$ActivityIcons>
        {activityTypes.map((activityName) => (
          <$ActivityIconWrapper
            key={activityName}
            onClick={() => setActivity(activityName)}
          >
            <$ActivityIcon
              activity={activityName}
              size={defaults.iconSize}
              isActive={activityName === activity}
              hasHover
            />
            <$ActivityLabel>{activityName}</$ActivityLabel>
          </$ActivityIconWrapper>
        ))}
      </$ActivityIcons>

      <Select
        label="How long do you want to do this activity?"
        options={activityDurations as unknown as number[]}
        optionSuffix=" min"
        onChange={(value) =>
          setDuration(Number(value) as unknown as IActivityDurations)
        }
      />
      <Select
        label="When do you want to do this activity?"
        options={scheduledActivities}
        type="DateTime"
        onChange={(value) => setStartTime(DateTime.fromMillis(Number(value)))}
      />

      <$OrangeButton onClick={dispatchAddActivity} disabled={!startTime}>
        Schedule
      </$OrangeButton>
    </$ScheduleActivity>
  );
};
export default ScheduleActivity;

const $ScheduleActivity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #344856;
  color: white;
`;
const $CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  font-size: 20px;
  color: white;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    color: gray;
    background-color: white;
  }
`;
const $ScheduleActivityTitle = styled.h3`
  margin-bottom: 0.5em;
`;
const $ActivityIcons = styled.div`
  display: flex;
  padding-bottom: 1em;
`;
const $ActivityIconWrapper = styled.div`
  padding: 12px;
  &:hover {
    cursor: pointer;
  }
`;
const $ActivityLabel = styled.div`
  margin-top: 1em;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0px;
  color: #ffffff;
  text-transform: uppercase;
`;
