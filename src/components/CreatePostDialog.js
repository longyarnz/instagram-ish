import React, { useEffect } from 'react'

export default function CreatePostDialog(props) {
  // const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    return () => {
      props.dispatch({
        type: 'NULL PREVIEW URL',
      });
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    const [file, caption] = e.target;
    console.log([file, caption]);
  }

  return (
    <div className="create-post-dialog">
      <form onSubmit={onSubmit}>
        <select name="category" required={true}>
          <option>Category</option>
          <option value="gowns">Gowns</option>
          <option value="suits">Suits</option>
          <option value="Jackets">Jackets</option>
        </select>
        <input
          type="text"
          name="caption"
          placeholder="Caption your post..."
          autoCapitalize="on"
          autoComplete="on"
          spellCheck="true"
          required={true}
        />
        <button type="submit">
          CREATE POST
        </button>
      </form>
    </div>
  )
}
