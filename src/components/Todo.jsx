import { useState } from 'react'
import { Routes, Route, NavLink, Link } from "react-router-dom"
import { putInformetion, deleteInformetion } from '../JS/request'

export default function Todo({ task, setTodos, deleteFromTodos, setLoad }) {
    const [upDate, setUpDate] = useState(false);
    let detailsTodo = { title: task.title, completed: task.completed };
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
        let updateTodo = { id: task.id, title: addTodoParams.title, completed: !addTodoParams.completed, userId: task.userId }
        console.log(updateTodo);
        let afterPutTodo =await putInformetion(task.id, updateTodo, setLoad, "todos");
        if (afterPutTodo)
            setTodos(task.id, updateTodo);
    }
    async function deleteTodoFunc() {
        let afterDeleteRequ = await deleteInformetion(task.id, "todos");
        if (afterDeleteRequ)
            deleteFromTodos(task.id);
    }
    function updateTodoTitle() {
        let updateTask = {
            userId: task.userId,
            id: task.id,
            title: addTodoParams.title,
            completed:  addTodoParams.completed
        };
        let afterPutTodo = putInformetion(task.id, updateTask, setLoad, "todos");
        if (afterPutTodo) {
            setTodos(task.id, updateTask);
            setUpDate(false);
        }
    }
    return (
        <>
            <form style={{ display: "flex", margin: "5px", padding: "3px", justifyContent: "space-between" }}>
                <h3>{task.id}</h3>
                {!upDate ? <h3 style={{ width: "65vw" }}>{task.title}</h3> : <input type="text" name="title" value={addTodoParams.title} onChange={(e) => handleTodoChange(e)} />}
                <input type="checkbox" checked={addTodoParams.completed}  name="completed" onChange={(e) => handleTodoChange(e)} />
                {!upDate ? <button onClick={(e) => {
                    setUpDate(true); e.preventDefault();
                }} style={{}}>🖋️</button> : <button onClick={(e) => { updateTodoTitle(); e.preventDefault(); }}>ok</button>}
                <button onClick={(e) => {
                    e.preventDefault();
                    deleteTodoFunc()
                }}>🗑️</button>

            </form>
        </>
    )
}


