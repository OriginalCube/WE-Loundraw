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
  const [weather, setWeather] = React.useState(
    JSON.parse(localStorage.getItem("tempWeather"))
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

  //Weather Request
  const weatherRequest = async () => {
    const weatherData = await axios.get(
      "https://api.weatherapi.com/v1/forecast.json?key=9240155493f04f5994181506230206&q=Manila&days=1&aqi=no&alerts=no"
    );
    localStorage.setItem("tempWeather", JSON.stringify(weatherData));
  };

  const readWeather = async () => {
    console.log(await weather);
  };

  React.useEffect(() => {
    // weatherRequest();
    readWeather();
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
      <Weather weather={weather} />
      <Navigation
        onCanvas={onCanvas}
        canvasId={canvasId}
        onPlayer={onPlayer}
        onVisualizer={onVisualizer}
        onBackground={onBackground}
      />
      <Clock />
      {player ? <Player /> : null}
    </div>
  );
};

export default Main;
