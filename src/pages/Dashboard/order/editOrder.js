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
      const updatedResponse = await axios.get(`${process.env.REACT_APP_URL}order`);
      props.setRows(updatedResponse.data.response);
      toast.success("Order edited successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Error editing Order.");
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
          <BorderColorIcon /> Edit
        </Button>
      </Sheet>
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: "700px" }}>
        <DialogTitle sx={{ backgroundColor: "var(--primary)", color: "white" }}>
          Edit Order
        </DialogTitle>
        <DialogContent>
          <form>
            <FormControl fullWidth sx={{marginTop: "1rem"  }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{ width: "100%"  }}
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
