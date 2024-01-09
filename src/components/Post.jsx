import { useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate, useSearchParams } from "react-router-dom"
import { deleteInformetion, postInformetion, putInformetion, getCommentsFromServer } from '../JS/request'
import Comment from './Comment';
import { useEffect } from 'react';

export default function Post({ post, setPosts, deleteFromPosts, setLoad }) {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [addComment, setAddComment] = useState(false);
  const [seeAllComments, setSeeAllComents] = useState(false);
  const [notFoundComments, setNotFoundComments] = useState(false);
  const [showComments, setShowComments] = useState([]);
  let selectedPost = searchParam.get("post");
  let activePost = selectedPost == post.id;
  const [upDate, setUpDate] = useState(false);
  let details = {
    title: post.title,
    body: post.body
  };
  useEffect(() => {
    if (activePost)
      getAllComments();
  }, [])


  const changeContent = (e) => {
    const { name, value } = e.target
    setContent({
      ...content,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }
  const [content, setContent] = useState(details);
  async function deletePostFunc() {
    let afterDeleteRequ = await deleteInformetion(post.id, "posts");
    if (afterDeleteRequ)
      deleteFromPosts(post.id);
  }

  function updatePost() {
    let postToUpdate = {
      userId: post.userId,
      id: post.id,
      title: content.title,
      body: content.body
    };
    let afterPutPost = putInformetion(post.id, postToUpdate, setLoad, "posts");

    if (afterPutPost) {
      setPosts(post.id, postToUpdate);
      setUpDate(false);
    }
  }
  async function getAllComments() {
    let afterGetComments = await getCommentsFromServer(post.id);
    if (afterGetComments.code == 200) {
      setShowComments(Object.assign(afterGetComments.params));
      console.log(afterGetComments.params);
    }
    else {
      setNotFoundComments(true);
    }
  }
  const [commentDetails, setCommentDetails] = useState({ name: "", email: "", body: "" });
  const handleCommentChange = (e) => {
    let { name, value } = e.target;
    setCommentDetails({
      ...commentDetails,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }

  async function saveCommentDetails() {
    let commentData = {
      postId: post.id,
      name: commentDetails.name,
      email: commentDetails.email,
      body: commentDetails.body
    }
    let afterPostComment = await postInformetion(commentData, setLoad, "comments");
    if (afterPostComment.code == 200) {
      setAddComment(false);
      let upDate = Array.from(showComments);
      let newComment = Object.assign(afterPostComment.params);
      upDate = [...upDate, newComment];
      setShowComments(upDate);

    }
  }

  function upDateShowComments(id, commentToUpdate) {
    let temp = showComments.map((comment) => {
      if (comment.id == id) {
        console.log(commentToUpdate);
        // let newComment = Object.assign(commentToUpdate);
        return commentToUpdate;
      }
      else
        return Object.assign(comment);
    }
    )
    console.log(temp);
    setShowComments(Object.assign(temp))
  }
  function deleteFromShowComment(id) {
    let index = showComments.findIndex((c) => c.id == id)
    let upDate = [...showComments];
    upDate.splice(index, 1);
    setShowComments([...upDate]);


  }


  return (
    <>
      {activePost && <button onClick={() => setAddComment(true)}>Add Comment</button>}
      <h3 style={{ fontWeight: !activePost ? "normal" : "bold" }}>Post id: {post.id}</h3>
      {!upDate ? <h4 style={{ fontWeight: !activePost ? "normal" : "bold" }}>Title: {post.title}</h4>
        : <input type="text" name="title" value={content.title} onChange={(e) => {
          e.preventDefault();
          changeContent(e);
        }} />}
      {activePost && <div>
        {!upDate ? <h4 style={{ fontWeight: "bold" }}>Body: {post.body}</h4>
          : <input type="text" name="body" value={content.body} onChange={(e) => {
            e.preventDefault();
            changeContent(e);
          }} />}


      </div>}
      {!upDate ? <button onClick={(e) => {
        setUpDate(true); e.preventDefault();
      }} style={{}}>🖋️</button> : <button onClick={() => updatePost()}>ok</button>}
      <button onClick={(e) => {
        e.preventDefault();
        deletePostFunc();
      }}>🗑️</button>
      {activePost && seeAllComments && <div>{(!notFoundComments) ? <div>
        {showComments.map((comment) => { return <Comment key={comment.id} deleteFromShowComment={deleteFromShowComment} setShowComments={upDateShowComments} comment={comment} /> })}
      </div> : <h4>Not found comments</h4>}
      </div>}
      {activePost && <div>{!seeAllComments ? <button onClick={(e) => {
        {
          e.preventDefault();
          setSeeAllComents(true);
          getAllComments();
        }
      }}>Comments</button> :
        <button onClick={(e) => { e.preventDefault(); setSeeAllComents(false); }}>Close Comments</button>}
      </div>
      }
      {!activePost ? <button onClick={() => {
        navigate(`?post=${post.id}`)
      }}>More aboute me</button> :
        <button onClick={() => navigate('.')}>Less information</button>}

      {addComment &&
        <div style={{ zIndex: "1", backgroundColor: "lightskyblue", position: "absolute", border: "2px solid black", top: "60vh", right: "40vw", padding: "2vh" }}>
          <button onClick={() => {
            setAddComment(false);
          }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
          <h3>Add Comment</h3>
          <label htmlFor="name">Name</label><br />
          <input id="name" className='notTouch' value={commentDetails.name} name="name" type="text" required onChange={(e) => handleCommentChange(e)} /><br />
          <label htmlFor="email">Email</label><br />
          <input id="email" className='notTouch' value={commentDetails.email} name="email" type="email" onChange={(e) => handleCommentChange(e)} placeholder='israel@gmail.com' /><br />
          <label htmlFor="body">Body</label><br />
          <input id="body" className='notTouch' value={commentDetails.body} name="body" type="text" required onChange={(e) => handleCommentChange(e)} /><br />
          <button type="sumbit" id='submitButton' className='submit'
            onClick={(e) => {
              e.preventDefault();
              saveCommentDetails();
            }}>Add</button>
        </div>
      }
    </>
  )
}


