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
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddFacility(props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    setOpen(false)
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}facility/signUp`,
        {
          email,
          name,
          password,
          username,
          phone,
          address
        }
      );
      const updatedResponse = await axios.get(
        `${process.env.REACT_APP_URL}facility`
      );
      props.setRows(updatedResponse.data.response);
      toast.success("Facility Added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error Adding Facility.");
    }
  };

  return (
    <section className="addForm">
      <Sheet>
        <Button
          sx={{
            backgroundColor: "var(--primary)",
            fontSize: "12px",
            color: "#fff",
            "&:hover": {
              color: "var(--primary)",
              cursor: "pointer",
              transform: "scale(1)",
              transition: "0.2s ease-out",
            },
          }}
          onClick={handleClickOpen}
        >
          <DataSaverOnIcon /> Add Facility
        </Button>
      </Sheet>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "var(--primary)", color: "white" }}>
          Add New Facility
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="dense"
              id="fullName"
              label="Full Name"
              type="text"
              fullWidth
              name="name"
              required
              sx={{ marginBottom: "1rem" }}
              onChange={(e) => setName(e.target.value)}
             
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              name="email"
              required
              sx={{ marginBottom: "1rem" }}
              onChange={(e) => setEmail(e.target.value)}
              
            />
            <TextField
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              required
              name="username"
              sx={{ marginBottom: "1rem" }}
              onChange={(e) => setUsername(e.target.value)}
         
            />
                <TextField
              margin="dense"
              id="phone"
              label="Phone"
              type="text"
              fullWidth
              name="phone"
              sx={{ marginBottom: "1rem" }}
              required
              onChange={(e) => setPhone(e.target.value)}
          
            />
                <TextField
              margin="dense"
              id="address"
              label="Address"
              type="text"
              fullWidth
              name="address"
              sx={{ marginBottom: "1rem" }}
              required
              onChange={(e) => setAddress(e.target.value)}
              
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              name="password"
              sx={{ marginBottom: "1rem" }}
              required
              onChange={(e) => setPassword(e.target.value)}
            
            />
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

export default AddFacility;

