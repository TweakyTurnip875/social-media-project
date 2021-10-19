import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '60010972@ironschools.org',
      password: 'Alcatraz2006!'
    }
  }
  handleLogin() {
    axios.post("https://api.devcamp.space/sessions",
    {
      client: {
        email: this.state.email,
        password: this.state.password,
      },
    },
    { withCredentials: true }
    ).then(res => {
      if(res.data.status === "created") {
        console.log("created")
      } else {
        console.log("error")
      }
    }).catch(error => {
      console.log(error)
    })
  }
}