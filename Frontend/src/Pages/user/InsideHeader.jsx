import React from "react";

const InsideHeader = ({ setOpen }) => {
  return (
    <div className="flex items-center mt-4 px-4">
      {/* Logo as Hamburger */}
      <img
        onClick={() => setOpen(true)}
        className="w-20 h-20 rounded-full object-cover cursor-pointer active:scale-95 transition"
        src="https://services.sabpaisa.in/pages/images/ggu.jpg"
        alt="Menu"
      />

      {/* Title */}
      <h1 className="text-[#bc2332] ml-3 text-[29px] font-bold">
        GGV Swabhiman Thali
      </h1>
    </div>
  );
};

export default InsideHeader;
