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
            <p>{photo.id}</p>
            {!upDate ? <p>title: {photo.title}</p> : <input type="text" name="title" value={updatePhotoDetails.title} onChange={(e) => handleUpdatePhotoChange(e)} />}
            {!upDate ? <p>url: {photo.url}</p> : <input type="text" name="url" value={updatePhotoDetails.url} onChange={(e) => handleUpdatePhotoChange(e)} />}
            <img src={photo.thumbnailUrl} alt="" />
            {!upDate ? <button onClick={(e) => { setUpDate(true); e.preventDefault(); }} style={{}}>🖋️</button> :
                <button onClick={(e) => { updatePhoto(); e.preventDefault(); }}>ok</button>}
            <button onClick={(e) => { e.preventDefault(); deletePhoto() }}>🗑️</button>
        </>
    )
}


