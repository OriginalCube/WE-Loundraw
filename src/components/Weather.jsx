import React from "react";
import MainData from "../Data.json";

const Weather = (props) => {
  const { current, forecast, location } = props.weather;
  const [textSize, setTextSize] = React.useState(0.5);
  const [fSize, setFSize] = React.useState(1);

  React.useEffect(() => {
    console.log(props.weather);
  }, [props.weather]);

  React.useEffect(() => {
    const tempDate = new Date(props.weather.current.last_updated);
    const checker = Math.abs(tempDate.getHours() - new Date().getHours());
    if (checker >= 2) {
      props.weatherRequest();
      console.log("Updated Weather.");
    } else {
      console.log("Weather is up to date.");
    }
    if (window.innerHeight < 800) {
      setFSize(0.75);
    }
  }, []);

  const HourWeather = (e) => {
    return e.hour % 6 === 0 ? (
      <div className="flex justify-around items-center w-full h-1/4">
        <p
          className="font-light"
          style={{ fontSize: `${textSize * (1.75 * fSize)}rem` }}
        >
          +{e.hour}hr
        </p>
        <img className="w-1/2 h-auto" src={"https:" + e.icon} alt="" />
      </div>
    ) : null;
  };

  return (
    <div
      className="absolute w-1/5 h-1/3 right-5 text-white top-1/3 rounded-xl flex opacity-90 overflow-hidden items-center"
      style={{
        border: `2px solid rgba(255,255,255,.6)`,
        backgroundColor: `rgba(255,255,255,.1)`,
      }}
    >
      <div className="h-5/6 w-3/4 flex-col">
        <div className="w-5/6 m-auto h-1/2 flex justify-center items-baseline">
          <div className="w-full h-full flex items-end justify-center">
            <div className="">
              <img
                className="justify-center items-center opacity-90"
                src={`https:${current.condition.icon}`}
                alt=""
              />{" "}
            </div>
          </div>
          <div className="w-full h-full">
            <p
              className="font-semibold"
              style={{ fontSize: `${textSize * (10 * fSize)}rem` }}
            >
              {props.weather.current.temp_c}°
            </p>
          </div>
        </div>
        <div className="w-full h-1/2">
          <p
            className="text-right font-medium pt-2 pr-8"
            style={{ fontSize: `${textSize * (3.5 * fSize)}rem` }}
          >
            {current.condition.text}
          </p>
          <p className="text-right font-light pr-8">
            {location.name}, {location.country}
          </p>
        </div>
      </div>
      <div
        className="h-5/6 w-1/4 flex-col items-center justify-center"
        style={{ borderLeft: `2px solid rgba(255,255,255,.6)` }}
      >
        {forecast.forecastday[0].hour.map((e, index) => (
          <HourWeather key={index} icon={e.condition.icon} hour={index} />
        ))}
      </div>
    </div>
  );
};

export default Weather;
