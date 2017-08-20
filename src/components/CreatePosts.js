import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPosts } from '../actions';
import PostList from '../components/PostList';

class CreatePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        body: '',
        author: '',
        timestamp: '',
        id: ''
      }
    };
    this.updatePostState = this.updatePostState.bind(this);
  }

  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  updatePostState = (event) => {
    const field = event.target.name;
    const post = this.state.post;
    post[field] = event.target.value;
    this.setState(post);
  }

  savePost = (event) => {
    event.preventDefault();
    var timestamp = new Date().getTime() / 1000;
    const post = this.state.post;
    post['timestamp'] = timestamp;
    const uuidv1 = require('uuid/v1');
    post['id'] = uuidv1();;
    this.setState(post);

    this.props.createpost(this.state.post);

    post['timestamp'] = '';
    post['title'] = '';
    post['body'] = '';
    post['author'] = '';
    this.setState(post);
   }

  render() {
    const {categories} = this.props;

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form onSubmit={ (event) => this.savePost(event) }>
            <h2>Readble App</h2>
            <br/>
            <div className="form-group">
              <label>Categories</label>
              <select id="categories" className="form-control">
                {categories.map((data, i) => (
                    <option key={ i } value={ data.path }>
                      { data.path }
                    </option>
                  )) }
              </select>
            </div>
            <br/>
             <PostList post={this.state.post} updatePostState={this.updatePostState}/>
            <br/>
            <button className="btn btn-default" type="submit">Create</button>
          </form>
        </div>
      </div>
      );
  }
}

//map dispatch methdd to a specific props
function mapDispatchToProps(dispatch) {
  return {
    createpost: (post) => dispatch(createPosts(post))
  };
}

export default connect(null, mapDispatchToProps)(CreatePosts);
