import React from 'react'
import Blogs from '../../Components/Blogs'

const AuthorBlogs = (props) => {
  return (
    <div>
      <Blogs user = {props.user}/>
    </div>
  )
}

export default AuthorBlogs