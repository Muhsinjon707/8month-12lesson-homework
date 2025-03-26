import React from "react";

const Nothing = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-1/2">
        <div className="flex h-[350px] w-[600px] flex-col items-center justify-center gap-10 rounded-xl border-10 bg-white">
          <img src="./sticker-animation.gif" alt="Lively sticker" />
          <h2 className="font-bold">Nothing here yet.</h2>
        </div>
      </div>
    </>
  );
};

export default Nothing;
