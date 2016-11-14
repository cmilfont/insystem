import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Base extends Component {

  componentWillMount() {
    this.setState({ list: [] })
  }

  componentDidMount() {
    fetch('/api/list')
      .then(res => res.json())
      .then(list => this.setState({ list }) );
  }

  render() {
    const messages = this.state.list.map(item => <div key={`item.id`}>
      <div>{item.message}</div>
    </div>);
    return (
      <div>
        {messages}
      </div>
    )
  }
}

class App extends Component {

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Base />
      </div>
    );
  }
}

export default App;
