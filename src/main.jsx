import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/homepage'
import Invoice from './pages/invoice'
import Regist from './pages/regist'
import Login from './pages/login'
import Header from './components/header'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
        <Header />
        <HomePage />
      </>
  },
  {
    path: "/invoice",
    element: 
    <>
    <Header />
    <Invoice />
    </>
  },
  {
    path: "/registration",
    element: 
    <>
    <Header />
    <Regist />
    </>
  },
  {
    path: "/login",
    element: 
    <>
    <Header />
    <Login />
    </>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
