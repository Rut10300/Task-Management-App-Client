import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, Link, useParams, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import Todo from './Todo';
import {  postInformetion,getMoreInformetionAbouteUser } from '../JS/request';

let sortOrFilterFlag = "sort";

let todos = [];
export default function Todos() {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  let typeSort = searchParam.get("sort");
  // let typeFilter=searchParam.get("filter");
  const [completed, setCompleted] = useState(false);
  const [load, setLoad] = useState(true);
  const [foundTask, setFoundTask] = useState(false);
  const [wrongRequest, setWrongRequest] = useState(false);
  const { id } = useParams();
  const [searchTodo, setSearchTodo] = useState(false);
  // const [todos, setTodos] = useState({  });
  // const [sortSelected, setSortSelected] = useState(location.state.sort ?? "serial");
  const [addTask, setAddTask] = useState(false);
  const [showTodos, setShowTodos] = useState([{}, {}]);
  let optionSort = {
    alphabetic:() => todos.sort((a, b) => a.title.localeCompare(b.title)),
    serial: () => todos.sort((a, b) => a.id - b.id),
    random: () => todos.sort((a, b) => a.title - b.title),
    completed: () => todos.sort((a, b) => a.completed - b.completed)
  };
  useEffect(() => {
    typeSort = searchParam.get("sort");
    navigate(`?sort=${typeSort??"serial"}`);
    console.log(`load ${typeSort}`);
   setShowTodos(Object.assign(optionSort[typeSort ?? "serial"]))

  }, [])

  function setAlsoShowTodos() {
    console.log(todos);
    if (sortOrFilterFlag == "sort") {
      let sorteby = (typeSort == null || typeSort == undefined) ? typeSort : "serial";
      setShowTodos(Object.assign(optionSort[sorteby]));
    }
    console.log(searchParams);
   if(searchParams.completed!=""||searchParams.title!==""||searchParams.taskId!=="")
   {
    searchTask();
   }
  }
 


  function sortedChange(e) {
    navigate(`?sort=${e.target.value}`);
    setShowTodos(optionSort[e.target.value]);
    setAlsoShowTodos();
    sortOrFilterFlag == "sort";
  }


  useEffect(() => {
    async function fatchData() {
      let todosRequest = await getMoreInformetionAbouteUser(id, setLoad, setWrongRequest,"todos")
      todos = todosRequest.params;
      setShowTodos(Object.assign(todos));
      setFoundTask(todosRequest.code == 200 ? true : false);
    }
    fatchData();
  }, [wrongRequest]);
  function setTodo(id, taskToUpdate) {
    typeSort = searchParam.get("sort");
    let temp = todos.map((todo) => {
      if (todo.id == id) {
        let newt = Object.assign(taskToUpdate);
        return Object.assign(newt);
      }
      else
        return Object.assign(todo);
    }
    )
    console.log(temp);
    todos = [...temp];
    setAlsoShowTodos();
  }
  function deleteFromTodos(id) {
    typeSort = Object.assign(searchParam.get("sort"));
    let index = todos.findIndex((t) => t.id == id)
    let upDate = [...todos];
    upDate.splice(index, 1);
    todos =[...upDate];
    setAlsoShowTodos();
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
    let { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }
  function searchTask() {
    let temp = todos.filter((t) => {
      return ((searchParams.taskId === "" || t.id == searchParams.taskId) &&
        (searchParams.completed == "" || (t.completed).toString() == searchParams.completed) &&
        (searchParams.title == "" || searchParams.title == t.title))
    })
    sortOrFilterFlag = "filter"
    setShowTodos(temp);
    setSearchTodo(false);

  }
  const [details, setDetails] = useState(taskValues);
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
  async function saveDetails() {
    let taskData = {
      userId: id,
      title: details.title,
      completed: details.completed
    }
    let afterPostTask = await postInformetion(taskData, setLoad,"todos");
    if (afterPostTask.code == 200) {
      setAddTask(false);
      let upDate = Array.from(todos);
      let newTask = Object.assign(afterPostTask.params);
      upDate = [...upDate, newTask];
      todos = upDate;
      setAlsoShowTodos();
    }
  }

  return (
    <>
      {!wrongRequest ?
        <div style={{ opacity: addTask ? "0.2" : "1" }}>
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
                <button onClick={()=> { setSearchParams(searchValues);setShowTodos(optionSort[typeSort])}}>Clear filter</button>
                <button onClick={() => setAddTask(true)} >➕</button>
                <button onClick={() => setSearchTodo(true)}>🔍</button>
              </div>
              {(!foundTask) ? <h2>Not Found </h2>
                : showTodos.map((task) => {
                  return <Todo setLoad={setLoad} key={task.id} task={task} setTodos={setTodo} deleteFromTodos={deleteFromTodos} />
                })}

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
      {addTask &&
        <div style={{ zIndex: "1", backgroundColor: "lightskyblue", position: "absolute", border: "2px solid black", top: "60vh", right: "40vw", padding: "2vh" }}>
          <button onClick={() => {
            setAddTask(false);
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
              saveDetails();
            }}>Add</button>

        </div>
      }
      {searchTodo &&
        <div style={{ zIndex: "1", backgroundColor: "lightskyblue", position: "absolute", border: "2px solid black", top: "30vh", right: "40vw", padding: "2vh" }}>
          <button onClick={() => {
            setSearchTodo(false);
          }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
          <h3>search Task</h3>
          <label htmlFor="taskId">Task Id</label><br />
          <input id="taskId" className='notTouch' name="taskId" onChange={(e) => handleSearchChange(e)} type="number" placeholder='12' min="1" /><br />
          <label htmlFor="title">Title</label><br />
          <input id="title" className='notTouch' name="title" type="text" required onChange={(e) => handleSearchChange(e)} /><br />
          <label htmlFor="completed">Completed</label><br />
          <input type="text" name="completed" placeholder='true/false' onChange={(e) => handleSearchChange(e)} /><br />
          <button type="sumbit" id='submitButton' className='submit'
            onClick={(e) => {
              e.preventDefault();
              searchTask();
            }}>search</button>

        </div>
      }
    </>
  )
}


