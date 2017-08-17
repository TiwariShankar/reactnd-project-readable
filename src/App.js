import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'
import createpost from './components/createpost'
import * as ReadableAPI from './api/readableAPI';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    ReadableAPI.getAllCategories().then((categories) => {
      this.setState({categories})
    })
  }

  render() {
    return (
      // <div>
      //   <Route path='/' component={createpost}/>
      // </div>
      <Route exact path="/" render={() => (
         <createpost
           categories={this.state.categories}
         />
       )}/>
    );
  }
}

export default App;
