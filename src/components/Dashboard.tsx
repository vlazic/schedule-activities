import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { ActivityCard } from "./ActivityCard";
import Logo from "../assets/jsxsvg/Logo";
import { ActivityDay } from "./ActivityDay";
import { $OrangeButton } from "./widgets/Button";
import PlusIcon from "../assets/jsxsvg/Plus";
import $Link from "./widgets/Link";
import routes from "../routes";
import {
  getPastActivitiesGroupedByDay,
  getScheduledActivitiesGroupedByDay,
} from "../selectors/activities";
import { removeAllActivities } from "../actions/activities";
import { activityCards } from "../consts";

export default function Dashboard() {
  const dispatch = useDispatch();
  const pastActivities = useSelector(getPastActivitiesGroupedByDay);
  const scheduledActivities = useSelector(getScheduledActivitiesGroupedByDay);

  const dispatchRemoveAllActivities = () => {
    dispatch(removeAllActivities());
  };

  return (
    <div>
      <$Header>
        <Logo />
      </$Header>
      <$Main>
        <$Title>Track Your Activity</$Title>
        <$Activities>
          {activityCards.map((activity) => (
            <ActivityCard
              key={activity.name}
              name={activity.name}
              location={activity.location}
            />
          ))}
        </$Activities>
        <$Title>Scheduled Activities</$Title>
        {scheduledActivities.length ? (
          scheduledActivities.map((activityPerDay) => (
            <ActivityDay
              key={activityPerDay[0].startTime.toMillis()}
              activities={activityPerDay}
            />
          ))
        ) : (
          <$InfoText>You don’t have any activities scheduled yet.</$InfoText>
        )}
        <$Link to={routes.schedule}>
          <$OrangeButton>
            <PlusIcon /> &nbsp; Schedule Activity
          </$OrangeButton>
        </$Link>

        <$Title>Activity History</$Title>
        {pastActivities.map((activityPerDay) => (
          <ActivityDay
            key={activityPerDay[0].startTime.toMillis()}
            activities={activityPerDay}
          />
        ))}

        <$OrangeButton onClick={dispatchRemoveAllActivities}>
          Clear All Scheduled and Past Activities
        </$OrangeButton>
      </$Main>
    </div>
  );
}

const $Main = styled.main`
  padding: 15px;
`;
const $Header = styled.header`
  height: 80px;
  box-shadow: 0px 0px 10px #1b1c201a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const $Activities = styled.div`
  display: flex;
  padding-bottom: 1.6em;
  width: 100%;
  overflow-y: auto;
`;
const $Title = styled.div`
  margin: 2.2em 0 1.5em;

  &:first-of-type {
    margin-top: 0;
  }
`;
const $InfoText = styled.span`
  color: #6e8ca0;
`;
