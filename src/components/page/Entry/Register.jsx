import { useState } from 'react'
import {  Link, useNavigate, Outlet } from "react-router-dom"
import { getUserDetails } from '../../../JS/request';
import ErrorMessege from '../../ErrorMessege';
import LoadingMessage from '../../LoadingMessage';
export default function Register() {
  const [load, setLoad] = useState(false);
  const [worngRequest, setworngRequest] = useState(false);
  const navigate = useNavigate();
  const [detailsRegister, setDetailsRegister] = useState({ userName: '', password: '', verifyPassword: '' });
  const handleInputRegisterChange = (e) => {
    const { name, value } = e.target
    setDetailsRegister({
      ...detailsRegister,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }

  async function register() {
    if (detailsRegister.password != detailsRegister.verifyPassword) {
      alert("Passwords don't match");
    }
    else {
      let userDetails = await getUserDetails(detailsRegister.userName,detailsRegister.password, setLoad, setworngRequest);
      if (userDetails.code != 100) {
        if (userDetails.code == 304) {
          let newUserDetails = {
            username: detailsRegister.userName,
            website: detailsRegister.password
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
      {!worngRequest ?
       <div>{(!load) ?
        <div>
          <h2>Register: </h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            register();
          }}>
            <label htmlFor="userName">User Name</label><br />
            <input id="userName" type='text' name='userName' required onChange={(e) => handleInputRegisterChange(e)} /><br />
            <label htmlFor="password">Password</label><br />
            <input id="password" type='password' name='password' autoComplete='2' required onChange={(e) => handleInputRegisterChange(e)} /><br />
            <label htmlFor="password">Verify Password</label><br />
            <input id="verifyPassword" type='password' name='verifyPassword' autoComplete='2' required onChange={(e) => handleInputRegisterChange(e)} /><br /><br />
            <button type="submit" style={{ backgroundColor: "rgb(67, 148, 162)", color: 'white' }}
            >Register</button>
          </form>
          <Link to="/login">Log in</Link>
          <Outlet></Outlet>
        </div>
        :<LoadingMessage/>}
      </div> :
       <ErrorMessege/>
      }
    </>
  )
}



