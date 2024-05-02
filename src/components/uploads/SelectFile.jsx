import React from "react";
import { Input } from "../ui/input";

const SelectFile = ({ handleFileChange }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Input type="file" onChange={handleFileChange} className="max-w-xs" />
    </div>
  );
};

export default SelectFile;
