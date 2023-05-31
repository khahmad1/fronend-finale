import { useContext } from "react";
import cartContext from "../../components/context/cardContext";
import {
  Add,
  Email,
  Home,
  Person,
  Phone,
  Remove,
  DateRange,
  Message,
} from "@mui/icons-material";
import React, { useState } from "react";
import "./order.css";
import TruckAnimation from "./orderAnimation";
import userContext from "../../components/context/userContext";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Order() {

  const { user } = useContext(userContext);


  const { items, updateQuantity } = useContext(cartContext);

  const handleAdd = (id) => {
    const item = items.find((item) => item._id === id);
    if (item) {
      const newQuantity = item.quantity + 1;
      updateQuantity(id, newQuantity);

      // Update medicine state with quantity and ID
      const updatedMedicine = [...medicine];
      const existingMedicine = updatedMedicine.find((med) => med._id);

      if (existingMedicine) {
        existingMedicine.quantity = newQuantity;
      } else {
        updatedMedicine.push({ _id: id, quantity: newQuantity });
      }

      setMedicine(updatedMedicine);
    }
  };
  const [total_price, setTotal] = useState(0);
  const [facility] = useState(user._id);
  const [medicine, setMedicine] = useState([]);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_URL}order`, {
        total_price,
        facility,
        medicine,
        message,
        date,
        address,
      });
      toast.success("Order successful");
    } catch (error) {
      console.log(error);
      toast.error("Error get order, Please Try Again ");
    }
  };

  useEffect(() => {
    var tempTotal = 0;
    items.forEach((item) => {
      tempTotal += parseInt(item.quantity) * parseFloat(item.price);
    });
    setTotal(tempTotal);
  }, [items]);

  useEffect(() => {
    const updatedMedicine = items.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));
    setMedicine(updatedMedicine);
  }, [items]);


    if (items.length > 0) {
      return (
        <div className="global-container">
          
          <header className="principal">
            <h1 className="title">Order</h1>
          </header>
          <main className="principal">
            <div className="cart-preview">
              {items.map((item) => {
                return (
                  <div ker={item._id} className="cart-item">
                    <img
                      src={`${process.env.REACT_APP_URL}${item.image}`}
                      alt="product"
                    />
                    <div>
                      <div>
                        <div className="name">{item.name}</div>
                        <div className="price">
                          <span className="discounted">{item.price}</span>
                        </div>
                      </div>
                      <div className="qty-selector">
                        <span className="material-icons">
                          <Remove
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                          />
                        </span>
                        <span className="qty">{item.quantity}</span>
                        <span className="material-icons">
                          <Add onClick={() => handleAdd(item._id)} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="shipping">
                <span>Shipping</span>
                <span>20$</span>
              </div>
              <div className="total_price">
                <span>Total</span>
                <span>{total_price}$</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} id="checkout-form">
              <section>
                <h3>Contact information</h3>
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <div>
                    <span className="material-icons">
                      <Email />
                    </span>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email..."
                      value={user.email}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone number</label>
                  <div>
                    <span className="material-icons">
                      <Phone />
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number..."
                      value={user.phone}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="full-name">Facility name</label>
                  <div>
                    <span className="material-icons">
                      <Person />
                    </span>
                    <input
                      type="text"
                      id="full-name"
                      placeholder="Enter your full name..."
                      value={user.name}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <div>
                    <span className="material-icons">
                      <Home />
                    </span>
                    <input
                      type="text"
                      id="address"
                      placeholder="Enter your address..."
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Message</label>
                  <div>
                    <span className="material-icons">
                      <Message />
                    </span>
                    <input
                      type="text"
                      id="address"
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your Message..."
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Date</label>
                  <div>
                    <span className="material-icons">
                      <DateRange />
                    </span>
                    <input
                      type="text"
                      id="address"
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Enter your The Date..."
                      required
                    />
                  </div>
                </div>
              </section>
              <button type="submit">Place order</button>
            </form>
          </main>
          <ToastContainer />
        </div>
      );
    } else if (items.length === 0 || items.length < 0) {
      return (
        <section className="no-order">
          <h1>No Order Yet</h1>
          <h2>We Are Ready To Package Your Order </h2>
          <TruckAnimation />
        </section>
      );
    }

}
export default Order;
