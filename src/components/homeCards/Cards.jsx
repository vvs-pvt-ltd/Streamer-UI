import React from "react";

const Cards = ({ item, key, index }) => {
  return (
    <div
      key={index}
      className="rounded-[30px] overflow-hidden h-[350px] bg-[#E2E2E2] relative"
    >
      <div className="aspect-video">
        <img src={item.thumbnail} className="h-full w-full" alt={item.title} />
      </div>
      <div className="p-6 pb-4 grid gap-6">
        <p className="text-xl font-bold">{item.title}</p>
        <div className="flex items-center gap-3 absolute bottom-0 pb-6">
          <img
            src={item.thumbnail}
            alt={item.title}
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
