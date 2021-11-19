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
      titleArray: [],
      postModalOpen: false,
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      categories: [
        "projects", 
        "questions",
      ],
    }
    this.handleNewPostSubmission = this.handleNewPostSubmission.bind(this)
    this.handleNewPostClick = this.handleNewPostClick.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)

    window.addEventListener("scroll", this.onScroll, false)
  }
  onScroll() {
    
    if(this.state.postCollection.length === this.state.totalCount) {
      this.setState({
        isLoading: false
      })
      return;
    } 
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      
      this.setState({
        isLoading: true
      })
      
      this.getPosts()
    }
    
  }
  handleFilterClick(filter) {
    // this.setState({
    //   postCollection: this.state.postCollection.filter(res => {
    //     return res.title == filter
    //   })
    // })
  }
  handleNewPostSubmission(post) {
    this.setState({
      postModalOpen: false,
      postCollection: [post].concat(this.state.postCollection) 
    })
  }
  getPosts() {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
    axios.get(`https://launch.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`).then(res => {
      this.setState({
        postCollection: this.state.postCollection.concat(res.data.portfolio_blogs),
        totalCount: res.data.meta.total_records,
        isLoading: false,
      })

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
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false)
  }

  render() {
    const postRecords = this.state.postCollection.map(postItem => {
      return (
        <div>
          <PostItem key={postItem.id} categories={this.state.categories} postItem={postItem} />
        </div>
      );
    })
    return (
      <div className="post-container">
        
        <PostModal 
        handleNewPostSubmission={this.handleNewPostSubmission} 
        postModalOpen={this.state.postModalOpen} 
        handleModalClose={this.handleModalClose}
        />
        <div className="filter-container">
          <div className="filter-wrapper">
            <button onClick={() => this.handleFilterClick("projects")} className="btn">projects</button>
            <button onClick={() => this.handleFilterClick("questions")}   className="btn">questions</button>
            <button className="btn">all</button>
          </div>
        </div>
        {this.state.isLoading
        ? (
          <div className="icon-wrapper">
            <FontAwesomeIcon icon="spinner" pulse />
          </div>
        ) : (
          null
        )}
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
    )
  }
}