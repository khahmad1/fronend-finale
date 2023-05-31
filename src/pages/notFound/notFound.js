import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";
import { Button} from "@mui/material";
function NotFound() {
  return (
    <main className="main">
      <div className="error">
        <h1 className="code">404</h1>
        <h2 className="desc">Ops... There's something wrong.</h2>
      </div>
      <p className="heart">Made with &hearts; by MAS(@MAS)</p>
      <Button
        sx={{
          color: "var(--primary)",
          border: "1px solid var(--primary)",
          background: "#fff",
          boxShadow:"0px 3px 5px rgba(0,0,0,0.5), 0px 6px 20px rgba(0,0,0,0.3);",
          width:200,
          height:50,
          fontWeight:75,
          "&:hover": {
            color: "var(--primary)",
            background: "#fff",
            transform:"scale(1.1)",
            transition:"0.5s ease-out"
          },
        }}
      >
        <Link to={"/"}>Go To Home</Link>
        
      </Button>
    </main>
  );
}

export default NotFound;
