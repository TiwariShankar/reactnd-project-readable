import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPosts } from '../actions';

class CreatePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        body: '',
        owner: '',
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
    this.setState({
      post: post
    });
  }

  savePost = (event) => {
    event.preventDefault();

    var timestamp = new Date().getTime() / 1000;
    const post = this.state.post;
    post['timestamp'] = timestamp;
    const uuidv1 = require('uuid/v1');
    post['id'] = uuidv1();;
    this.setState({
      post: post
    });

    console.log(this.state.post);
    this.props.createpost(this.state.post);

    //const post = this.state.post;
    post['timestamp'] = '';
    post['title'] = '';
    post['body'] = '';
    post['owner'] = '';
    this.setState({
      post: post
    });

  //or
  //this.props.dispatch(CreatePostSuccess(this.state.post))
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
                { categories.map((data, i) => (
                    <option key={ i } value={ data.path }>
                      { data.path }
                    </option>
                  )) }
              </select>
            </div>
            <br/>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" className="form-control" name="owner" value={ this.state.post.owner } onChange={ this.updatePostState } placeholder="Enter your name" />
            </div>
            <br/>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" type="text" name="title" value={ this.state.post.title } onChange={ this.updatePostState } placeholder="Title" />
            </div>
            <br/>
            <div className="form-group">
              <label>Content</label>
              <textarea className="form-control" rows="3" name="body" value={ this.state.post.body } onChange={ this.updatePostState } placeholder="Content">
              </textarea>
            </div>
            <br/>
            <button className="btn btn-default" type="submit">Button</button>
          </form>
        </div>
      </div>
      );
  }
}

//export default CreatePosts;

//maps redux state to component props
// function mapStateToProps(state, ownProps) {
//    return {
//      post: state.post
//    }
// }

//map dispatch methdd to a specific props
function mapDispatchToProps(dispatch) {
  return {
    createpost: (post) => dispatch(createPosts(post))
  };
}

export default connect(null, mapDispatchToProps)(CreatePosts);
