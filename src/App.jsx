import { useState } from 'react'
import './App.css'
import LogIn from "./components/page/Entry/LogIn"
import Register from "./components/page/Entry/Register"
import Home from "./components/page/Home"
import Info from "./components/page/Info"
import Todos from "./components/page/Todos"
import Albums from "./components/page/Albums"
import Posts from './components/page/Posts'
import LayoutHome from './components/LayoutHome'
import AddDetails from './components/page/Entry/AddDetails'
import NotFound from './components/NotFound'
import Photos from './components/page/Photos'


import { Routes, Route, NavLink, Link, Outlet, Navigate } from "react-router-dom"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<Outlet />} >
          <Route index element={<Register />} />
          <Route path='addDetails' element={<AddDetails />} />
        </Route>
        <Route path="users/:id" element={<Outlet />} >
          <Route path='home' element={<LayoutHome />} >
            <Route index element={<Home />} />
            <Route path='info' element={<Info />} />
            <Route path='todos' element={<Todos />} />
            <Route path='albums' element={<Outlet />} >
              <Route index element={<Albums />} />
              <Route path=':albumId/photos' element={<Photos />} />
            </Route>

            <Route path='posts' element={<Posts />} />

          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
