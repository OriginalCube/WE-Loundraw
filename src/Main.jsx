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
  const [player, setPlayer] = React.useState(true);
  const [apiKey, setApiKey] = React.useState("9240155493f04f5994181506230206");
  const [city, setCity] = React.useState("Manila");
  const [TWeather, setTWeather] = React.useState(true);
  const [clock, setClock] = React.useState(true);
  const [errMessage, setErrMessage] = React.useState("");
  const [fontSize, setFontSize] = React.useState(1);
  const [localData, setLocalData] = React.useState();
  const [weather, setWeather] = React.useState(
    localStorage.getItem("tempWeather")
      ? JSON.parse(localStorage.getItem("tempWeather"))
      : MainData["tempWeather"].data
  );
  const imageData = MainData["ImageData"];

  const onCanvas = () => {
    let tempData = 0;
    if (canvasId + 1 <= 3) {
      setCanvasId(canvasId + 1);
      tempData = canvasId + 1;
    } else {
      setCanvasId(0);
    }
    changeSetting("canvas", tempData);
  };

  const onBackground = () => {
    let tempData = 0;
    if (backgroundId < imageData.length - 1) {
      setBackgroundId(backgroundId + 1);
      tempData = backgroundId + 1;
    } else {
      setBackgroundId(0);
    }
    changeSetting("backgroundId", tempData);
  };

  const onVisualizer = () => {
    changeSetting("visualizer", !visualizer);
    setVisualizer(!visualizer);
  };

  const onPlayer = () => {
    changeSetting("player", !player);
    setPlayer(!player);
  };

  const onWeather = () => {
    changeSetting("weather", !TWeather);
    setTWeather(!TWeather);
  };

  const onClock = () => {
    changeSetting("clock", !clock);
    setClock(!clock);
  };

  const changeSetting = (x, y) => {
    const tempData = localData;
    tempData[x] = y;
    setLocalData(tempData);
    localStorage.setItem("loundraw-05", JSON.stringify(tempData));
  };

  //Weather Request
  const weatherRequest = async () => {
    try {
      const weatherData = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`
      );
      if (weatherData) {
        setWeather(weatherData.data);
        setErrMessage("");
        console.log("Fetched New Weather Data.");
      }
    } catch (err) {
      setErrMessage(err.response.data.error.message);
      console.log(err.response.data.error.message);
    }
  };

  const resetData = () => {
    localStorage.setItem(
      "loundraw-05",
      JSON.stringify(MainData["loundraw-05"])
    );
    setPlayer(true);
    setVisualizer(true);
    setTWeather(true);
    setClock(true);
    setCanvasId(1);
  };

  const readWeather = () => {
    const currentDate = new Date().getHours();
    const weatherDate = new Date(weather.current.last_updated).getHours();
    if (Math.abs(currentDate - weatherDate) > 2) {
      weatherRequest();
    } else {
      console.log("Current weather is up to date.");
    }
  };

  React.useEffect(() => {
    localStorage.setItem("tempWeather", JSON.stringify(weather));
  }, [weather]);

  React.useEffect(() => {
    readWeather();
    if (window.innerWidth < 1390) {
      setFontSize(0.75);
    }
    try {
      if (localStorage.getItem("loundraw-05")) {
        const localSetting = JSON.parse(localStorage.getItem("loundraw-05"));
        setLocalData(localSetting);
        setPlayer(localSetting.player);
        setVisualizer(localSetting.visualizer);
        setClock(localSetting.clock);
        setBackgroundId(localSetting.backgroundId);
        setTWeather(localSetting.weather);
        setCanvasId(localSetting.canvas);
      } else {
        resetData();
      }
    } catch (err) {
      resetData();
    }
  }, []);

  window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
      if (properties.apikey) {
        setApiKey(properties.apikey.value);
      }
      if (properties.inputcity) {
        setCity(properties.inputcity.value);
      }
    },
  };

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
