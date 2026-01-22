import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserDataProvider from "./context/UserContext.jsx";
import AdminDataProvider from "./context/AdminContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserDataProvider>
      <AdminDataProvider>
        <BrowserRouter>
          <ProductProvider>
            <App />
          </ProductProvider>
        </BrowserRouter>
      </AdminDataProvider>
    </UserDataProvider>
  </StrictMode>
);
