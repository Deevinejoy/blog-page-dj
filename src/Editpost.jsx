import {useEffect} from 'react'
import  {useParams} from 'react-router-dom'

const Editpost = ({ posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle}) => {
    const {id} =useParams();
    const post = posts.find(post =>(post.id).toString()=== id)
    useEffect(()=>{
        if(post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])
  return (
   
    <main className='newPost'>
        
      <>
        <h2>Edit Post</h2>
        <form className='newPostForm' onSubmit={(e)=> e.preventDefault()}>
        <label htmlFor='postTitle'>Title:</label>
        <input
            className='newpostTitle'
            id='postTitle'
            type='text'
            required
            value={editTitle}
            onChange={(e)=>{setEditTitle(e.target.value)
        }}/>

        <label htmlFor='postBody'>Post:</label>
        <textarea
            className='newpostBody'
            id='postBody'
            required
            value={editBody}
            onChange={(e)=>{setEditBody(e.target.value)
        }}/>
        <button 
            className='newButton'
            type='submit' 
            onClick={()=>handleEdit(post.id)} >Submit
        </button>
        </form>
    </>

</main>
)
}

export default Editpost
