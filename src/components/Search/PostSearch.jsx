import React from 'react';

export default function PostSearch({setSearchPostFlag,searchPosts,handleSearchChange,searchParamsPost}) {
  return (
    <div style={{ zIndex: "1", backgroundColor: "lightskyblue", position: "absolute", border: "2px solid black", top: "30vh", right: "40vw", padding: "2vh" }}>
          <button onClick={() => { setSearchPostFlag(false); }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
          <h3>Search Post</h3>
          <label htmlFor="id">Post Id</label><br />
          <input id="id" className='notTouch' name="id" value={searchParamsPost.id} onChange={(e) =>{ e.preventDefault(); handleSearchChange(e.target.name,e.target.value)}} type="number" placeholder='12' min="1" /><br />
          <label htmlFor="title">Title</label><br />
          <input id="title" className='notTouch' name="title" value={searchParamsPost.title}type="text" required onChange={(e) => { e.preventDefault();handleSearchChange(e.target.name,e.target.value)}} /><br />
          <button type="sumbit" id='submitButton' className='submit'
            onClick={(e) => {  e.preventDefault();  searchPosts(); }}>search</button>

        </div>
  );
}
