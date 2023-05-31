import React, { useEffect, useState, useContext } from "react";
import "./card.css";
import { Button } from "@mui/material";
import axios from "axios";
import CartContext from "../context/cardContext";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loader/loader";
import { Pagination } from "@mui/material";

function MedicineCard(props) {
  const [medicine, setMedicine] = useState([]);
  const { addToCart } = useContext(CartContext); // Use useContext to consume the CartContext
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true); // State variable to track loading state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddToCart = (_id, quantity) => {
    setCart((prevCart) => ({
      ...prevCart,
      [_id]: (prevCart[_id] || 0) + 1,
    }));
    toast.success("Successfully Added!", {
      icon: "👏",
    });
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        let response;
        if (props.categoryId === null) {
          response = await axios.get(`${process.env.REACT_APP_URL}medicine`);
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_URL}medicine/category/${props.categoryId}`
          );
        }
        setMedicine(response.data.response);
        setLoading(false);
        console.log(response.data);
        console.log(props.categoryId);
      } catch (error) {
        console.error("Error fetching medicine data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.categoryId]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedMedicine = medicine.slice(startIndex, endIndex);

  const totalPages = Math.ceil(medicine.length / itemsPerPage);

  return (
    <div>
     <h1 className="title" style={{ fontSize: "1.4em" }}>{props.title}</h1>

      <main className="medicine">

        {loading ? (
          <Loader />
        ) : (
          displayedMedicine.map((item) => (
            <div className="card" key={item._id}>
              <figure>
                <img
                  src={`${process.env.REACT_APP_URL}${item.image}`}
                  alt={item.name}
                />
              </figure>
              <section className="details">
                <div className="min-details">
                  <h1 className="cart-name">
                    {item.name}
                    <span>{item.company}</span>
                  </h1>
                  <h1 className="price">{item.price}</h1>
                </div>

                <div className="options">
                  <h4>Expiration Date: {item.expiration_date}</h4>
                  <h4>Origin Country: {item.originCountry}</h4>
                  <h4>Type: {item.type}</h4>
                  <h4>Quantity: {item.quantity}</h4>
                </div>
                <Button
                  sx={{
                    backgroundColor: "var(--primary)",
                    fontSize: "16px",
                    height: "45px",
                    border: "1px solid var(--primary)",
                    color: "#fff",
                    ml: 8,
                    "&:hover": {
                      color: "var(--primary)",
                      backgroundColor: "transparent",
                      cursor: "pointer",

                      transition: "0.2s ease-out",
                    },
                  }}
                  onClick={() => {
                    addToCart(
                      item._id,
                      item.name,
                      item.price,
                      item.image,
                      item.quantity,
                      cart[item._id]
                    );
                    handleAddToCart(item._id);
                  }}
                >
                  Add to Cart
                </Button>
              </section>
            </div>
          ))
        )}
      </main>
      <div className="pagination" >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
      </div>
    </div>
  );
}

export default MedicineCard;
