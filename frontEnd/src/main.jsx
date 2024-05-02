import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PostPage from './pages/PostPage.jsx'
import { UserProvider } from './context/userContext.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><App/></UserProvider>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      // {
      //   path: "/user",
      //   element: <PrivateRoute/>
      // },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/posts/:postId",
        element: <PostPage/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
