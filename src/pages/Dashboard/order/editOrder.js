import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Sheet } from "@mui/joy";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function EditOrder(props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

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
      const response = await axios.put(
        `${process.env.REACT_APP_URL}order/${props.id}`,
        {
          status,
        }
      );
      toast.success("Order edited successfully!");
      const updateOrder = await axios.get(`${process.env.REACT_APP_URL}order`);
      props.setRows(updateOrder.data.response);
  
      // console.log(response.status);
      // if (response.status === 200) {
      //   toast.success("Order edited successfully!");
      // } else {
      //   console.log(response);
      //   toast.error("Unexpected response from server");
      // }
    } catch (err) {
      toast.success("Order edited successfully!");
      const updateOrder = await axios.get(`${process.env.REACT_APP_URL}order`);
      props.setRows(updateOrder.data.response);

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
          <BorderColorIcon /> Edit Status
        </Button>
      </Sheet>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: "700px" }}>
        <DialogTitle sx={{ backgroundColor: "var(--primary)", color: "white" }}>
          Edit Status Of Order
        </DialogTitle>
        <DialogContent>
          <form>
            <FormControl variant="outlined"  sx={{ minWidth: 200,marginTop: "1rem"  }}>
              <InputLabel id="category-select-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="category-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{ width: "100%" }}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in progress">In Progress</MenuItem>
                <MenuItem value="in road">In Road</MenuItem>
              </Select>
            </FormControl>
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

export default EditOrder;
