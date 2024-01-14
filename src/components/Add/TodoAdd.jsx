import React from 'react';
import { useState } from 'react'

export default function TodoAdd({setaddTodoFlag,saveNewTodo}) {
    const todoValues = {
        title: '',
        completed: ''
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
    return (
        <div style={{ zIndex: "10", backgroundColor: "lightskyblue", position: "absolute", border: "2px solid black", top: "30vh", right: "40vw", padding: "2vh" }}>
            <button onClick={() => {setaddTodoFlag(false); }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
            <h3>Add Todov </h3>
            <label htmlFor="title">Title</label><br />
            <input id="title" className='notTouch' value={detailsAddTodo.title} name="title" type="text" required onChange={(e) => handleInputChangeAddTodo(e)} /><br />
            <label htmlFor="completed">Completed</label><br />
            <input type="checkbox" checked={detailsAddTodo.completed} name="completed" value="completed" onChange={(e) => handleInputChangeAddTodo(e)} /><br />
            <button type="sumbit" id='submitButton' className='submit'
                onClick={(e) => { e.preventDefault(); saveNewTodo(detailsAddTodo);setDetailsAddTodo(todoValues) }}>Add</button>
        </div>
    );
}


