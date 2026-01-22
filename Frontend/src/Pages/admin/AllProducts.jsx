import { useEffect, useState } from "react";
import api from "../../utils/axiosInstance";
import InsideHeader from "../user/InsideHeader";
import SideBar from "../../Components/SideBar";
import AdminHome from "./AdminHome";
import { useNavigate } from "react-router-dom";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  
    const navigate = useNavigate();
  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  const handleSubmit = async () => {
    try {
       if (selectedProducts.length===0) {
        return alert('Please select items')
       }
       const response = await api.post("/admin/selected-ids", {
         productIds: selectedProducts,
       });
       
       navigate('/admin/admin-home')
     } catch (error) {
      console.log(error)
     }
  };
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await api.get("/admin/all-products");
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllProducts();
  }, []);
  return (
    <>
      <InsideHeader setOpen={setOpen} />
      <SideBar setOpen={setOpen} open={open} role="admin" />

      <div className="p-4 mt-10">
        <div className="flex justify-between mb-7">
          <h2 className="text-2xl font-bold">All Products</h2>
          <div className="flex gap-3">
            <h2 className="text-lg font-semibold">Selected:</h2>
            <span className="text-lg font-semibold">
              {selectedProducts.length}
            </span>
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-xl font-bold">No products found</p>
        ) : (
          products.map((p) => {
            const isSelected = selectedProducts.includes(p._id);

            return (
              <div
                key={p._id}
                className={`p-3 my-8 flex gap-3 rounded-lg border-2
                ${
                  isSelected
                    ? "bg-green-100 border-green-400"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <img
                  src={p.image}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="ml-2">
                  <h3 className="font-semibold text-2xl capitalize text-gray-800">
                    {p.name}
                  </h3>
                  <p className="text-lg font-semibold text-gray-600">
                    ₹{p.price}
                  </p>

                  <button
                    onClick={() => toggleSelect(p._id)}
                    className={`text-lg font-semibold rounded-lg py-2 px-4 mt-4
                    ${
                      isSelected
                        ? "bg-red-400 text-white"
                        : "bg-green-400 text-white"
                    }`}
                  >
                    {isSelected ? "Unselect" : "Select"}
                  </button>
                </div>
              </div>
            );
          })
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 py-3 rounded-xl text-xl  font-bold text-white"
        >
          Confirm Select
        </button>
      </div>
    </>
  );
};

export default AllProducts;
