import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, Link, useParams, useLocation, useNavigate, useSearchParams, json } from "react-router-dom"
import Todo from '../Todo';
import { postInformetion, getMoreInformetionAbouteUser } from '../../JS/request';
import NotFound from '../NotFound';
import ErrorMessege from '../ErrorMessege';
import LoadingMessage from '../LoadingMessage';
let todos = [];
export default function Todos() {
  const navigate = useNavigate();
  const [searchParamLink, setsearchParamLink] = useSearchParams();
  let typeSort = searchParamLink.get("sort");
  // const [completed, setCompleted] = useState(false);
  const [load, setLoad] = useState(true);
  const [foundTodoFlag, setFoundTodoFlag] = useState(false);
  const [wrongRequest, setWrongRequest] = useState(false);
  const { id } = useParams();
  const userDeitels = JSON.parse(localStorage.getItem("currentUser"))
  const [searchTodoFlag, setsearchTodoFlag] = useState(false);
  const [addTodoFlag, setaddTodoFlag] = useState(false);
  const [showTodos, setShowTodos] = useState([{}, {}]);

  let optionSort = {
    alphabetic: (sortTodos) => sortTodos.sort((a, b) => a.title.localeCompare(b.title)),
    serial: (sortTodos) => sortTodos.sort((a, b) => a.id - b.id),
    random: (sortTodos) => sortTodos.sort((a,b) => Math.random() - 0.5) ,
    completed: (sortTodos) => sortTodos.sort((a, b) => a.completed - b.completed)
  };
  // useEffect(() => {
  //   console.log(1);
  //   typeSort = searchParamLink.get("sort");
  //   navigate(`?sort=${typeSort ?? "serial"}`);
  //   setShowTodos(optionSort[typeSort ?? "serial"]())

  // }, [])

  function sortedChange(e) {
    navigate(`?sort=${e.target.value}`);
    let temp = optionSort[e.target.value](showTodos);
    // let tempSearch = temp.filter((t) => {
    //   return ((searchParams.taskId === "" || t.id == searchParams.taskId) &&
    //     (searchParams.completed == "" || (t.completed).toString() == searchParams.completed) &&
    //     (searchParams.title == "" || searchParams.title == t.title))
    // })
    setShowTodos(temp);
    //setAlsoShowTodos();
    //  sortOrFilterFlag == "sort";
  }


  useEffect(() => {
    async function fatchData() {
      let todosRequest = await getMoreInformetionAbouteUser(id, setLoad, setWrongRequest, "todos")
      todos = todosRequest.params;
      // setShowTodos(Object.assign(todos));
      setFoundTodoFlag(todosRequest.code == 200 ? true : false);
      typeSort = searchParamLink.get("sort");
      navigate(`?sort=${typeSort ?? "serial"}`);
      setShowTodos(optionSort[typeSort ?? "serial"](todos))

    }
    fatchData();
  }, [wrongRequest]);


  function setTodo(id, todoToUpdate) {
    typeSort = searchParamLink.get("sort");
    
    let temp = todos.map((todo) => {
      if (todo.id == id) {
        let newt = Object.assign(todoToUpdate);
        return Object.assign(newt);
      }
      else
        return Object.assign(todo);
    })
    todos = [...temp];
    searchTodos();

  }
  function deleteFromTodos(id) {
    let indexTosos = todos.findIndex((t) => t.id == id)
    let upDate = [...todos];
    upDate.splice(indexTosos, 1);
    todos = [...upDate];
    let indexShowTosos = showTodos.findIndex((t) => t.id == id)
    let upDateshowTodos = [...showTodos];
    upDateshowTodos.splice(indexShowTosos, 1);
    setShowTodos([...upDateshowTodos]);

  }
  const todoValues = {
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
    let tempSearch = todos.filter((t) => {
      return ((searchParams.taskId === "" || t.id == searchParams.taskId) &&
        (searchParams.completed != "yes" && searchParams.completed != "no" || t.completed == (searchParams.completed == "yes" ? true : false)) &&
        (searchParams.title == "" || searchParams.title == t.title))
    })
    setShowTodos(optionSort[typeSort](tempSearch));

  }
  const [detailsAddTodo, setDetailsAddTodo] = useState(todoValues);
  const handleInputChangeAddTodo = (e) => {
    let { name, value } = e.target;
    if (e.target.name == "completed") {
      value = e.target.checked;
    }
    setDetailsAddTodo({
      ...detailsAddTodo,
      [name]: value
    })
    e.target.classList.remove("notTouch");
  }
  async function saveNewTodo() {

    let todoData = {
      userId: id,
      title: detailsAddTodo.title,
      completed: detailsAddTodo.completed
    }
    let afterPostTodo = await postInformetion(todoData, setLoad, "todos");
    if (afterPostTodo.code == 200) {
      setaddTodoFlag(false);
      let upDate = Array.from(todos);
      let newTodo = Object.assign(afterPostTodo.params);
      upDate = [...upDate, newTodo];
      todos = upDate;
      let upDateShoeTodos = Array.from(showTodos);
      upDate = [...upDateShoeTodos, newTodo];
      typeSort = searchParamLink.get("sort");
      let tempSort = optionSort[typeSort](upDate);
      setShowTodos(tempSort);
      setDetailsAddTodo(todoValues)
    }
  }

  return (
    <>
      {id == userDeitels.id ?
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
                  <button onClick={() => { typeSort = searchParamLink.get("sort"); setSearchParams(searchValues); setShowTodos(optionSort[typeSort](todos)) }}>Clear filter</button>
                  <button onClick={() => setaddTodoFlag(true)} >➕</button>
                  <button onClick={() => setsearchTodoFlag(true)}>🔍</button>
                </div>
                {(!foundTodoFlag) ? <h2>Not Found </h2> : showTodos.map((task) => {
                    return <Todo setLoad={setLoad} key={task.id} task={task} setTodos={setTodo} deleteFromTodos={deleteFromTodos} />
                  })}
                   {showTodos.length == 0 && <h3>not found todos</h3>}
              </div>
              :<LoadingMessage/>}
          </div > :
         <ErrorMessege/>
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
              <input id="title" className='notTouch' value={detailsAddTodo.title} name="title" type="text" required onChange={(e) => handleInputChangeAddTodo(e)} /><br />
              <label htmlFor="completed">Completed</label><br />
              <input type="checkbox" checked={detailsAddTodo.completed} name="completed" value="completed" onChange={(e) => handleInputChangeAddTodo(e)} /><br />
              <button type="sumbit" id='submitButton' className='submit'
                onClick={(e) => { e.preventDefault(); saveNewTodo();  }}>Add</button>
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
        </> : <NotFound />
      }
    </>
  )
}


