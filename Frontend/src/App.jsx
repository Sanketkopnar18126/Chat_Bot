import{Home } from '../src/Pages/Home/Home'
import{Login } from '../src/Pages/Login/Login'
import{Chat } from '../src/Pages/Chat/Chat'
import{SignUp } from '../src/Pages/SignUp/SignUp'
import{PageNotFound } from '../src/Pages/PageNotFound/PageNotFound'
import {  Route, Routes } from "react-router-dom";
import { Header } from './Components/Header/Header'




function App() {

  return (
    <>
      <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* {auth?.isLoggedIn && auth.user && ( */}
          <Route path="/chat" element={<Chat />} />
        {/* )} */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
    </>
  )
}

export default App
