import React from 'react'
import { NavLink } from 'react-router-dom'

const PostItem = (props) => {
  const { title, id, blog_status, content, featured_image_url } = props.postItem
  return (
    <div className="post-item-container">
      <div className="post-item-wrapper">
        <NavLink to={`/post-detail/${id}`}>
          <h1 style={{ fontSize: "1.5em" }}>{title}</h1>
        </NavLink>
        <div className="post-item-content-wrapper">
          <div className="post-item-content">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostItem;