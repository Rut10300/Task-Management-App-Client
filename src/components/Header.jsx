import {  NavLink} from "react-router-dom"

export default function Header() {
    let userName = JSON.parse(localStorage.getItem("currentUser"))?.name??"Guest";

    function logout() {
        localStorage.setItem("currentUser", " ");
    }
    const activeStyle = {
        fontWeight: "bold",
        color: "red"
    }
    return (
        <>
            <NavLink className="navLink" to='.' end style={({ isActive }) => isActive ? activeStyle : null}>HOME</NavLink>
            <NavLink className="navLink" to={`todos`} style={({ isActive }) => isActive ? activeStyle : null}>Todos</NavLink>
            <NavLink className="navLink" to={`info`}  style={({ isActive }) => isActive ? activeStyle : null} >Info</NavLink>
            <NavLink className="navLink" to={`albums`} style={({ isActive }) => isActive ? activeStyle : null}>Albums</NavLink>
            <NavLink className="navLink" to={`posts`} style={({ isActive }) => isActive ? activeStyle : null}>Posts</NavLink>
            <NavLink className="navLink" onClick={() => logout()} to={`/login`} style={({ isActive }) => isActive ? activeStyle : null}>Log Out</NavLink>
            <h3>hello { userName}</h3>

        </>
    )
}


