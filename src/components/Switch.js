import React from "react";

const SwitchButton = (props) => {
  return (
    <div className="content-center">
      <label className="switch">
        <input
            className=" to-black bg-slate-600 focus:to-black text-sm "
          onChange={() => props.toggleFormat()}
          checked={props.degreeFormat}
          type="checkbox"
        ></input>
        <span className="slider round align-center">
          <div
          className="fdsf flex gap-5 to-black z-0 relative text-xs"
          >
            <span>C</span>
            <span>F</span>
          </div>
        </span>
      </label>
    </div>
  );
};

export default SwitchButton;