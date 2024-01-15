import React from 'react';
import { useState } from 'react';
export default function CommentAdd({ setaddCommentFlag, saveNewCommentDetails }) {
  const [commentDetails, setCommentDetails] = useState({ name: "", email: "", body: "" });
  const handleCommentChange = (e) => {
    let { name, value } = e.target;
    setCommentDetails({
      ...commentDetails,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }
  return (
    <div className="back">
      <div className='addCompo' >
        <button onClick={() => {
          setaddCommentFlag(false);
        }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
        <h3>Add Comment</h3>
        <label htmlFor="name">Name</label><br />
        <input id="name" className='notTouch' value={commentDetails.name} name="name" type="text" onChange={(e) => handleCommentChange(e)} /><br />
        <label htmlFor="email">Email</label><br />
        <input id="email" className='notTouch' value={commentDetails.email} name="email" type="email" onChange={(e) => handleCommentChange(e)} placeholder='israel@gmail.com' /><br />
        <label htmlFor="body">Body</label><br />
        <input id="body" className='notTouch' value={commentDetails.body} name="body" type="text" onChange={(e) => handleCommentChange(e)} /><br />
        <button type="sumbit" id='submitButton' className='submit'
          onClick={(e) => {
            e.preventDefault();
            saveNewCommentDetails(commentDetails);
          }}>Add</button>
      </div>

    </div>
  );
}
