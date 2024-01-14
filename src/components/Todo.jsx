import { useState } from 'react'
import { putInformetion, deleteInformetion } from '../JS/request'
import { Outlet } from 'react-router-dom';
import './css/todo.css'
export default function Todo({ todo, setTodos, deleteFromTodos, setLoad }) {
    const [upDate, setUpDate] = useState(false);
    let detailsTodo = { title: todo.title, completed: todo.completed };
    const [addTodoParams, setaddTodoParams] = useState(detailsTodo);
    function handleTodoChange(e) {
        e.preventDefault();
        let { name, value } = e.target;
        if (name == "completed") {
           value=e.target.checked
            Changechecked();
        }
        setaddTodoParams({
            ...addTodoParams,
            [name]: value
        })

    }
  async  function Changechecked() {
        let updateTodo = { id: todo.id, title: addTodoParams.title, completed: !addTodoParams.completed, userId: todo.userId }
        let afterPutTodo =await putInformetion(todo.id, updateTodo, setLoad, "todos");
        if (afterPutTodo)
            setTodos(todo.id, updateTodo);
    }
    async function deleteTodoFunc() {
        let afterDeleteRequ = await deleteInformetion(todo.id, "todos");
        if (afterDeleteRequ)
            deleteFromTodos(todo.id);
    }
    function updateTodoTitle() {
        let updatetodo = {
            userId: todo.userId,
            id: todo.id,
            title: addTodoParams.title,
            completed:  addTodoParams.completed
        };
        let afterPutTodo = putInformetion(todo.id, updatetodo, setLoad, "todos");
        if (afterPutTodo) {
            setTodos(todo.id, updatetodo);
            setUpDate(false);
        }
    }
    return (
        <>
            <form  style={{width:"12vw"}}>
                <div className='todo'>
                <p>{todo.id}</p>
                {!upDate ? <p >{todo.title}</p> : <input type="text" name="title" value={addTodoParams.title} onChange={(e) => handleTodoChange(e)} />}
                <input id="checked" type="checkbox" checked={addTodoParams.completed}  name="completed" onChange={(e) => handleTodoChange(e)} />
                <div className='buttons'>{!upDate ? <button  onClick={(e) => { setUpDate(true); e.preventDefault(); }} style={{}}>🖋️</button> 
                : <button onClick={(e) => { updateTodoTitle(); e.preventDefault(); }}>ok</button>}
                <button onClick={(e) => {  e.preventDefault();  deleteTodoFunc()  }}>🗑️</button>
                </div>
                </div>
            </form>
            
        </>
    )
}


