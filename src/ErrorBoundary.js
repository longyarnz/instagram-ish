import React, { Component } from 'react';
import App from './App';
import AsyncLoader from './AsyncLoader';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      view: null
    }
  }
  
  componentDidCatch(error, info){
    this.setState({ 
      error: true,
      view: (
        <AsyncLoader path="./components/Error" error={error} info={info} /> 
      )
    });
  }

  render() {
    return this.state.error ? this.state.view : <App />
  }
}