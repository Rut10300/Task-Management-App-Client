import { useState } from 'react'
import { Routes, Route, NavLink, Link } from "react-router-dom"
import { putInformetion, deleteInformetion } from '../JS/request'

export default function Todo({ task, setTodos, deleteFromTodos,setLoad }) {
    const [upDate, setUpDate] = useState(false);
    let details = task.title;
    const [title, setTitle] = useState(details);
      function Changechecked(e) {
        e.preventDefault();
        task.completed = !task.completed;
        let afterPutTodo =   putInformetion(task.id, task,setLoad,"todos");
        if (afterPutTodo)
            setTodos(task.id,task);
    }
    async function deleteTodoFunc() {
        let afterDeleteRequ = await deleteInformetion(task.id,"todos");
        console.log(task.id);
        if (afterDeleteRequ)
            deleteFromTodos(task.id);
    }
     function updateTodoTitle() {
        let updateTask = {
            userId: task.userId,
            id:task.id,
            title: title,
            completed: task.completed
        };
        let afterPutTodo =  putInformetion(task.id, updateTask,setLoad,"todos");

        if (afterPutTodo) {
            setTodos(task.id,updateTask);
            setUpDate(false);
        }
    }
    return (
        <>
            <form style={{ display: "flex", margin: "5px", padding: "3px", justifyContent: "space-between" }}>
                <h3>{task.id}</h3>
                {!upDate ? <h3 style={{ width: "65vw" }}>{task.title}</h3> : <input type="text" value={title} onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value)
                }} />}

                <input type="checkbox" checked={task.completed} value="completed" onChange={(e) => Changechecked(e)} />
                {!upDate ? <button onClick={(e) => {
                    setUpDate(true); e.preventDefault();
                }} style={{}}>🖋️</button> : <button onClick={(e) => {updateTodoTitle(); e.preventDefault();}}>ok</button>}
                <button onClick={(e) =>{ e.preventDefault();
                    deleteTodoFunc()}}>🗑️</button>

            </form>
        </>
    )
}


