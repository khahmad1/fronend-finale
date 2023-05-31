import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Loader from "../../../components/loader/loader";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteComponent from "../delete";
import EditOrder from "./editOrder";



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
      field: "facility",
      headerName: "Facility",
      width: 220,
      editable: true,
      valueGetter: (params) => {
        return params.row.facility.name;
      },
    },
    {
    
      headerName: "Facility-Email",
      width: 230,
      editable: true,
      valueGetter: (params) => {
        return params.row.facility.email;
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: true,
    },
    {
      field: "medicine",
      headerName: "Medicine",
      width: 310,
      editable: true,
      valueGetter: (params) => {
        const medicineNames = params.row.medicine.map((medicine) => medicine.name);
        return medicineNames.join(", "); // Join the medicine names with a comma separator
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      editable: true,
    },
    {
      field: "total_price",
      headerName: "Price",
      width: 180,
      editable: true,
    },
    {
      field: "edit",
    headerName: "Edit",
    width: 130,
    renderCell: (params) => (
      <EditOrder id={params.row._id}
      setRows={setRows}
       />
    ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: (params) => (
        <DeleteComponent id={params.row._id} url={"order"} title={"Order"}   setRows={setRows}/>
      ),
    },
  ];
  const theme = useTheme();
  const screenXs = useMediaQuery(theme.breakpoints.only("xs"));
  const screenSm = useMediaQuery(theme.breakpoints.only("sm"));
  const screenMd = useMediaQuery(theme.breakpoints.only("md"));
  const screenLg = useMediaQuery(theme.breakpoints.only("lg"));
  const screenXl = useMediaQuery(theme.breakpoints.only("xl"));

  let height = 400;
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
        const response = await axios.get(`${process.env.REACT_APP_URL}order`);
        setRows(response.data.response);
        console.log(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order data:', error);
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
        borderBottom: '4px solid var(--primary)',
        width: '30px',
        marginBottom: '2em',
        fontSize: '2em',
      }}
    >
      Order
    </Box>
    <Box>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4"></Typography>
        <div>
          .
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

