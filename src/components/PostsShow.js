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
      this.props.actions.votePost(post, "upVote");
    }

    handleAddPost = (e) => {
       e.preventDefault()
       this.props.history.push('/create');
    }

    render() {
        const posts = Object.keys(this.props.posts).map((k) => this.props.posts[k]);

        const divStyle = {
          color: '#000000',
          fontWeight:200,
          fontSize: '10pt',
          WebkitTransition: 'all',
          msTransition: 'all'
        };

        const titleStyle = {
          fontWeight:50,
          color:"black",
          fontSize:'30pt',
          WebkitTransition: 'all',
          msTransition: 'all',
          textDecoration: "none"
        }

        const hrStyle = {
          border: "none",
          WebkitTransition: 'all',
          msTransition: 'all',
          color:"#6ec6fce",
          width: "100%",
          borderBottom: "#6ec6fc 1px solid"
        }

        const dateStyle = {
          color: "#FCC471",
          fontSize: "1.4rem"
        }

        const addPostStyle = {
          float: "right",
          marginRight: "30px",
          marginTop: "260px"
        }

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
                          <button onClick= {(event) => this.upvote(post)}
                                  className='btn btn-success btn-xs'>Upvote
                          </button>&nbsp;
                          <button className='btn btn-danger btn-xs'>Downvote</button>
                       </div>
                       <hr style={hrStyle}/>
                       <br/><br/><br/>
                   </div>
                 ))}
              </div>
             </div>
            </div>
            <button onClick={this.handleAddPost} style={addPostStyle} type="button" className="btn btn-default btn-lg">
              <span className="glyphicon glyphicon-plus"></span>&nbsp;
            </button>
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
