import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = React.useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token → redirect to login
    if (!token) {
      navigate("/");
      return;
    }

    // Verify token
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, []); // Empty array => runs only once

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>; // Important!
};

export default UserProtectedWrapper;
