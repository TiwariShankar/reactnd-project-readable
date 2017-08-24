//for single post
import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as ReadableAPI from '../api/readableAPI';
import * as postActions from '../actions/postActions';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom';

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
    const post = this.state.post;
    if(post['title'] === "" || post['body'] === "" || post['author'] === ""){
      alert("Please enter the text!");
    }else{
      var timestamp = new Date().getTime() / 1000;
      post['timestamp'] = timestamp;
      this.setState({post});

      this.props.updatePosts(this.state.post);
      this.props.history.push("/");
    }
  }

  deletePost = (event) => {
    event.preventDefault();
    this.props.deletePosts(this.state.post);
    this.props.history.push("/");
  }


  render(){
    return(
      <div>
        <nav className='navbar navbar-inverse navbar-fixed-top'>
            <div className="col-md-2 col-md-offset-5">
               <Link to="/">
                   <h2 style={{color:"orange", fontSize:"20pt"}}> Readable App
                   </h2>
               </Link>
            </div>
        </nav>
        <br/> <br/> <br/>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form>
              <h2 style={{color:"lightblue", fontSize:"18pt"}}>Post </h2>
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
      </div>

    );
  }
}


export default connect(null, postActions)(PostDetail);
