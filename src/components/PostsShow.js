//Front page shows list of all posts
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as postActions from '../actions';
import { bindActionCreators } from 'redux';

class PostsShow extends Component {
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

    upvote = (post) => {
      this.props.actions.votePost(post, "upvote");
      //this.props.history.push("/");
    }

    render() {
        const posts = Object.keys(this.props.posts).map((k) => this.props.posts[k])
        return (
        <div>
        <nav id="navbar" className="navbar navbar-default">
                <div className="navbar-header">
                   <Link to={"/create"}>Create New Post</Link>
                </div>
        </nav>

         <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
               {posts.length > 0 && posts.map((post, i) => (
                 <div key={i}>
                     <Link to={`/posts/${ post.id }`}>{post.title}</Link>
                     <div>
                        <span>{post.voteScore} points</span>&nbsp;
                        <span>by {post.author} </span>&nbsp;
                        <span>{this.getDate(post.timestamp)} hours ago</span>&nbsp;
                        <button onClick= {(event) => this.upvote(post)} className='btn btn-success btn-xs'>Upvote</button>&nbsp;
                        <button className='btn btn-danger btn-xs'>Downvote</button>
                     </div>
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

//maps redux state to component props
function mapStateToProps(state, ownProps) {
  if (state.length > 0) {
    return {
      posts: state
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
