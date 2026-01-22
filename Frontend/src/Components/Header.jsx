import React from "react";

const Header = () => {
  return (
    <div className="h-1/4 bg-[#bc2332] py-8">
      <div className=" ml-8 mt-8 bg-white rounded-full flex justify-center items-center w-[24%] h-24">
        <img
          className="w-18 h-20 rounded-full object-cover"
          src="https://services.sabpaisa.in/pages/images/ggu.jpg"
          alt=""
        />
      </div>

      <div className=" w-[78%] flex items-center gap-3 -mt-[20%]  bg-white rounded-full pl-16 py-6 ml-20 shadow-md">
        <h1 className="text-[#bc2332] text-2xl font-bold">
          GGV Swabhiman Thali
        </h1>
      </div>
    </div>
  );
};

export default Header;
