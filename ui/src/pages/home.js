import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import '../css/home.css';

class Home extends Component {
  render() {
    return (
    <div className="App">
      <header>
        <Link to = {'./about'}>
          <button variant = "raised" className = "nav-link">
            About
          </button>
        </Link>&emsp;&emsp;
        <Link to = {'./faq'}>
          <button variant = "raised" className = "nav-link">
            FAQ
          </button>
        </Link>
        <Link to={'./login'}>
          <button variant="raised" className = "login-link">
            Login
          </button>
        </Link>
      </header>
      <div className = 'container'>
        <img src = '../images/andela-teamwork-01.jpg' alt = 'teamwork' className = 'home-img'/>
        <p className = 'intro-p'><strong>Teamwork</strong> is an internal social network for employees of an organization.<br/>The goal of this application is to facilitate more interaction between colleagues and promote team bonding.<br/><br/>
        Just log in to access your account and see all the latest articles and GIFs shared by your colleagues. Add your own posts so your colleagues can enjoy as well.<br/><br/><br/>
        <span className = 'spanned-text'>We take employee interaction and team-building to the digital space.</span></p>
      </div>
    </div>
    );
  }
}
export default Home;