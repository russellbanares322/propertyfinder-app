import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddProperty from "./pages/AddProperty";
import Property from "./pages/Property";
import PNavbar from "./pages/PNavbar";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import PropertyDetails from "./pages/PropertyDetails";
import ErrorPage from "./pages/ErrorPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase-config";
import Home from "./pages/Home";
import About from "./pages/About";
import React, { useState } from "react";

function App() {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState("");

  return (
    <>
      <PNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <Routes>
        <Route
          path="/"
          element={<Home activeTab={activeTab} setActiveTab={setActiveTab} />}
        />
        {user && (
          <>
            <Route path="/add" element={<AddProperty />} />
            <Route path="/edit/:id" element={<AddProperty />} />
          </>
        )}
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/property" element={<Property />} />
        <Route
          path="/login"
          element={<Login activeTab={activeTab} setActiveTab={setActiveTab} />}
        />
        <Route
          path="/signup"
          element={<SignUp activeTab={activeTab} setActiveTab={setActiveTab} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
