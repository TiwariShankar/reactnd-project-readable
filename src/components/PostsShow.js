//Front page shows list of all posts
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as postActions from '../actions';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { divStyle, titleStyle, dateStyle, hrStyle, addPostStyle} from '../styles/styles';

class PostsShow extends Component {
    constructor(props) {
      super(props)
      this.state = {
        commentCount: ''
      }
    }
    static propTypes = {
      posts: PropTypes.array.isRequired
    }

    static propTypes = {
      actions: PropTypes.object.isRequired
    };

    getDate = (timestamp) => {
      const date = new Date(timestamp*1000);
      const hours = date.getHours();
      return hours
    }

    upvote = (post, status) => {
      this.props.actions.votePost(post, status);
    }

    handleAddPost = (e) => {
       e.preventDefault()
       this.props.history.push('/create');
    }

    showComments = (postId) => {
       this.props.history.push(`/posts/${ postId }/comments`);
    }

    loadCountsComment = (post) => {
      console.log(post.id);
      this.props.actions.loadComments(post.id);
      // ReadableAPI.loadCountComment(post.id).then((responseData) => {
      //   console.log("loadCountComment", responseData)
      //   if(responseData.length > 0){
      //     return responseData.length;
      //   }else{
      //     return 0;
      //   }
      // });
    }

    render() {
        //maps object to array
        var data = Object.keys(this.props.posts).map((k) => this.props.posts[k]);
        const posts =  _.sortBy(data, 'voteScore').reverse();

        return (
        <div>
           <div className="container">
            <div className="row">
              <br/>
              <div className="col-md-6 col-md-offset-3">
                 {posts.length > 0 && posts.map((post, i) => (
                   <div key={i}>
                       <Link to={`/posts/${ post.id }`}><p style={titleStyle}>{post.title}</p></Link>
                       <div style={divStyle}>
                          <span>{post.voteScore} points</span>&nbsp;
                          <span>by {post.author} </span>&nbsp;
                          <span style={dateStyle}>{this.getDate(post.timestamp)} hours ago</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <button onClick= {(event) => this.upvote(post, "upVote")}
                                  className='btn btn-success btn-xs'>Upvote
                          </button>&nbsp;&nbsp;
                          <button onClick= {(event) => this.upvote(post, "downVote")}
                                  className='btn btn-danger btn-xs'>Downvote
                          </button>
                          &nbsp;&nbsp;
                          <span>{this.loadCountsComment(post)}</span>&nbsp;&nbsp;
                          <button onClick={(event) => this.showComments(post.id)} className="btn btn-info btn-xs"> Comments</button>
                       </div>
                       <hr style={hrStyle}/>
                       <br/><br/><br/>
                   </div>
                 ))}
              </div>
             </div>
            </div>
            <button onClick={this.handleAddPost} style={addPostStyle}
              className="btn btn-default btn-lg">
              <span className="glyphicon glyphicon-plus"></span>&nbsp;
            </button>
        </div>
        );
    }
}

//maps redux state to component props
function mapStateToProps(state, ownProps) {
  const posts = state.posts;
  if (posts.length > 0) {
    return {
      posts: posts
    }
  } else {
    return {
      posts: []
    }
  }
}

//map dispatch method to a specific props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
