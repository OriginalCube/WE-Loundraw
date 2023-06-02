import React from "react";

const Weather = (props) => {
  const { current, forecast, location } = props.weather.data;
  const [textSize, setTextSize] = React.useState(0.5);
  React.useEffect(() => {
    console.log(forecast.forecastday[0].hour);
  }, []);

  const HourWeather = (e) => {
    return e.hour % 6 === 0 ? (
      <div className="flex justify-around items-center w-full h-1/4">
        <p className="font-light" style={{ fontSize: `${textSize * 2}rem` }}>
          {e.hour}hr
        </p>
        <img className="w-1/2 h-auto" src={e.icon} alt="" />
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
                src={`${current.condition.icon}`}
                alt=""
              />{" "}
            </div>
          </div>
          <div className="w-full h-full">
            <p
              className="font-semibold"
              style={{ fontSize: `${textSize * 10}rem` }}
            >
              {current.temp_c}°
            </p>
          </div>
        </div>
        <div className="w-full h-1/2">
          <p
            className="text-right font-medium pt-2 pr-8"
            style={{ fontSize: `${textSize * 3.5}rem` }}
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
          <HourWeather icon={e.condition.icon} hour={index} />
        ))}
      </div>
    </div>
  );
};

export default Weather;