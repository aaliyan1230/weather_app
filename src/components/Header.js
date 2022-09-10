import React from "react";

const Header = (props) => {
  return (
    <div>
      <div
        className="gap-10 content-center text-3xl"
      >
        <img
            className="w-14"
          alt="app-logo"
          src="https://www.feirox.com/rivu/2016/04/Klara-1-1.png"
        ></img>
        <p>Current Weather</p>
      </div>
      <br></br>
      <div
        className="content-center gap-5"
      >
        <img
            className="cursor-pointer w-7"
          alt="location access"
          onClick={() => props.getUserLocation()}
          src="https://img.icons8.com/ios-filled/50/000000/marker.png"
        ></img>
        <input
        className="b p-1 rounded-md"
          placeholder="city..."
          onKeyPress={(e) =>
            e.key === "Enter" && e.target.value !== ""
              ? props.getLocation(e)
              : null
          }
        ></input>
      </div>
      <p className="not-found">
        {props.errorLoading ? "Ops, something went wrong" : null}
      </p>
    </div>
  );
};

export default Header;