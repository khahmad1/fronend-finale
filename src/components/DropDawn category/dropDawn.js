import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, CategoryName, theme) {
  return {
    fontWeight:
      CategoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SingleSelectPlaceholder(props) {
  const theme = useTheme();
  const [CategoryName, setCategoryName] = useState("");
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}category`);
        setNames(response.data.response);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Category data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setCategoryName(value);
    const data = [names.find((name) => name.name === value)._id];
    props.onChildData(data);
    console.log(data);
  };

  return (
    <div>
       <FormControl  sx={{ marginBottom: "1rem", marginLeft: "1rem"  , width:238 }} >
               <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
      
          value={CategoryName}
          onChange={handleChange}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Category"
          renderValue={(selected) => {
            if (!selected) {
              return <em>Team</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
        //   inputProps={{ "aria-label": "Without label" }}
        >
         
          {names.map((name) => (
            <MenuItem
              key={name._id}
              value={name.name}
              style={getStyles(name.name, CategoryName, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

