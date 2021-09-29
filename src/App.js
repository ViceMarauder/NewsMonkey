// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  render() {
    document.body.style.backgroundColor="#d7ffff"
    return (
      <div>
        <NavBar/>
        <News pageSize="20" country="in"/>
      </div>
    )
  }
}
