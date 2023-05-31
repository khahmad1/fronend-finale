import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Sheet } from "@mui/joy";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory(props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState();

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
      const response = await axios.post(
        `${process.env.REACT_APP_URL}category`,
        {
          
          name,
          
        }
      );
      const updatedResponse = await axios.get(`${process.env.REACT_APP_URL}category`);
      props.setRows(updatedResponse.data.response);
      toast.success("Category added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error adding Adding.");
    }
  };

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
      <AddCircleOutlineIcon /> Add category
    </Button>
      </Sheet>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "var(--primary)", color: "white" }}>
          Add New Category 
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              name="name"
              required
              sx={{ marginBottom: "1rem" }}
              onChange={(e) => setName(e.target.value)}
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

export default AddCategory;
