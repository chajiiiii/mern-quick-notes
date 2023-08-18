import { useState } from "react";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";

import { Routes, Route } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <main>
      {user ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/orders/new" element={<NewOrderPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage />
      )}
    </main>
  );
}
