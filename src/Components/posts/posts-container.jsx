import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PostModal from '../modals/post-modal'
import PostItem from './post-item'

export default class PostsContainer extends Component {
  constructor() {
    super()
    this.state = {
      postCollection: [],
      postModalOpen: false
    }
    this.handleNewPostSubmission = this.handleNewPostSubmission.bind(this)
    this.handleNewPostClick = this.handleNewPostClick.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }
  
  getPosts() {
    axios.get("https://launch.devcamp.space/portfolio/portfolio_blogs/").then(res => {
      this.setState({
        postCollection: res.data.portfolio_blogs
      })
    })
  }
  handleNewPostSubmission(post) {
    this.setState({
      postModalOpen: false,
      postCollection: [post].concat(this.state.postCollection) 
    })
  }
  handleNewPostClick() {
    this.setState({
      postModalOpen: true
    })
  }
  handleModalClose() {
    this.setState({
      postModalOpen: false
    })
  }
  componentDidMount() {
    this.getPosts()
  }
  render() {
    const postRecords = this.state.postCollection.map(postItem => {
      return (
        <PostItem postItem={postItem} />
      );
    })
    return (
      <div className="post-container">
      
      <div className="filter-container">
        
        <div className="filter-wrapper">
          <button className="btn">Projects</button>
          <button className="btn">Questions</button>
          <button className="btn">All</button>
        </div>
          
        <div className="post-wrapper">
            <div className="posts">
            
              {postRecords}
            </div>
          <div className="post-btn-wrapper">
            <div className="post-btn">
              <a onClick={() => this.handleNewPostClick()}>
                <FontAwesomeIcon icon="plus-circle" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <PostModal 
      handleNewPostSubmission={this.handleNewPostSubmission} 
      postModalOpen={this.state.postModalOpen} 
      handleModalClose={this.handleModalClose}
      />
      </div>
      
    )
  }
}