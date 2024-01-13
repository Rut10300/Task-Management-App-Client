import React from 'react';

function ErrorMessege({setworngRequest}) {
  return (
    <div >
          <h1>something worng...</h1>
          <button onClick={() => { setworngRequest(false) }}>try again</button>
        </div>
  );
}

export default ErrorMessege;
