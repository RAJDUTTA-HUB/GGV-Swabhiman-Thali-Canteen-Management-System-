import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../../context/UserContext";

import { useContext } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      department: department,
      enrollmentNo: enrollmentNo,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setUser(data.user); //
        navigate("/home");
      }
      setDepartment("");
      setName("");
      setEmail("");
      setEnrollmentNo("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // Show backend message
      } else {
        alert("Something went wrong");
      }
    }
  };
  return (
    <div>
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
        <div className="bg-white -mt-4 rounded-t-2xl p-6 text-center ">
          <h3 className="mt-4 text-3xl font-semibold">Welcome!</h3>

          <form className="mt-8 w-full" onSubmit={submitHandler}>
            <div
              className="w-full flex justify-center text-center border-2 border-red-200 rounded-xl
            focus-within:border-[3px] focus-within:border-[#bc2332] 
                
                transition-all duration-200 "
            >
              <div className="py-2 px-2 ">
                <i className="text-gray-600 text-2xl ri-user-line"></i>
              </div>
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full text-xl text-gray-800 font-semibold border placeholder:text-gray-500 border-gray-300 rounded-md px-4 py-3
                 outline-none focus:outline-none focus:ring-0
                 "
              />
            </div>
            <div
              className="w-full mt-6 flex justify-center text-center border-2 border-red-200 rounded-xl
            focus-within:border-[3px] focus-within:border-[#bc2332] 
                
                transition-all duration-200
                "
            >
              <div className="py-2 px-2 ">
                <i className="text-gray-600 text-2xl ri-community-line"></i>
              </div>
              <input
                type="text"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                placeholder="Department"
                className="w-full text-xl text-gray-800 font-semibold border placeholder:text-gray-500 border-gray-300 rounded-md px-4 py-3 outline-none focus:outline-none focus:ring-0"
              />
            </div>
            <div
              className="w-full mt-6 flex justify-center text-center border-2 border-red-200 rounded-xl
            focus-within:border-[3px] focus-within:border-[#bc2332] 
                
                transition-all duration-200
                "
            >
              <div className="py-2 px-2 ">
                <i className="text-gray-600 text-2xl ri-numbers-line"></i>
              </div>
              <input
                type="text"
                value={enrollmentNo}
                onChange={(e) => {
                  setEnrollmentNo(e.target.value);
                }}
                placeholder="Enrollment No"
                className="w-full text-xl text-gray-800 font-semibold border placeholder:text-gray-500 border-gray-300 rounded-md px-4 py-3 outline-none focus:outline-none focus:ring-0"
              />
            </div>
            <div
              className="w-full mt-6 flex justify-center text-center border-2 border-red-200 rounded-xl
            focus-within:border-[3px] focus-within:border-[#bc2332] 
                
                transition-all duration-200
                "
            >
              <div className="py-2 px-2 ">
                <i className="text-gray-600 text-2xl ri-mail-line"></i>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email Address"
                className="w-full text-xl text-gray-800 font-semibold border placeholder:text-gray-500 border-gray-300 rounded-md px-4 py-3 outline-none focus:outline-none focus:ring-0"
              />
            </div>
            <div
              className="w-full mt-6 flex justify-center text-center border-2 border-red-200 rounded-xl
            focus-within:border-[3px] focus-within:border-[#bc2332] 
                
                transition-all duration-200
                "
            >
              <div className="py-2 px-2 ">
                <i className="text-gray-600 text-2xl ri-lock-line"></i>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                className="w-full text-xl text-gray-800 font-semibold border placeholder:text-gray-500 border-gray-300 rounded-md px-4 py-3 outline-none focus:outline-none focus:ring-0"
              />
            </div>
            <button
              type="submit"
              className="mt-8 text-white text-2xl font-semibold w-full bg-[#bc2332] py-3 rounded-md"
            >
              Create a account
            </button>
          </form>

          <p className=" mt-4 text-center text-xl">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600">
              login
            </Link>
          </p>
          <Link
            to="/admin-login"
            className="mt-3 block text-white text-2xl font-semibold w-full bg-green-500 py-2 rounded-md"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
