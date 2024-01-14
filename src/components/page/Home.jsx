import { useState } from 'react'
import {Routes,useParams, Route, NavLink,Link} from "react-router-dom"
import NotFound from '../NotFound';

export default function Home() {
  const { id } = useParams();
  const userDetails = JSON.parse(localStorage.getItem("currentUser"))??"guest";
  console.log(userDetails);


  return (
    <>
     {id == userDetails.id ?
        <> 
    <div style={{height:"95vh"}}>
      <h2 style={{paddingTop:"20vh"}}>hello {userDetails.name}</h2>
    <h1 >🏠 of Torah and 📖</h1>
    </div>
    </> : <NotFound />
      }
    </>
  )
}


