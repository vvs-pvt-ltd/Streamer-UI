import React from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const SwitchComp = ({ id, title, state, setState }) => {
  const handleChange = (e) => {
    setState(e);
  };
  return (
    <div className="flex items-center mt-6 gap-3">
      <Switch
        id={id}
        checked={state}
        onCheckedChange={(e) => handleChange(e)}
      />
      <Label htmlFor={id}>{title}</Label>
    </div>
  );
};

export default SwitchComp;
