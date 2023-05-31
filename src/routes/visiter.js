import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/nav";
import Footer from "../components/footer/footer";

function Visiter (){
    return (
    <div>
  <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
    )
}
export default Visiter ;