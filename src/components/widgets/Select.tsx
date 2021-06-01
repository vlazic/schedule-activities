import { DateTime } from "luxon";
import { useState } from "react";
import styled from "styled-components";

interface ISelectProps {
  label: string;
  options: Array<any>;
  onChange: (value: any) => void;
  type?: "string" | "number" | "DateTime";
  optionSuffix?: string;
}

const Select: React.FC<ISelectProps> = ({
  label,
  options,
  optionSuffix,
  type,
  onChange,
}) => {
  const [selected, setSelected] = useState<any>();

  return (
    <$SelectLabel>
      {label}
      <$Select>
        <select
          onChange={(event) => {
            setSelected(event.target.value);
            onChange(event.target.value);
          }}
          value={selected}
        >
          {options.map((value) => (
            <option key={value.toString()} value={value}>
              {type === "DateTime"
                ? (value as DateTime).toLocaleString(DateTime.DATETIME_MED)
                : value.toString()}
              {optionSuffix || ""}
            </option>
          ))}
        </select>
        <div className="select_arrow"></div>
      </$Select>
    </$SelectLabel>
  );
};

export default Select;

const $SelectLabel = styled.label`
  width: 80%;
  display: inline-block;
  font-size: 0.8em;
  margin-bottom: 0.3em;
`;
const $Select = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
  width: 100%;

  select {
    font-family: "Arial";
    display: inline-block;
    margin-top: 0.6em;
    width: 100%;
    cursor: pointer;
    padding: 15px 15px;
    outline: 0;
    border: 0px solid #000000;
    border-radius: 8px;
    background: #d97d54;
    color: #ffffff;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  select::-ms-expand {
    display: none;
  }
  select:hover,
  select:focus {
    color: #ffffff;
    background: #a35e3f;
  }
  select:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  .select_arrow {
    position: absolute;
    top: 28px;
    right: 15px;
    pointer-events: none;
    border-style: solid;
    border-width: 8px 5px 0px 5px;
    border-color: #ffffff transparent transparent transparent;
  }
  select:hover ~ .select_arrow,
  select:focus ~ .select_arrow {
    border-top-color: #ffffff;
  }
  select:disabled ~ .select_arrow {
    border-top-color: #cccccc;
  }
`;
