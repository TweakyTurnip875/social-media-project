import React, { Component } from 'react'
import axios from 'axios'
import DropzoneComponent from "react-dropzone-component";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import RichTextEditor from '../forms/rich-text-editor'

export default class PostForm extends Component {
  constructor() {
    super()
    this.state = {
      id: "",
      title: "",
      content: "",
      blog_status: "published",
      featured_image: "",
      category: "",
      apiUrl: "https://launch.devcamp.space/portfolio/portfolio_blogs/",
      apiAction: "post"
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.buildForm = this.buildForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this)
  }
  handleRichTextEditorChange(content) {
    this.setState({ content })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  buildForm() {
    let formData = new FormData();

    //formData.append("portfolio_blog[id]", this.state.id)
    var tc;
    if(this.state.category === "projects" || this.state.category === "questions" || this.state.category === "all") {
      tc = this.state.title + " " + this.state.category
    } else {
      tc = this.state.title
    }
    formData.append("portfolio_blog[title]", tc)
    formData.append("portfolio_blog[content]", this.state.content)
    formData.append("portfolio_blog[blog_status]", this.state.blog_status)

    return formData;
  }
  handleSubmit(event) {
    
    axios.post("https://launch.devcamp.space/portfolio/portfolio_blogs/",
      this.buildForm(),
      { withCredentials: true }
    ).then(res => {
      this.setState({
        title: "",
        content: "",
        category: "",
      })
      console.log(res)
      this.props.handleSuccessfulFormSubmission(res.data.portfolio_blog)
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
          <input
          onChange={this.handleChange}
          placeholder="category"
          name="category"
          value={this.state.category}
          />
        </div>
        <div>
          <RichTextEditor 
          handleRichTextEditorChange={this.handleRichTextEditorChange}
          />
        </div>
        <button className="btn" type="submit">Sumbit</button>
      </form>
    )
  }
}