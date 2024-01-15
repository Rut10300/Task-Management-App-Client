import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { getMoreInformetionAbouteUser, postInformetion } from '../../JS/request';
import Post from '../Post';
import NotFound from '../NotFound'
import PostAdd from '../Add/PostAdd';
import ErrorMessege from '../ErrorMessege';
import LoadingMessage from '../LoadingMessage';
import PostSearch from '../Search/PostSearch';
import '../css/posts.css'
let posts = [];
export default function Posts() {
  const userDetails = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [wrongRequest, setWrongRequest] = useState(false);
  const { id } = useParams();
  const [searchPostFlag, setSearchPostFlag] = useState(false);
  const [addPostFlag, setAddPostFlag] = useState(false);
  const [foundPostsFlag, setFoundPostsFlag] = useState(false);
  const [showPosts, setShowPosts] = useState([{}, {}]);
  useEffect(() => {
    async function fatchData() {
      let postsRequest = await getMoreInformetionAbouteUser(id, setLoad, setWrongRequest, "posts")
      posts = postsRequest.params;
      setShowPosts(Object.assign(posts));
      setFoundPostsFlag(postsRequest.code == 200 ? true : false);
    }
    fatchData();
  }, [wrongRequest]);

  function setPost(id, postToUpdate) {
    let temp = posts.map((post) => {
      if (post.id == id) {
        let newp = Object.assign(postToUpdate);
        return Object.assign(newp);
      }
      else
        return Object.assign(post);
    }
    )
    posts = [...temp];
    searchPosts();
  }
  function deleteFromPosts(id) {
    let index = posts.findIndex((p) => p.id == id)
    let upDate = [...posts];
    upDate.splice(index, 1);
    posts = [...upDate];
    let indexShowPosts = showPosts.findIndex((p) => p.id == id)
    upDate = [...showPosts]
    upDate.splice(indexShowPosts, 1);
    setShowPosts(upDate);

  }

  const handleSearchChange = (name, value) => {
    setSearchParamsPost({
      ...searchParamsPost,
      [name]: value
    })
  }

  async function saveNewPost(detailsAddTodo) {
    let postData = {
      userId: id,
      title: detailsAddTodo.title,
      body: detailsAddTodo.body
    }
    let afterPost = await postInformetion(postData, setLoad, "posts");
    if (afterPost.code == 200) {
      setAddPostFlag(false);
      let upDate = Array.from(posts);
      let newPost = Object.assign(afterPost.params);
      upDate = [...upDate, newPost];
      posts = upDate;
      searchPosts();
    }
  }

  const searchValuesPost = {
    id: "",
    title: ""
  }
  const [searchParamsPost, setSearchParamsPost] = useState(searchValuesPost);

  function searchPosts() {
    let temp = posts.filter((p) => {
      return ((searchParamsPost.id == "" || searchParamsPost.id == p.id) &&
        (searchParamsPost.title == "" || searchParamsPost.title == p.title))
    })
    setShowPosts(temp);
    setSearchPostFlag(false);

  }
  return (
    <>
      {id == userDetails.id ?
        <>
          {!wrongRequest ?
            <div style={{ opacity: addPostFlag ? "0.2" : "1" }}>
              {!load ?
                <div >
                  <h1 >Posts</h1>
                  <div style={{ display: "flex" }}>
                    {(searchParamsPost.id != "" || searchParamsPost.title != "") && <button onClick={() => { setShowPosts(posts); setSearchParamsPost(searchValuesPost) }}>Clear filter</button>}
                    <button className="buttonSearchAdd" onClick={() => setAddPostFlag(true)} >➕</button>
                    <button className="buttonSearchAdd" onClick={() => setSearchPostFlag(true)}>🔍</button>
                  </div>
                  {(!foundPostsFlag) ? <h2>Not Found </h2>
                    : <div id="allPosts">  
                      {showPosts.map((post1) => {
                        return <Post setLoad={setLoad} key={post1.id} post={post1} setPosts={setPost} deleteFromPosts={deleteFromPosts} />
                      })}</div>}
                  {showPosts.length == 0 && <h3>not found post</h3>}
                </div>
                : <LoadingMessage />}
            </div > : <ErrorMessege setWrongRequest={setWrongRequest} />}
          {addPostFlag && <PostAdd setAddPostFlag={setAddPostFlag} saveNewPost={saveNewPost} />}
          {searchPostFlag && <PostSearch setSearchPostFlag={setSearchPostFlag} searchPosts={searchPosts} handleSearchChange={handleSearchChange} searchParamsPost={searchParamsPost} />}
        </> : <NotFound />
      }
    </>

  )
}


