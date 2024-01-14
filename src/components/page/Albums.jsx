import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, Link, useNavigate, useParams, Outlet } from "react-router-dom"
import Album from '../Album';
import AlbumAdd from '../Add/AlbumAdd'
import AlbumSearch from '../Search/AlbumSearch';
import { getMoreInformetionAbouteUser,postInformetion } from '../../JS/request'
import LoadingMessage from '../LoadingMessage';
import NotFound from '../NotFound';
let albums = [];
export default function Albums() {
  const userDetails = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [wrongRequest, setWrongRequest] = useState(false);
  const { id } = useParams();
  const [addAlbumFlag, setAddAlbumFlag] = useState(false);
  const [foundAlbumsFlag, setFoundAlbumsFlag] = useState(false);
  const [searchAlbumsFlag, setSearchAlbumsFlag] = useState(false);
  const [showAlbums, setShowAlbums] = useState([{}, {}]);
  useEffect(() => {
    async function fatchData() {
      let albumsRequest = await getMoreInformetionAbouteUser(id, setLoad, setWrongRequest, "albums")
      albums = albumsRequest.params;
      setShowAlbums(Object.assign(albums));
      setFoundAlbumsFlag(albumsRequest.code == 200 ? true : false);
    }
    fatchData();
  }, [wrongRequest]);


  const searchValuesAlbum = {
    id: "",
    title: ""
  }
  const [searchParamsAlbum, setSearchParamsAlbum] = useState(searchValuesAlbum);
  const handleSearchChange = (name, value) => {
    setSearchParamsAlbum({
      ...searchParamsAlbum,
      [name]: value
    })
    //e.target.classList.remove("notTouch");
    //HI
  }
  function searchAlbums() {
    let temp = albums.filter((a) => {
      return ((searchParamsAlbum.id == "" || searchParamsAlbum.id == a.id) &&
        (searchParamsAlbum.title == "" || searchParamsAlbum.title == a.title))
    })
    setShowAlbums(temp);
    setSearchAlbumsFlag(false);

  }


  async function saveNewAlbum(title) {
    let albumsData = {
      userId:id,
      title: title
    }
    let afterPostAlbum = await postInformetion(albumsData, setLoad, "albums");
    if (afterPostAlbum.code == 200) {
      setAddAlbumFlag(false);
      let upDate = Array.from(albums);
      let newAlbum = Object.assign(afterPostAlbum.params);
      upDate = [...upDate, newAlbum];
      albums = upDate;
    }
    searchAlbums();
  }

  return (
    <>
     {id == userDetails.id ?
        <> 
      {!wrongRequest ?
        <div style={{ opacity: addAlbumFlag ? "0.2" : "1" }}>
          {!load ?
            <div>
              <h1>Albums</h1>
              <div style={{ display: "flex" }}>
                <button onClick={() => { setShowAlbums(albums); setSearchParamsAlbum(searchValuesAlbum) }}>Clear filter</button>
                <button onClick={() => setAddAlbumFlag(true)} >➕</button>
                <button onClick={() => setSearchAlbumsFlag(true)}>🔍</button>
              </div>
              {(!foundAlbumsFlag) ? <h2>Not Found </h2>
                : showAlbums.map((album) => {
                  return <Link to={`${album.id}/photos`}><Album setLoad={setLoad} key={album.id} album={album} /></Link> 
                })}
              {showAlbums.length == 0 && <h3>not found albums</h3>}
            </div>
            :
            <div >
              <LoadingMessage/>
            </div>}
        </div > :
        <div >
          <h1>something worng...</h1>
          <button onClick={() => {
            setWrongRequest(false);
          }}>try again</button>
        </div>
      }
      {addAlbumFlag && <AlbumAdd setAddAlbumFlag={setAddAlbumFlag} saveNewAlbum={saveNewAlbum} />}
      {searchAlbumsFlag && <AlbumSearch setSearchAlbumsFlag={setSearchAlbumsFlag}searchParamsAlbum={searchParamsAlbum} searchAlbums={searchAlbums} handleSearchChange={handleSearchChange} />}
      <Outlet/>
      </> : <NotFound />
      }
    </>
  )
}


