import React from 'react'

const PostItem = (props) => {
  const { title, id, blog_status, content, featured_image_url } = props.postItem
  return (
    <div>
      <div>
        <a>
          <h1 style={{ fontSize: "1.5em" }}>{title}</h1>
        </a>
        <div className="post-content-wrapper">
          <div className="post-content">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostItem;