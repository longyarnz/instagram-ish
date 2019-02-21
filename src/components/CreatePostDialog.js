import React, { useEffect } from 'react'
import PickAFile from './PickAFile';

export default function CreatePostDialog(props) {
  // const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
  });

  const onSubmit = e => {
    e.preventDefault();
    const [ file, text ] = e.target;
    console.log([ file, text ]);
  }

  return (
    <div className="create-post-dialog">
      <form onSubmit={onSubmit}>
        <PickAFile
          width="150px"
          height="150px"
          radius="5px"
          className="pick-a-file"
          src="assets/img/bg/white.png"
          required={true}
          name="image"
        />
        <textarea 
          name="text" 
          rows="3" 
          placeholder="Caption your post..." 
          autoCapitalize="on"
          autoComplete="on"
          spellCheck="true"
          required={true}
        ></textarea>
        <button type="submit">
          CREATE
        </button>
      </form>
    </div>
  )
}
