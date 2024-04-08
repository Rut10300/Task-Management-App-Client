import { useState } from 'react'
import { useParams, Outlet } from "react-router-dom"
import NotFound from '../NotFound';

export default function Info() {

  let userData = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  return (
    <>
      {id == userData?.id ?
        <>
          <div>
            <br/>
            <br/>
            <h2>Details of {userData.username}</h2>
            <h3>name: {userData.name}</h3>
            <h3>email: {userData.email}</h3>
            <div>
              <h3>address - </h3>
              <h4>street: {userData.street ?? " "}</h4>
              <h4>city: {userData.city ?? " "}</h4>
              <h4>zipcode: {userData.zipcode ?? " "}</h4>
            </div>
            <h3>phone: {userData?.phone ?? " "}</h3>
            <div>
              <h3>company - </h3>
              <h4>name: {userData?.companyName ?? " "}</h4>
            </div>
            <Outlet />
          </div>
        </> : <NotFound />
      }
    </>
  )
}
