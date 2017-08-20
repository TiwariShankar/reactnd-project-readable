import React,{Component} from 'react';
import * as ReadableAPI from '../api/readableAPI';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComments } from '../actions';

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

   componentDidMount() {
       const postId = this.props.match.params.id;
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

        this.props.postComment(this.state.comments);

        comments['timestamp'] = '';
        comments['parentId'] = '';
        comments['body'] = '';
        comments['owner'] = '';
        comments['id'] = '';
        this.setState(comments);
   }

   render() {
        const post = this.state.post;
        return (
          <div>
           <div className="container">
            <div className="row">
               <br/>
              <div className="col-md-6 col-md-offset-3">
                 <Link to={`/posts/${ post.id }`}><p style={{fontSize:"22px"}}>{post.title}</p></Link>
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
              </div>
            </div>
           </div>
          </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    postComment: (comments) => dispatch(postComments(comments))
  };
}

export default connect(null, mapDispatchToProps)(ListComment);
