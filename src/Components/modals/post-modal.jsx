import React, { Component } from 'react';
import ReactModal from 'react-modal'

import PostForm from '../posts/post-form'

export default class PostModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ReactModal 
        isOpen={this.props.postModalOpen} 
        onRequestClose={() => {
          this.props.handleModalClose()
        }}
      >
        <PostForm />
      </ReactModal>
    )
  }
}