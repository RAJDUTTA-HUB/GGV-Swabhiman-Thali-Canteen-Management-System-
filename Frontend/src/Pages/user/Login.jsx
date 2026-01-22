import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import { useContext } from "react";
import axios from "axios";
import Header from "../../Components/Header";
const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );
      if (response.status === 200) {
        const data = response.data;
        
        setUser(data.user);
        const token = data.token;
        localStorage.setItem("token", token);
        

        navigate("/home");
      }
    } catch (error) {
      console.log("Login Failed:", error);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className=" h-screen ">
      <Header />
      <div className="bg-white -mt-5 rounded-t-2xl p-6 text-center ">
        <h3 className="mt-8 text-3xl font-semibold">Welcome!</h3>

        <form className="mt-14 w-full" onSubmit={submitHandler}>
          <div
            className="w-full flex justify-center text-center border-2 border-red-200 rounded-xl
           focus-within:border-[3px] focus-within:border-[#bc2332] 
                
                transition-all duration-200 "
          >
            <div className="py-2 px-2 ">
              <i className="text-gray-600 text-2xl ri-mail-line"></i>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
            Login
          </button>
        </form>

        <p className=" mt-6 text-center text-xl">
          New here?{" "}
          <Link to="/register" className="text-blue-600">
            Create new Account
          </Link>
        </p>
        <Link
          to="/admin-login"
          className="mt-44 block text-white text-2xl font-semibold w-full bg-green-500 py-3 rounded-md"
        >
          Login as Admin
        </Link>
      </div>
    </div>
  );
};

export default Home;
