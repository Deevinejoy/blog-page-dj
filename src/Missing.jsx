import React from 'react'
import {Link} from 'react-router-dom'

const Missing = () => {
  return (
   <main className='missing'>
    <h2>Page missing</h2>
    <p>Well thats diappointing</p>
    <p>
      <Link to='/'>Vist our Homepage</Link>
    </p>
   </main>
  )
}

export default Missing