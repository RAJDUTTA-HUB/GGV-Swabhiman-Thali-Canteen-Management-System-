import { useEffect, useState } from "react";
import InsideHeader from "../user/InsideHeader";
import Sidebar from "../../Components/SideBar";
import api from "../../utils/axiosInstance";
const UserOrders = () => {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await api.get("/users/user-orders");
        console.log(response);
        setOrders(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserOrders();
  }, [refresh]);

  const handleClear = async () => {
    try {
      await api.post("/users/clear-user-orders");
      alert("User orders clear successfully");
       setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
 const totalExpense = orders.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );
  return (
    <div>
      <InsideHeader open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} role={"user"} />
      <div className="py-14 px-6">
        <div className="flex">
          <i className="text-xl text-gray-700 ri-shopping-bag-3-fill"></i>
          <div className="flex justify-between gap-10">
            <h3 className="text-xl font-semibold text-gray-800 ml-2 mb-10">
              Orders History
            </h3>
            <button
              onClick={handleClear}
              className="text-lg bg-red-500 w-24 h-10 font-semibold text-white ml-20 mb-10 rounded-xl"
            >
              Clear All{" "}
            </button>
          </div>
        </div>
        {orders.length !== 0 && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-4 font-medium text-lg text-gray-800">
              {" "}
              <div>Date</div> <div>Item</div>{" "}
              <div className="ml-5">Quantity</div>{" "}
              <div className="ml-3">Expense</div>{" "}
            </div>{" "}
          </>
        )}
        {/* Data Rows */}{" "}
        {orders.length === 0 ? (
          <p className="text-lg font-semibold  mt-6 text-gray-800">
            No Order History Found 
          </p>
        ) : (
          orders.map((item) => (
            <div
              key={item.orderId}
              className="grid grid-cols-4 gap-4 mb-2 py-2 border-b border-gray-200 text-base text-gray-700"
            >
              {" "}
              <div>{item.date}</div> <div>{item.product.name}</div>{" "}
              <div className="ml-12">{item.quantity}</div>{" "}
              <div className="ml-8">₹{item.amount} </div>{" "}
            </div>
          ))
        )}
        {orders.length !== 0 && (
          <>
            <h2 className="w-full border-b-2 mt-1 border-gray-600"></h2>
            <div className="text-lg mt-2 text-gray-900 flex justify-between">
              <h2>Total Amount</h2>
              <h2>= ₹{totalExpense}</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
