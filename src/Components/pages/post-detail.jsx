import React from 'react'
import axios from 'axios'

export default class PostDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currId: props.match.params.slug,
      currPost: {}
    }
  }
  render() {
    return (
      <div className="post-detail-container">
        <h1>{this.state.currId}</h1>
      </div>
    )
  }
}
