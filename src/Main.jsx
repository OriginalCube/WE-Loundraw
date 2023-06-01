import React from "react";
import Visualizer from "./components/Visualizer";
import Player from "./components/Player";
import MainData from "./Data.json";
import Navigation from "./components/Navigation";
import AudioVisualizer from "./components/AudioVisualizer";

const Main = () => {
  const [canvasId, setCanvasId] = React.useState(1);
  const [visualizer, setVisualizer] = React.useState(true);
  const [backgroundId, setBackgroundId] = React.useState(1);
  const [player, setPlayer] = React.useState(true);
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
      <Navigation
        onCanvas={onCanvas}
        canvasId={canvasId}
        onPlayer={onPlayer}
        onVisualizer={onVisualizer}
        onBackground={onBackground}
      />
      {player ? <Player /> : null}
    </div>
  );
};

export default Main;
