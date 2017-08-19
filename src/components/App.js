import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreatePosts from '../components/CreatePosts';
import PostsShow from '../components/PostsShow';
import PostDetail from '../components/PostDetail';
import * as ReadableAPI from '../api/readableAPI';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    ReadableAPI.getAllCategories().then((categories) => {
      this.setState({
        categories
      })
    });
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={PostsShow} />
        <Route exact path="/create" render={() => (
              <CreatePosts categories={ this.state.categories } />
        )}/>
        <Route exact path="/posts/:id" component={PostDetail} />
      </div>

      );
  }
}
