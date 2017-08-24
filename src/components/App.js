import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreatePosts from '../components/CreatePosts';
import AllPosts from '../components/AllPosts';
import PostDetail from '../components/PostDetail';
import ListComment from '../components/ListComment';
import DisplayComment from '../components/DisplayComment';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={AllPosts} />
        <Route path="/create" component={CreatePosts} />
        <Route exact path="/category/:category" component={AllPosts} />
        <Route path="/category/:category/:id" component={PostDetail} />
        <Route path="/posts/:id/comments" component={ListComment} />
        <Route path="/comments/:id" component={DisplayComment} />
      </div>

      );
  }
}
