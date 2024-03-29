import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import {useDispatch} from 'react-redux'
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInSucess } from "../../Sliice/user.slice";
export const Login = () => {
   const [userData, setuserData] = useState({
      email: "",
      password: "",
   });
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const onHandleSignUp = async (e) => {
      e.preventDefault();
      try {
         const res = await fetch("/users/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
         });

         if (res.ok) {
            const data = await res.json();
            console.log(data);
            dispatch(signInSucess(data))
            toast.success("Signed In Successfully", { id: "login" });
            navigate("/");
         }
      } catch (error) {
         console.log("Error at SignUp Component", error);
         toast.error("Signing In Failed", { id: "login" });
      }
   };
  //  console.log("userData", userData);

   return (
      <Box width={"100%"} height={"100%"} display="flex" flex={1}>
         <Box
            padding={8}
            mt={8}
            display={{ md: "flex", sm: "none", xs: "none" }}
         >
            <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
         </Box>
         <Box
            display={"flex"}
            flex={{ xs: 1, md: 0.5 }}
            justifyContent={"center"}
            alignItems={"center"}
            padding={2}
            ml={"auto"}
            mt={16}
         >
            <form
               style={{
                  margin: "auto",
                  padding: "30px",
                  boxShadow: "10px 10px 20px #000",
                  borderRadius: "10px",
                  border: "none",
               }}
            >
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     justifyContent: "center",
                  }}
               >
                  <Typography
                     variant="h4"
                     textAlign="center"
                     padding={2}
                     fontWeight={600}
                  >
                     Login
                  </Typography>
                  <TextField
                     type="email"
                     name="email"
                     label="Email"
                     value={userData.email}
                     onChange={(e) =>
                        setuserData({ ...userData, email: e.target.value })
                     }
                  />
                  <TextField
                     type="password"
                     name="password"
                     label="Password"
                     value={userData.password}
                     onChange={(e) =>
                        setuserData({ ...userData, password: e.target.value })
                     }
                  />
                  <Button
                     onClick={onHandleSignUp}
                     sx={{
                        px: 2,
                        py: 1,
                        mt: 2,
                        width: "400px",
                        borderRadius: 2,
                        bgcolor: "#00fffc",
                        ":hover": {
                           bgcolor: "white",
                           color: "black",
                        },
                     }}
                     endIcon={<IoIosLogIn />}
                  >
                     Login
                  </Button>
               </Box>
            </form>
         </Box>
      </Box>
   );
};
