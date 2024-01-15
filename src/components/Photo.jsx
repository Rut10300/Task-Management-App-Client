import { useState } from 'react'
import { deleteInformetion, putInformetion } from "../JS/request"

export default function Photo({ setLoad, photo, updateShowPhotos, deleteFromShowPhotos }) {
    const [upDate, setUpDate] = useState(false);
    let detailsPhoto = { title: photo.title, url: photo.url };
    const [updatePhotoDetails, setUpdatePhotoDetails] = useState(detailsPhoto);

    const handleUpdatePhotoChange = (e) => {
        let { name, value } = e.target;
        setUpdatePhotoDetails({
            ...updatePhotoDetails,
            [name]: value
        })
        e.target.classList.remove("notTouch");
    }

    function updatePhoto() {
        let photoToUpdate = {
            id: photo.id,
            title: updatePhotoDetails.title,
            url: updatePhotoDetails.url,
            thumbnailUrl: photo.thumbnailUrl
        }
        let afterPhotoPost = putInformetion(photo.id, photoToUpdate, setLoad, "photos");
        if (afterPhotoPost) {
            updateShowPhotos(photo.id, photoToUpdate);
            setUpDate(false);
        }
    }

    async function deletePhoto() {
        let afterDeleteRequ = await deleteInformetion(photo.id, "photos");
        if (afterDeleteRequ)
            deleteFromShowPhotos(photo.id);
    }

    return (
        <>
            <div className='photo'> <p style={{ color: "#FBB040" }}>{photo.id}</p>
                {!upDate ? <p>title: {photo.title}</p> : <textarea type="text" name="title" value={updatePhotoDetails.title} onChange={(e) => handleUpdatePhotoChange(e)} />}
                {/* <p>url: {photo.url}</p> */}
                <img src={photo.thumbnailUrl} alt="" />
                <div style={{ display: 'flex' }}>   {!upDate ? <button className="buttonSearchAdd" onClick={(e) => { setUpDate(true); e.preventDefault(); }} style={{}}>🖋️</button> :
                    <button onClick={(e) => { updatePhoto(); e.preventDefault(); }}>ok</button>}
                    <button className="buttonSearchAdd" onClick={(e) => { e.preventDefault(); deletePhoto() }}>🗑️</button>
                </div>
            </div>
        </>
    )
}


