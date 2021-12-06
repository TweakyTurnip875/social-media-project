import React from 'react'
import { Link } from 'react-router-dom'
import striptags from 'striptags'
import Truncate from 'react-truncate'

const PostItem = (props) => {
  const { title, id, blog_status, content, featured_image_url } = props.postItem
  
  var t = null;
  var newTitle = title;
  if(title.split(" ").length >= 2) {
      // replaces the first category in title with empty string and this value is set to var t
      t = title.replace(props.categories[0], "");
      // Replaces the second category in var t and replaces with empty string. Value set to var newTitle
      newTitle = t.replace(props.categories[1], "");
  }

  return (
    <div className="post-item-container">
      <div className="post-item-wrapper">
        <div className="post-item">
        <div className="">
        <Link to={`/post-detail/${id}`}>
          <div>{newTitle}</div>
        </Link>

        {featured_image_url ? (
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

        <div className="post-item-content-wrapper">
          <div className="post-item-content">
            {!featured_image_url ? (
              
            <Truncate lines={3} ellipsis={
              <span>
                <Link to={`/post-detail/${id}`}>...read more</Link>
              </span>
            }>
            {striptags(content)}
            </Truncate>
          ) : (
            null
          )}


          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}
export default PostItem;