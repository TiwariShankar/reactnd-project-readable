import React,{Component} from 'react';
import * as ReadableAPI from '../api/readableAPI';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import * as commentActions from '../actions';
import * as commentActions from '../actions/commentActions'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class ListComment extends Component {
   constructor(props) {
    super(props);
    this.state = {
      post: {
        id: '',
        author: ''
      },
      comments:{
        id:'',
        timestamp:'',
        body:'',
        owner:'',
        parentId:''
       }
    }
   }

   static propTypes = {
     actions: PropTypes.object.isRequired
   };

   componentDidMount() {
       const postId = this.props.match.params.id;
       this.props.actions.loadComments(postId);

       const post = this.state.post;
       ReadableAPI.getPost(postId).then((postData) => {
         post['id'] = postData['id']
         post['title'] = postData['title']
         post['author'] = postData['author']
         this.setState({post});
       });
   }

   updateCommentBody = (event) => {
     const comments = this.state.comments;
     comments['body'] = event.target.value;
     this.setState({comments});
   }

   updateCommentState = (event) => {
        //event.preventDefault();
        const post = this.state.post;
        const comments = this.state.comments;

        const timestamp = new Date().getTime() / 1000;
        comments['timestamp'] = timestamp;
        const uuidv1 = require('uuid/v1');
        comments['id'] = uuidv1();
        comments['owner'] = post['author'];
        comments['parentId'] = post['id'];

        //console.log(comments);
        this.setState(comments);

        this.props.actions.postComments(this.state.comments);

        comments['timestamp'] = '';
        comments['parentId'] = '';
        comments['body'] = '';
        comments['owner'] = '';
        comments['id'] = '';
        this.setState(comments);
   }

   getDate = (timestamp) => {
     const date = new Date(timestamp*1000);
     const hours = date.getHours();
     return hours
   }

   votComment = (data, status) => {
     this.props.actions.voteComment(data, status);
   }

   render() {
        const post = this.state.post;
        const comments = this.props.comments;
        console.log(comments);
        return (
          <div>
           <div className="container">
            <div className="row">
               <br/>
              <div className="col-md-6 col-md-offset-3">
                 <Link to={`/posts/${ post.id }`}>
                       <p style={{fontSize:"22px"}}>{post.title}</p>
                 </Link>
                 <br/>
                 <br/>
                 <textarea className="form-control"
                           rows="3" name="Comment"
                           value={ this.state.comments.body }
                           onChange= {(event) => this.updateCommentBody(event)}
                           placeholder="Comment">
                 </textarea><br/>
                 <button onClick={(event) => this.updateCommentState(post.id)}
                         className="btn btn-default btn-xs">Add Comment</button>
                  <br/><br/><br/>
                  {comments.length > 0 && comments.map((data, i) => (
                    <div key={i}>
                       <Link to={`/comments/${ data.id }`}><p>{data.body}</p></Link>
                       <span> {data.voteScore} Points</span>&nbsp;&nbsp;
                       <span>{this.getDate(data.timestamp)} hours ago</span>&nbsp;&nbsp;
                       <button onClick= {(event) => this.votComment(data, "upVote")}
                               className='btn btn-success btn-xs'>Upvote
                       </button>&nbsp;&nbsp;
                       <button onClick= {(event) => this.votComment(data, "downVote")}
                               className='btn btn-danger btn-xs'>Downvote
                       </button>
                       <br/><br/>
                    </div>
                  ))}
              </div>
            </div>
           </div>
          </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
  const comment = state.comments;
  if(comment.length > 0){
    return {
      comments : comment
    }
  }else{
    return {
      comments : []
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListComment);
