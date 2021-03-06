import React, { useState, useEffect, useRef } from "react";
import Login from "./Login";
import Register from "./Register";
import News from "./News";

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
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    document.title = `You have clicked ${count} times`;
    // listen event
    window.addEventListener("mousemove", handleMouseMove);
    // listen multiple events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    navigator.geolocation.getCurrentPosition(handleGeolocation, handleErrorGeolocation, {});
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

  const handleGeolocation = (position) => {
    if (isMounted.current) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed
      });
    }
  };

  const handleErrorGeolocation = (error) => {
    if (isMounted.current) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <>
      <h1>React Hooks intro</h1>
      {/* useState */}

      <h3 className="m-2">Counter</h3>
      <button onClick={incrementCount} className="bg-orange rounded m-1 p-1">
        I was clicked {count} times
      </button>

      <h3 className="m-2">Toggle Light</h3>
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

      <h3 className="m-2">Mouse Position</h3>
      {JSON.stringify(mousePosition, null, 2)}

      <h3 className="m-2">Network status</h3>
      <p>
        You are <strong>{status ? "online" : "offline"}</strong>
      </p>

      <h3 className="m-2">Geolocation</h3>
      <p>Latitude is {latitude ? latitude : error ? error.message : "No access"}</p>
      <p>Longitude is {longitude ? longitude : error ? error.message : "No access"}</p>
      <p>Your speed is {speed ? speed : "0"}</p>

      <Login />
      <Register />
      <News />
    </>
  );
};

export default App;

/*
лампочка может тупить, так как делаются запросы на now.sh, лучше просто расположить иконки локально (это просто пример)
Geolocation API  -> https://webplatformcourse.com/preview/9-geolocation-api/
*/
