import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const AdminProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { admin, setAdmin } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/admin/admin-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdmin(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/admin-login");
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AdminProtectedWrapper;
