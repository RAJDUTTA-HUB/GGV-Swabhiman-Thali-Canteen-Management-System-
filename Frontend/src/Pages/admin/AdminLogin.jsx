import axios from "axios";
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { admin, setAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const adminData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/admin-login`,
        adminData
      );
      if (response.status === 200) {
        const data = response.data;
        setAdmin(data.admin);
        localStorage.setItem("token", data.token);
        navigate("/admin/admin-home");
      }
    } catch (error) {
      console.error(error.response); // ← yeh pura response dikha dega
      if (error.response) {
        alert(
          error.response.data.message || JSON.stringify(error.response.data)
        );
      } else {
        alert("Something went wrong");
      }
    }
  };
  return (
    <div className=" h-screen ">
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
      <div className="bg-white -mt-5 rounded-t-2xl p-6 text-center ">
        <h3 className="mt-8 text-3xl font-semibold">Welcome!</h3>

        <form onSubmit={submitHandler} className="mt-14 w-full">
          <div
            className="w-full flex justify-center text-center border-2 border-red-200 rounded-xl
          focus-within:border-[3px] focus-within:border-[#bc2332] 
                
                transition-all duration-200
                "
          >
            <div className="py-2 px-2 ">
              <i className="text-gray-600 text-2xl ri-mail-line"></i>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full text-xl text-gray-800 font-semibold border placeholder:text-gray-500 border-gray-300 rounded-md px-4 py-3 outline-none focus:outline-none focus:ring-0"
            />
          </div>
          <div
            className="w-full mt-10 flex justify-center text-center border-2 border-red-200 rounded-xl
           focus-within:border-[3px] focus-within:border-[#bc2332] 
                
                transition-all duration-200 "
          >
            <div className="py-2 px-2 ">
              <i className="text-gray-600 text-2xl ri-lock-line"></i>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xl text-gray-800 font-semibold border placeholder:text-gray-500 border-gray-300 rounded-md px-4 py-3 outline-none focus:outline-none focus:ring-0"
            />
          </div>
          <button
            type="submit"
            className="mt-8 text-white text-2xl font-semibold w-full bg-[#bc2332] py-3 rounded-md"
          >
            Login
          </button>
        </form>

        <p className=" mt-6 text-center text-xl">
          New here?{" "}
          <Link to="/admin-register" className="text-blue-600">
            Create new Account
          </Link>
        </p>
        <Link
          to="/"
          className="mt-44 block text-white text-2xl font-semibold w-full bg-green-500 py-3 rounded-md"
        >
          Login as Student
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
