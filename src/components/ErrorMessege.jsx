import React from 'react';

function ErrorMessege({ setWrongRequest }) {
  return (
    <div >
      <h1>something worng...</h1>
      <button onClick={() => { setWrongRequest(false) }}>try again</button>
    </div>
  );
}

export default ErrorMessege;
