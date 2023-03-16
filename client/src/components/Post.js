import React from 'react'
import {formatISO9075} from 'date-fns'

const Post = ({content, createdAt,summary,title,updatedAt, author}) => {
  return (
    <div className='post-container'>
        <div className='image'>
            <img src='https://i.pinimg.com/736x/17/d5/d3/17d5d3463a1718404afdcd6057b8dd87.jpg' alt='techimage'/>
        </div>
        <div className='text'>
            <h2>{title}</h2>
          <p className='info'>
          <a href='ww'>{author}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
            <p >{summary}</p>
        </div>
    </div>
  )
}

export default Post