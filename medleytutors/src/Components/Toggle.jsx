import React from "react";

const Toggle = ({ onToggle, label }) => {
  return (
    <div className="toggle">
      <div className="notch"/>
      <div>
        <div className="shape sm"/>
        <div className="shape sm"/>
        <div className="shape md"/>
        <div className="shape lg"/>
      </div>
      <button onClick={onToggle}></button>
    </div>
  );
};

export default Toggle;
