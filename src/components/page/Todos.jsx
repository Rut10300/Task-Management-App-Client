import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams, json, Outlet } from "react-router-dom"
import Todo from '../Todo';
import { postInformetion, getMoreInformetionAbouteUser, getInformetionById } from '../../JS/request';
import NotFound from '../NotFound';
import ErrorMessege from '../ErrorMessege';
import LoadingMessage from '../LoadingMessage';
import TodoAdd from '../Add/TodoAdd';
import TodoSearch from '../Search/TodoSearch';

let todos = [];
let optionSort = {
  alphabetic: (sortTodos) => sortTodos.sort((a, b) => a.title.localeCompare(b.title)),
  serial: (sortTodos) => sortTodos.sort((a, b) => a.id - b.id),
  random: (sortTodos) => sortTodos.sort((a, b) => Math.random() - 0.5),
  completed: (sortTodos) => sortTodos.sort((a, b) => a.completed - b.completed)
};
export default function Todos() {
  const userDetails = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate();
  const [searchParamLink, setsearchParamLink] = useSearchParams();
  let typeSort = searchParamLink.get("sort");
  const [load, setLoad] = useState(true);
  const [foundTodoFlag, setFoundTodoFlag] = useState(false);
  const [wrongRequest, setWrongRequest] = useState(false);
  const { id } = useParams();
  const [searchTodoFlag, setsearchTodoFlag] = useState(false);
  const [addTodoFlag, setaddTodoFlag] = useState(false);
  const [showTodos, setShowTodos] = useState([{}, {}]);

  function sortedChange(e) {
    navigate(`?sort=${e.target.value}`);
    let temp = optionSort[e.target.value](showTodos);
    setShowTodos(temp);
  }

  useEffect(() => {
    async function fatchData() {
      let todosRequest = await getMoreInformetionAbouteUser(id, setLoad, setWrongRequest, "todos")
      todos = todosRequest.params;
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

  const searchValues = {
    taskId: "",
    title: "",
    completed: ""
  }
  const [searchParams, setSearchParams] = useState(searchValues);
  const handleSearchChange = (value, name) => {
    setSearchParams({
      ...searchParams,
      [name]: value
    })
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

  async function saveNewTodo(detailsAddTodo) {
    let todoData = {
      userId: id,
      title: detailsAddTodo.title,
      completed: detailsAddTodo.completed
    }
    let afterPostTodo = await postInformetion(todoData, setLoad, "todos");
    if (afterPostTodo.code == 200) {
      setaddTodoFlag(false);
      // let newTodoAdd=await getInformetionById(afterPostTodo.params, setLoad, setworngRequest, "todos") 
      //   let upDate = Array.from(todos);
      console.log(afterPostTodo);
      let newTodo = Object.assign(afterPostTodo.params);
      todos = [...todos, newTodo];

      // let upDateShowTodos = Array.from(showTodos);
      if ((searchParams.taskId === "" || newTodo.id == searchParams.taskId) &&
        (searchParams.completed != "yes" && searchParams.completed != "no" || newTodo.completed == (searchParams.completed == "yes" ? true : false)) &&
        (searchParams.title == "" || searchParams.title == newTodo.title))
        setShowTodos([...showTodos, newTodo]);
      // upDate = [...upDateShowTodos];
      // typeSort = searchParamLink.get("sort");
      // let tempSort = optionSort[typeSort](upDate);
      // setShowTodos(tempSort);
    }
  }

  return (
    <>
      {id == userDetails?.id ?
        <>  {!wrongRequest ?
          <div style={{ opacity: addTodoFlag ? "0.2" : "1" }}>
            {!load ?
              <div>
                <h1>Todos</h1>
                <div id="buttonLine" >
                  <button className="buttonSearchAdd" id="addButton" onClick={() => setaddTodoFlag(true)} >➕</button>
                  <button className="buttonSearchAdd" onClick={() => setsearchTodoFlag(true)}>🔍</button>
                  <select name="sortBy" id="sortBy" onChange={(e) => sortedChange(e)} value={typeSort ?? "serial"}>
                    <option value="serial">Serial</option>
                    <option value="random">Random</option>
                    <option value="alphabetic">Alphabetic</option>
                    <option value="completed">Completed</option>
                  </select>
                  {(searchParams.taskId != "" || searchParams.title != "" || searchParams.completed != "") && <button onClick={() => { typeSort = searchParamLink.get("sort"); setSearchParams(searchValues); setShowTodos(optionSort[typeSort](todos)) }}>Clear filter</button>}
                </div>
                {(!foundTodoFlag) ? <h2>Not Found </h2> : <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>{showTodos.map((todo) => {
                  return <Todo todo={todo} setLoad={setLoad} key={todo.id} setTodos={setTodo} deleteFromTodos={deleteFromTodos} style={{ boxSizing: "border-box" }} />
                })}
                </div>}
                {showTodos.length == 0 && <h3>not found todos</h3>}
              </div>
              : <LoadingMessage />}
          </div > :
          <ErrorMessege setWrongRequest={setWrongRequest} />
        }
          {addTodoFlag && <TodoAdd setaddTodoFlag={setaddTodoFlag} saveNewTodo={saveNewTodo} />}
          {searchTodoFlag && <TodoSearch setsearchTodoFlag={setsearchTodoFlag} searchTodos={searchTodos} handleSearchChange={handleSearchChange} searchParams={searchParams} />}
        </> : <NotFound />
      }

      <Outlet />
    </>
  )
}


