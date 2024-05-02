import { useStateValue } from '../context/StateProvider';
import React from 'react'
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const [{ user }] = useStateValue();
  let location = useLocation();

  if (!user.authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children

};

export default ProtectedRoute;