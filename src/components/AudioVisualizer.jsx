import React from "react";

const AudioVisualizer = (props) => {
  const canvasRef = React.useRef(null);
  const [playerColor, setPlayerColor] = React.useState("255,255,255");
  const [playerOpacity, setPlayerOpacity] = React.useState(0.5);

  React.useEffect(() => {
    try {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * 0.25;
      canvas.height = window.innerHeight * 0.25;
      let ctx = canvas.getContext("2d");
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
      window.wallpaperRegisterAudioListener(wallpaperAudioListener);
    } catch (e) {
      console.log("vis error");
    }
  }, [playerColor, playerOpacity]);
  return (
    <canvas
      ref={canvasRef}
      className="absolute overflow-visible"
      style={{
        left: "37.5%",
        top: "62%",
        borderBottom: "2px solid rgba(255,255,255,.2)",
      }}
    />
  );
};

export default AudioVisualizer;
