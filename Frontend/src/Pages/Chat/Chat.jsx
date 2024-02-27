import { IoMdSend } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import {useSelector} from 'react-redux'
import { useState } from "react";
export const Chat = () => {

const [chat,setchat]=useState({
  message:""
})
  const {currentUser}=useSelector((state)=>state.userdata)
  console.log("cu",currentUser)
const onHandleSendChat=async()=>{
  try {
    const res=await fetch('/users/chat',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(Chat)
    })
    if(res.ok){
      const data=await res.json()
      console.log(data)
    }
    
  } catch (error) {
    console.log("error ata Chat component",error)
  }
}
// console.log("chat",chat)
  return (
    <Box
    sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      gap: 3,
    }}
  >
    <Box
      sx={{
        display: { md: "flex", xs: "none", sm: "none" },
        flex: 0.2,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "60vh",
          bgcolor: "rgb(17,29,39)",
          borderRadius: 5,
          flexDirection: "column",
          mx: 3,
        }}
      >
        <Avatar
          sx={{
            mx: "auto",
            my: 2,
            bgcolor: "white",
            color: "black",
            fontWeight: 700,
          }}
        >
          {currentUser?.data?.user?.fullname}
        </Avatar>
        <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
          You are talking to a ChatBOT
        </Typography>
        <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
          You can ask some questions related to Knowledge, Business, Advices,
          Education, etc. But avoid sharing personal information
        </Typography>
        <Button
          sx={{
            width: "200px",
            my: "auto",
            color: "white",
            fontWeight: "700",
            borderRadius: 3,
            mx: "auto",
           
           
          }}
          className="hover:bg-red-700 bg-red-500"
        >
          Clear Conversation
        </Button>
      </Box>
    </Box>
    <Box
      sx={{
        display: "flex",
        flex: { md: 0.8, xs: 1, sm: 1 },
        flexDirection: "column",
        px: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: "40px",
          color: "white",
          mb: 2,
          mx: "auto",
          fontWeight: "600",
        }}
      >
        Model - GPT 3.5 Turbo
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "60vh",
          borderRadius: 3,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {/* {chatMessages.map((chat, index) => (
          //@ts-ignore
          <ChatItem content={chat.content} role={chat.role} key={index} />
        ))} */}
      </Box>
      <div
        style={{
          width: "100%",
          borderRadius: 8,
          backgroundColor: "rgb(17,27,39)",
          display: "flex",
          margin: "auto",
        }}
      >
        {" "}
        <input
         value={chat.message}
         onChange={(e)=>setchat({...chat,message:e.target.value})}
          type="text"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            padding: "30px",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "20px",
          }}
        />
        <IconButton onClick={onHandleSendChat}  sx={{ color: "white", mx: 1 }}>
          <IoMdSend />
        </IconButton>
      </div>
    </Box>
  </Box>
  )
}
