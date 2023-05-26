import React from "react";

const Player = () => {
  return (
    <div
      className="h-1/6 w-1/4 absolute flex flex-col bottom-14 "
      style={{ left: "36.6%" }}
    >
      <div className="w-full h-1/2">
        <input
          type="range"
          className="w-5/6 relative m-auto"
          style={{ left: "8.3%", top: "72%" }}
        />
      </div>
      <div className="w-full h-1/5 text-white font-thin">
        <p className="text-center">Random Song Name</p>
      </div>
      <div className="border-2 border-white flex w-full h-1/2 relative">
        <div className="">
          <img
            className="opacity-90"
            style={{ height: "8vh", width: "8vw" }}
            src=""
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
