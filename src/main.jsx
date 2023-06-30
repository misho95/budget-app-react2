import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/homepage'
import Invoice from './pages/invoice'
import Regist from './pages/regist'
import Login from './pages/login'
import Header from './components/header'
import Authenication from './authenication'

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Authenication>
        <Header />
        <HomePage />
      </Authenication>
  },
  {
    path: "/invoice",
    element: 
    <Authenication>
      <Header />
      <Invoice />
    </Authenication>
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
    path: "/signin",
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
