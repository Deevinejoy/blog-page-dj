
import './index.css'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import {Route, Routes, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {format} from 'date-fns'
import Editpost from './Editpost'
import axios from 'axios'
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch'

const App = () => {      
    const [posts, setPosts] = useState([])
    const [search, setSearch] =useState('');
    const [searchResult, setSearchResult] =useState([]);
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const baseURL = 'http://localhost:3000/posts'
    const navigate= useNavigate()
    const { width } = useWindowSize()
    const {data, fetchEror, isLoading} = useAxiosFetch('http://localhost:3000/posts')
    

    useEffect(()=>{
        setPosts(data);
      },[data, setPosts]
   )

   
   useEffect(()=>{
        const filteredResult= posts.filter((post) => 
        ((post.body).toLowerCase().includes(search.toLowerCase()) 
        ||(post.title).toLowerCase().includes(search.toLowerCase()) 
         )) 
        setSearchResult(filteredResult.reverse());
    },[posts, search])

    const handleSubmit =async (e) =>{
        e.preventDefault();
        const id=posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime =format(new Date(), 'dd MMMM, yyyy pp');
        const newPost = {id, title: postTitle, datetime, body: postBody}
        try{
              const response = await axios.post(baseURL, newPost)
              const allPost= [...posts, response.data];
              setPosts(allPost)
              setPostTitle('')
              setPostBody('')
              navigate('/')
          } catch(err) {
            console.log(`Error: ${err.message}`)
          }
      }
    const handleEdit = async (id)=>{
        const datetime =format(new Date(), 'dd MMMM, yyyy pp');
        const updatePost = {id, title: editTitle, datetime, body: editBody}
        try{
          const response= await axios.put(`http://localhost:3000/posts/${id}`, updatePost)
          const newEdit = posts.map(post =>{
            post.id === id? {...response.data} : post
          })
          setPosts(newEdit)
          setEditTitle('')
          setEditBody('')
          navigate('/')
        }catch(err) {
            console.log(`Error: ${err.message}`)
      }
    }

    const handleDelete = async (id) =>{
        try{
        await axios.delete(`http://localhost:3000/posts/${id}`)
        const postlist = posts.filter(post => post.id !== id)
        setPosts(postlist)
          navigate('/')
        } catch(err){
          console.log(`Error: ${err.message}`)
        }
      }
      
    return (
        <div className='App'>
          <Header
            title='Blog Page'
            width ={width}/>
          <Nav 
             search={search}
             setSearch={setSearch}/>
          <Routes>
            <Route exact path="/"
                   element={<Home
                          title="Blog  post"
                          posts={searchResult}
                          fetchEror={fetchEror}
                          isLoading={isLoading}/>}>

            </Route>
          
            <Route exact path="/post" 
                   element={<NewPost
                          handleSubmit={handleSubmit}
                          postTitle={postTitle}
                          setPostTitle={setPostTitle}
                          postBody={postBody}
                          setPostBody={setPostBody}/>}>
            </Route>
            <Route  path="/post/:id/edit/:id" 
                   element={<Editpost
                          posts={posts}
                          handleEdit={handleEdit}
                          editTitle={editTitle}
                          setEditTitle={setEditTitle}
                          editBody={editBody}
                          setEditBody={setEditBody}/>}>
            </Route>
            <Route path="/post/:id"
                   element={<PostPage posts={posts} 
                   handleDelete={handleDelete}/>}>
            </Route>
            <Route path='/about' 
                   Component={About}/>
            <Route path='*' 
                   Component={Missing}/>
                   
          </Routes>
          <Footer/>
        </div>

       )
  
}

export default App
