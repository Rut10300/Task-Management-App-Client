import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, Link, useParams, useLocation, useNavigate, useSearchParams, json } from "react-router-dom"
import Todo from '../Todo';
import { postInformetion, getMoreInformetionAbouteUser } from '../../JS/request';
import NotFound from '../NotFound';
let todos = [];
export default function Todos() {
  const navigate = useNavigate();
  const [searchParamLink, setsearchParamLink] = useSearchParams();
  let typeSort = searchParamLink.get("sort");
  const [completed, setCompleted] = useState(false);
  const [load, setLoad] = useState(true);
  const [foundTodoFlag, setFoundTodoFlag] = useState(false);
  const [wrongRequest, setWrongRequest] = useState(false);
  const { id } = useParams();
  const userDeitels=JSON.parse(localStorage.getItem("currentUser"))
  const [searchTodoFlag, setsearchTodoFlag] = useState(false);
  const [addTodoFlag, setaddTodoFlag] = useState(false);
  const [showTodos, setShowTodos] = useState([{}, {}]);
  
  let optionSort = {
    alphabetic: () => todos.sort((a, b) => a.title.localeCompare(b.title)),
    serial: () => todos.sort((a, b) => a.id - b.id),
    random: () => {  todos.sort(() => Math.random() - 0.5) },
    completed: () => todos.sort((a, b) => a.completed - b.completed)
  };
  // useEffect(() => {
  //   console.log(1);
  //   typeSort = searchParamLink.get("sort");
  //   navigate(`?sort=${typeSort ?? "serial"}`);
  //   setShowTodos(optionSort[typeSort ?? "serial"]())

  // }, [])

  function sortedChange(e) {
    navigate(`?sort=${e.target.value}`);
    let temp = optionSort[e.target.value]();
    let tempSearch = temp.filter((t) => {
      return ((searchParams.taskId === "" || t.id == searchParams.taskId) &&
        (searchParams.completed == "" || (t.completed).toString() == searchParams.completed) &&
        (searchParams.title == "" || searchParams.title == t.title))
    })
    setShowTodos(tempSearch);
    //setAlsoShowTodos();
    //  sortOrFilterFlag == "sort";
  }


  useEffect(() => {
    async function fatchData() {
      let todosRequest = await getMoreInformetionAbouteUser(id, setLoad, setWrongRequest, "todos")
      todos = todosRequest.params;
      setShowTodos(Object.assign(todos));
      setFoundTodoFlag(todosRequest.code == 200 ? true : false);
      typeSort = searchParamLink.get("sort");
      navigate(`?sort=${typeSort ?? "serial"}`);
      setShowTodos(optionSort[typeSort ?? "serial"]())
  
    }
    fatchData();
  }, [wrongRequest]);

  
  function setTodo(id, taskToUpdate) {
    typeSort = searchParamLink.get("sort");
    let temp = todos.map((todo) => {
      if (todo.id == id) {
        let newt = Object.assign(taskToUpdate);
        return Object.assign(newt);
      }
      else
        return Object.assign(todo);
    }
    )
    todos = [...temp];
    let tempSort = optionSort[typeSort]();
    console.log(searchParams);
    let tempsortAndSearch = tempSort.filter((t) => {
      return ((searchParams.taskId === "" || t.id == searchParams.taskId) &&
        (searchParams.completed != "yes" && searchParams.completed != "no" || t.completed == (searchParams.completed == "yes" ? true : false)) &&
        (searchParams.title == "" || searchParams.title == t.title))
    })
    console.log(tempsortAndSearch);
    setShowTodos(tempsortAndSearch)

  }
  function deleteFromTodos(id) {
    let indexTosos = todos.findIndex((t) => t.id == id)
    let upDate = [...todos];
    upDate.splice(indexTosos, 1);
    todos = [...upDate];
    let indexShowTosos = showTodos.findIndex((t) => t.id == id)
    let upDateshowTodos = [...showTodos];
    upDateshowTodos.splice(indexShowTosos, 1);

    // setAlsoShowTodos();
    setShowTodos([...upDateshowTodos]);

  }
  const taskValues = {
    title: '',
    completed: ''
  }
  const searchValues = {
    taskId: "",
    title: "",
    completed: ""
  }
  const [searchParams, setSearchParams] = useState(searchValues);
  const handleSearchChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }
  function searchTodos() {
    typeSort = searchParamLink.get("sort");
    let tempSort = optionSort[typeSort]();
    let tempsortAndSearch = tempSort.filter((t) => {
      return ((searchParams.taskId === "" || t.id == searchParams.taskId) &&
        (searchParams.completed != "yes" && searchParams.completed != "no" || t.completed == (searchParams.completed == "yes" ? true : false)) &&
        (searchParams.title == "" || searchParams.title == t.title))
    })
    // sortOrFilterFlag = "filter"
    setShowTodos(tempsortAndSearch);

  }
  const [details, setDetails] = useState(taskValues);
  ///jfchgjkhvc
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (e.target.name == "completed") {
      setCompleted(e.target.checked);
      value = e.target.checked;
    }
    setDetails({
      ...details,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }
  async function saveNewTodo() {
    let taskData = {
      userId: id,
      title: details.title,
      completed: details.completed
    }
    let afterPostTask = await postInformetion(taskData, setLoad, "todos");
    if (afterPostTask.code == 200) {
      setaddTodoFlag(false);
      let upDate = Array.from(todos);
      let newTask = Object.assign(afterPostTask.params);
      upDate = [...upDate, newTask];
      todos = upDate;
      typeSort = searchParamLink.get("sort");
      let tempSort = optionSort[typeSort]();
      let tempsortAndSearch = tempSort.filter((t) => {
        return ((searchParams.taskId === "" || t.id == searchParams.taskId) &&
          (searchParams.completed != "yes" && searchParams.completed != "no" || t.completed == (searchParams.completed == "yes" ? true : false)) &&
          (searchParams.title == "" || searchParams.title == t.title))
      })
      setShowTodos(tempsortAndSearch);
    }
  }

  return (
    <>
 {   id==userDeitels.id?
    <>  {!wrongRequest ?
        <div style={{ opacity: addTodoFlag ? "0.2" : "1" }}>
          {!load ?
            <div>
              <h1>Todos</h1>
              <div style={{ display: "flex" }}>
                <select name="sortBy" id="sortBy" onChange={(e) => sortedChange(e)} value={typeSort ?? "serial"}>
                  <option value="serial">Serial</option>
                  <option value="random">Random</option>
                  <option value="alphabetic">Alphabetic</option>
                  <option value="completed">Completed</option>
                </select>
                <button onClick={() => { typeSort = searchParamLink.get("sort"); setSearchParams(searchValues); setShowTodos(optionSort[typeSort]()) }}>Clear filter</button>
                <button onClick={() => setaddTodoFlag(true)} >➕</button>
                <button onClick={() => setsearchTodoFlag(true)}>🔍</button>
              </div>
              {(!foundTodoFlag) ? <h2>Not Found </h2>
                : showTodos.map((task) => {
                  return <Todo setLoad={setLoad} key={task.id} task={task} setTodos={setTodo} deleteFromTodos={deleteFromTodos} />
                })}
              {showTodos.length == 0 && <h3>not found todos</h3>}
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
      {addTodoFlag &&
        <div style={{ zIndex: "1", backgroundColor: "lightskyblue", position: "absolute", border: "2px solid black", top: "60vh", right: "40vw", padding: "2vh" }}>
          <button onClick={() => {
            setaddTodoFlag(false);
          }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
          <h3>Add Task</h3>
          {/* <label htmlFor="city">User Id</label><br />
          <input id="city" className='notTouch' name="city" onChange={(e) => handleInputChange(e)} type="text" placeholder='Jerusalem' /><br /> */}
          <label htmlFor="title">Title</label><br />
          <input id="title" className='notTouch' name="title" type="text" required onChange={(e) => handleInputChange(e)} /><br />
          <label htmlFor="completed">Completed</label><br />
          <input type="checkbox" checked={completed} name="completed" value="completed" onChange={(e) => handleInputChange(e)} /><br />
          <button type="sumbit" id='submitButton' className='submit'
            onClick={(e) => {
              e.preventDefault();
              saveNewTodo();
            }}>Add</button>

        </div>
      }
      {searchTodoFlag &&
        <div style={{ zIndex: "1", backgroundColor: "lightskyblue", position: "absolute", border: "2px solid black", top: "30vh", right: "40vw", padding: "2vh" }}>
          <button onClick={() => {
            setsearchTodoFlag(false);
          }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
          <h3>search Task</h3>
          <label htmlFor="taskId">Task Id</label><br />
          <input id="taskId" className='notTouch' name="taskId" value={searchParams.taskId} onChange={(e) => handleSearchChange(e)} type="number" placeholder="12" min="1" /><br />
          <label htmlFor="title">Title</label><br />
          <input id="title" className='notTouch' name="title" value={searchParams.title} type="text" required onChange={(e) => handleSearchChange(e)} /><br />
          <label htmlFor="completed">Completed</label><br />
          <input type="text" name="completed" value={searchParams.completed} placeholder='yes / no' onChange={(e) => handleSearchChange(e)} /><br />
          <button type="sumbit" id='submitButton' className='submit'
            onClick={(e) => {
              e.preventDefault();
              searchTodos();
              setsearchTodoFlag(false);
            }}>search</button>

        </div>
     }
      </>:<NotFound/>
    }
    </>
  )
}


