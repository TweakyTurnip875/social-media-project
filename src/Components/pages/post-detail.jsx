import React from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';

export default class PostDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currId: props.match.params.slug,
      currPost: {}
    }
  }
  getPost() {
    axios.get(`https://launch.devcamp.space/portfolio/portfolio_blogs/${this.state.currId}`).then(res => {
      this.setState({
        currPost: res.data.portfolio_blog
      })
    })
  }
  componentDidMount() {
    this.getPost()
  }
  render() {
    const {title, content, featured_image_url, blog_status} = this.state.currPost;
    return (
      <div className="post-detail-container">
        <div className="post-detail-wrapper">
          <div>
            <h1>{title}</h1>
            <div>({blog_status})</div>
          </div>
          {featured_image_url != null ? (
            <div 
            className="featured-image-wrapper" 
            style={{
               backgroundImage: "url(" + featured_image_url + ")" 
            }}
            />
          ) : (
            null
          )}
          <div>{ReactHtmlParser(content)}</div>
        </div>
      </div>
    )
  }
}
