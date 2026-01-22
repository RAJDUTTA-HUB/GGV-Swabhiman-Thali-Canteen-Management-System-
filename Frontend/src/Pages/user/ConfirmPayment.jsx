import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/axiosInstance";
import OrderQR from "../../Components/QrGenerate";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
const ConfirmPayment = (props) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const totalPrice = quantity * (product?.price || 0);
  const [qrData, setQrData] = useState(null); // ✅ ADDED
  const navigate = useNavigate();
  const { selectedProductId } = useContext(ProductContext);

  // 🔹 Fetch product
  useEffect(() => {
    if (!selectedProductId) return;

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/admin/product/${selectedProductId}`);
        setProduct(res.data.data);
        // base price
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [selectedProductId, refresh]);

  // 🔹 Quantity handlers
  const quantityQtAdd = () => {
    if (quantity < 5) {
      setQuantity((q) => q + 1);
    }
  };

  const quantityQtMinus = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  // 🔥 PAYMENT BUTTON CLICK
  const handleOnlinePay = async () => {
    console.log(totalPrice);
    try {
      const res = await api.post("/order/mock-payment", {
        productId: selectedProductId,
        quantity,
        amount: totalPrice,
        paymentStatus: "SUCCESS",
      });
      setQrData(res.data.orderId);
      props.setConfirmPanel(false);
      alert("Payment successful");
      if (props.onRefresh) {
        props.onRefresh();
      }
      if (props.role === "user") {
        navigate("/home", { state: { refresh: Date.now() } });
      } else {
        navigate("/admin/admin-home", { state: { refresh: Date.now() } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="mt-10 w-full p-4 bg-red-50 border-t-2 border-red-300 rounded-3xl">
        <div className="flex justify-between">
          <h3 className="text-2xl mb-8 font-medium">Confirm Payment</h3>
          <i
            onClick={() => {
              props.setConfirmPanel(false);
              props.setMenuOn(false);
            }}
            className="text-xl ri-arrow-left-line"
          ></i>
        </div>

        <div className="flex gap-6">
          <div className="w-[42%] h-38 rounded-lg">
            <img
              className="w-full h-[76%] object-cover rounded-lg"
              src={product.image}
              alt=""
            />
          </div>

          <div>
            <h2 className="capitalize text-3xl mb-3 font-semibold">
              {product.name}
            </h2>

            <p className="text-xl font-semibold">
              {product.createdAt &&
                new Date(product.createdAt).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
            </p>

            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">Quantity:</p>
              <div>
                <button onClick={quantityQtAdd} className="border px-2">
                  +
                </button>
                <span className="mx-3 font-semibold">{quantity}</span>
                <button onClick={quantityQtMinus} className="border px-2">
                  -
                </button>
              </div>
            </div>

            <p className="text-xl font-semibold">₹{totalPrice}</p>
          </div>
        </div>

        <div className="flex mt-6 justify-between">
          <Link
            to="/payment"
            className="border px-6 py-2 rounded-xl font-semibold"
          >
            Cash
          </Link>

          <button
            onClick={handleOnlinePay}
            className="border px-6 py-2 rounded-xl font-semibold"
          >
            Online
          </button>
        </div>
      </div>

      {/* 🔥 QR SECTION */}
      {qrData && <OrderQR orderId={qrData} />}
    </>
  );
};

export default ConfirmPayment;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import OrderQR from "../../Components/QrGenerate";

// import { useNavigate } from "react-router-dom";
// import api from "../../utils/axiosInstance";
// import { useEffect } from "react";
// import { useContext } from "react";
// import { ProductContext } from "../../context/ProductContext";
// const ConfirmPayment = (props) => {
//   const [product, setProduct] = useState("");
//   let [quantity, setQuantity] = useState(1);
//   const [price, setPrice] = useState(10);

//   const quantityQtAdd = () => {
//     if (quantity < 5) {
//       setQuantity((quantity = quantity + 1));
//       setPrice(price + 10);
//     }
//   };
//   const quantityQtMinus = () => {
//     if (quantity > 0) {
//       setQuantity((quantity = quantity - 1));

//       setPrice(price - 10);
//     }
//   };
//   const { selectedProductId } = useContext(ProductContext);
//   useEffect(() => {
//     if (!selectedProductId) return;

//     const fetchProduct = async () => {
//       try {
//         const response = await api.get(`/admin/product/${selectedProductId}`);

//         setProduct(response.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProduct();
//   }, [selectedProductId]);

//   useEffect(() => {
//     const handleOnlinePay = async() => {
//     // const upiLink = `upi://pay?pa=raj2005dutta@okicici&pn=MyShop&am=${price}&cu=INR&tn=product_${selectedProductId}`;
//     // console.log("UPI LINK:", upiLink);
//     // window.location.href = upiLink;

//      try {
//     const res = await api.post("/order/mock-payment", {
//       productId: selectedProductId,quantity,price
//     });

//     setQrData(res.data.orderId); // 🔥 QR ke liye
//   } catch (err) {
//     console.log(err);
//   }
//     };
//     handleOnlinePay();
//   },[])

//   return (
//     <>
//       <div className="mt-10 w-full  p-4 bg-red-50 border-t-2 border-red-300 rounded-3xl">
//         <div className="flex justify-between">
//           <h3 className="text-2xl mb-8 font-medium  ">Confirm Payment</h3>
//           <i
//             onClick={() => {
//               props.setConfirmPanel(false);
//               props.setMenuOn(false);
//             }}
//             className="text-xl  ri-arrow-left-line "
//           ></i>
//         </div>
//         <div className="flex flex-col">
//           <div className="flex gap-6 ">
//             <div className="w-[42%]  h-38 rounded-lg">
//               <img
//                 className="w-full h-[76%] object-cover rounded-lg"
//                 src={product.image}
//                 alt=""
//               />
//             </div>
//             <div className="Flex ">
//               <h2 className="capitalize text-3xl mb-3 font-semibold text-gray-900">
//                 {product.name}
//               </h2>
//               <p className="text-xl  font-semibold text-gray-800">
//                 {new Date(product.createdAt).toLocaleDateString("en-IN", {
//                   weekday: "short",
//                   day: "numeric",
//                   month: "short",
//                 })}
//               </p>
//               <div className="flex justify-between">
//                 <p className="text-xl  font-semibold text-gray-800">
//                   Quantity:
//                 </p>
//                 <div className="-mr-11">
//                   <button
//                     onClick={quantityQtAdd}
//                     className="text-xl border-2 border-gray-400 px-1 rounded-md mr-2"
//                   >
//                     +
//                   </button>
//                   <span className="text-lg font-semibold  ">{quantity}</span>
//                   <button
//                     onClick={quantityQtMinus}
//                     className="text-xl border-2 border-gray-400 px-1 rounded-md ml-2"
//                   >
//                     -
//                   </button>
//                 </div>
//               </div>
//               <p className="  text-xl  font-semibold text-gray-800">₹{price}</p>
//             </div>
//           </div>
//           <div className="flex mt-4 justify-between px-3">
//             <Link
//               to="/payment"
//               className="mt-2 text-center text-black bg-red-50 block text-lg font-semibold w-28 border-2 border-[#bc2332] py-2  rounded-xl"
//             >
//               Cash
//             </Link>
//             <button
//               onClick={handleOnlinePay}
//               className="mt-2 text-center text-black bg-red-50 block text-lg font-semibold w-28 border-2 border-[#bc2332] py-2  rounded-xl"
//             >
//               Online
//             </button>
//           </div>
//         </div>
//       </div>
//       {qrData && <OrderQR orderId={qrData} />}

//     </>
//   );
// };

// export default ConfirmPayment;
