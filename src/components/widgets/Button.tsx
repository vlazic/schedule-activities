import styled from "styled-components";
import { shadeColor } from "../../utils/colors";

interface IButtonProps {
  color?: string;
}

const defaults: IButtonProps = {
  color: "#999999",
};

export const $Button = styled.button<IButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80%;
  margin: 10%;
  padding: 1em;

  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 2.1px;
  color: #ffffff;

  background: ${({ color }) => color || defaults.color} 0% 0% no-repeat
    padding-box;
  box-shadow: 0px 10px 15px #1b1c201a;
  border: none;
  border-radius: 30px;

  &:hover {
    cursor: pointer;
    background-color: ${({ color }) =>
      shadeColor(color || defaults.color!, -0.25)};
  }

  &:disabled,
  &[disabled] {
    background-color: #c8d1d3;
    color: #ffffff;
  }
`;

export const $OrangeButton = styled($Button).attrs((props) => ({
  color: "#d97d54",
}))``;
