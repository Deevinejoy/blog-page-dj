import React from 'react'
import { Link, useParams } from 'react-router-dom'


const PostPage = ({posts, handleDelete}) => {
  const { id } = useParams();
  const post = posts.find(post=> (post.id).toString() === id);

  return (
    <main className='postPage'>
       <article className='post'>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>
              {post.datetime}
            </p>
            <p className='postBody'>
              {post.body}
            </p>
            <Link to={`./edit/${post.id}`}>
             <button className='editButton'> Edit post</button>
            </Link>
            <button 
             className='delButton'
             onClick={()=>{handleDelete(post.id)}}>
             Delete post
            </button>
         </>
        }
        {!post && 
            <>
                <h2>N0 post</h2>
                <p>Well, thats disppointing</p>
                <p>
                  <Link to='/'>Visit Our Homepage</Link>
                </p>
          </>
        }
       </article>
    </main>
  )
}

export default PostPage