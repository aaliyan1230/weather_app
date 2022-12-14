import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import Header from "./components/Header";
import LocationInfo from "./components/Location";
import SwitchButton from "./components/Switch";

function App() {
  const [location, setLocation] = useState({});
  const [degreeFormat, setDegreeFormat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceLocation, setDeviceLocation] = useState([]);
  const [errorLoading, setErrorLoading] = useState(false);
  const [hour, setHour] = useState("");

  const api = (v) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${v}&appid=fc64f2a7281d28c22448a88a0443cd61&units=metric`;
  const myInit = { mode: "cors" };
  const myRequest = (v) => new Request(api(v), myInit);

  const toggleFormat = () => setDegreeFormat(!degreeFormat);

  // clock on bottom of app
  setInterval(() => {
    var date = new Date();
    setHour(
      date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  }, 1000);

  // gets location from device
  function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const ps = [
        Math.round(position.coords.latitude),
        Math.round(position.coords.longitude),
      ];
      setDeviceLocation(ps);
    });
  }

  useEffect(() => {
    if (deviceLocation.length !== 0) {
      fetchResults();
    }
  });

  // gets location data for device
  async function fetchResults() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${deviceLocation[0]}&lon=${deviceLocation[1]}&appid=fc64f2a7281d28c22448a88a0443cd61&units=metric`,
        myInit
      );
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setLocation(data);
      setErrorLoading(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setErrorLoading(true);
      console.error(e);
    }
  }

  // gets location from input
  async function getLocation(e) {
    setIsLoading(true);
    try {
      const response = await fetch(myRequest(e.target.value));
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setLocation(data);
      e.target.value = "";
      setIsLoading(false);
      setErrorLoading(false);
    } catch (e) {
      setErrorLoading(true);
      setIsLoading(false);
      console.error(e);
    }
  }

  // initial location


  useEffect(() => {
    async function getInitialLocation() {
      setIsLoading(true);
      try {
        const response = await fetch(api("karachi"), {mode:"cors"});
        if (!response.ok) {
          throw new Error("bad network request");
        }
        const data = await response.json();
        setErrorLoading(false);
        setLocation(data);
        setIsLoading(false);
      } catch (e) {
        setErrorLoading(true);
        setIsLoading(false);
        console.error(e);
      }
    }
    getInitialLocation();
  }, []);

  return (
    <div className="bg-blue-400">
      <div className="App">
        <Header
          errorLoading={errorLoading}
          getUserLocation={getUserLocation}
          getLocation={getLocation}
        />
        {isLoading ? (
          <p style={{ fontSize: "40px" }}>Loading ...</p>
        ) : (
          <div>
            <LocationInfo degreeFormat={degreeFormat} location={location} />
            <SwitchButton
              toggleFormat={() => toggleFormat()}
              degreeFormat={degreeFormat}
            />
            <p>{hour}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;