import React from "react";
import { components } from "react-select";
import * as AiIcons from "react-icons/ai";

export default function DropdownIndicator(props) {
  return (
    <components.DropdownIndicator {...props}>
      <AiIcons.AiOutlineDown />
    </components.DropdownIndicator>
  );
}
