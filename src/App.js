import "./App.css";
import { Route, Routes } from "react-router-dom";
import Visiter from "./routes/visiter.js";
import Admin from "./routes/admin.js";
import AdminTable from "./pages/Dashboard/admin/adminTable.js";
import CategoryTable from "./pages/Dashboard/category/categoryTable";
import FacilityTable from "./pages/Dashboard/facility/facilityTable.js";
import MedicineTable from "./pages/Dashboard/medicine/medicineTable.js";
import MessageTable from "./pages/Dashboard/message/messageTable.js";
import OrderTable from "./pages/Dashboard/order/orderTable.js";
import Dashboard from "./pages/Dashboard/dashboard/dashboard";
import SignIn from "./components/authFacility/signIn";
import { UserProvider } from "./components/context/userContext";
import { CartProvider } from "./components/context/cardContext";
import Profile from "./components/userProfiel/userProfile";
import { AdminProvider } from "./components/context/AdminContext";
import LoginAdmin from "./components/authAdmin/logInAdmin";
import ContactForm from "./pages/contact-us/contact";
import SignUp from "./components/authFacility/signUp";
import HomePage from "./pages/homePage/home";
import Order from "./pages/order/order";
import NotFound from "./pages/notFound/notFound";
import RequireAdmin from "./components/context/protectAdmin";
import RequireUser from "./components/context/protectuser";
import {  ToastContainer } from "react-toastify";
import AboutPage from "./pages/About/about";
function App() {
  return (
    <div className="App">
      <AdminProvider>
        <UserProvider>
          <CartProvider>
            <Routes>
              <Route path="/dashboard" element={<LoginAdmin />} />
              <Route element={<RequireAdmin/>}>
              <Route path="/dashboard" element={<Admin />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="admin" element={<AdminTable />} />
                <Route path="category" element={<CategoryTable />} />
                <Route path="facility" element={<FacilityTable />} />
                <Route path="medicine" element={<MedicineTable />} />
                <Route path="message" element={<MessageTable />} />
                <Route path="order" element={<OrderTable />} />
                </Route>
              </Route>
              <Route path="/" element={<Visiter />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/about" element={<AboutPage/>} />
                <Route element={<RequireUser/>}>
                <Route path="/order" element={<Order/>} />
                <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </CartProvider>
        </UserProvider>
      </AdminProvider>
      <ToastContainer   position="top-right"
    autoClose={3000} // Duration to display each notification in milliseconds (e.g., 3000 = 3 seconds)
    
    newestOnTop={false}
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover />

    </div>
  );
}

export default App;
