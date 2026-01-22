import React, { useState, useEffect } from "react";

import MenuCard from "../../Components/MenuCard";
import InsideHeader from "../user/InsideHeader";
import Sidebar from "../../Components/SideBar";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const AdminHome = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const confirmPaymentRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
    useEffect(() => {
    if (location.state?.refresh) {
      setRefresh((prev) => !prev); // 🔥 THIS IS KEY
    }
  }, [location.state]);

  return (
    <div>
      <InsideHeader setOpen={setOpen} />
      <Sidebar setOpen={setOpen} open={open} role="admin" />

      <div className="mt-8 p-4 px-4"></div>
      <MenuCard refresh={refresh} setRefresh={setRefresh} role="admin" />
    </div>
  );
};

export default AdminHome;


