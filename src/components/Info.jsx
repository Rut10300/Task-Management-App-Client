import { useState } from 'react'
import { Routes, Route, NavLink, Link } from "react-router-dom"

export default function Info() {
  let userData = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <>
      <div>
        <h2>Details of {userData.username}</h2>
        <h3>name: {userData.name}</h3>
        <h3>email: {userData.email}</h3>
        <div>
          <h3>address:</h3>
          <h4>street: {userData.address?.street}</h4>
          <h4>suite: {userData.address?.suite}</h4>
          <h4>city: {userData.address?.city}</h4>
          <h4>zipcode: {userData.address?.zipcode}</h4>
          
            <h4>geo: lat:{userData.address?.geo?.lat} lng {userData.address?.geo?.lng}</h4>
          
        </div>
        <h3>phone {userData?.phone}</h3>
        <h3>website {userData?.website}</h3>
        <div>
          <h3>company:</h3>
          <h4>name: {userData?.company.name}</h4>
          <h4>catch Pharse: {userData?.company.catchPharse}</h4>
          <h4>bs: {userData?.company.bs}</h4>
        </div>

      </div>
    </>
  )
}
