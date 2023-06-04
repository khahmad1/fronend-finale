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
import EditFacility from "./editFacility";
import AddFacility from "./addFacility";
import "../tabel.css"

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
      field: "name",
      headerName: "Name",
      width: 250,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      width: 250,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: true,
    },

    {
      field: "phone",
      headerName: "Phone",
      width: 250,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => (
        <EditFacility
          id={params.row._id}
          username={params.row.username}
          email={params.row.email}
          name={params.row.name}
          phone={params.row.phone}
          address={params.row.address}
          setRows={setRows}
        />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: (params) => (
        <DeleteComponent
          id={params.row._id}
          url={"facility"}
          title={"Facility"}
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
        const response = await axios.get(
          `${process.env.REACT_APP_URL}facility`
        );
        setRows(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching facility data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <Loader /> // Render loader while loading is true
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
            Facility
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
                <AddFacility setRows={setRows} />
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
