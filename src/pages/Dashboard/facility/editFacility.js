import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Sheet } from "@mui/joy";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditFacility(props) {
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
    setOpen(false);
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}facility/update/${props.id}`,
        {
          email,
          name,
          password,
          username,
          phone,
          address,
        }
      );
      const updatedResponse = await axios.get(
        `${process.env.REACT_APP_URL}facility`
      );
      props.setRows(updatedResponse.data.response);
      toast.success("Facility Edit successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error editing Facility.");
    }
  };

  return (
    <section className="addForm">
      <Sheet>
        <Button
      sx={{
          
        fontSize: "12px",
        color: "var(--primary)",
        "&:hover": {
          color: "#fff",
          cursor: "pointer",
          transform: "scale(1)",
          backgroundColor: "var(--primary)",
          transition: "0.2s ease-out",
        },
      }}
          onClick={handleClickOpen}
        >
          <BorderColorIcon /> Edit
        </Button>
      </Sheet>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "#0097b2", color: "white" }}>
          Edit Facility
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
              placeholder={props.name}
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
              placeholder={props.email}
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
              placeholder={props.username}
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
              placeholder={props.phone}
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
              placeholder={props.address}
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
              placeholder="you should to put here your Password"
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

export default EditFacility;
