import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./ButtonCategory.css";
import MedicineCard from "../card/card";
import Loader from "../loader/loader";

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ButtonCategory(props) {
  const theme = useTheme();
  const [categoryName, setCategoryName] = useState("");
  const [names, setNames] = useState([]);
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const [selectedButtonName, setSelectedButtonName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}category`);
        setNames(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Category data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setCategoryName(value);

    if (value === "All Medicines") {
      setSelectedButtonId(null);
      setSelectedButtonName("");
    } else {
      const selectedButton = names.find((name) => name.name === value);
      if (selectedButton) {
        setSelectedButtonId(selectedButton._id);
        setSelectedButtonName(selectedButton.name);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Our Products</h1>
      <section className="category">
        <FormControl variant="outlined"sx={{ minWidth: 250,}} >
          <InputLabel id="category-select-label">Select a category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={categoryName}
            onChange={handleChange}
            label="Select a category"
          >
            <MenuItem onClick={handleChange} value="All Medicines">All Medicines</MenuItem>
            {names.map((name) => (
              <MenuItem key={name._id} value={name.name}>
                {name.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
     
      </section>
      {loading ? (
          <Loader />
        ) : (
          <div>
            <MedicineCard
              categoryId={selectedButtonId}
              title={selectedButtonName || "All Medicines"}
            />
          </div>
        )}
    </div>
  );
}
