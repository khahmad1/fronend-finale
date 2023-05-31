import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { Typography } from "@mui/material";
import DeleteComponent from "../delete";
import Loader from "../../../components/loader/loader";


const CustomGridToolbar = () => (
  <GridToolbar
    sx={{
      backgroundColor: "var(--primary)",
      color: "white",
      height: 50,
    }}
  />
);

const DataGridDemo = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      editable: true,
    },
    {
      field: "message",
      headerName: "Message",
      width: 600,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 400,
      editable: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: (params) => (
        <DeleteComponent id={params.row._id} url={"inbox"} title={"Message"} setRows={setRows} />
      ),
    },
  ];
  const theme = useTheme();
  const screenXs = useMediaQuery(theme.breakpoints.only("xs"));
  const screenSm = useMediaQuery(theme.breakpoints.only("sm"));
  const screenMd = useMediaQuery(theme.breakpoints.only("md"));
  const screenLg = useMediaQuery(theme.breakpoints.only("lg"));
  const screenXl = useMediaQuery(theme.breakpoints.only("xl"));

  const calculateResponsiveSize = () => {
    let height = 400;
    let width = 1100;

    if (screenXs) {
      height = 200;
      width = "100%";
    } else if (screenSm) {
      height = 250;
      width = "100%";
    } else if (screenMd) {
      height = 300;
      width = "100%";
    } else if (screenLg) {
      height = 360;
      width = "100%";
    } else if (screenXl) {
      height = 360;
      width = "100%";
    }

    return { height, width };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}inbox`);
        setRows(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching message data", error);
      }
    };

    fetchData();
  }, []);

  const { height, width } = calculateResponsiveSize();

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
            Message
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
              <div style={{ padding: "8px" }}></div>
            </div>

            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              pageSize={5}
              getRowId={(row) => row._id}
              components={{
                Toolbar: CustomGridToolbar,
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
