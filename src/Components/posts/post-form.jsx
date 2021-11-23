import React, { Component } from 'react'
import axios from 'axios'
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
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
    this.componentConfig = this.componentConfig.bind(this)
    this.djsConfig = this.djsConfig.bind(this)
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this)
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
    /* ------- categories ------- */

      // This is a hacky way of implementing categories feature but this is the only way I can with this api.

      var title;
      if(this.state.category === "projects" || this.state.category === "questions" || this.state.category === "all") {
        // Adds the category to the end of the title if user submits post with category.
        title = this.state.title + " " + this.state.category
        this.setState({
          title
        })
      } else {
        // Otherwise, just use current title
        title = this.state.title
        
      }
    /* ------- categories ------- */


    /* ------- build form -------- */
      let formData = new FormData();

      formData.append("portfolio_blog[title]", title)
      formData.append("portfolio_blog[content]", this.state.content)
      formData.append("portfolio_blog[blog_status]", this.state.blog_status)

      if(this.state.featured_image) {
        formData.append("portfolio_blog[featured_image]", this.state.featured_image)
      }

      return formData;
    /* ------- build form -------- */
  }
  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    }
  }
  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    }
  }

  handleFeaturedImageDrop() {
    return {
      addedfile: file => this.setState({ featured_image: file })
    }
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
        featured_image: "",
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
        <DropzoneComponent 
          config={this.componentConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleFeaturedImageDrop()}
        />
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