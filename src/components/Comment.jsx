import { useState } from 'react'
import { Routes, Route, NavLink, Link } from "react-router-dom"
import { putInformetion, deleteInformetion } from '../JS/request'
export default function Comment({ comment, setShowComments, deleteFromShowComment }) {
  let currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
  const [upDate, setUpDate] = useState(false);
  let details = {
    postId: comment.postId,
    id: comment.id,
    name: comment.name,
    email: comment.email,
    body: comment.body
  };
  const changeContent = (e) => {
    const { name, value } = e.target
    setContent({
      ...content,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }
  const [content, setContent] = useState(details);
  async function updateComment() {
    console.log(content);
    let afterPutComment = await putInformetion(comment.id, content, null, "comments");
    if (afterPutComment) {
      setShowComments(comment.id, afterPutComment);
      setUpDate(false);

    }
  }
  async function deleteCommentFunc() {
    let afterDeleteRequ = await deleteInformetion(comment.id, "comments");
    if (afterDeleteRequ)
      deleteFromShowComment(comment.id);
  }
  return (
    <>
      <h5>Id: {comment.id}</h5>
      {!upDate ? <h5>Name: {comment.name}</h5>
        : <input type="text" name="name" value={content.name} onChange={(e) => { e.preventDefault(); changeContent(e); }} />}
      {!upDate ? <h5>Email: {comment.email}</h5>
        : <input type="email" name="email" value={content.email} onChange={(e) => { e.preventDefault(); changeContent(e); }} />}
      {!upDate ? <h5>Content: {comment.body}</h5>
        : <input type="text" name="body" value={content.body} onChange={(e) => { e.preventDefault(); changeContent(e); }} />}
      {comment.email == currentUserEmail && <div>{!upDate ? <button onClick={(e) => {
        setUpDate(true); e.preventDefault();
      }} style={{}}>🖋️</button> : <button onClick={() => updateComment()}>ok</button>}
        <button onClick={(e) => { e.preventDefault(); deleteCommentFunc() }}>🗑️</button></div>}
    </>
  )
}


