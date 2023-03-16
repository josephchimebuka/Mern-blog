import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';  
import {Navigate} from 'react-router-dom'

const CreatePost = () => {

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  const formats = 
      [ 'header', 'font', 'size', 'bold', 'italic', 
      'underline', 'strike', 'blockquote', 'list', 
      'bullet', 'indent','link','image'];


  const[title, setTitle] = useState('');
  const[summary, setSummary] = useState('')
  const[files, setFiles] = useState('')
  const[content, setContent] = useState('')
  const [redirect, setRidirect] =  useState(false)
  async function createNewPost(e){
    const data = new FormData();
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])
    e.preventDefault(); 
    console.log(files)

   const response = await fetch('http://localhost:4000/post',{
      method: 'POST',
      body: data,
      credentials:'include',
    })
    if(response.ok){
      setRidirect(true)
    }
    console.log(await response.json())
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
  
  <form onSubmit={createNewPost}>
    <input
     type='text'
     placeholder='Title'
     value={title}
     onChange={(e)=> setTitle(e.target.value)}
      />
    <input 
    type='text' 
    placeholder='Summary'
    value={summary}
    onChange={(e)=> setSummary(e.target.value)}
    />
    <input 
    type='file'
    onChange={(e)=> setFiles(e.target.files)}
    />
    <ReactQuill
    value={content} 
    onChange={newContent => setContent(newContent)}
    modules={modules}
    formats={formats}
    />
    <button type='submit'>Create Post</button>
  </form>
  )
}

export default CreatePost