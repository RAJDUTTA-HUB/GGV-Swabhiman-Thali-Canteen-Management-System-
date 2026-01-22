import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = ({ open, setOpen, role }) => {
  const navigate = useNavigate();
  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[70%] bg-white z-50 shadow-lg
        transform transition-transform duration-300 flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-3 flex justify-between items-center">
          <img
            onClick={() => setOpen(true)}
            className="w-13 h-14 rounded-full object-cover "
            src="https://services.sabpaisa.in/pages/images/ggu.jpg"
          />
          <h1 className="text-[#bc2332] text-lg mr-7 font-medium">
            GGV Swabhiman
          </h1>
          <button
            onClick={() => setOpen(false)}
            className="text-black bg-transparent text-xl font-light
             hover:text-black
             active:text-black
             focus:outline-none active:outline-none
             focus:ring-0 active:ring-0"
          >
            ✖
          </button>
        </div>

        <ul className="p-4 space-y-4  text-lg font-medium">
          <li
            onClick={() => {
              setOpen(false);
              if (role == "admin") {
                navigate("/admin/admin-home");
              } else {
                navigate("/home");
              }
            }}
            className="flex items-center gap-3 py-2 px-3 text-lg font-medium text-gray-800
             cursor-pointer rounded-md
             hover:bg-red-200 hover:text-red-600"
          >
            <i
              className="ri-home-4-line text-2xl"
              onClick={() => setOpen(false)}
            ></i>
            Home
          </li>
          <li
            onClick={() => {
              setOpen(false);
              if (role == "admin") {
                navigate("/admin/admin-profile");
              } else {
                navigate("/user-profile");
              }
            }}
            className="flex items-center gap-3 py-2 px-3 text-lg font-medium text-gray-800
             cursor-pointer rounded-md
             hover:bg-red-200 hover:text-red-600"
          >
            <i className="ri-profile-line text-2xl"></i>
            Profile
          </li>
          
          {role === "admin" && (
            <li
              onClick={() => {
                setOpen(false);
                navigate("/admin/create-product");
              }}
              className="flex items-center gap-3 py-2 px-3 text-lg font-medium text-gray-800
      cursor-pointer rounded-md
      hover:bg-red-200 hover:text-red-600"
            >
              <i className="ri-product-hunt-line text-2xl"></i>
              Create Product
            </li>
            
          )}
          
           {role === "admin" && (
            <li
              onClick={() => {
                setOpen(false);
                navigate("/admin/all-products");
              }}
              className="flex items-center gap-3 py-2 px-3 text-lg font-medium text-gray-800
      cursor-pointer rounded-md
      hover:bg-red-200 hover:text-red-600"
            >
              <i className="ri-product-hunt-fill text-2xl"></i>
              All products
            </li>
            
          )}
          <li
            onClick={() => {
              setOpen(false);
              if (role == "admin") {
                navigate("/admin/admin-orders");
              } else {
                navigate("/user-orders");
              }
            }}
            className="flex  items-center gap-3 py-2 px-3 text-lg font-medium text-gray-800
             cursor-pointer rounded-md
             hover:bg-red-200 hover:text-red-600"
          >
            <i className="ri-restaurant-line  text-2xl"></i>
            Your Orders
          </li>
           <li
            onClick={() => {
              setOpen(false);
              if (role == "admin") {
                navigate("/admin/all-orders");
              } 
            }}
            className="flex  items-center gap-3 py-2 px-3 text-lg font-medium text-gray-800
             cursor-pointer rounded-md
             hover:bg-red-200 hover:text-red-600"
          >
            <i className="ri-restaurant-line  text-2xl"></i>
            All Orders
          </li>
        </ul>
        

        <div
          className="flex items-center gap-3 ml-4 mb-6 px-3 py-2 w-36
             cursor-pointer rounded-lg
             hover:bg-red-200 hover:text-red-600
             mt-auto"
        >
          <i className="ri-logout-circle-line text-xl"></i>
          <Link
            to="/logout"
            className="text-lg font-medium text-gray-800 hover:text-red-600
               bg-transparent focus:outline-none"
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
