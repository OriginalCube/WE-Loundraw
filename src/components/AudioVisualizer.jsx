import React from "react";

const AudioVisualizer = (props) => {
  const canvasRef = React.useRef(null);
  const canvasRefUnder = React.useRef(null);
  const [pos, setPos] = React.useState(78);
  const [playerColor, setPlayerColor] = React.useState("255,255,255");
  const [playerOpacity, setPlayerOpacity] = React.useState(0.5);

  React.useEffect(() => {
    try {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 0.2;
      canvas.height = window.innerHeight * 0.1;
      const canvas_1 = canvasRefUnder.current;
      canvas_1.width = window.innerWidth * 0.24;
      canvas_1.height = window.innerHeight * 0.1;
      let ctx = canvas.getContext("2d");
      let ctx_1 = canvas_1.getContext("2d");
      function wallpaperAudioListener_1(audioArray) {
        ctx_1.clearRect(0, 0, canvas.width, canvas.height);
        // Render bars along the full width of the canvas
        const whiteSpace = (canvas.width * 0.25) / 36;
        var barWidth = (canvas.width - whiteSpace * 36) / 36;
        // Begin with the left channel in red
        ctx_1.fillStyle = `rgb(${playerColor})`;
        ctx_1.globalAlpha = playerOpacity;
        let tempHeight = canvas.height * 0.65;
        // Iterate over the first 64 array elements (0 - 63) for the left channel audio data
        for (let i = 35; i >= 0; --i) {
          var height = tempHeight * Math.min(audioArray[i], 1);
          ctx_1.beginPath();
          ctx_1.roundRect(
            barWidth * i + i * whiteSpace,
            0,
            barWidth,
            height + 2,
            20
          );
          ctx_1.stroke();
          ctx_1.fill();
        }
      }
      function wallpaperAudioListener(audioArray) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Render bars along the full width of the canvas
        const whiteSpace = (canvas.width * 0.25) / 36;
        var barWidth = (canvas.width - whiteSpace * 36) / 36;
        // Begin with the left channel in red
        ctx.fillStyle = `rgb(${playerColor})`;
        ctx.globalAlpha = playerOpacity;
        let tempHeight = canvas.height * 0.65;
        // Iterate over the first 64 array elements (0 - 63) for the left channel audio data
        for (let i = 35; i >= 0; --i) {
          var height = tempHeight * Math.min(audioArray[i], 1);
          ctx.beginPath();
          ctx.roundRect(
            barWidth * i + i * whiteSpace,
            2 + canvas.height - height + 2,
            barWidth,
            height,
            20
          );
          ctx.stroke();
          ctx.fill();
        }
      }
      if (window.innerHeight < 800) {
        setPos(76.5);
      }
      function dispenser(e) {
        wallpaperAudioListener(e);
        wallpaperAudioListener_1(e);
      }
      window.wallpaperRegisterAudioListener(dispenser);
    } catch (e) {
      console.log("vis error");
    }
  }, [playerColor, playerOpacity]);
  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute overflow-visible"
        style={{
          left: "40%",
          borderBottom: `2px solid rgba(255,255,255,.2)`,
          top: `${pos}%`,
        }}
      />
      <canvas
        ref={canvasRefUnder}
        className="absolute overflow-visible"
        style={{
          left: "40%",
          top: `${pos + 10}%`,
        }}
      />
    </>
  );
};

export default AudioVisualizer;
