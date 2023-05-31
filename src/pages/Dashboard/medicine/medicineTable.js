import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Loader from "../../../components/loader/loader";
import { useState, useEffect } from "react";
import axios from "axios";

import AddMedicine from "./addMedicine";
import DeleteComponent from "../delete";
import EditMedicine from "./editMedicine";


const CustomGridToolbar = () => {
  return (
    <GridToolbar
      sx={{
        backgroundColor: "var(--primary)",
        color: "white",
        height: 50,
      }}
    ></GridToolbar>
  );
};

const DataGridDemo = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    width: 150,
    editable: true,
    renderCell: (params) => (
      <img
        src={`${process.env.REACT_APP_URL}${params.value}`}
        alt="Medicine"
        style={{ width: "50%", height: "90%", }}
      />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 180,
    editable: true,
  },
  {
    field: "company",
    headerName: "Company",
    width: 150,
    editable: true,
  },
  {
    field: "type",
    headerName: "Type",
    width: 140,
    editable: true,
  },
  {
    field: "originCountry",
    headerName: "Country",
    width: 140,
    editable: true,
  },
  {
    field: "Category",
    headerName: "Category",
    width: 140,
    editable: true,
    valueGetter: (params) => {
      return params.row.Category.name;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    editable: true,
  },
  {
    field: "expiration_date",
    headerName: "Expiration Date",
    width: 150,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
    editable: true,
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 120,
    renderCell: (params) => <EditMedicine id={params.row._id}  setRows={setRows}/>,
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 120,
    renderCell: (params) => (
      <DeleteComponent
        id={params.row._id}
        url={"medicine"}
        title={"Medicine"}
        setRows={setRows}
      />
    ),
  },
];
  const theme = useTheme();
  const screenXs = useMediaQuery(theme.breakpoints.only("xs"));
  const screenSm = useMediaQuery(theme.breakpoints.only("sm"));
  const screenMd = useMediaQuery(theme.breakpoints.only("md"));
  const screenLg = useMediaQuery(theme.breakpoints.only("lg"));
  const screenXl = useMediaQuery(theme.breakpoints.only("xl"));

  let height = 1100;
  let width = 1100;

  if (screenXs) {
    height = 200;
    width = 200;
  } else if (screenSm) {
    height = 250;
    width = 400;
  } else if (screenMd) {
    height = 300;
    width = 600;
  } else if (screenLg) {
    height = 360;
    width = 800;
  } else if (screenXl) {
    height = 360;
    width = 1100;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}medicine`
        );
        setRows(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Box
            component="h1"
            sx={{
              borderBottom: "4px solid var(--primary)",
              width: "30px",
              marginBottom: "2em",
              fontSize: "2em",
            }}
          >
            Medicine
          </Box>
          <Box>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography></Typography>
              <div>
                <AddMedicine sx={{ marginTop: "2em" }} setRows={setRows} />
              </div>
            </div>
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              pageSize={5}
              getRowId={(row) => row._id}
              title=""
              slots={{
                toolbar: CustomGridToolbar,
              }}
              width={width}
              height={height}
            />
          </Box>
        
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DataGridDemo;
