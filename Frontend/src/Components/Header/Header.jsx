import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div className="bg-white">
          <>
            <NavLink
              to="/chat"
              style={{ backgroundColor: "#00fffc", color: "black" }}
              activeStyle={{ backgroundColor: "#00fffc", color: "black" }}
            >
              Go To Chat
            </NavLink>
            <NavLink
              to="/"
              style={{ backgroundColor: "#51538f", color: "white" }}
              activeStyle={{ backgroundColor: "#51538f", color: "white" }}
            >
              Logout
            </NavLink>
          </>

          <>
            <NavLink
              to="/login"
              style={{ backgroundColor: "#00fffc", color: "black" }}
              activeStyle={{ backgroundColor: "#00fffc", color: "black" }}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              style={{ backgroundColor: "#51538f", color: "white" }}
              activeStyle={{ backgroundColor: "#51538f", color: "white" }}
            >
              Signup
            </NavLink>
          </>
        </div>
      </Toolbar>
    </AppBar>
  );
};
