import styled, { css } from "styled-components";

import iconSurfing from "../assets/icons/surfing.svg";
import iconSpinning from "../assets/icons/spinning.svg";
import iconHiking from "../assets/icons/hiking.svg";
import iconWeights from "../assets/icons/weights.svg";

import iconSurfingHover from "../assets/icons/surfing_light.svg";
import iconSpinningHover from "../assets/icons/spinning_light.svg";
import iconHikingHover from "../assets/icons/hiking_light.svg";
import iconWeightsHover from "../assets/icons/weights_light.svg";

import { IActivityTypes } from "../types/activity";

type IActivityIcons = {
  [key in IActivityTypes]: string;
};

interface IActivityIconProps {
  activity: IActivityTypes;
  size?: number;
  hasHover?: boolean;
  isActive?: boolean;
}

const icons: IActivityIcons = {
  Surfing: iconSurfing,
  Spinning: iconSpinning,
  Hiking: iconHiking,
  Weights: iconWeights,
};
const hoverIcons: IActivityIcons = {
  Surfing: iconSurfingHover,
  Spinning: iconSpinningHover,
  Hiking: iconHikingHover,
  Weights: iconWeightsHover,
};

export const $ActivityIcon = styled.div<IActivityIconProps>`
  width: ${({ size }) => (size ? size : 100)}px;
  height: ${({ size }) => (size ? size : 100)}px;

  background-image: url(${({ activity }) => icons[activity]});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 65%;

  border-radius: 100%;
  box-shadow: 0px 10px 30px #42596529;
  background-color: white;

  ${({ isActive, activity }) =>
    isActive &&
    css`
      background-image: url(${hoverIcons[activity]});
      background-color: #d97d54;
    `}
  ${({ hasHover, activity }) =>
    hasHover &&
    css`
      &:hover {
        background-image: url(${hoverIcons[activity]});
        background-color: #d97d54;
      }
    `}
`;
