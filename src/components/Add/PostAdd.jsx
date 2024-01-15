import React from 'react';
import { useState } from 'react';

export default function PostAdd({ setAddPostFlag, saveNewPost }) {
  const [detailsAddPost, setDetailsAddPost] = useState({ title: "", body: "" });
  const handleInputChangeAddPost = (e) => {
    const { value, name } = e.target
    setDetailsAddPost({
      ...detailsAddPost,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }
  return (
    <div className="back">
      <div className='addCompo' >    <button onClick={(e) => {
        e.preventDefault()
        setAddPostFlag(false);
      }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
        <h3>Add Post</h3>
        <label htmlFor="title">Title</label><br />
        <input id="title" className='notTouch' name="title" type="text" onChange={(e) => handleInputChangeAddPost(e)} /><br />
        <label htmlFor="body">Body</label><br />
        <input id="body" className='notTouch' name="body" type="text" onChange={(e) => handleInputChangeAddPost(e)} /><br />
        <button type="sumbit" id='submitButton' className='submit'
          onClick={(e) => { e.preventDefault(); saveNewPost(detailsAddPost); }}>Add</button>
      </div>

    </div>
  );
}
