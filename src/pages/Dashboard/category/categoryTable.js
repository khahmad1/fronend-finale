import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

import { useState,useEffect } from 'react';
import AddCategory from './addCategory';
import axios from 'axios';
import DeleteComponent from '../delete';
import EditCategory from './editCategory';
import Loader from '../../../components/loader/loader';
import "../tabel.css"




const CustomGridToolbar = () => {
  return (
    <GridToolbar
    sx={{
      backgroundColor: 'var(--primary)',
      color: 'white',
      height:50
    }}
  >

  </GridToolbar>
  );
};

const DataGridDemo = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 600,
      editable: true,
    },
    {
      field: "edit",
    headerName: "Edit",
    width: 250,
    renderCell: (params) => (
      <EditCategory id={params.row._id}
      setRows={setRows}
       />
    ),
    },
    {
      field: "delete",
    headerName: "Delete",
    width: 250,
    renderCell: (params) => (
      <DeleteComponent id={params.row._id}
      url={"category"} 
      title={"Category"}
      setRows={setRows}/>
    ),
    },
  ];
  const theme = useTheme();
  const screenXs = useMediaQuery(theme.breakpoints.only('xs'));
  const screenSm = useMediaQuery(theme.breakpoints.only('sm'));
  const screenMd = useMediaQuery(theme.breakpoints.only('md'));
  const screenLg = useMediaQuery(theme.breakpoints.only('lg'));
  const screenXl = useMediaQuery(theme.breakpoints.only('xl'));

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
        const response = await axios.get(`${process.env.REACT_APP_URL}category`);
        setRows(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    
<React.Fragment>
  {loading ? ( // Render loader while loading is true
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
        Category
      </Box>
      <Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4"></Typography>
          <div>
            <AddCategory setRows={setRows}/>
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