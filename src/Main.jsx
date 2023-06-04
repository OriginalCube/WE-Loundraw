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
  const [TWeather, setTWeather] = React.useState(true);
  const [clock, setClock] = React.useState(true);
  const [fontSize, setFontSize] = React.useState(1);
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
    setVisualizer(!visualizer);
  };

  const onPlayer = () => {
    setPlayer(!player);
  };

  const onWeather = () => {
    setTWeather(!TWeather);
  };

  const onClock = () => {
    setClock(!clock);
  };

  //Weather Request
  const weatherRequest = async () => {
    const weatherData = await axios.get(
      "https://api.weatherapi.com/v1/forecast.json?key=9240155493f04f5994181506230206&q=Manila&days=1&aqi=no&alerts=no"
    );
    setWeather(weatherData);
  };

  React.useEffect(() => {
    localStorage.setItem("tempWeather", JSON.stringify(weather));
  }, [weather]);

  React.useEffect(() => {
    if (window.innerWidth < 1390) {
      setFontSize(0.75);
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
