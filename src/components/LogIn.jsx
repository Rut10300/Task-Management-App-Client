import { useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate } from "react-router-dom"
import { getUserDetails } from '../JS/request';

export default function LogIn() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [worngRequest, setworngRequest] = useState(false);
  const [details, setDetails] = useState({ userName: '', password: ''});
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDetails({
      ...details,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }

  async function logInUser() {
    console.log(details.userName, details.password);
    let userDetails = await getUserDetails(details.userName, details.password, setLoad, setworngRequest);
    console.log(userDetails);
    if (userDetails.code != 100) {
      if (userDetails.code == 300)
        alert("Incorrect Details");
      else {
        console.log(userDetails.params);
        let id = userDetails.params.id;
        localStorage.setItem("currentUser", JSON.stringify(userDetails.params));
        navigate(`/users/${id}/home`);
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
              <form onSubmit={(e) => {
                e.preventDefault();
                logInUser();
              }}>
                <label htmlFor="userName">User Name</label><br />
                <input id="userName" type='text' name='userName' required onChange={(e) => handleInputChange(e)} /><br />
                <label htmlFor="password">Password</label><br />
                <input id="password" type='password' name='password' autoComplete='2' required onChange={(e) => handleInputChange(e)} /><br /><br />
                <button type="submit" style={{ backgroundColor: "rgb(67, 148, 162)", color: 'white' }}>Log In</button>
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

