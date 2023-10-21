import React from "react";
import Style from "./style.module.scss";
import cn from "classnames";

const Input = ({
  icons,
  type = "text",
  value,
  placeholder,
  onChange,
  label,
  isform,
}) => {
  return (
    <div className={cn(Style.input, isform && Style.isForm)}>
      {icons && <div className={Style.icon}>{icons}</div>}
      {!!label && <label>{label}</label>}
      <input
        required
        type={type}
        className={Style.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
