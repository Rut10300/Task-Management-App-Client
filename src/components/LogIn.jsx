import { useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate } from "react-router-dom"
import { getUserDetails } from '../JS/request';

export default function LogIn() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [worngRequest, setworngRequest] = useState(false);
   async function logInUser(password, userName) {
    let userDetails = await getUserDetails(userName, password,setLoad, setworngRequest);
   console.log(userDetails);
    if (userDetails.code != 100) {
      if (userDetails.code == 300)
        alert("Incorrect Details");
      else {
        let id = userDetails.params.id;
        // if (password == userDetails.params.website) {
          localStorage.setItem("currentUser", JSON.stringify( userDetails.params ));
          navigate(`/users/${id}/home`);
       // }
        // else
        //   alert("Incorrect Details");
      }
    }
  }

  return (
    <>
      {!worngRequest ?
        <div>
          {(!load) ?
            <div>
              <h2>Log In</h2>
              <form>
                <label htmlFor="userName">User Name</label><br />
                <input id="userName" type='text' name='username' required /><br />
                <label htmlFor="password">Password</label><br />
                <input id="password" type='password' name='password' autoComplete='2' required /><br /><br />
                <button type="button" onClick={() => {
                  logInUser(password.value, userName.value);
                  password.value = "";
                  userName.value = "";
                }}
                  style={{ backgroundColor: "rgb(67, 148, 162)", color: 'white' }}>Log In</button>
              </form>
              <Link to="/register">
                Register
              </Link>
            </div>
            :
            <div >
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

