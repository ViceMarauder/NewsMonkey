// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress: 0
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    document.body.style.backgroundColor="#d7ffff"
    return (
      <div>
        <Router>
        <LoadingBar
        color='rgb(233 244 62)'
        progress={this.state.progress}
        height={3}
        // onLoaderFinished={() => setProgress(0)}
      />
        <NavBar/>
        <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="home" pageSize="20" country="in" category="general"/></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize="20" country="in" category="business"/></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize="20" country="in" category="entertainment"/></Route>
          <Route exact path="/general"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize="20" country="in" category="general"/></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize="20" country="in" category="health"/></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize="20" country="in" category="science"/></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize="20" country="in" category="sports"/></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize="20" country="in" category="technology"/></Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
