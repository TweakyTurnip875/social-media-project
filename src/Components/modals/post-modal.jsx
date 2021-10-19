import React, { Component } from 'react';
import ReactModal from 'react-modal'

import PostForm from '../posts/post-form'

export default class PostModal extends Component {
  constructor(props) {
    super(props)
    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this)
  }
  handleSuccessfulFormSubmission(post) {
    this.props.handleNewPostSubmission(post)
  }
  render() {
    return (
      <ReactModal 
        isOpen={this.props.postModalOpen} 
        onRequestClose={() => {
          this.props.handleModalClose()
        }}
      >
        <PostForm 
        getPosts={this.props.getPosts}
        handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
        />
      </ReactModal>
    )
  }
}