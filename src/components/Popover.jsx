import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import AvatarImg from "../assets/img/avatar.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { useNavigate } from "react-router-dom";

export function PopoverDemo() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const logoutObj = {
    AccessToken: null,
    RefreshToken: null,
    email: null,
    username: null,
    _id: null,
    authenticated: false,
  };

  const handleLogout = () => {
    dispatch({
      type: actionType.SET_USER,
      user: logoutObj,
    });

    localStorage.setItem("user", JSON.stringify(logoutObj));
    navigate("/login");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <img src={AvatarImg} alt="avatar" className="w-11 h-11 rounded-full" />
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        {user.authenticated && (
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        )}

        {/* <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div> */}
      </PopoverContent>
    </Popover>
  );
}
