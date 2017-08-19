//for single post
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ReadableAPI from '../api/readableAPI';
import * as postActions from '../actions';
import { bindActionCreators } from 'redux';


class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: '',
        title: '',
        body: '',
        author: '',
        timestamp: '',
        voteScore: '',
        deleted: ''
      }
    };
    this.updatePostState = this.updatePostState.bind(this);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  componentDidMount() {
    const postId = this.props.match.params.id;
    const post = this.state.post;
    ReadableAPI.getPost(postId).then((postData) => {
      post['id'] = postData['id']
      post['title'] = postData['title']
      post['body'] = postData['body']
      post['author'] = postData['author']
      post['timestamp'] = postData['timestamp']
      post['voteScore'] = postData['timestamp']
      post['deleted'] = postData['deleted']
      this.setState({post});
    });
   }

  updatePostState = (event) => {
      const field = event.target.name;
      const post = this.state.post;
      post[field] = event.target.value;
      this.setState({post});
  }

  savePost = (event) => {
    event.preventDefault();

    var timestamp = new Date().getTime() / 1000;
    const post = this.state.post;
    post['timestamp'] = timestamp;
    this.setState({post});

    //this.props.updatePost(this.state.post);
    this.props.actions.updatePosts(this.state.post);
    this.props.history.push("/");
  }

  deletePost = (event) => {
    event.preventDefault();
    console.log(this.state.post);
    this.props.actions.deletePosts(this.state.post);
    this.props.history.push("/");
  }

  render(){
    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form>
            <h2>Post </h2>
            <br/>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" className="form-control" name="author" value={ this.state.post.author } onChange={ this.updatePostState } placeholder="Enter your name" />
            </div>
            <br/>
            <div className="form-group">
              <label>Title</label>
              <input type="text" className="form-control" name="title" value={ this.state.post.title } onChange={ this.updatePostState } placeholder="Title" />
            </div>
            <br/>
            <div className="form-group">
              <label>Content</label>
              <textarea className="form-control" rows="3" name="body" value={ this.state.post.body } onChange={ this.updatePostState } placeholder="Content">
              </textarea>
            </div>
            <br/>
            <button onClick={ (event) => this.savePost(event) } className="btn btn-default" type="submit">Save</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={ (event) => this.deletePost(event) } className="btn btn-default" type="submit">Delete</button>
          </form>
        </div>
      </div>

    );
  }
}

//map dispatch method to a specific props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch)
    //updatePost: (post) => dispatch(updatePosts(post))
  };
}

export default connect(null, mapDispatchToProps)(PostDetail);
