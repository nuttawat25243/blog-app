import { useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Single from './pages/Single'
import Write from './pages/Write'
import Categories from './pages/Categories'
import './App.css'

import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';
function App() {
  const Layout = () => {
    return (
      <div>
      <Nav />
      <Outlet />
      <Footer  />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path:"/",
      element:  <Layout />,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:"/post/:id",
          element:  <Single />
        },
        {
          path:"/categories/",
          element:  <Categories />
        },
        {
          path:"/write",
          element:  <Write />
        },
    ],
  },
  {
      path:"/login",
      element:  <Login />
  },
  {
    path:"/register",
    element:  <Register />
  },

  ])
  

  return (
    <>
    <RouterProvider  router={router}/>
   </>
  )
}

export default App
