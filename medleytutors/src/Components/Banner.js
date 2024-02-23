import React, { useState } from "react";
import moon from "../Assets/moon.png";
import sun from "../Assets/sun.png";
import Toggle from "./Toggle";
import Camera from "./Camera";

export const Banner = () => {
  const [zIndices, setZIndices] = useState({ moon: 2, sun: -1 });
  const [activeElement, setActiveElement] = useState('sun');
  const [backgroundColor, setBackgroundColor] = useState('#f39b4b');
  const [toggled, setToggled] = useState(true);

  const handleToggle = () => {
    setToggled((s) => !s);
    const newActiveElement = activeElement === 'moon' ? 'sun' : 'moon';

    setZIndices((prevZIndices) => {
      const newZIndices = { ...prevZIndices };
      const activeZIndex = newZIndices[activeElement];
      const clickedZIndex = newZIndices[newActiveElement];

      newZIndices[activeElement] = clickedZIndex;
      newZIndices[newActiveElement] = activeZIndex;

      return newZIndices;
    });

    setActiveElement(newActiveElement);
    setBackgroundColor(newActiveElement === 'moon' ? 'black' : '#f39b4b');
  };

  return (
    <div className="banner-container" style={{ backgroundColor }}>
      <Camera/>
      <Toggle toggled={toggled} onClick={handleToggle} />
      <div className="banner">
        <div
          className={`banner-item banner-item1 ${activeElement === 'moon' ? 'active' : ''}`}
          style={{
            zIndex: zIndices.sun,
            transform: activeElement === 'sun' ? 'rotate(0deg)' : 'rotate(90deg)',
          }}
        >
          <img src={moon} alt="moon" className="banner-image" />
        </div>
        <div
          className={`banner-item banner-item2 ${activeElement === 'sun' ? 'active' : ''}`}
          style={{
            zIndex: zIndices.moon,
            transform: activeElement === 'moon' ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          <img src={sun} alt="sun" className="banner-image" />
        </div>
      </div>
    </div>
  );
};
