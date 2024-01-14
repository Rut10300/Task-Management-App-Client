import { useState } from 'react'
import { Routes, Route, NavLink, Link } from "react-router-dom"
import { putInformetion, deleteInformetion } from '../JS/request'
export default function Comment({ comment, setShowComments, deleteFromShowComment }) {
  let currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
  const [upDate, setUpDate] = useState(false);
  let detailsCommentUpdate = {
    postId: comment.postId,
    id: comment.id,
    name: comment.name,
    email: comment.email,
    body: comment.body
  };
  const [paramsCommentUpdate, setParamsCommentUpdate] = useState(detailsCommentUpdate);

  const changeCommentUpdate = (e) => {
    const { name, value } = e.target
    setParamsCommentUpdate({
      ...paramsCommentUpdate,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }
  async function updateComment() {
    let afterPutComment = await putInformetion(comment.id, paramsCommentUpdate, null, "comments");
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
        : <textarea type="text" name="name" value={paramsCommentUpdate.name} onChange={(e) => { e.preventDefault(); changeCommentUpdate(e); }} />}
      {!upDate ? <h5>Email: {comment.email}</h5>
        : <textarea type="email" name="email" value={paramsCommentUpdate.email} onChange={(e) => { e.preventDefault(); changeCommentUpdate(e); }} />}
      {!upDate ? <h5>Content: {paramsCommentUpdate.body}</h5>
        : <textarea type="text" name="body" value={paramsCommentUpdate.body} onChange={(e) => { e.preventDefault(); changeCommentUpdate(e); }} />}
      {comment.email == currentUserEmail && <div>{!upDate ? <button onClick={(e) => {
        setUpDate(true); e.preventDefault();
      }} style={{}}>🖋️</button> : <button onClick={() => updateComment()}>ok</button>}
        <button onClick={(e) => { e.preventDefault(); deleteCommentFunc() }}>🗑️</button></div>}
    </>
  )
}


