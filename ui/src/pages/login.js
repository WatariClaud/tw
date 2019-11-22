import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import '../css/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          redirect: false
        };
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange (event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange (event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      fetch('http://localhost:4000/api/v1/auth/signin', {
        method: "POST",
        body : JSON.stringify({ email: this.state.email, password: this.state.password }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('response:' ,response);
          console.log(response.status);
          
          if(response.status === 'success') this.setState({redirect: true});

          if(this.state.redirect) {
            window.location = '/feed';
            return  <Redirect  to ='/feed' /> // this method not working, used native vanilla window.location as above. TODO: Refactor redirect method
          }
        })
        .catch((err) => {
          console.log('error:', err);
        });
    }

    // componentDidMount() {
    //     this.callAPI();
    // }

    render() {
        return (
            <div className="App">
              <h1 className="App-title">Teamwork app</h1>
              <div className = 'share-screen'><br/><br/>
                <p>Teamwork is an app that enables employees to interact while having fun.</p>
                <p>Just log in to your account or create one to enjoy all the latest shares by your colleagues or post your own.</p>
              </div>
              <div className = 'share-screen'>
                <form className = "login-form" onSubmit={this.handleSubmit}>
                  <input type = "text" className = "inputfield login-input" placeholder = "Email" name = "email" value={this.state.email} onChange={this.handleEmailChange}/>
                  <input type = "password" className = "inputfield login-input" placeholder = "Password" name = "password" value={this.state.password} onChange={this.handlePasswordChange}/>
                  <button className = "submit-btn">Log In</button>
                </form>
              </div>
            </div>
        );
    }
}

export default Login;