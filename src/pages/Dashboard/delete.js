import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Delete from "@mui/icons-material/Delete";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function DeleteComponent(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = async () => {
    console.log(props);
    setOpen(false);
  
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}${props.url}/delete/${props.id}`
      );
      
      const response = await axios.get(`${process.env.REACT_APP_URL}${props.url}`);
      props.setRows(response.data.response);
      toast.success(`${props.title} deleted successfully!`);
    } catch (error) {
      console.log(error.message);
      toast.error(`Error deleting ${props.title}`);
    }
  };

  return (
    <div>
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
        <Delete/> Delete 
      </Button>
<section>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            color: "#f4f4f9",
            backgroundColor: "var(--primary)",
          }}
        >
          {`Are you sure you want to delete this ${props.title} ?`}
        </DialogTitle>
        
        <DialogActions
          sx={{
            backgroundColor: "var(--primary)",
          }}
        >
          <Button onClick={handleClose} sx={{ color: "#f4f4f9" }}>
            Cancel
          </Button>
      
          <Button
            onClick={handleCloseDelete}
            variant="contained"
            autoFocus
            color="error"
          >
            Delete
          </Button>

        </DialogActions>
      
      </Dialog>
      </section>
    </div>
  );
}

export default DeleteComponent;

