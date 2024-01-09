import { useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate, Outlet } from "react-router-dom"
import { getUserDetails, postUserDetails } from '../JS/request';

export default function Register() {
  const [load, setLoad] = useState(false);
  const [worngRequest, setworngRequest] = useState(false);
  const navigate = useNavigate();
  async function register(userName, password, verifyPassword) {
    if (password != verifyPassword) {
      alert("Passwords don't match");
    }
    else {
      let userDetails = await getUserDetails(userName, setLoad, setworngRequest);
      if (userDetails.code != 100) {
        if (userDetails.code == 300) {
          let newUserDetails = {
            username: userName,
            website: password
          };
         // let newUserDetails = await postUserDetails(userName, password, setLoad, setworngRequest);
         // localStorage.setItem("currentUser", JSON.stringify({ userDetails: userDetails }));
         // navigate(`/users/${newUserDetails.id}/addDetails`);
           navigate(`/register/addDetails` ,{state:{userDetails:newUserDetails}});
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
          <form>
            <label htmlFor="userName">User Name</label><br />
            <input id="userName" type='text' name='username' required /><br />
            <label htmlFor="password">Password</label><br />
            <input id="password" type='password' name='password' autoComplete='2' required /><br />
            <label htmlFor="password">Verify Password</label><br />
            <input id="verifyPassword" type='password' name='password' autoComplete='2' required /><br /><br />
            <button onClick={() => {
              register(userName.value, password.value, verifyPassword.value);
              userName.value = "";
              password.value = "";
              verifyPassword.value = "";
            }}
              style={{ backgroundColor: "rgb(67, 148, 162)", color: 'white' }}
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



