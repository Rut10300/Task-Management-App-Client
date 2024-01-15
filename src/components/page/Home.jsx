import { useState } from 'react'
import { Routes, useParams, Route, NavLink, Link } from "react-router-dom"
import NotFound from '../NotFound';

export default function Home() {
  const { id } = useParams();
  const userDetails = JSON.parse(localStorage.getItem("currentUser")) ?? "guest";
  console.log(userDetails);


  return (
    <>
      {id == userDetails.id ?
        <>
          <div>
            <h1>Hello {userDetails.name}</h1>
          </div>
        </> : <NotFound />
      }
    </>
  )
}


