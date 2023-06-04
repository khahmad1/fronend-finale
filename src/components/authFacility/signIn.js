import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
import Loader from "../loader/loader"

const theme = createTheme();

export default function SignIn() {
  const { addToken } = useContext(userContext);
  const { userInfo } = useContext(userContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false); // Loading state
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}facility/login`,
        {
          email,
          password,
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
      toast.success("logIn successful");
      navigate(from);

      Cookies.set("token", response.data.token, { expires: 7 }); // Expires in 7 days
    } catch (error) {
      console.log(error);
      toast.error("Error SignIn, Please Try Again ");
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <section className="signIn">
      <section className="signIn-img">
        <img src={img} alt="img"  width={"750px"} height={"500px"} />
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
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
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
                    height: "45px",
                    border: "1px solid var(--primary)",
                    color: "#fff",
                    "&:hover": {
                      color: "var(--primary)",
                      background: "#fff",
                      cursor: "pointer",

                      transition: "0.2s ease-out",
                    },
                  }}
                >
                  {loading ? (
                    <Loader /> // Render the loader component when loading is true
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      to="/signUp"
                      style={{
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Don't have an account? Sign Up
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
