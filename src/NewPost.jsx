import React from 'react'

const NewPost = ({ handleSubmit, postTitle,setPostTitle, postBody,setPostBody}) => {
  return (
    <main className='newPost'>
       <h2>New Post</h2>
       <form className='newPostForm' onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor='postTitle'>Title:</label>
        <input
        className='newpostTitle'
        id='postTitle'
        type='text'
        required
        value={postTitle}
        onChange={(e)=>{
          setPostTitle(e.target.value)
        }}/>

        <label  htmlFor='postBody'>Post:</label>
        <textarea
         className='newpostBody'
        id='postBody'
        required
        value={postBody}
        onChange={(e)=>{
          setPostBody(e.target.value)
        }}/>
        <button 
        className='newButton' type='submit'>Submit</button>

       </form>
    </main>
  )
}

export default NewPost

