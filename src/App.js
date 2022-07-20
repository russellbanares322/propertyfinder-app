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

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <PNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {user && (
          <>
            <Route path="/add" element={<AddProperty />} />
            <Route path="/edit/:id" element={<AddProperty />} />
          </>
        )}
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/property" element={<Property />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
