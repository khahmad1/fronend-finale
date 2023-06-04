import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useContext } from "react";
import adminContext from "../context/AdminContext";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import img from "../heroSection/Hero2.png";
import Loader from "../loader/loader";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginAdmin() {
  const { addTokenAdmin } = useContext(adminContext);
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}admin/login`,
        { password, username }
      );
      addTokenAdmin(response.data.token);
      Cookies.set("token", response.data.token, { expires: 7 });
      toast.success("LogIn successful");
      navigate("/dashboard/dashboard");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error SignIn, Please Try Again");
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <section className="signIn">
      <section className="signIn-img">
        <img src={img} alt="img" width={"750px"} height={"500px"} />
      </section>
      <section className="signIn-form">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              noValidate
              onSubmit={handleSubmit}
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginleft: 5,
                float: "right",
              }}
            >
              <Avatar
                sx={{ m: 3, bgcolor: "var(--primary)", width: 75, height: 75 }}
              >
                <LockOutlinedIcon sx={{ width: 50, height: 50 }} />
              </Avatar>
              <Typography component="h1" variant="h4">
                Sign in
              </Typography>
              <Box component="form" noValidate sx={{ alignItems: "center" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    backgroundColor: "var(--primary)",
                    border: "1px solid var(--primary)",
                    fontSize: "16px",
                    height: "45px",
                    color: "#fff",
                    "&:hover": {
                      color: "var(--primary)",
                      background: "#fff",
                      cursor: "pointer",
                      transition: "0.2s ease-out",
                    },
                  }}
                >
                  {loading ? <Loader /> : "Sign In"} 
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 0 }} />
          </Container>
          <ToastContainer />
        </ThemeProvider>
      </section>
    </section>
  );
}
