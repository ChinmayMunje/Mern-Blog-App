import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Seatbooking from './pages/Seatbooking'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <ToastContainer position='bottom-center' />
      <Outlet />
      <Footer />
      {/* <Seatbooking/> */}
    </>
  )
}

export default App
