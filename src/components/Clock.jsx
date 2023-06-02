import React from "react";

const Clock = (props) => {
  const [hour, setHour] = React.useState("00");
  const [minute, setMinute] = React.useState("0");
  const [second, setSecond] = React.useState("");
  const [textSize, setTextSize] = React.useState(0.75);
  React.useEffect(() => {
    setInterval(() => {
      let currentTime = new Date();
      setHour(currentTime.getHours());
      setMinute(currentTime.getMinutes());
      setSecond(currentTime.getSeconds());
    }, 1000);
  }, []);

  return (
    <div className="absolute top-5 right-12 opacity-90">
      <p
        className={`opacity-80`}
        style={{
          color: `white`,
          textShadow: `2px 2px 4px rgba(255,255,255,.4)`,
          fontSize: `${textSize * 10}rem`,
        }}
      >
        {hour + ":"}
        {minute > 9 ? minute : "0" + minute}
        <span
          className={`relative`}
          style={{
            fontSize: `${(textSize / 2.5) * 10}rem`,
            bottom: "-1.5vh",
            color: `white`,
          }}
        >
          {second > 9 ? second : "0" + second}
        </span>
      </p>
    </div>
  );
};

export default Clock;
