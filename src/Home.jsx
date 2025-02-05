import React from 'react'
import Feed from './Feed'

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'> Loading Posts...</p>}
      {fetchError && <p className='statusMsg' style={{color: 'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length ? <Feed className='feed' posts={posts}/> : <p className='statusMsg'>No post</p>)}
       
    </main>
  )
}

export default Home