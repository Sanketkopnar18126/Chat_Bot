import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSucess } from "../../Sliice/user.slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

const {currentUser}=useSelector((state)=>state.userdata)
// console.log("Cu",currentUser)

  const onHandleLogOutBtn=async()=>{
    try {
      const res=await fetch('/users/logout',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        }

      })
      if(res.ok){
        const data=await res.json()
        dispatch(signOutSucess(data))
        toast.success("Log Out Successfully", { id: "logout" });
        navigate("/login");

      }
      
    } catch (error) {
      
      console.log("Error at logOut Component",error)
    }
  }
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />


        
        <div >
          { currentUser && currentUser?.data?.user ?(
          <div className=" flex gap-2 rounded-md">
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
              onClick={onHandleLogOutBtn}
            >
              Logout
            </NavLink>
          </div>
          ):(
          <div>
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
          </div>
)}
        </div>

      </Toolbar>
    </AppBar>
  );
};
