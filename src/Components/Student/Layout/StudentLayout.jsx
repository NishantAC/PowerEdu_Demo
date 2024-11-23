import React from "react";
import { Navigate } from "react-router-dom"; // Updated for React Router v6
import { useSelector } from "react-redux";
import Routes from "../Sidebar/Routes";

export default function Student() {
  const { user } = useSelector((state) => state.user);

  // Redirect unauthenticated users to the home page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Routes />
    </div>
  );
}
