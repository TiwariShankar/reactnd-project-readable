import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import CreatePosts from '../components/CreatePosts'
import PostsShow from '../components/PostsShow'
import * as ReadableAPI from '../api/readableAPI';
import { connect } from 'react-redux';
import { getAllPosts } from '../actions';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      post: []
    }
  }

  componentDidMount() {
    ReadableAPI.getAllCategories().then((categories) => {
      this.setState({
        categories
      })
    });

    this.props.getAllPost();
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={ () => (
              <PostsShow posts={ this.state.posts } />
                                       ) } />
        <Route exact path="/create" render={ () => (
              <CreatePosts categories={ this.state.categories } />

                                       ) } />
      </div>

      );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPost: () => dispatch(getAllPosts())
  };
}

export default connect(null, mapDispatchToProps)(App);
