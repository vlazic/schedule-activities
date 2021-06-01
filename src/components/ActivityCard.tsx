import React from "react";
import styled from "styled-components";

import { IActivity, IActivityTypes } from "../types/activity";
import { $ActivityIcon } from "./ActivityIcon";
import $Link from "./widgets/Link";
import imgSurfing from "../assets/images/surfing.png";
import imgSpinning from "../assets/images/spinning.png";
import imgHiking from "../assets/images/hiking.png";
import imgWeights from "../assets/images/weights.png";
import routes from "../routes";

type IActivityImages = {
  [key in IActivityTypes]: string;
};

const images: IActivityImages = {
  Surfing: imgSurfing,
  Spinning: imgSpinning,
  Hiking: imgHiking,
  Weights: imgWeights,
};

export type IActivityCardProps = Omit<IActivity, "duration" | "startTime">;

const defaults = { activityIconSize: 46 };

export const ActivityCard: React.FC<IActivityCardProps> = ({
  location,
  name,
}) => {
  return (
    <$Link to={routes.track(name)}>
      <$ActivityCard>
        <$ActivityImage src={images[name]} alt={name} />
        <$ActivityIconWrapper>
          <$ActivityIcon activity={name} size={defaults.activityIconSize} />
        </$ActivityIconWrapper>
        <$ActivityTitle>{name}</$ActivityTitle>
        <$ActivitySubtitle>{location}</$ActivitySubtitle>
      </$ActivityCard>
    </$Link>
  );
};

const $ActivityCard = styled.div`
  width: 136px;
  height: 182px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 10px 15px #1b1c201a;
  border-radius: 15px;
  margin: 0 1em;
  user-select: none;
  position: relative;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const $ActivityImage = styled.img`
  width: 136px;
`;

const $ActivityIconWrapper = styled.div`
  width: ${defaults.activityIconSize}px;
  height: ${defaults.activityIconSize}px;
  position: absolute;
  left: calc(50% - ${defaults.activityIconSize}px / 2);
  top: 82px;
  border-radius: 100%;
  box-shadow: 0px 10px 30px #42596529;
  background-color: white;
`;
const $ActivityTitle = styled.h5`
  text-align: center;
  margin: 2.2em 0 0;
`;
const $ActivitySubtitle = styled.div`
  text-align: center;
  font-size: 10px;
  font: normal normal medium 10px/12px Rift Soft;
  letter-spacing: 1.5px;
  color: #7d8184;
  text-transform: uppercase;
  margin-top: 0.3em;
`;
