import React from 'react'
import { Link } from 'react-router-dom'
import striptags from 'striptags'
import Truncate from 'react-truncate'

const PostItem = (props) => {
  const { title, id, blog_status, content, featured_image_url } = props.postItem

  return (
    <div className="post-item-container" style={{ paddingBottom: "60px" }}>
      <div className="post-item-wrapper">
          <Link to={`/post-detail/${id}`}>
            <h1>{title}</h1>
          </Link>

        <div className="post-item-content-wrapper">
          <div className="post-item-content">
            {content != "" ? (

              <Truncate lines={3} ellipsis={
              <span>
                ...<Link to={`/post-detail/${id}`}>read more</Link>
              </span>
            }>
            {striptags(content)}
            </Truncate>
          ) : (
            <div><strong>[empty]</strong></div>
          )}
            {featured_image_url != null ? (
              <div className="featured-image-wrapper">
                <div 
                  style={{
                    backgroundImage: "url(" + featured_image_url + ")",
                  }}
                />
              </div>
            ) : (
              null
            )}

          </div>
        </div>
        
      </div>
    </div>
  )
}
export default PostItem;