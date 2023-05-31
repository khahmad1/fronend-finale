import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import EditAdmin from "./editadmin";
import axios from "axios";
import AddAdmin from "./addAdmin";
import DeleteComponent from "../delete";
import Loader from "../../../components/loader/loader";



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
      field: "username",
      headerName: "Username",
      width: 280,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 280,
      editable: true,
    },
    {
      field: "full_name",
      headerName: "Full-Name",
      width: 280,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 220,
      editable: true,
    },
    {
      field: "edit",
    headerName: "Edit",
    width: 220,
    renderCell: (params) => (
      <EditAdmin id={params.row._id}
      username={params.row.username}
      email={params.row.email}
      name={params.row.full_name}
      setRows={setRows}
      url={"admin"}
  
      />
    ),
    },
    {
      field: "delete",
    headerName: "Delete",
    width: 220,
    renderCell: (params) => (
      <DeleteComponent id={params.row._id}
      url={"admin"} 
      title={"Admin"}
      setRows={setRows}/>
    ),
    },
  ];
  const theme = useTheme();
  const screenXs = useMediaQuery(theme.breakpoints.only("xs"));
  const screenSm = useMediaQuery(theme.breakpoints.only("sm"));
  const screenMd = useMediaQuery(theme.breakpoints.only("md"));
  const screenLg = useMediaQuery(theme.breakpoints.only("lg"));
  const screenXl = useMediaQuery(theme.breakpoints.only("xl"));

  let height =400;
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
        const response = await axios.get(`${process.env.REACT_APP_URL}admin`);
        setRows(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setLoading(false); 
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
        Admin
      </Box>
      <Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4"></Typography>
          <div>
            <AddAdmin setRows={setRows} />
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
