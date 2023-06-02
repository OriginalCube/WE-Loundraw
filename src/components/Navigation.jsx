import React from "react";

const Navigation = (props) => {
  const [setting, setSetting] = React.useState(false);
  const [uiVolume, setUiVolume] = React.useState(0.5);

  let audioPlayer = new Audio();

  const canvasData = ["water", "broom"];

  const onSound = (e) => {
    if (e === 1) {
      audioPlayer.src = "./assets/sounds/keypress.mp3";
    } else {
      audioPlayer.src = "./assets/sounds/notes.mp3";
    }
    audioPlayer.volume = uiVolume;
    audioPlayer.play();
  };

  const onVisualizer = () => {
    props.onVisualizer();
    onSound(1);
  };

  const onPlayer = () => {
    props.onPlayer();
    onSound(1);
  };

  const customBg = () => {
    props.onBackground();
    onSound(1);
  };

  const onRemoveVis = () => {
    props.onCanvas();
    onSound(1);
  };

  const onSetting = () => {
    setSetting(!setting);
    onSound(0);
  };

  return (
    <>
      <img
        onClick={onSetting}
        src="./assets/icons/setting.png"
        alt=""
        className="navigation-icon z-10"
      />
      {setting ? (
        <div className="z-0 navigation-icon-container flex justify-center items-center">
          <div className="h-full w-4/5 m-auto overflow-visible flex justify-center items-center">
            <img
              onClick={onPlayer}
              src="./assets/icons/headphones.png"
              alt=""
            />
          </div>
          <div className="h-full w-full flex justify-center items-center">
            <img onClick={onVisualizer} src="./assets/icons/sound.png" alt="" />
          </div>
          <div className="h-full w-full flex justify-center items-center">
            <img
              onClick={customBg}
              src="./assets/icons/background.png"
              alt=""
            />
          </div>
          <div className="h-full w-full flex justify-center items-center">
            <img
              onClick={onRemoveVis}
              src={`./assets/icons/${canvasData[props.canvasId]}.png`}
              alt=""
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navigation;
