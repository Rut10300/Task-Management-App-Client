import React from 'react';

export default function TodoSearch({ setsearchTodoFlag, searchTodos, handleSearchChange, searchParams }) {
  return (
    <div className="back">
      <div className='searchCompo'>
        <button onClick={() => {
          setsearchTodoFlag(false);
        }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
        <h3>search Task</h3>
        <label htmlFor="taskId">Task Id</label><br />
        <input id="taskId" className='notTouch' name="taskId" value={searchParams.taskId} onChange={(e) => { handleSearchChange(e.target.value, e.target.name); e.preventDefault() }} type="number" placeholder="12" min="1" /><br />
        <label htmlFor="title">Title</label><br />
        <input id="title" className='notTouch' name="title" value={searchParams.title} type="text" required onChange={(e) => { handleSearchChange(e.target.value, e.target.name); e.preventDefault() }} /><br />
        <label htmlFor="completed">Completed</label><br />
        <input type="text" name="completed" value={searchParams.completed} placeholder='yes / no' onChange={(e) => { handleSearchChange(e.target.value, e.target.name); e.preventDefault() }} /><br />
        <button type="sumbit" id='submitButton' className='submit'
          onClick={(e) => { e.preventDefault(); searchTodos(); setsearchTodoFlag(false); }}>search</button>
      </div>
    </div>
  );
}
