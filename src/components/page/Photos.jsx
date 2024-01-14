import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getPhotos, postInformetion } from '../../JS/request';
import PhotoAdd from '../Add/PhotoAdd';
import Photo from '../Photo';
import NotFound from '../NotFound';

let photos = [];
let startIndexPhotos = 0;
let requestMorePhotosFlag = true;
export default function Photos() {
    const userDetails = JSON.parse(localStorage.getItem("currentUser"))
    const [noMorePhotoFlag, setNoMorePhotoFlag] = useState(false);
    const numOfPhotosInPage = 5;
    const { albumId } = useParams();
    const [load, setLoad] = useState(true);
    const [wrongRequest, setWrongRequest] = useState(false);
    const { id } = useParams();
    const [addPhotoFlag, setAddPhotoFlag] = useState(false);
    const [foundPhotosFlag, setFoundPhotosFlag] = useState(false);
    const [showPhotos, setShowPhotos] = useState([]);

    async function fatchData() {
        let photosRequest = await getPhotos(id, setLoad, setWrongRequest, `albums/${albumId}/photos?_start=${startIndexPhotos}&_limit=${numOfPhotosInPage}`);
        if (photosRequest.code == 200) {
            for (let i = 0; i < photosRequest.params.length; i++) {
                photos.push(photosRequest.params[i]);
            }
            if (photosRequest.params.length < numOfPhotosInPage)
                setNoMorePhotoFlag(true)
            setShowPhotos(pre => pre.concat(photosRequest.params));
        }
        setFoundPhotosFlag(photosRequest.code == 200 ? true : false);
    }

    useEffect(() => {
        if (requestMorePhotosFlag) {
            fatchData();
            requestMorePhotosFlag = false;
        }
    }, []);

    async function showMorePhotos() {
        startIndexPhotos = startIndexPhotos + 5;
        fatchData();
    }

    function updateShowPhotos(id, photoToUpdate) {
        let photosAfterFilter = photos.map((photo) => {
            if (photo.id == id) {
                let newp = Object.assign(photoToUpdate);
                return Object.assign(newp);
            }
            else
                return Object.assign(photo);
        }
        )
        photos = [...photosAfterFilter];
        setShowPhotos(photos)
    }
    function deleteFromShowPhotos(id) {
        let indexDeletePhoto = showPhotos.findIndex((p) => p.id == id)
        let upDate = [...showPhotos];
        upDate.splice(indexDeletePhoto, 1);
        setShowPhotos([...upDate]);
    }

    async function saveNewPhoto(details) {
        let photoData = {
            albumId: albumId,
            title: details.title,
            url: details.url,
            thumbnailUrl: details.thumbnailUrl
        }
        let afterPostPhoto = await postInformetion(photoData, setLoad, "photos");
        if (afterPostPhoto.code == 200) {
            setAddPhotoFlag(false);
            let upDate = Array.from(photos);
            let newPhoto = Object.assign(afterPostPhoto.params);
            upDate = [...upDate, newPhoto];
            photos = upDate;
            setShowPhotos(photos);
        }
    }

    return (
        <>
            {id == userDetails.id ?
                <>
                    {!wrongRequest ?
                        <div style={{ opacity: addPhotoFlag ? "0.2" : "1" }}>
                            {!load ?
                                <div>
                                    <h1>Photos</h1>
                                    <div style={{ display: "flex" }}>
                                        <button onClick={() => setAddPhotoFlag(true)} >➕</button>
                                    </div>
                                    {(!foundPhotosFlag) ? <h2>Not Found </h2>
                                        : showPhotos.map((photo) => {
                                            return <Photo setLoad={setLoad} key={photo.id} photo={photo} updateShowPhotos={updateShowPhotos} deleteFromShowPhotos={deleteFromShowPhotos} />
                                        })
                                    }
                                    {(foundPhotosFlag && !noMorePhotoFlag) && <button onClick={(e) => { e.preventDefault(); showMorePhotos() }}>more photos</button>}
                                    {showPhotos.length == 0 && <h3>not found Photos</h3>}
                                </div>
                                :
                                <div >
                                    <h1>Loading...</h1>
                                </div>}
                        </div > :
                        <div >
                            <h1>something worng...</h1>
                            <button onClick={() => {
                                setWrongRequest(false);
                            }}>try again</button>
                        </div>
                    }
                    {addPhotoFlag && <PhotoAdd setAddPhotoFlag={setAddPhotoFlag} saveNewPhoto={saveNewPhoto} />}
                </> : <NotFound />
            }
        </>
    )
}


