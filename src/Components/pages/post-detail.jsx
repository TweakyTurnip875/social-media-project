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
    const {title, content, featured_image_url} = this.state.currPost;
    return (
      <div className="post-detail-container">
        <h1>{title}</h1>
        {featured_image_url != null ? (
          <div className="featured-image-wrapper">
            <img src={featured_image_url} />
          </div>
        ) : (
          null
        )}
        <div>{ReactHtmlParser(content)}</div>
      </div>
    )
  }
}
