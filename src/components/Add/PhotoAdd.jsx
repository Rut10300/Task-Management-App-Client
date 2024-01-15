import { useState } from 'react'
import { useParams } from "react-router-dom"

export default function PhotoAdd({ saveNewPhoto, setAddPhotoFlag }) {
    const { albumId } = useParams();
    const [load, setLoad] = useState(true);

    const [details, setDetails] = useState({ title: "", url: "", thumbnailUrl: "" });

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setDetails({
            ...details,
            [name]: value
        })
        e.target.classList.remove("notTouch");
    }


    return (
        <>
            <div className="back">
                <div className='addCompo' >
                    <button onClick={() => {
                        setAddPhotoFlag(false);
                    }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
                    <h3>Add Photo</h3>
                    <label htmlFor="title">Title</label><br />
                    <input id="title" className='notTouch' name="title" type="text" onChange={(e) => handleInputChange(e)} /><br />
                    <label htmlFor="url">Url</label><br />
                    <input id="url" className='notTouch' name="url" type="text" onChange={(e) => handleInputChange(e)} /><br />
                    <label htmlFor="thumbnailUrl">Thumbnail Url</label><br />
                    <input id="thumbnailUrl" className='notTouch' name="thumbnailUrl" type="text" onChange={(e) => handleInputChange(e)} /><br />
                    <button type="sumbit" id='submitButton' className='submit'
                        onClick={(e) => {
                            e.preventDefault();
                            saveNewPhoto(details);
                            setAddPhotoFlag(false);
                        }}>Add</button>
                </div>

            </div>
        </>
    )
}


