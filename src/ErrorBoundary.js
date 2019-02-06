import React, { Component } from 'react';
import App from './App';
import Import from './components/Import';

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
      view: (
        <Import name="Error" error={error} info={info} /> 
      )
    });
  }

  render() {
    return this.state.error ? this.state.view : <App />
  }
}