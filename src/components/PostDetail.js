//for single post
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ReadableAPI from '../api/readableAPI';
import * as postActions from '../actions';
import { bindActionCreators } from 'redux';
import PostList from '../components/PostList';

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
      post['voteScore'] = postData['voteScore']
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

  editPost = (event) => {
    event.preventDefault();

    var timestamp = new Date().getTime() / 1000;
    const post = this.state.post;
    post['timestamp'] = timestamp;
    this.setState({post});

    this.props.actions.updatePosts(this.state.post);
    this.props.history.push("/");
  }

  deletePost = (event) => {
    event.preventDefault();
    this.props.actions.deletePosts(this.state.post);
    this.props.history.push("/");
  }


  render(){
    console.log(this.state, this.props);
    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form>
            <h2>Post </h2>
            <br/>
             <PostList post={this.state.post} updatePostState={this.updatePostState}/>
            <br/>
            <button onClick={ (event) => this.editPost(event) }
                    className="btn btn-default"
                    type="submit">Save</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick= {(event) => this.deletePost(event)}
                    className="btn btn-default"
                    type="submit">Delete
            </button>

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
  };
}

export default connect(null, mapDispatchToProps)(PostDetail);
