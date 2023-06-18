import React from "react";

const Weather = (props) => {
  const { current, forecast, location } = props.weather;
  const [textSize, setTextSize] = React.useState(0.5);
  const [fSize, setFSize] = React.useState(1);

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
          style={{
            fontSize: `${textSize * (1.75 * fSize)}rem`,
            textShadow: `1px 1px 2px rgba(0,0,0,.4)`,
          }}
        >
          +{e.hour}hr
        </p>
        <img className="w-1/2 h-auto" src={"https:" + e.icon} alt="" />
      </div>
    ) : null;
  };

  const onRequest = () => {
    props.weatherRequest();
  };

  return (
    <div
      className="absolute w-1/5 h-1/3 right-5 text-white top-1/3 rounded-xl flex opacity-90 overflow-hidden items-center"
      style={{
        border: `2px solid rgba(255,255,255,.6)`,
        backgroundColor: `${
          props.backgroundId === 2 || props.backgroundId === 4
            ? "rgba(0,0,0,.2)"
            : "rgba(0,0,0,.1)"
        }`,
      }}
    >
      <div className="absolute top-0 flex items-center w-full h-1/6 pl-2">
        <img
          onClick={onRequest}
          style={{ height: "2vh" }}
          className="boxRotate-anim w-auto"
          src="./assets/icons/refresh.png"
          alt=""
        />
        <p
          style={{ fontSize: `${0.9 * (1 * fSize)}rem` }}
          className="font-thin pl-1"
        >
          {props.errMessage}
        </p>
      </div>
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
              className="font-semibold opacity-90"
              style={{
                fontSize: `${textSize * (10 * fSize)}rem`,
                textShadow: `1px 1px 2px rgba(0,0,0,.4)`,
              }}
            >
              {props.weather.current.temp_c}°
            </p>
          </div>
        </div>
        <div className="w-full h-1/2">
          <p
            className="text-right font-medium pt-2 pr-8 opacity-90"
            style={{
              fontSize: `${textSize * (3.5 * fSize)}rem`,
              textShadow: `1px 1px 2px rgba(0,0,0,.4)`,
            }}
          >
            {current.condition.text}
          </p>
          <p
            className="text-right font-light pr-8"
            style={{
              textShadow: `1px 1px 2px rgba(0,0,0,.4)`,
            }}
          >
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
