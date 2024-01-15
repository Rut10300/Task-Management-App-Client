import { useState } from 'react'
import { Routes, useParams, Route, NavLink, Link } from "react-router-dom"
import NotFound from '../NotFound';
import '../css/home.css'

export default function Home() {
  const { id } = useParams();
  const userDetails = JSON.parse(localStorage.getItem("currentUser")) ?? "guest";

  return (
    <>
      {id == userDetails.id ?
        <>
        <h1 className='h1Hello'>Hello {userDetails.username} 😘 </h1>
          <div className="allLinks">

            <Link to={`todos`}><div className="todos">Todos</div></Link>
            <Link to={`posts`}><div className="posts">Posts</div></Link>
            <Link to={`albums`}> <div className="albums">Albums</div></Link>

          </div>
        </> : <NotFound />
      }
    </>
  )
}


