import { useState } from 'react'

export default function AlbumAdd({ saveNewAlbum, setAddAlbumFlag }) {

  const [title, setTitle] = useState("")

  return (
    <>

      <div className="back">
        <div className='addCompo' >
          <button onClick={() => {
            setAddAlbumFlag(false);
          }} style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>✖️</button>
          <h3>Add Album</h3>
          <label htmlFor="title">Title</label><br />
          <input id="title" className='notTouch' name="title" type="text" required onChange={(e) => setTitle(e.target.value)} /><br />
          <button type="sumbit" id='submitButton' className='submit'
            onClick={(e) => {
              e.preventDefault();
              saveNewAlbum(title);
              setAddAlbumFlag(false);
            }}>Add</button>

        </div>

      </div>
    </>
  )
}


