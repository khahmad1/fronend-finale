import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./auth.css";
import img from "../heroSection/Hero2.png";
import axios from "axios";
import Cookies from "js-cookie";
import userContext from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
const theme = createTheme();

export default function SignUp() {
  const { addToken } = useContext(userContext);
  const { userInfo } = useContext(userContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}facility/signUp`,
        {
          email,
          name,
          password,
          username,
          phone,
          address,
        }
      );
      addToken(response.data.token);
      userInfo(
        response.data.facility._id,
        response.data.facility.email,
        response.data.facility.name,
        response.data.facility.username,
        response.data.facility.phone,
        response.data.facility.address
      );
      toast.success("signUp successful");
      navigate(from);

      Cookies.set("token", response.data.token, { expires: 7 }); // Expires in 7 days
    } catch (error) {
      console.log(error);
      toast.error("Error SignUp, Please Try Again ");
    }
  };

  return (
    <section className="signIn">
      <section className="signIn-img">
        <img src={img} alt="" width={"750px"} height={"500px"} />
      </section>
      <section className="signIn-form">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              noValidate
              onSubmit={handleSubmit}
              sx={{
                
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
               
                marginBottom:2,
                float: "right",
              }}
            >
              <Avatar
                sx={{ m: 3, bgcolor: "var(--primary)", width: 75, height: 75 }}
              >
                <LockOutlinedIcon sx={{ width: 50, height: 50 }} />
              </Avatar>
              <Typography component="h1" variant="h4">
                Sign Up
              </Typography>
              <Box component="form" noValidate sx={{ alignItems: "center" }}>
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <TextField
                    margin="normal"
                    id="fullName"
                    label="Full Name"
                    type="text"
                    fullWidth
                    name="name"
                    required
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    name="password"
                    required
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="you should put your password here"
                  />
                </Box>
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <TextField
                    margin="normal"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    required
                    name="username"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    id="phone"
                    label="Phone"
                    type="text"
                    fullWidth
                    name="phone"
                    required
                    variant="outlined"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Box>
                <TextField
                  margin="normal"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  name="email"
                  required
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  id="address"
                  label="Address"
                  type="text"
                  fullWidth
                  name="address"
                  required
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    backgroundColor: "var(--primary)",
                    fontSize: "16px",
                    border: "1px solid var(--primary)",
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
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      to="/signIn"
                      style={{
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Don't have an account? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
          <ToastContainer />
        </ThemeProvider>
      </section>
    </section>
  );
}
