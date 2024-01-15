import { useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate, useSearchParams } from "react-router-dom"
import { deleteInformetion, postInformetion, putInformetion, getCommentsFromServer } from '../JS/request'
import Comment from './Comment';
import { useEffect } from 'react';
import CommentAdd from './Add/CommentAdd';
import LoadingMessage from './LoadingMessage';
import '../components/css/posts.css'


export default function Post({ post, setPosts, deleteFromPosts, setLoad }) {
  const navigate = useNavigate();
  const [loadComments, setLoadComments] = useState(false)
  const [searchParam, setSearchParam] = useSearchParams();
  const [addCommentFlag, setaddCommentFlag] = useState(false);
  const [seeAllCommentsFlag, setSeeAllComentsFlag] = useState(false);
  const [notFoundComments, setNotFoundComments] = useState(false);
  const [showComments, setShowComments] = useState([]);
  let selectedPost = searchParam.get("post");
  let activePost = selectedPost == post.id;
  const [upDateFlag, setUpDateFlag] = useState(false);
  let detailsPostUpdate = {
    title: post.title,
    body: post.body
  };
  const [contentPostUpdate, setContentPostUpdate] = useState(detailsPostUpdate);

  const changeContentPostUpdate = (e) => {
    const { name, value } = e.target
    setContentPostUpdate({
      ...contentPostUpdate,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }

  async function deletePostFunc() {
    let afterDeleteRequ = await deleteInformetion(post.id, "posts");
    if (afterDeleteRequ) {
      deleteFromPosts(post.id);
      let afterGetComments = await getCommentsFromServer(post.id, setLoadComments);
      if (afterGetComments.code == 200) {
        afterGetComments.params.forEach(async (element) => {
          let afterDeleteComment = await deleteInformetion(element.id, 'comments');
        });
      }
    }
  }

  function updatePost() {
    let postToUpdate = {
      userId: post.userId,
      id: post.id,
      title: contentPostUpdate.title,
      body: contentPostUpdate.body
    };
    let afterPutPost = putInformetion(post.id, postToUpdate, setLoad, "posts");
    if (afterPutPost) {
      setPosts(post.id, postToUpdate);
      setUpDateFlag(false);
    }
  }
  async function getAllComments() {
    let afterGetComments = await getCommentsFromServer(post.id, setLoadComments);
    if (afterGetComments.code == 200) {
      setShowComments(Object.assign(afterGetComments.params));
    }
    else {
      setNotFoundComments(true);
    }
  }


  async function saveNewCommentDetails(commentDetails) {
    let commentData = {
      postId: post.id,
      name: commentDetails.name,
      email: commentDetails.email,
      body: commentDetails.body
    }
    let afterPostComment = await postInformetion(commentData, setLoad, "comments");
    if (afterPostComment.code == 200) {
      setaddCommentFlag(false);
      let upDate = Array.from(showComments);
      let newComment = Object.assign(afterPostComment.params);
      upDate = [...upDate, newComment];
      setShowComments(upDate);
    }
  }

  function upDateShowComments(id, commentToUpdate) {
    let temp = showComments.map((comment) => {
      if (comment.id == id) {
        return commentToUpdate;
      }
      else
        return Object.assign(comment);
    }
    )
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
    
      <div className={activePost ? "activePostStyle" : "postStyle"}>

        {activePost &&
          <button onClick={() => setaddCommentFlag(true)}>Add Comment</button>}
        <div id="post">
          <h4 style={{ fontWeight: !activePost ? "normal" : "bold" }}>Post {post.id}</h4>
          {!upDateFlag ? <p style={{ fontWeight: !activePost ? "normal" : "bold" }}>Title:{post.title}</p>
            : <textarea  id="titleArea"  type="text" name="title" value={contentPostUpdate.title} onChange={(e) => { e.preventDefault(); changeContentPostUpdate(e); }} />}
          {activePost && <div>
            {!upDateFlag ? <p style={{ fontWeight: "bold" }}>Body: {post.body}</p>
              : <textarea id="bodyArea" type="text" name="body" value={contentPostUpdate.body} onChange={(e) => {
                e.preventDefault();
                changeContentPostUpdate(e);
              }} />}

          </div>}
          <div style={{ display: "flex" }}>
            {!upDateFlag ?
              <button className="buttonSearchAdd" onClick={(e) => { setUpDateFlag(true); e.preventDefault(); }} >🖋️</button>
              : <button onClick={() => updatePost()}>ok</button>}
            <button className="buttonSearchAdd" onClick={(e) => { e.preventDefault(); deletePostFunc(); }}>🗑️</button>
          </div>
          {activePost && seeAllCommentsFlag && loadComments && <LoadingMessage setLoad={setLoadComments} />}
          {activePost && seeAllCommentsFlag && <div>{(!notFoundComments) ? <div className='allco'>
            {showComments.map((comment) => { return <Comment key={comment.id} deleteFromShowComment={deleteFromShowComment} setShowComments={upDateShowComments} comment={comment} /> })}
          </div> :
            <h4>Not found comments</h4>}
          </div>}
          {activePost && <div>{!seeAllCommentsFlag ? <button style={{margin:"5px"}}onClick={(e) => {
            {
              e.preventDefault();
              setSeeAllComentsFlag(true);
              getAllComments();
            }
          }}>Comments</button> :
            <button onClick={(e) => { e.preventDefault(); setSeeAllComentsFlag(false); }}>Close Comments</button>}
          </div>
          }
          <div id="moreData">
            {!activePost ? <button onClick={() => {
              navigate(`?post=${post.id}`)
            }}>More aboute me</button> :
              <button onClick={() => navigate('.')}>Less information</button>}
            {addCommentFlag && <CommentAdd saveNewCommentDetails={saveNewCommentDetails} setaddCommentFlag={setaddCommentFlag} />}
          </div>
        </div>
      </div>
    </>
  )
}


