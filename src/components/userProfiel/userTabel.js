import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import userContext from '../context/userContext';
import Loader from '../loader/loader';
import axios from 'axios';
import Delete from './deleteorder';

const DataGridDemo = (props) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const { user } = useContext(userContext);
  const theme = useTheme();
  const screenXs = useMediaQuery(theme.breakpoints.only('xs'));
  const screenSm = useMediaQuery(theme.breakpoints.only('sm'));
  const screenMd = useMediaQuery(theme.breakpoints.only('md'));
  const screenLg = useMediaQuery(theme.breakpoints.only('lg'));
  const screenXl = useMediaQuery(theme.breakpoints.only('xl'));

  let height = 360;
  let width = 1000;
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
    width = 1000;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}order/facility/${user._id}`
        );
        const orders = response.data.response;
        const numberOfOrders = orders.length;
        setRows(orders);
        setLoading(false); // Set loading state to false after data is fetched
        // Pass the number of orders to the parent component
        props.onOrdersCount(numberOfOrders);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, [props]);

  const columns: GridColDef[] = [
    {
      field: "facility",
      headerName: "Facility",
      width: 200,
      editable: true,
      valueGetter:(params)=>{
        return params.row.facility.name
      }
    },
    {
      field: "date",
      headerName: "Date",
      width: 155,
      editable: true,
    },
    {
      field: "medicine",
      headerName: "Medicine",
      width: 310,
      editable: true,
      valueGetter: (params) => {
        const medicineNames = params.row.medicine.map((medicine) => medicine.name);
        return medicineNames.join(", ");
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 170,
      editable: true,
    },
    {
      field: "total_price",
      headerName: "Price",
      width: 170,
      editable: true,
    },
    {
      field: "delete",
    headerName: "Delete",
    width: 120,
    renderCell: (params) => (
      <Delete id={params.row._id}
      url={"order"} 
      title={"Order"}
      setRows={setRows}
      fetch={`order/facility/${user._id}`}
      />
    ),
    },
  ];

  return (
    <Box>
      {loading ? ( // Render the loader if the data is still loading
        <Loader />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSize={5}
          getRowId={(row) => row._id}
          width={width}
          height={height}
        />
      )}
    </Box>
  );
};

export default DataGridDemo;
