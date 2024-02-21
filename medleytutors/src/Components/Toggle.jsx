import React from "react";

const Toggle = ({ onToggle, label }) => {
  return (
    <div className="toggle">
      <button onClick={onToggle}>{label}</button>
    </div>
  );
};

export default Toggle;
