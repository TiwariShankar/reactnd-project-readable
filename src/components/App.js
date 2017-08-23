import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreatePosts from '../components/CreatePosts';
import PostShow from '../components/PostShow';
import PostDetail from '../components/PostDetail';
import ListComment from '../components/ListComment';
import DisplayComment from '../components/DisplayComment';

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={PostShow} />
        <Route exact path="/create" component={CreatePosts} />
        <Route exact path="/posts/:id" component={PostDetail} />
        <Route path="/posts/:id/comments" component={ListComment} />
        <Route exact path="/comments/:id" component={DisplayComment} />
      </div>

      );
  }
}
