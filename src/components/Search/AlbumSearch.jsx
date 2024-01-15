import { useState } from 'react'
import { Routes, Route, NavLink, Link } from "react-router-dom"

export default function AlbumSearch({ setSearchAlbumsFlag, searchAlbums, handleSearchChange, searchParamsAlbum }) {

    return (
        <>

            <div className="back">
                <div className='searchCompo'>                <button onClick={() => {
                    setSearchAlbumsFlag(false);
                }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
                    <h3>Search Album</h3>
                    <label htmlFor="id">Album Id</label><br />
                    <input id="id" className='notTouch' name="id" value={searchParamsAlbum.id} onChange={(e) => { handleSearchChange(e.target.name, e.target.value); e.preventDefault(); }} type="number" placeholder='12' min="1" /><br />
                    <label htmlFor="title">Title</label><br />
                    <input id="title" className='notTouch' name="title" value={searchParamsAlbum.title} type="text" required onChange={(e) => { handleSearchChange(e.target.name, e.target.value); e.preventDefault(); }} /><br />
                    <button type="sumbit" id='submitButton' className='submit'
                        onClick={(e) => {
                            e.preventDefault();
                            searchAlbums();
                            setSearchAlbumsFlag(false);
                        }}>search</button>
                </div>
            </div>
        </>
    )
}


