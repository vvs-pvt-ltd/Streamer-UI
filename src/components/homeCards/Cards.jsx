import React from "react";

const Cards = ({ item, key, index }) => {
  return (
    <div key={index} className="rounded-[30px] overflow-hidden bg-[#E2E2E2]">
      <img src={item.video.thumbnail} alt={item.video.title} />
      <div className="p-6 pb-12 grid gap-6">
        <p className="text-xl font-bold">{item.video.title}</p>
        <div className="flex items-center gap-3">
          <img
            src={`https://randomuser.me/api/portraits/men/${index + 1}.jpg`}
            alt={item.video.title}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">Kashvi</p>
            <p>@kasshviplays</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
