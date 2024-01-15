import { useState } from 'react'
import {  useNavigate, useLocation } from "react-router-dom"
import { postUserDetails } from '../../../JS/request';
import ErrorMessege from '../../ErrorMessege';
import LoadingMessage from '../../LoadingMessage';
import NotFound from '../../NotFound';
import './addDetails.css'
export default function AddDetails() {
    const location = useLocation();
    let userdata = location.state.userDetails;

    const [load, setLoad] = useState(false);
    const [worngRequest, setworngRequest] = useState(false);
    const navigate = useNavigate();
    const userValues = {
        name: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        lat: '',
        lng: '',
        phoneNumber: '',
        companyName: '',
        catchPharse: '',
        companyBs: ''
    }
    const [detailsAddUser, setDetailsAddUser] = useState(userValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setDetailsAddUser({
            ...detailsAddUser,
            [name]: value
        })
        e.target.classList.remove("notTouch");
    }


    async function saveDetails() {
 
        if(userdata!=null)
        {
        const user = {
            name: detailsAddUser.name,
            username: userdata.username,
            email: detailsAddUser.email,
            address: {
                street: detailsAddUser.street,
                city: detailsAddUser.city,
                zipcode: detailsAddUser.zipcode,
                geo: {
                    lat: detailsAddUser.lat,
                    lng: detailsAddUser.lng
                }
            },
            phone: detailsAddUser.phoneNumber,
            website: userdata.website,
            company: {
                name: detailsAddUser.companyName,
                catchPharse: detailsAddUser.catchPharse,
                bs: detailsAddUser.companyBs
            }
        }
        let userAfterPost = await postUserDetails(user, setLoad, setworngRequest);
        if (userAfterPost.code == 200) {
            console.log(userAfterPost.params);
            localStorage.setItem("currentUser", JSON.stringify(userAfterPost.params));
            navigate(`/users/${userAfterPost.params.id}/home`);
        }
    }
    }
    return (
        <>
        {userdata!=null?
        <>
            {!worngRequest ?
                <div>
                    {(!load) ?
                        <div style={{height:"200vh"}}>
                            <h1>Add Details</h1>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                saveDetails();
                            }}>
                                <div id="form" >
                                    <label htmlFor="name">* Name</label><br />
                                    <input id="name" className='notTouch' name="name" required onChange={(e) => handleInputChange(e)} type="text" placeholder='Avraham' pattern="[a-zA-Z\u0590-\u05FF\s]+"/><br />
                                    <label htmlFor="email">* Email</label><br />
                                    <input id="email" className='notTouch'required name="email" type="email" onChange={(e) => handleInputChange(e)} placeholder='israel@gmail.com' /><br />
                                    <h3>Address</h3>
                                    <label htmlFor="street">Street</label><br />
                                    <input id="street" className='notTouch' name="street" onChange={(e) => handleInputChange(e)} type="text" placeholder='' /><br />
                                    <label htmlFor="suite">Suite</label><br />
                                    <input id="suite" className='notTouch' name="suite" type="text" onChange={(e) => handleInputChange(e)} placeholder='' /><br />
                                    <label htmlFor="city">* City</label><br />
                                    <input id="city" className='notTouch'required name="city" onChange={(e) => handleInputChange(e)} type="text" placeholder='Jerusalem' /><br />
                                    <label htmlFor="zipcode">Zipcode</label><br />
                                    <input id="zipcode" className='notTouch' name="zipcode" type="text" onChange={(e) => handleInputChange(e)} placeholder='12345-6789' pattern="[0-9]{5,9}" /><br />
                                    <label htmlFor="lat">Lat</label><br />
                                    <input id="lat" className='notTouch' name="lat" type="text" onChange={(e) => handleInputChange(e)} placeholder='12345-6789' pattern="[0-9]{5,9}" /><br />
                                    <label htmlFor="lng">Lng</label><br />
                                    <input id="lng" className='notTouch' name="lng" type="text" onChange={(e) => handleInputChange(e)} placeholder='12345-6789' pattern="[0-9]{5,9}" /><br />
                                    <label htmlFor="pnumber">* Phon Number</label><br />
                                    <input id="phonNumber" className='notTouch' required name="phoneNumber" type="tel" onChange={(e) => handleInputChange(e)} placeholder='0583212345' pattern="[0-9]{10}" /><br />
                                    <h3>Company</h3>
                                    <label htmlFor="companyName">Company Name</label><br />
                                    <input id="companyName" className='notTouch' name="companyName" onChange={(e) => handleInputChange(e)} type="text" /><br />
                                    <label htmlFor="catchPharse">Company Catch Pharse</label><br />
                                    <input id="catchPharse" type="text" className='notTouch' name="catchPharse" onChange={(e) => handleInputChange(e)} /><br />
                                    <label htmlFor="companyBs">Company bs</label><br />
                                    <input id="companyBs" className='notTouch' name="companyBs" onChange={(e) => handleInputChange(e)} type="text" /><br />
                                    <button type="sumbit" id='submitButton' className='submit' style={{ backgroundColor: "rgb(67, 148, 162)", color: 'white' }} >Add</button>
                                </div>
                            </form>
                        </div> :
                       <LoadingMessage/>}
                </div> :
                <ErrorMessege/>
            }
            </>
            :
            <NotFound></NotFound>
        }
        </>
    )
}


