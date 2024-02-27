import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useState } from "react";
export const SignUp = () => {
const [userData,setuserData]=useState({
   fullname:"",
   email:"",
   password:""
})
const navigate=useNavigate()
const onHandleSignUp=async(e)=>{
   e.preventDefault()
   try {
      const res=await fetch('/users/register',{
         method:"POST",
         headers:{
            'Content-Type':'application/json'
         },
         body:JSON.stringify(userData)
      })

      if(res.ok){
         const data=await res.json()
         // console.log(data)
         toast.success("Signed Up Successfully", { id: "signup" });
         navigate('/login')
      }
      
   } catch (error) {
      console.log("Error at SignUp Component",error)
   }

}
// console.log("userData",userData)


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
                     Signup
                  </Typography>
                  <TextField
                     type="text"
                     name="name"
                     label="Name"
                     value={userData.fullname}
                     onChange={(e)=>setuserData({...userData,fullname:e.target.value})}
                 
                  />
                  <TextField
                     type="email"
                     name="email"
                     label="Email"
                     className="text-white"
                     value={userData.email}
                     onChange={(e)=>setuserData({...userData,email:e.target.value})}
                  />
                  <TextField
                     type="password"
                     name="password"
                     label="Password"
                     className="text-white"
                     value={userData.password}
                     onChange={(e)=>setuserData({...userData,password:e.target.value})}
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
                     Signup
                  </Button>
               </Box>
            </form>
         </Box>
      </Box>
   );
};
