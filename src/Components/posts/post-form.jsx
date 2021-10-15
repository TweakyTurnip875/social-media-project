import React, { Component } from 'react'

export default class PostForm extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  handleNewPostSubmission(event) {
    
  }
  render() {
    return (
      <form>
        <div>
          <input placeholder="title"></input>
          <input placeholder="author"></input>
        </div>

        <button class="btn" type="submit">Sumbit</button>
      </form>
    )
  }
}