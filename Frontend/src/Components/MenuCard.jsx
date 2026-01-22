import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import api from "../utils/axiosInstance";
import ConfirmPayment from "../Pages/user/ConfirmPayment";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";
const MenuCard = ({ role, refresh, setRefresh}) => {
  const [todayMenu, setTodayMenu] = useState([]);
  const [productId, setProductId] = useState("");
  const [confirmPanel, setConfirmPanel] = useState(false);
  const [menuOn, setMenuOn] = useState(false);
  const confirmPanelRef = useRef();
  const { setSelectedProductId } = useContext(ProductContext);
  const getProductId = (id) => {
    setProductId(id);
  };
  const menu = async () => {
    try {
      const response = await api.get("/admin/daily-menu-data");

      setTodayMenu(response.data.products);
      const date = new Date(response.data.products.createdAt);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gsap.set(confirmPanelRef.current, {
      y: "100%",
      opacity: 0,
    });
  }, []);

  useEffect(() => {
    menu();
  }, [refresh]);
  useGSAP(() => {
    if (!confirmPanelRef.current) return;

    gsap.to(confirmPanelRef.current, {
      y: confirmPanel ? 0 : "100%",
      opacity: confirmPanel ? 1 : 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [confirmPanel]);

  return (
    <>
      <h2
        className={`text-2xl font-bold -mt-2 ml-4 text-gray-800 ${
          menuOn ? "hidden" : "block"
        }`}
      >
        Today Menu
      </h2>
      {todayMenu.length === 0 ? (
        <p className="text-xl font-semibold ml-4 mt-6">
          No Menu Found for today
        </p>
      ) : (
        todayMenu.map((m) => (
          <div
            key={m._id}
            className={`mt-6 px-4 flex flex-col transition-all duration-300
    ${menuOn ? "hidden" : "block"}`}
          >
            <div className="flex gap-6">
              <div className="w-[35%]  h-36 rounded-lg">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={m.image}
                  alt=""
                />
              </div>
              <div>
                <h2 className="text-2xl mb-3 font-semibold capitalize text-gray-800">
                  {m.name}
                </h2>
                <p className="text-sm font-semibold text-gray-700">
                  {new Date(m.createdAt).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </p>

                <p className="  text-medium font-medium text-gray-700">
                  {" "}
                  ₹{m.price}
                </p>
                <button
                  onClick={() => {
                    getProductId(m._id);
                    setSelectedProductId(m._id);
                    setConfirmPanel(true);
                    setMenuOn(true);
                  }}
                  className="mt-2 cursor-pointer text-center text-black bg-red-50 block text-lg font-semibold w-28 border-2 border-[#bc2332] py-2  rounded-xl"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      <div
        ref={confirmPanelRef}
        className="fixed w-full bg-white  z-10 bottom-0 translate-y-full p-1 pt-12"
      >
        <ConfirmPayment
          setConfirmPanel={setConfirmPanel}
          setMenuOn={setMenuOn}
          role={role}
          onRefresh={() => setRefresh(prev => !prev)}
        />
      </div>
    </>
  );
};
export default MenuCard;
