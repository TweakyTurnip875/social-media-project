import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PostModal from '../modals/post-modal'
import PostItem from './post-item'
import Theme from '../Theme'


export default class PostsContainer extends Component {
  constructor() {
    super()
    this.state = {
      postCollection: [],
      filterCollection: [],
      postsWithFilter: [],
      filter: false,
      filterCat: "CLEAR_FILTER",
      currPost: {},
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
    this.getCategoryFromTitle = this.getCategoryFromTitle.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.getPostsPage = this.getPostsPage.bind(this);

    window.addEventListener("scroll", this.onScroll, false)
  }
  onScroll() {
    // if filter is enabled, sort by the last clicked filter.

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
      this.getPostsPage()
      this.handleFilter(this.state.filterCat)
      
    }
  }
  getCategoryFromTitle(title) {
    /*
      1. set var newTitle as title split into array.

      2. only if title is greater or equal to two: 
        set var cat as the last index value of newTitle 
        (the category is stored at the end title and is hidden when displayed on screen.)

      3. return cat variable.

    */
    var cat = null;
    const newTitle = title.split(" ");
    if(newTitle.length >= 2) {
      cat = newTitle[newTitle.length - 1];
    }
    return cat;
  }
  handleFilterClick(filter) {
    this.setState({
      postCollection: [],
      filterCollection: [],
      currentPage: 0,
    })
    this.handleFilter(filter)
  }
  handleFilter(filter) {
    this.setState({
      filterCat: filter,
    })
    console.log(filter)
    if(filter === "CLEAR_FILTER") {
      this.getPosts();
    } else {
      this.getPosts(filter);
    }
  }
  handleNewPostSubmission(post) {
    
    this.setState({
      postModalOpen: false,
      postCollection: [post].concat(this.state.postCollection) 
    })
    // if filter is enabled, refresh the filter.
    if(this.state.filter) {
      this.handleFilter(this.state.filterCat)
    }
  }
  getPostsPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }
  getPosts(filter = null) {
    
    axios.get(`https://launch.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`).then(res => {

      
      if(filter) {
        this.setState({
          // filterCollection: this.state.filterCollection.concat(res.data.portfolio_blogs.filter(f => {
          //   return this.getCategoryFromTitle(f.title) == filter
          // })),
          postCollection: res.data.portfolio_blogs.filter(f => {
            return this.getCategoryFromTitle(f.title) === filter
          }),

          filterCollection: this.state.filterCollection.concat(res.data.portfolio_blogs.filter(f => {
            return this.getCategoryFromTitle(f.title) === filter;
          })),
          totalCount: res.data.meta.total_records,
          isLoading: false,
        })
        console.log("filterCollection", this.state.filterCollection)
      } else {
        this.setState({
          postCollection: this.state.postCollection.concat(res.data.portfolio_blogs),
          totalCount: res.data.meta.total_records,
          isLoading: false,
        })
        console.log("postCollection", this.state.postCollection)
      }

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
    this.setState({
      filter: false
    })
  }

  render() {

      const filterRecords = this.state.filterCollection.map(postItem => {
        return (
          <div>
            <PostItem key={postItem.id} categories={this.state.categories} postItem={postItem} />
          </div>
        );
      })

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
            <button onClick={() => this.handleFilterClick("CLEAR_FILTER")} className="btn">all</button>
          </div>
        </div>

        <div className="post-wrapper">
            <div className="posts">
              {this.state.filterCat != 'CLEAR_FILTER' ? (
                <div>{filterRecords}</div>     
              ) : (
                <div>{postRecords}</div>
              )}
              
            </div>
                    {this.state.isLoading
        ? (
          <div className="icon-wrapper">
            <FontAwesomeIcon icon="spinner" pulse />
          </div>
        ) : (
          null
        )}
            <div className="post-btn-container">
              <div className="post-btn-wrapper">
              <a className="modal-icon" onClick={() => this.handleNewPostClick()}>
                <FontAwesomeIcon icon="plus-circle" />
              </a>
              </div>
            </div>
            
        </div>
      </div>
    )
  }
}