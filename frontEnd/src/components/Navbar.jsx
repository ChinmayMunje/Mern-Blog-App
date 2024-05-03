import React, { useEffect, useState, useContext } from 'react'
import { AiFillYoutube } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Modal from './Modal';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { RxCross2 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import { UserContext } from '../context/userContext';

const Navbar = () => {

  const navigate = useNavigate()
  // const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  const { currentUser } = useContext(UserContext);

  const navItems = [
    { path: "/", link: "Home" },
    { path: "/about", link: "About Us" },
    { path: "/contact", link: "Contact" },
    { path: "/dashboard", link: "Create Post" },
  ]

  useEffect(() => {
    // setLogin(isLoggedIn());
    setUser(currentUser);
  }, [login])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  const logOut = () => {
    // doLogOut(() => {
    //   setLogin(false)
    //   navigate("/")
    // })

    // setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/")
    window.location.reload();

  }


  const printUserName = (name) => {
    // return name.split('@')[0];
    let username = name.charAt(0).toUpperCase() + name.slice(1).split(/(?=[A-Z])/)
    let fullName = username.split('@')[0]

    return fullName;
  }

  const handleLoginSuccess = () => {
    setOpenModal(false);
  }

  const handleSignupSuccess = () => {
    setSignupModal(false);
  }

  return (
    <header className='fixed z-50 top-0 left-0 right-0 bg-blue-300'>
      <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>
        <img src="https://osf.digital/library/media/osf/digital/modules/product-summary/bloglink-logo.png" alt="logo" className='w-[140px]' />

        {/* Desktop navigation */}
        <ul className='md:flex gap-12 text-lg hidden font-bold text-blue-900'>
          {navItems.map(({ path, link }) =>
            <li key={path}>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
                to={path}
              >
                {link}
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile navigation toggle */}
        <div className='lg:flex gap-5 items-center hidden'>
          {user && (
            <>
              <button className='rounded-md px-8 py-2 flex items-center text-[14px] font-bold text-blue-950 border-[2px] border-blue-900' onClick={logOut}>Logout</button>
              <div className='font-bold'>{user?.data?.data?.username}</div>
            </>
          )}
          {!user && (
            <>
              <button className='rounded-md px-8 py-2 flex items-center text-[14px] font-bold text-blue-950 border-[2px] border-blue-900' onClick={() => setOpenModal(true)}>Login</button>
              <button className='bg-blue-950 text-white font-bold rounded-lg px-8 py-2 flex items-center text-[14px]' onClick={() => setSignupModal(true)}>SignUp</button>
            </>
          )}
        </div>

        {/* Modal for login */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          {openModal && <Login onSuccess={handleLoginSuccess} />}
        </Modal>

        {/* Modal for signup */}
        <Modal open={signupModal} onClose={() => setSignupModal(false)}>
          {signupModal && <Signup onSignupSuccess={handleSignupSuccess} />}
        </Modal>

        {/* Mobile navigation toggle button */}
        <div className='md:hidden'>
          <button className='cursor-pointer' onClick={toggleMenu}>
            {isMenuOpen ? <RxCross2 className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <div>
        <ul className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-24 bg-white ${isMenuOpen ? "fixed top-0 left-0 w-full transition-all ease-out duration-150" : "hidden"} `}>
          {navItems.map(({ path, link }) =>
            <li key={path} className='text-start hover:bg-gray-200 block rounded-lg'>
              <NavLink onClick={toggleMenu} to={path}>{link}</NavLink>
            </li>
          )}
          <div className='flex flex-row gap-5 items-center'>
            {user && (
              <>
                <button className='rounded-md px-8 py-2 flex items-center text-[14px] font-bold text-blue-950 border-[2px] border-blue-900' onClick={logOut}>Logout</button>
                <div className='font-bold'>{user?.data?.data?.username}</div>
              </>
            )}
            {!user && (
              <>
                <button className='rounded-md px-8 py-2 flex items-center text-[14px] font-bold text-blue-950 border-[2px] border-blue-900' onClick={() => { setOpenModal(true); toggleMenu() }}>Login</button>
                <button className='bg-blue-950 text-white font-bold rounded-lg px-8 py-2 flex items-center text-[14px]' onClick={() => { setSignupModal(true); toggleMenu() }}>SignUp</button>
              </>
            )}
          </div>
        </ul>
      </div>
    </header>


  )
}

export default Navbar