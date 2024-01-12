import { useState } from 'react'
import {Routes, Route, NavLink,Link} from "react-router-dom"

export default function Album({ album,  setLoad }) {
  return (
    <>
    <div>
        <h3>{album.id}</h3>
        <h4>{album.title}</h4>
    </div>
    
    </>
  )
}


