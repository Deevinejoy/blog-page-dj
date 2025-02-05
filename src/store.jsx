import {createStore, action, thunk, computed } from 'easy-peasy'

import axios from 'axios'

 export default createStore({
    posts: [],
    setPosts: action((state, payload)=>{
        state.posts = payload
    }),
    postBody: [],
    setPostBody: action((state, payload)=>{
        state.postBody = payload
    }),
    postTitle: [],
    setPostTitle: action((state, payload)=>{
        state.postTitle = payload
    }),
    editTitle: [],
    setEditTitle: action((state, payload)=>{
        state.editTitle = payload
    }),
    editBody: [],
    setEditBody: action((state, payload)=>{
        state.editBody = payload
    }),
    search: [],
    setSearch: action((state, payload)=>{
        state.search = payload
    }),
    searchResults: [],
    setSearchResults: action((state, payload)=>{
        state.searchResults = payload
    }),
    postCount: computed((state)=> state.posts.length),
    getPostById: computed((state)=> {
        return (id) => state.posts.find(post => (post.id).toString() === id)
    }),
    savePost: thunk((async(actions, newPost, helpers) =>{
        const {posts} = helpers.getState();
        const baseURL = 'http://localhost:3000/posts'
        try{
            const response = await axios.post(baseURL, newPost)
          
           actions.setPosts([...posts, response.data])
            actions.setPostTitle('')
           actions.setPostBody('')
          
        } catch(err) {
          console.log(`Error: ${err.message}`)
        }

    })),
    deletePost: thunk((async(actions, id, helpers) =>{
        const {posts} = helpers.getState();
        try{
            await axios.delete(`http://localhost:3000/posts/${id}`)
            actions.setPosts(posts.filter(post =>
                post.id !== id
              ))
              navigate('/')
            } catch(err){
              console.log(`Error: ${err.message}`)
              
              
            }

    })),
    editPost: thunk((async(actions, updatePost, helpers) =>{
        const {posts} = helpers.getState();
        const {id} = updatePost;
        try{
            const response= await axios.put(`http://localhost:3000/posts/${id}`, updatePost)
           actions. setPosts(posts.map(post =>{
              post.id === id? { ...response.data} : post
            }))
            actions.setEditTitle('')
            actions.setEditBody('')

  
          }catch(err) {
              console.log(`Error: ${err.message}`)
        }

    }))

    
 })