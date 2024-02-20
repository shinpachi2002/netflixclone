import Navbar from "./components/Navbar";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import { AuthContextProvider } from "./Context/AuthContext";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Account from "./Pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
    <AuthContextProvider>
    <Navbar></Navbar>
    <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/login"element={<Login></Login>}/>
        <Route path="/signup"element={<SignUp></SignUp>}/>
        <Route path="/account" element={<ProtectedRoute><Account></Account></ProtectedRoute>}/>
    </Routes>
    </AuthContextProvider>
    </>
  );
}

export default App;
