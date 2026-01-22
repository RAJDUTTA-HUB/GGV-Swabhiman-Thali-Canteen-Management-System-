import { useState } from "react";
import InsideHeader from "../user/InsideHeader";
import Sidebar from "../../Components/SideBar";


import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
const CreateProduct = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
          name: name,
          image:image
      }
      try {
        const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/admin/product-create`,
        data
          );
          if (response.status===201) {
              alert("Product created succesfuly");
               navigate("/admin/admin-home");
          } else {
              throw new Error('product not created');
          }
      } catch (error) {
        
      }
  };
  return (
    <div>
      <InsideHeader setOpen={setOpen} />
      <Sidebar setOpen={setOpen} open={open} role="admin" />

      <div className=" mt-8 p-4 px-4">
        <h2 className="text-xl font-semibold text-gray-800">Product details</h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex gap-2 bg-red-200 rounded-xl py-3 px-2">
            <h2 className="text-2xl mt- font-semibold text-gray-800 ">
              Product Name :{" "}
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product "
              className="w-48 ml-2 text-xl text-gray-800 font-semibold border placeholder:text-gray-500 border-gray-300 rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex mt-4 gap-2 bg-red-200 rounded-xl py-3 px-2">
            <h2 className="text-2xl mt- font-semibold text-gray-800 ">
              Image URL :{" "}
            </h2>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="iamge url "
              className="w-48 ml-2 text-xl text-gray-800 font-semibold border placeholder:text-gray-500 border-gray-300 rounded-md px-2 py-1 outline-none focus:outline-none focus:ring-0"
            />
                  </div>
                  <button type="submit" className="mt-3 text-xl font-semibold bg-blue-700 text-white py-2 px-2 rounded-lg">Submit</button>
              </form>
      </div>
    </div>
  );
};

export default CreateProduct;
