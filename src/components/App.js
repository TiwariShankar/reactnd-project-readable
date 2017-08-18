import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import CreatePosts from '../components/CreatePosts'
import * as ReadableAPI from '../api/readableAPI';

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
      <Route exact path="/" render={() => (
         <CreatePosts
           categories={this.state.categories}
         />
       )}/>
    );
  }
}

export default App;
