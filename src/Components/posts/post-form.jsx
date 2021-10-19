import React, { Component } from 'react'
import axios from 'axios'

export default class PostForm extends Component {
  constructor() {
    super()
    this.state = {
      id: "",
      title: "",
      content: "",
      blog_status: "published",
      featured_image: "",
      apiUrl: "https://launch.devcamp.space/portfolio/portfolio_blogs/",
      apiAction: "post"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.buildForm = this.buildForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  buildForm() {
    let formData = new FormData();

    //formData.append("portfolio_blog[id]", this.state.id)
    formData.append("portfolio_blog[title]", this.state.title)
    //formData.append("portfolio_blog[content]", this.state.content)
    formData.append("portfolio_blog[blog_status]", this.state.blog_status)

    return formData;
  }
  handleSubmit(event) {
    
    axios.post("https://launch.devcamp.space/portfolio/portfolio_blogs/",
      this.buildForm(),
      { withCredentials: true }
    ).then(res => {
      this.props.handleSuccessfulFormSubmission(res.data)
    }).catch(error => {
      console.log("Error submiting form", error)
    })
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input 
          onChange={this.handleChange} 
          placeholder="title" name="title" 
          value={this.state.title}
          />
        </div>
        <button class="btn" type="submit">Sumbit</button>
      </form>
    )
  }
}