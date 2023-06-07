import React from "react";
import Visualizer from "./components/Visualizer";
import Player from "./components/Player";
import MainData from "./Data.json";
import Navigation from "./components/Navigation";
import AudioVisualizer from "./components/AudioVisualizer";
import Clock from "./components/Clock";
import axios from "axios";
import Weather from "./components/Weather";

const Main = () => {
  const [canvasId, setCanvasId] = React.useState(1);
  const [visualizer, setVisualizer] = React.useState(true);
  const [backgroundId, setBackgroundId] = React.useState(1);
  const [city, setCity] = React.useState("Tokyo");
  const [player, setPlayer] = React.useState(true);
  const [TWeather, setTWeather] = React.useState(true);
  const [clock, setClock] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(1);
  const [errMessage, setErrMessage] = React.useState("");
  const [localData, setLocalData] = React.useState({});
  const [apiKey, setApiKey] = React.useState("9240155493f04f5994181506230206");
  const [weather, setWeather] = React.useState(
    localStorage.getItem("tempWeather")
      ? JSON.parse(localStorage.getItem("tempWeather"))
      : MainData.tempWeather
  );
  const imageData = MainData["ImageData"];

  const onCanvas = () => {
    if (canvasId + 1 <= 3) {
      setCanvasId(canvasId + 1);
    } else {
      setCanvasId(0);
    }
  };

  const onBackground = () => {
    if (backgroundId < imageData.length - 1) {
      setBackgroundId(backgroundId + 1);
    } else {
      setBackgroundId(0);
    }
  };

  const onVisualizer = () => {
    setSetting("visualizer", !visualizer);
    setVisualizer(!visualizer);
  };

  const onPlayer = () => {
    setSetting("player", !player);
    setPlayer(!player);
  };

  const onWeather = () => {
    setSetting("weather", !TWeather);
    setTWeather(!TWeather);
  };

  const onClock = () => {
    setSetting("clock", !clock);
    setClock(!clock);
  };

  const setSetting = (x, y) => {
    localData({ ...localData, [x]: y });
    localData.setItem("loundraw-05", JSON.stringify(localData));
    setLocalData(localData);
  };

  //Weather Request
  const weatherRequest = async () => {
    try {
      const weatherData = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`
      );
      if (weatherData) {
        // setWeather(JSON.parse(weatherData));
        setErrMessage("");
      }
    } catch (err) {
      setErrMessage(err.response.data.error.message);
      console.log(err.response.data.error.message);
    }
    console.log("Weather Requested");
  };

  try {
    window.wallpaperPropertyListener = {
      applyUserProperties: function (properties) {
        if (properties.inputcity) {
          setCity(properties.inputcity.value);
        }

        if (properties.apikey) {
          setApiKey(properties.apikey.value);
        }
      },
    };
  } catch (err) {}

  React.useEffect(() => {
    console.log(city);
  }, [city]);

  React.useEffect(() => {
    localStorage.setItem("tempWeather", JSON.stringify(weather));
  }, [weather]);

  const resetData = () => {
    localStorage.setItem(
      "loundraw-05",
      JSON.stringify(MainData["loundraw-05"])
    );
    setPlayer(true);
    setVisualizer(true);
    setWeather(true);
    setCanvasId(1);
    setLocalData(MainData["loundraw-05"]);
  };

  React.useEffect(() => {
    if (window.innerWidth < 1390) {
      setFontSize(0.75);
    }
    try {
      if (!localStorage.getItem("loundraw-05")) {
        resetData();
      } else {
        const tempData = JSON.parse(localStorage.getItem("loundraw-05"));
        setLocalData(tempData);
        setPlayer(localData.player);
        setVisualizer(localData.visualizer);
        setWeather(localData.weather);
        setCanvasId(localData.canvasId);
      }
    } catch (err) {
      resetData();
    }
  }, []);

  return (
    <div className="h-full w-full">
      <img
        className="absolute w-full h-full object-cover"
        src={`${imageData[backgroundId].background}`}
        alt=""
      />
      <div className="absolute h-screen w-screen bg-blue-800 opacity-20"></div>
      {canvasId !== 0 ? <Visualizer canvasId={canvasId} /> : null}
      <img
        className="absolute w-full h-full object-cover"
        src={`${imageData[backgroundId].foreground}`}
        alt=""
      />
      {visualizer ? <AudioVisualizer /> : null}
      {TWeather ? (
        <Weather
          weatherRequest={weatherRequest}
          fontSize={fontSize}
          weather={weather}
          errMessage={errMessage}
        />
      ) : null}
      <Navigation
        onCanvas={onCanvas}
        canvasId={canvasId}
        onPlayer={onPlayer}
        onVisualizer={onVisualizer}
        onWeather={onWeather}
        onBackground={onBackground}
        onClock={onClock}
      />
      {clock ? <Clock fontSize={fontSize} /> : null}
      {player ? <Player fontSize={fontSize} /> : null}
    </div>
  );
};

export default Main;
