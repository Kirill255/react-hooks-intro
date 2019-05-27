import React, { useState, useEffect, useRef } from "react";
import Login from "./Login";
import Register from "./Register";

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
};

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine); // true/false

  // const [location, setLocation] = useState(initialLocationState); // location.latitude, location.longitude, location.speed
  const [{ latitude, longitude, speed }, setLocation] = useState(initialLocationState); //или так
  const isMounted = useRef(true);

  useEffect(() => {
    document.title = `You have clicked ${count} times`;
    // listen event
    window.addEventListener("mousemove", handleMouseMove);
    // listen multiple events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      navigator.geolocation.clearWatch(watchId);
      isMounted.current = false;
    };
  }, [count]);

  // const incrementCount = () => setCount(count + 1); // можно так
  const incrementCount = () => setCount((prevCount) => prevCount + 1);
  const toggleLight = () => setIsOn((prevIsOn) => !prevIsOn);

  const handleMouseMove = (e) => setMousePosition({ x: e.pageX, y: e.pageY });
  const handleOnline = () => setStatus(true);
  const handleOffline = () => setStatus(false);

  const handleGeolocation = (e) => {
    if (isMounted.current) {
      setLocation({
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
        speed: e.coords.speed
      });
    }
  };

  return (
    <>
      <h1>React Hooks intro</h1>
      {/* useState */}

      <h3>Counter</h3>
      <button onClick={incrementCount}>I was clicked {count} times</button>

      <h3>Toggle Light</h3>
      <div style={{ display: "flex" }}>
        <img
          src={isOn ? "https://icon.now.sh/highlight/fd0" : "https://icon.now.sh/highlight/aaa"}
          style={{
            height: "50px",
            width: "50px"
          }}
          alt="Flashlight"
          onClick={toggleLight}
        />

        <div
          style={{
            height: "50px",
            width: "50px",
            background: isOn ? "yellow" : "grey"
          }}
          onClick={toggleLight}
        />
      </div>

      {/* useEffect */}

      <h3>Mouse Position</h3>
      {JSON.stringify(mousePosition, null, 2)}

      <h3>Network status</h3>
      <p>
        You are <strong>{status ? "online" : "offline"}</strong>
      </p>

      <h3>Geolocation</h3>
      <p>Latitude is {latitude ? latitude : "No access"}</p>
      <p>Longitude is {longitude ? longitude : "No access"}</p>
      <p>Your speed is {speed ? speed : "0"}</p>

      <Login />
      <Register />
    </>
  );
};

export default App;

/*
лампочка может тупить, так как делаются запросы на now.sh, лучше просто расположить иконки локально (это просто пример)
*/
