import React from "react";
import Visualizer from "./components/Visualizer";
import Player from "./components/Player";

const Main = () => {
  const [canvasId, setCanvasId] = React.useState(0);

  const onCanvas = () => {
    if (canvasId + 1 <= 3) {
      setCanvasId(canvasId + 1);
    } else {
      setCanvasId(0);
    }
  };

  React.useEffect(() => {
    console.log(canvasId);
  }, [canvasId]);

  return (
    <div className="h-full w-full">
      <img
        className="absolute w-full h-full object-cover"
        src="./assets/background/blue-1-b.png"
        alt=""
      />
      <div className="absolute h-screen w-screen bg-blue-800 opacity-20"></div>
      {canvasId !== 0 ? <Visualizer canvasId={canvasId} /> : null}
      <img
        className="absolute w-full h-full object-cover"
        src="./assets/foreground/blue-1-f.png"
        alt=""
      />
      <Player />
    </div>
  );
};

export default Main;
