import React from "react";
import { useState, useEffect } from "react";
import api from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
const AdminProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/admin/admin-profile");

        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Loading..</p>;
  }

  return (
    <div className="px-3 py-3 flex flex-col justify-center  ">
      <div className="flex pt-5">
        <Link to={"/admin/admin-home"}>
          {" "}
          <i className="text-3xl ri-arrow-left-line"></i>
        </Link>
        <h3 className="text-2xl ml-[37%] pb-7 font-bold">Profile</h3>
      </div>

      <div className="flex flex-col items-center justify-center">
        <img
          className="w-[44%] h-30 ml-4 rounded-full object-cover border-8 border-blue-500"
          src={profile.profilePic}
          alt=""
        />
        <span className="mt-3 -mb-4 text-xl font-semibold ">
          {profile.role}
        </span>
      </div>
      <div className="py-10 px-4 flex flex-col gap-4">
        <div className="flex gap-2 bg-red-200 rounded-xl py-3 px-4">
          <i className="text-gray-700 text-3xl ri-user-line"></i>

          <h2 className="text-2xl mt- font-semibold text-gray-800 ">
            {" "}
            Name :{" "}
            <span className="first-letter:uppercase">
              {" "}
              {profile?.name
                ? profile.name.charAt(0).toUpperCase() + profile.name.slice(1)
                : ""}
            </span>
          </h2>
        </div>
        <div className="flex gap-2 bg-red-200 rounded-xl py-3 px-4">
          <i className="text-gray-700 text-3xl  ri-community-line"></i>
          <h2 className="text-2xl mt- font-semibold text-gray-800">
            Department: <span className="uppercase">{profile.department}</span>
          </h2>
        </div>
        <div className="flex gap-2 bg-red-200 rounded-xl py-3 px-4">
          <i className="text-gray-700 text-3xl  ri-numbers-line"></i>
          <h2 className="text-2xl mt- font-semibold text-gray-800">
            Enrollment NO:{" "}
            <span className="uppercase">{profile.enrollmentNo}</span>
          </h2>
        </div>
        <div className="flex gap-2 bg-red-200 rounded-xl py-3 px-4">
          <i className="text-gray-700 text-3xl  ri-mail-line"></i>
          <h2 className="text-2xl mt- font-semibold text-gray-800">
            Email: <span className="lowercase">{profile.email}</span>
          </h2>
        </div>
        <Link
          to="/admin/logout"
          className="bg-red-600 text-white text-lg font-semibold rounded-lg w-24 py-2 px-4 mt-2  block"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminProfile;
