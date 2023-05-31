import React from "react";
import SongData from "../Data.json";

const Player = (props) => {
  //Music Integration
  const songData = SongData["SongData"];
  const [songId, setSongId] = React.useState(
    Math.floor(Math.random() * (songData.length - 1))
  );
  const [songName, setSongName] = React.useState("");
  const [volume, setVolume] = React.useState(
    localStorage.getItem("volume") !== null
      ? +localStorage.getItem("volume")
      : 0.2
  );
  const [isPlaying, setPlaying] = React.useState(false);
  const [trackProgress, setProgress] = React.useState(0);
  const [replay, setReplay] = React.useState(false);
  const [shuffle, setShuffle] = React.useState(false);
  const intervalRef = React.useRef();
  const audioRef = React.useRef(new Audio());
  const isReady = React.useRef(true);
  const { duration } = audioRef.current;

  let keypress = new Audio();
  const clickAudio = (e) => {
    keypress.src = `./assets/sounds/${e === 0 ? "keypress" : "notes"}.mp3`;
    keypress.volume = 0.3;
    keypress.play();
  };

  const onPlay = () => {
    setPlaying(!isPlaying);
    clickAudio(1);
  };

  const onSkip = () => {
    if (songId + 1 < songData.length) {
      setSongId(songId + 1);
    } else {
      setSongId(0);
    }
    clickAudio(0);
  };

  const onPrev = () => {
    if (songId - 1 >= 0) {
      setSongId(songId - 1);
    } else {
      setSongId(songData.length - 1);
    }
    clickAudio(0);
  };

  const addVolume = () => {
    if (volume >= 0 && volume + 0.1 <= 1) {
      setVolume(volume + 0.1);
    }
    clickAudio(0);
  };

  const lessVolume = () => {
    if (volume - 0.1 > 0) {
      setVolume(Math.round((volume - 0.1) * 10) / 10);
    } else {
      setVolume(0);
    }
    clickAudio(0);
  };

  const onReplay = () => {
    setReplay(!replay);
    clickAudio(0);
  };

  const onShuffle = () => {
    setShuffle(!shuffle);
    clickAudio(0);
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        onSkip();
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
    audioRef.current.volume = 0 + volume;
    localStorage.setItem("volume", volume);
    console.log(props.volume);
  }, [volume, props.volume]);

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
    audioRef.current.volume = 0 + volume;
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
      className="h-36 w-1/4 absolute flex flex-col bottom-10"
      style={{ left: "36.6%" }}
    >
      <div className="w-full h-1/2">
        <input
          type="range"
          className="w-full relative m-auto"
          style={{ top: "60%" }}
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
      <div className="flex w-5/6 m-auto h-1/2 relative items-center justify-center">
        <div className="w-full">
          <img
            onClick={onReplay}
            className="opacity-90 m-auto object-contain "
            style={{ height: "2vh", width: "2vw" }}
            src={`./assets/icons/${!replay ? "replay" : "replayToggle"}.png`}
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            onClick={lessVolume}
            className="opacity-90 object-contain  m-auto"
            style={{ height: "2vh", width: "2vw" }}
            src="./assets/icons/volumeMinus.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            onClick={onPrev}
            className="opacity-90 object-contain m-auto"
            style={{ height: "2vh", width: "2vw" }}
            src="./assets/icons/prev.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            onClick={onPlay}
            className="opacity-90 object-contain m-auto"
            style={{ height: "3vh", width: "3vw" }}
            src={`./assets/icons/${!isPlaying ? "pause" : "play"}.png`}
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            onClick={onSkip}
            className="opacity-90 object-contain m-auto"
            style={{ height: "2vh", width: "2vw" }}
            src="./assets/icons/next.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            onClick={addVolume}
            className="opacity-90 object-contain m-auto"
            style={{ height: "2vh", width: "2vw" }}
            src="./assets/icons/volumePlus.png"
            alt=""
          />
        </div>
        <div className="w-full">
          <img
            onClick={onShuffle}
            className="opacity-90 object-contain m-auto"
            style={{ height: "2vh", width: "2vw" }}
            src={`./assets/icons/${!shuffle ? "shuffle" : "shuffleToggle"}.png`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
