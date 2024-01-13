import { useMemo, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { getUserDetails } from '../../../JS/request';
import ErrorMessege from '../../ErrorMessege';
import LoadingMessage from '../../LoadingMessage';
export default function LogIn() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [worngRequest, setworngRequest] = useState(false);
  const [detailsLogIn, setDetailsLogIn] = useState({ userName: '', password: '' });
  const handleLogInInputChange = (e) => {
    const { name, value } = e.target
    setDetailsLogIn({
      ...detailsLogIn,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }

  async function logInUser() {
    let userDetails = await getUserDetails(detailsLogIn.userName, detailsLogIn.password, setLoad, setworngRequest);
    if (userDetails.code != 100) {
      if (userDetails.code == 304)
      {
        alert("Incorrect Details");//לשאול רות
      }
      else {
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
              <form onSubmit={(e) => { e.preventDefault(); logInUser(); }}>
                <label htmlFor="userName">User Name</label><br />
                <input id="userName" type='text' name='userName' required onChange={(e) => handleLogInInputChange(e)} /><br />
                <label htmlFor="password">Password</label><br />
                <input id="password" type='password' name='password' autoComplete='2' required onChange={(e) => handleLogInInputChange(e)} /><br /><br />
                <button type="submit" style={{ backgroundColor: "rgb(67, 148, 162)", color: 'white' }}>Log In</button>
              </form>
              <Link to="/register">
                Register
              </Link>
            </div>    :  <LoadingMessage />}
        </div> :<ErrorMessege setworngRequest={setworngRequest} />
      }
    </>
  )
}

