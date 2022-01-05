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
      filter: "newest",
      postModalOpen: false,
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
    }
    this.handleNewPostSubmission = this.handleNewPostSubmission.bind(this)
    this.handleNewPostClick = this.handleNewPostClick.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.onScroll = this.onScroll.bind(this)

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
  handleFilterChange(event) {
   console.log(event)
    this.setState({
      filter: event.target.value,
      postCollection: this.state.postCollection.reverse()
    })

  }
  handleNewPostSubmission(post) {
    this.setState({
      postModalOpen: false,
      postCollection: [post].concat(this.state.postCollection) 
    })
    if(this.state.filter === "oldest") {
      this.setState({
        postCollection: this.state.postCollection.reverse()
      })
    }
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
      console.log(this.state.postCollection)
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
        {this.state.isLoading
        ? (
          <div className="icon-wrapper">
            <FontAwesomeIcon icon="spinner" pulse />
          </div>
        ) : (
          null
        )}
        <div>
          <select 
          id="filter-options"
          name="filter-options"
          value={this.state.filter} 
          class="filter-container" 
          onChange={this.handleFilterChange}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        {this.state.filter}
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