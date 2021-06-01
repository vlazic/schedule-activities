import React, { useRef, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";

import { IActivity, IActivityTypes } from "../types/activity";
import { shadeColor } from "../utils/colors";
import { $ActivityIcon } from "./ActivityIcon";
import imgBackground from "../assets/background/bg_tracking.png";
import $Link from "./widgets/Link";
import routes from "../routes";
import { addActivity } from "../actions/activities";

interface ITrackActivityParams {
  activity: IActivityTypes;
}

const pad0 = (num: number) => (num < 10 ? `0${num}` : num);

const TrackActivity: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [counter, setCounter] = useState(0);
  const [started, setStarted] = useState(false);
  const { activity } = useParams<ITrackActivityParams>();

  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();
  const resumedTimeRef = useRef<number>(0);

  const startTimer = () => {
    setStarted(true);
    startTimeRef.current = new Date().valueOf();

    intervalRef.current = setInterval(() => {
      setCounter(new Date().valueOf() - startTimeRef.current!);
    }, 50);
  };

  const pauseTimer = () => {
    setStarted(false);
    clearInterval(intervalRef.current!);
  };

  const resumeTimer = () => {
    setStarted(true);
    resumedTimeRef.current = new Date().valueOf();
    intervalRef.current = setInterval(() => {
      setCounter(new Date().valueOf() - resumedTimeRef.current! + counter);
    }, 50);
  };

  // save to the store and redirect to the dashboard
  const saveTimer = () => {
    setStarted(false);

    // stop counting
    clearInterval(intervalRef.current!);

    // save new activity to redux store
    dispatch(
      addActivity({
        name: activity,
        startTime: DateTime.fromMillis(startTimeRef.current!),
        // duration in minutes
        duration: (counter / 1000 / 60) as unknown as IActivity["duration"],
      }),
    );

    //  after saving to the store, get back to dashboard
    history.push(routes.dashboard);
  };

  // calculate minutes and seconds for timer
  const minutes = Math.round(counter / 1000 / 60) % 60;
  const seconds = pad0(Math.round(counter / 1000) % 60);

  return (
    <$TrackActivity>
      <$Link to={routes.dashboard}>
        <$BackButton> ᐸ </$BackButton>
      </$Link>
      <$CurrentActivity>
        <$CurrentActivityLabel>Current Activity</$CurrentActivityLabel>
        <$ActivityIcon activity={activity} size={60} />
        <$CurrentActivityName>{activity}</$CurrentActivityName>
      </$CurrentActivity>
      <$Counter>
        {minutes}:{seconds}
      </$Counter>
      <$ActivityStatus>
        Activity Tracking {started ? "In Progress" : "Stopped"}...
      </$ActivityStatus>
      {started === false && counter === 0 ? (
        <$PlayPauseSave onClick={startTimer}>▶</$PlayPauseSave>
      ) : started === true && counter > 0 ? (
        <$PlayPauseSave onClick={pauseTimer}>| |</$PlayPauseSave>
      ) : (
        <$ResumeSaveWrapper>
          <$PlayPauseSave onClick={resumeTimer}>▶</$PlayPauseSave>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <$PlayPauseSave onClick={saveTimer}>■</$PlayPauseSave>
        </$ResumeSaveWrapper>
      )}
    </$TrackActivity>
  );
};
export default TrackActivity;

const $TrackActivity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(${imgBackground});
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
`;
const $BackButton = styled.button`
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
const $CurrentActivity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const $CurrentActivityLabel = styled.div`
  text-transform: uppercase;
  margin-bottom: 0.5em;
`;
const $CurrentActivityName = styled.div`
  font-weight: bold;
  margin-top: 0.5em;
`;

const $Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.5;
  color: black;
  font-size: 4em;
`;
const $ActivityStatus = styled.strong`
  text-align: center;
  display: inline-block;
  max-width: 50%;
  font-size: 1.2em;
  line-height: 1.6em;
`;
const $ResumeSaveWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const $PlayPauseSave = styled.button`
  width: 60px;
  height: 60px;
  font-size: 35px;
  color: white;
  background-color: #334856;
  border: none;
  border-radius: 50%;
  &:hover {
    background-color: ${shadeColor("#334856", 0.25)};
    cursor: pointer;
  }
`;
