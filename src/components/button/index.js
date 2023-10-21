import React from "react";
import Style from "./style.module.scss";
import cn from "classnames";

const Button = ({ children, onClick, disabled, props, pop }) => {
  return (
    <button
      className={cn(Style.button, pop && Style.pop, disabled && Style.disabled)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
