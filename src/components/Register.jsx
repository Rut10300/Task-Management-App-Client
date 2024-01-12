import { useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate, Outlet } from "react-router-dom"
import { getUserDetails, postUserDetails } from '../JS/request';

export default function Register() {
  const [load, setLoad] = useState(false);
  const [worngRequest, setworngRequest] = useState(false);
  const navigate = useNavigate();

  const [details, setDetails] = useState({ userName: '', password: '', verifyPassword: '' });
  const handleInputChange = (e) => {
    console.log("");
    const { name, value } = e.target
    setDetails({
      ...details,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }

  async function register() {
    console.log("hi");
    if (details.password != details.verifyPassword) {
      alert("Passwords don't match");
    }
    else {
      let userDetails = await getUserDetails(details.userName, setLoad, setworngRequest);
      if (userDetails.code != 100) {
        if (userDetails.code == 300) {
          let newUserDetails = {
            username: details.userName,
            website: details.password
          };
          navigate(`/register/addDetails`, { state: { userDetails: newUserDetails } });
        }
        else
          alert("wrong username or password");
      }
    }

  }
  return (
    <>
      {!worngRequest ? <div>{(!load) ?
        <div>
          <h2>Register: </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            register();
          }}>
            <label htmlFor="userName">User Name</label><br />
            <input id="userName" type='text' name='userName' required onChange={(e) => handleInputChange(e)} /><br />
            <label htmlFor="password">Password</label><br />
            <input id="password" type='password' name='password' autoComplete='2' required onChange={(e) => handleInputChange(e)} /><br />
            <label htmlFor="password">Verify Password</label><br />
            <input id="verifyPassword" type='password' name='verifyPassword' autoComplete='2' required onChange={(e) => handleInputChange(e)} /><br /><br />
            <button type="submit" style={{ backgroundColor: "rgb(67, 148, 162)", color: 'white' }}
            >Register</button>
          </form>
          <Link to="/login">Log in</Link>
          <Outlet></Outlet>
        </div>
        : <div >
          <h1>Loading...</h1>
        </div>}
      </div> :
        <div >
          <h1>something worng...</h1>
          <button onClick={() => { setworngRequest(false) }}>try again</button>
        </div>
      }
    </>
  )
}



