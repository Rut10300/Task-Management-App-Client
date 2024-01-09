import { useState } from 'react'
import { Routes, Route, NavLink, Link, useParams, useNavigate, useLocation } from "react-router-dom"
import { postUserDetails } from '../JS/request';

export default function AddDetails() {
    const location = useLocation();
    const [load, setLoad] = useState(false);
    const [worngRequest, setworngRequest] = useState(false);

    const navigate = useNavigate();

    const userValues = {
        name: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        companyName: '',
        catchPharse: '',
        phoneNumber: ''
    }
    const [details, setDetails] = useState(userValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setDetails({
            ...details,
            [name]: value
        })
        e.target.classList.remove("notTouch");
    }


    async function saveDetails() {
        let userdata = location.state.userDetails;
        const user = {
            name: details.name,
            username: userdata.username,
            email: details.email,
            address: {
                street: details.street,
                city: details.city,
                zipcode: details.zipcode
            },
            phone: details.phoneNumber,
            website: userdata.website,
            company: {
                name: details.companyName,
                catchPharse: details.catchPharse,
            }
        }
        let userAfterPost = await postUserDetails(user, setLoad, setworngRequest);
        console.log(userAfterPost);
        if (userAfterPost.code == 200) {
            localStorage.setItem("currentUser", JSON.stringify(userAfterPost.params.username ));
            navigate(`/users/${userAfterPost.params.id}/home`);
        }
    }
    return (
        <>
            {!worngRequest ?
                <div>
                    {(!load)?
                        <div>
                            <h1>Add Details</h1>
                            <form>
                                <div id="form" >
                                    <label htmlFor="name">Name</label><br />
                                    <input id="name" className='notTouch' name="name" onChange={(e) => handleInputChange(e)} type="text" placeholder='Israel' pattern="\w{2,15}" /><br />
                                    <label htmlFor="email">Email</label><br />
                                    <input id="email" className='notTouch' name="email" type="email" onChange={(e) => handleInputChange(e)} placeholder='israel@gmail.com' /><br />
                                    <label htmlFor="street">Street</label><br />
                                    <input id="street" className='notTouch' name="street" onChange={(e) => handleInputChange(e)} type="text" placeholder='' /><br />
                                    <label htmlFor="city">City</label><br />
                                    <input id="city" className='notTouch' name="city" onChange={(e) => handleInputChange(e)} type="text" placeholder='Jerusalem' /><br />
                                    <label htmlFor="zipcode">Zipcode</label><br />
                                    <input id="zipcode" className='notTouch' name="zipcode" type="number" onChange={(e) => handleInputChange(e)} placeholder='12345-6789' pattern="[0-9]{5,9}" /><br />
                                    <label htmlFor="pnumber">Phon Number</label><br />
                                    <input id="phonNumber" className='notTouch' name="phoneNumber" type="tel" onChange={(e) => handleInputChange(e)} placeholder='0583212345' pattern="[0-9]{10}" /><br />
                                    <label htmlFor="companyName">Company Name</label><br />
                                    <input id="companyName" className='notTouch' name="companyName" onChange={(e) => handleInputChange(e)} type="text" /><br />
                                    <label htmlFor="catchPharse">Company Catch Pharse</label><br />
                                    <input id="catchPharse" type="text" className='notTouch' name="catchPharse" onChange={(e) => handleInputChange(e)} /><br />
                                    <button type="sumbit" id='submitButton' className='submit' style={{ backgroundColor: "rgb(67, 148, 162)", color: 'white' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            saveDetails();
                                        }}>Add</button>
                                </div>
                            </form>
                        </div> :
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

