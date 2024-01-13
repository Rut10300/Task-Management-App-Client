import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { getMoreInformetionAbouteUser, postInformetion } from '../../JS/request';
import Post from '../Post';
import Todos from './Todos';

let posts = [];
export default function Posts() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [wrongRequest, setWrongRequest] = useState(false);
  const { id } = useParams();
  const [searchPost, setSearchPost] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [foundPost, setFoundPost] = useState(false);
  const [showPosts, setShowPosts] = useState([{}, {}]);
  useEffect(() => {
    async function fatchData() {
      let postsRequest = await getMoreInformetionAbouteUser(id, setLoad, setWrongRequest, "posts")
      console.log(postsRequest.params);
      posts = postsRequest.params;
      setShowPosts(Object.assign(posts));
      setFoundPost(postsRequest.code == 200 ? true : false);
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
    setAlsoShowPosts();
  }
  function deleteFromPosts(id) {
    let index = posts.findIndex((p) => p.id == id)
    let upDate = [...posts];
    upDate.splice(index, 1);
    posts = [...upDate];
    setAlsoShowPosts();
  }
  function setAlsoShowPosts() {
    setShowPosts(posts);
    if (searchParamsPost.title !== "" || searchParamsPost.id !== "") {
      console.log("cfvgbh");
      searchPosts();
    }
  }
  const [details, setDetails] = useState({ title: "", body: "" });
  const handleInputChange = (e) => {
    const { value, name } = e.target
    setDetails({
      ...details,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }

  const handleSearchChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setSearchParamsPost({
      ...searchParamsPost,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }

  async function saveDetails() {
    let postData = {
      userId: id,
      title: details.title,
      body: details.body
    }
    let afterPost = await postInformetion(postData, setLoad, "posts");
    if (afterPost.code == 200) {
      setAddPost(false);
      let upDate = Array.from(posts);
      let newPost = Object.assign(afterPost.params);
      upDate = [...upDate, newPost];
      posts = upDate;
      setAlsoShowPosts();
    }
  }

  const searchValuesPost = {
    id: "",
    title: ""
  }
  const [searchParamsPost, setSearchParamsPost] = useState(searchValuesPost);

  function searchPosts() {
    console.log(searchParamsPost);
    let temp = posts.filter((p) => {
      return ((searchParamsPost.id == "" || searchParamsPost.id == p.id) &&
        (searchParamsPost.title == "" || searchParamsPost.title == p.title))
    })
    console.log(temp);
    setShowPosts(temp);
    setSearchPost(false);

  }
  return (
    <>
      {!wrongRequest ?
        <div style={{ opacity: addPost ? "0.2" : "1" }}>
          {!load ?
            <div>
              <h1>Posts</h1>
              <div style={{ display: "flex" }}>
                <button onClick={() => { setShowPosts(posts);searchParamsPost(searchValuesPost)  }}>Clear filter</button>
                <button onClick={() => setAddPost(true)} >➕</button>
                <button onClick={() => setSearchPost(true)}>🔍</button>
              </div>
              {(!foundPost) ? <h2>Not Found </h2>
                : showPosts.map((post1) => {
                  return <Post setLoad={setLoad} key={post1.id} post={post1} setPosts={setPost} deleteFromPosts={deleteFromPosts} />
                })}
              {showPosts.length == 0 && <h3>not found post</h3>}
            </div>
            :
            <div >
              <h1>Loading...</h1>
            </div>}
        </div > :
        <div >
          <h1>something worng...</h1>
          <button onClick={() => {
            setWrongRequest(false);
          }}>try again</button>
        </div>
      }

      {addPost &&
        <div style={{ zIndex: "1", backgroundColor: "lightskyblue", position: "absolute", border: "2px solid black", top: "60vh", right: "40vw", padding: "2vh" }}>
          <button onClick={() => {
            setAddPost(false);
          }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
          <h3>Add Post</h3>
          <label htmlFor="title">Title</label><br />
          <input id="title" className='notTouch' name="title" type="text" required onChange={(e) => handleInputChange(e)} /><br />
          <label htmlFor="body">Body</label><br />
          <input id="body" className='notTouch' name="body" type="text" required onChange={(e) => handleInputChange(e)} /><br />
          <button type="sumbit" id='submitButton' className='submit'
            onClick={(e) => {
              e.preventDefault();
              saveDetails();
            }}>Add</button>
        </div>
      }


      {searchPost &&
        <div style={{ zIndex: "1", backgroundColor: "lightskyblue", position: "absolute", border: "2px solid black", top: "30vh", right: "40vw", padding: "2vh" }}>
          <button onClick={() => {
            setSearchPost(false);
          }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
          <h3>Search Post</h3>
          <label htmlFor="id">Post Id</label><br />
          <input id="id" className='notTouch' name="id" value={searchParamsPost.id} onChange={(e) => handleSearchChange(e)} type="number" placeholder='12' min="1" /><br />
          <label htmlFor="title">Title</label><br />
          <input id="title" className='notTouch' name="title" value={searchParamsPost.title}type="text" required onChange={(e) => handleSearchChange(e)} /><br />
          <button type="sumbit" id='submitButton' className='submit'
            onClick={(e) => {
              e.preventDefault();
              searchPosts();
            }}>search</button>

        </div>
      }
    </>
  )
}


