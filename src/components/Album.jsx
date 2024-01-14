import { useState } from 'react'
import {Routes, Route, NavLink,Link} from "react-router-dom"
import '../components/css/albums.css'

export default function Album({ album,  setLoad }) {
  return (
    <>
    <div id="album">
        <h3 id="idAlbun">{album.id}</h3>
        <h4>{album.title}</h4>
    </div>
    
    </>
  )
}


