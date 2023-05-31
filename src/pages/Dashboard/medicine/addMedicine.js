import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Sheet } from "@mui/joy";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import axios from "axios";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectLabels from "../../../components/DropDawn category/dropDawn";

function AddMedicine(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [image, setImage] = useState(0);
  const [price, setPrice] = useState();
  const [company, setCompany] = useState();
  const [quantity, setQuantity] = useState();
  const [type, setType] = useState();
  const [originCountry, setCountry] = useState();
  const [expiration_date, setExpirationDate] = useState();
  const [Category, setCategory] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("company", company);
      formData.append("quantity", quantity);
      formData.append("type", type);
      formData.append("originCountry", originCountry);
      formData.append("expiration_date", expiration_date);
      formData.append("Category", Category);
      const response = await axios.post(
        `${process.env.REACT_APP_URL}medicine`,
        formData
      );
      const updatedResponse = await axios.get(
        `${process.env.REACT_APP_URL}medicine`
      );
      props.setRows(updatedResponse.data.response);
      toast.success("Medicine added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error adding medicine.");
    }
  };
  function handleChildData(data) {

    setCategory(data);
  }
  return (
    <section className="addForm">
      <Sheet>
      <Button
      sx={{
        backgroundColor: "var(--primary)",
        fontSize: "12px",
        color:"#fff",
        "&:hover": {
          color:"var(--primary)",
          cursor: "pointer",
          transform: "scale(1)",
          transition: "0.2s ease-out",
        },
      }}
      onClick={handleClickOpen}
    >
      <DataSaverOnIcon/> Add Medicine
    </Button>
      </Sheet>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "var(--primary)", color: "white" }}>
          Add New Medicine
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="dense"
              id="Name"
              label="Name"
              type="text"
              name="name"
              required
              sx={{ marginBottom: "1rem", marginLeft: "1rem" }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="price"
              label="Price"
              type="price"
              name="price"
              required
              sx={{ marginBottom: "1rem", marginLeft: "1rem" }}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              margin="dense"
              id="quantity"
              label="Quantity"
              type="text"
              required
              name="quantity"
              sx={{ marginBottom: "1rem", marginLeft: "1rem" }}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              margin="dense"
              id="country"
              label="Country"
              type="text"
              name="country"
              sx={{
                marginBottom: "1rem",
                marginLeft: "1rem",
              }}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              margin="dense"
              id="company"
              label="Company"
              type="text"
              name="company"
              sx={{ marginBottom: "1rem", marginLeft: "1rem" }}
              required
              onChange={(e) => setCompany(e.target.value)}
            />
            <TextField
              margin="dense"
              id="type"
              label="Type"
              type="text"
              name="type"
              sx={{ marginBottom: "1rem", marginLeft: "1rem" }}
              required
              onChange={(e) => setType(e.target.value)}
            />
            <TextField
              margin="dense"
              id="date"
              label="Expiration-Date"
              type="text"
              name="date"
              sx={{ marginBottom: "1rem", marginLeft: "1rem" }}
              required
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            <TextField
              margin="dense"
              id="image"
              label="Image"
              type="file"
              name="image"
              required
              sx={{ marginBottom: "1rem", marginLeft: "1rem", width: 237 }}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <SelectLabels onChildData={handleChildData} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default AddMedicine;
