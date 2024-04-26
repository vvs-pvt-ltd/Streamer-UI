import React from "react";

const InputComp = ({ value, setValue, placeholder }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      className="px-4 py-4 rounded-lg w-full border col-span-2"
    />
  );
};

export default InputComp;
