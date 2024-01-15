import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getPhotos, postInformetion } from '../../JS/request';
import PhotoAdd from '../Add/PhotoAdd';
import Photo from '../Photo';
import NotFound from '../NotFound';
import LoadingMessage from '../LoadingMessage';
import ErrorMessege from '../ErrorMessege';
import '../css/photos.css'
const numOfPhotosInPage = 8;

export default function Photos() {
     const [startIndexPhotos,setStartIndexPhotos] = useState(0);
    const userDetails = JSON.parse(localStorage.getItem("currentUser"))
    const [noMorePhotoFlag, setNoMorePhotoFlag] = useState(false);
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
                if (photosRequest.params.length < numOfPhotosInPage)
                  {setNoMorePhotoFlag(true)}
                 console.log(showPhotos,startIndexPhotos);
                setShowPhotos(pre => pre.concat(photosRequest.params));
                setFoundPhotosFlag(photosRequest.code == 200 ? true : false);
            }
    }

    useEffect(() => {
       fatchData();
    }, [startIndexPhotos]);

    async function showMorePhotos() {
         setStartIndexPhotos(pre=>pre+8);
    }

    function updateShowPhotos(id, photoToUpdate) {
        let photosAfterFilter = showPhotos.map((photo) => {
            if (photo.id == id) {
                let newp = Object.assign(photoToUpdate);
                return Object.assign(newp);
            }
            else
                return Object.assign(photo);
        }
        )
        setShowPhotos(photosAfterFilter)
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
            let upDate = Array.from(showPhotos);
            let newPhoto = Object.assign(afterPostPhoto.params);
            upDate = [...upDate, newPhoto];
            setShowPhotos(upDate);
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
                                        <button className="buttonSearchAdd" onClick={() => setAddPhotoFlag(true)} >➕</button>
                                    </div>
                                    {(!foundPhotosFlag) ? <h2>Not Found </h2>
                                        : <div id="allPhotos" >
                                        {showPhotos.map((photo) => {
                                            return <Photo setLoad={setLoad} key={photo.id+albumId} photo={photo} updateShowPhotos={updateShowPhotos} deleteFromShowPhotos={deleteFromShowPhotos} />
                                        })}</div>
                                    }

                                    {(foundPhotosFlag && !noMorePhotoFlag) && <button onClick={(e) => { e.preventDefault(); showMorePhotos() }}>more photos</button>}
                                    {showPhotos.length == 0 && <h3>not found Photos</h3>}
                                </div>
                                :
                                <div >
                                    <LoadingMessage />
                                </div>}
                        </div > :
                        <div >
                            <ErrorMessege setWrongRequest={setWrongRequest} />
                        </div>
                    }
                    {addPhotoFlag && <PhotoAdd setAddPhotoFlag={setAddPhotoFlag} saveNewPhoto={saveNewPhoto} />}
                </> : <NotFound />
            }
        </>
    )
}


