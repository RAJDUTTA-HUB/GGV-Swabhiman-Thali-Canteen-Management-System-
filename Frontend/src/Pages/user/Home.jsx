import React, { useState } from "react";
import Header from "../../Components/Header";
import MenuCard from "../../Components/MenuCard";
import InsideHeader from "./InsideHeader";
import Sidebar from "../../Components/SideBar";
import { useRef } from "react";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const confirmPaymentRef = useRef();

  return (
    <div>
      <InsideHeader setOpen={setOpen} />
      <Sidebar setOpen={setOpen} open={open} />

      <div className="mt-6 p-4 px-4">
        
      </div>
      <MenuCard />
    </div>
  );
};

export default Home;
