import React,{Component} from 'react';
import * as ReadableAPI from '../api/readableAPI';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as commentActions from '../actions/commentActions'
import { divStyle, titleStyle, dateStyle, hrStyle, commentTitleStyle } from '../styles/styles';
import _ from 'lodash';

class ListComment extends Component {
   constructor(props) {
    super(props);
    this.state = {
      post: {
        id: '',
        author: '',
        voteScore: '',
        timestamp: '',
        category: ''
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
       this.props.loadComments(postId);

       const post = this.state.post;
       ReadableAPI.getPost(postId).then((postData) => {
         post['id'] = postData['id'];
         post['title'] = postData['title'];
         post['author'] = postData['author'];
         post['voteScore'] = postData['voteScore'];
         post['timestamp'] = postData['timestamp'];
         post['category'] = postData['category'];
         this.setState({post});
       });
   }

   updateCommentBody = (event) => {
     const comments = this.state.comments;
     comments['body'] = event.target.value;
     this.setState({comments});
   }

   AddComment = (event) => {
        //event.preventDefault();
        const post = this.state.post;
        const comments = this.state.comments;

        if(comments['body'] === ""){
          alert("Please enter some text!");
        }else{
          const timestamp = new Date().getTime() / 1000;
          comments['timestamp'] = timestamp;
          const uuidv1 = require('uuid/v1');
          comments['id'] = uuidv1();
          comments['owner'] = post['author'];
          comments['parentId'] = post['id'];

          this.setState(comments);
          this.props.postComments(this.state.comments);

          comments['timestamp'] = '';
          comments['parentId'] = '';
          comments['body'] = '';
          comments['owner'] = '';
          comments['id'] = '';
          this.setState(comments);
        }
   }

   getDate = (timestamp) => {
     const date = new Date(timestamp*1000);
     const hours = date.getHours();
     return hours
   }

   votComment = (data, status) => {
     this.props.voteComment(data, status);
   }

   render() {
        const post = this.state.post;
        let comments = this.props.comments;
        
        comments = Object.keys(comments).map((k) => comments[k]);
        comments =  _.sortBy(comments, 'voteScore').reverse();

        return (
          <div>
          <nav className='navbar navbar-inverse navbar-fixed-top'>
              <div className="col-md-2 col-md-offset-5">
                 <Link to="/">
                     <h2 style={{color:"orange", fontSize:"20pt"}}> Readable App
                     </h2>
                 </Link>
              </div>
          </nav>
           <div className="container">
            <div className="row">
               <br/><br/><br/><br/>
              <div className="col-md-6 col-md-offset-3">
                 <Link to={`/category/${ post.category }/${ post.id }`}>
                       <p style={commentTitleStyle}>{post.title}</p>
                 </Link>
                 <div style={divStyle}>
                    <span>{post.voteScore} points</span>&nbsp;
                    <span>by {post.author} </span>&nbsp;
                    <span style={dateStyle}>{this.getDate(post.timestamp)} hours ago</span>
                 </div>
                 <br/>
                 <br/>
                 <textarea className="form-control"
                           rows="3" name="Comment"
                           value={ this.state.comments.body }
                           onChange= {(event) => this.updateCommentBody(event)}
                           placeholder="Comment">
                 </textarea><br/>
                 <button onClick={(event) => this.AddComment(post.id)}
                         className="btn btn-default btn-xs">Add Comment</button>
                  <br/><br/><br/>
                  {comments.length > 0 && comments.map((data, i) => (
                    <div key={i}>
                       <Link to={`/comments/${ data.id }`}><p style={titleStyle}>{data.body}</p></Link>
                       <span style={divStyle}> {data.voteScore} Points</span>&nbsp;&nbsp;
                       <span style={dateStyle}>{this.getDate(data.timestamp)} hours ago</span>&nbsp;&nbsp;
                       <button onClick= {(event) => this.votComment(data, "upVote")}
                               className='btn btn-success btn-xs'>
                               <span className="glyphicon glyphicon-arrow-up"></span>
                       </button>&nbsp;&nbsp;
                       <button onClick= {(event) => this.votComment(data, "downVote")}
                               className='btn btn-danger btn-xs'>
                               <span className="glyphicon glyphicon-arrow-down"></span>
                       </button>
                       <hr style={hrStyle}/>
                       <br/>
                    </div>
                  ))}
              </div>
            </div>
           </div>
          </div>
        );
    }
}

function mapStateToProps({comments}) {
  if(comments.length > 0){
    return {
      comments : comments
    }
  }else{
    return {
      comments : []
    }
  }
}


export default connect(mapStateToProps, commentActions)(ListComment);
