import { Button } from "../components/ui/button";
import AvatarImg from "../assets/img/avatar.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Link, useNavigate } from "react-router-dom";

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
        {user.authenticated ? (
          <div className="grid gap-2">
            <a href={`/${user.username}`}>
              <Button variant="outline" className="border-none outline-none">
                Profile
              </Button>
            </a>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="grid gap-2">
            <Link to={`/login`}>
              <Button variant="outline" className="border-none outline-none">
                Login
              </Button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
