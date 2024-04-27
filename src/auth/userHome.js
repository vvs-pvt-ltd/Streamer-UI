import { Outlet, Navigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const PrivateRoutes = () => {
  const [{ user }] = useStateValue();

  let auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
