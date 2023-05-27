import React from "react";
import SongData from "../Data.json";

const Player = () => {
  //Music Integration
  const songData = SongData["SongData"];
  const [songId, setSongId] = React.useState(
    Math.floor(Math.random() * songData.length - 1)
  );
  const [songName, setSongName] = React.useState("");
  const [volume, setVolume] = React.useState(0.3);
  const [isPlaying, setPlaying] = React.useState(false);
  const [trackProgress, setProgress] = React.useState(0);
  const [replay, setReplay] = React.useState(false);
  const [shuffle, setShuffle] = React.useState(false);
  const intervalRef = React.useRef();
  const audioRef = React.useRef(new Audio());
  const isReady = React.useRef(true);
  const { duration } = audioRef.current;

  const onPlay = () => {
    setPlaying(!isPlaying);
  };

  const onSkip = () => {
    if (songId + 1 < songData.length) {
      setSongId(songId + 1);
    } else {
      setSongId(0);
    }
  };

  const onPrev = () => {
    if (songId - 1 >= 0) {
      setSongId(songId - 1);
    } else {
      setSongId(songData.length - 1);
    }
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        //skip
      } else {
        setProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    setPlaying(false);
    startTimer();
  };

  React.useEffect(() => {
    audioRef.current.volume = volume;
    localStorage.setItem("volume", volume);
  }, [volume]);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      startTimer();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  React.useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(`${songData[songId].file}`);
    setSongName(songData[songId].name);
    audioRef.current.volume = volume;
    if (isReady.current) {
      audioRef.current.play();
      setPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
    setPlaying(audioRef.isPlaying);
  }, [songId]);

  React.useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className="h-1/6 w-1/4 absolute flex flex-col bottom-14 "
      style={{ left: "36.6%" }}
    >
      <div className="w-full h-1/2">
        <input
          type="range"
          className="w-full relative m-auto"
          style={{ top: "72%" }}
          step="1"
          min="0"
          value={trackProgress}
          max={duration ? duration : `${duration}`}
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
        />
      </div>
      <div className="w-full h-1/5 text-white font-thin">
        <p className="text-center">{songName}</p>
      </div>
      <div className="flex w-full h-1/2 relative items-center justify-items-start">
        <div className="w-full">
          <img
            className="opacity-90 object-contain "
            style={{ height: "3vh", width: "3vw" }}
            src="./assets/icons/replay.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            onClick={onPrev}
            className="opacity-90 object-contain "
            style={{ height: "3vh", width: "3vw" }}
            src="./assets/icons/volumeMinus.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            className="opacity-90 object-contain"
            style={{ height: "3vh", width: "3vw" }}
            src="./assets/icons/prev.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            onClick={onPlay}
            className="opacity-90 object-contain"
            style={{ height: "4vh", width: "4vw" }}
            src={`./assets/icons/${!isPlaying ? "pause" : "play"}.png`}
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            onClick={onSkip}
            className="opacity-90 object-contain"
            style={{ height: "3vh", width: "3vw" }}
            src="./assets/icons/next.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            className="opacity-90 object-contain"
            style={{ height: "3vh", width: "3vw" }}
            src="./assets/icons/volumePlus.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            className="opacity-90 object-contain"
            style={{ height: "3vh", width: "3vw" }}
            src="./assets/icons/shuffle.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
