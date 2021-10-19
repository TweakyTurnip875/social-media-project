import React from 'react'
import { Link } from 'react-router-dom'
import striptags from 'striptags'
import Truncate from 'react-truncate'

const PostItem = (props) => {
  const { title, id, blog_status, content, featured_image_url } = props.postItem
  return (
    <div className="post-item-container" style={{ paddingBottom: "40px" }}>
      <div className="post-item-wrapper">
        <Link to={`/post-detail/${id}`}>
          <h1>{title}</h1>
        </Link>
        <div className="post-item-content-wrapper">
          <div className="post-item-content">
          <Truncate lines={5} ellipsis={
            <span>
              ...<Link to={`/post-detail/${id}`}>read more</Link>
            </span>
          }>
            {striptags(content)}
          </Truncate>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PostItem;