//Front page shows list of all posts
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as postActions from '../actions/postActions';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { divStyle, titleStyle, dateStyle, hrStyle, addPostStyle} from '../styles/styles';

class PostShow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        commentCount: '',
        sortBy:''
      }
    }
    static propTypes = {
      posts: PropTypes.array.isRequired,
      actions: PropTypes.object.isRequired
    }

    componentDidMount() {
      this.props.actions.loadCategory();
    }

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
      //console.log(post.id);
      //this.props.actions.loadComments(post.id);
      // ReadableAPI.loadCountComment(post.id).then((responseData) => {
      //   console.log("loadCountComment", responseData)
      //   if(responseData.length > 0){
      //     return responseData.length;
      //   }else{
      //     return 0;
      //   }
      // });
    }

    handleDropdownCategory = (evtKey) => {
      const category = evtKey.target.value;
      this.props.actions.getPostCategory(category);
      const posts =  _.sortBy(this.props, 'timestamp').reverse();
      this.setState({posts});
    }

    handleSort = (evtKey) => {
       const sortBy = evtKey.target.value;
       this.setState({sortBy});
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.posts !== this.props.posts) {
        this.setState({ sortBy:'' });
      }
    }

    render() {
        //maps object to array
        const category = this.props.category;
        var data = Object.keys(this.props.posts).map((k) => this.props.posts[k]);
        var posts =  _.sortBy(data, 'voteScore').reverse();

        if(this.state.sortBy!==''){
          if(this.state.sortBy === 'Time'){
            posts =  _.sortBy(data, 'timestamp');
            console.log(posts);
          }
        }
        return (
        <div>
          <nav className='navbar navbar-inverse navbar-fixed-top'>
                 <span style={{color:"orange", fontSize:"18pt", display:"inline"}}>
                   Readable App
                 </span>
         </nav>
           <div className="container">
            <div className="row">
              <br/><br/><br/><br/>
              <div className="col-md-6 col-md-offset-3">
                <h3>Filter by category</h3>
                <select className="form-control"
                  style={{width:"50%"}}
                  onChange={this.handleDropdownCategory.bind(this)}>
                  {category.map((category, i) =>
                   <option key={i}>{category.path}</option>)
                  }
                </select>

                <h3>Sort by </h3>
                <select className="form-control" style={{width:"50%"}}
                   onChange={this.handleSort.bind(this)}>
                   <option> Score </option>
                   <option> Time </option>
                </select>

                <br/><br/><br/>
                 <button onClick={this.handleAddPost} style={addPostStyle}
                   className="btn btn-default btn-lg">
                   <span className="glyphicon glyphicon-plus"></span>&nbsp;
                 </button>
                 {posts.length > 0 && posts.map((post, i) => (
                   <div key={i}>
                       <Link to={`/posts/${ post.id }`}><p style={titleStyle}>{post.title}</p></Link>
                       <div style={divStyle}>
                          <span>{post.voteScore} points</span>&nbsp;
                          <span>by {post.author} </span>&nbsp;
                          <span style={dateStyle}>{this.getDate(post.timestamp)} hours ago</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <button onClick= {(event) => this.upvote(post, "upVote")}
                              className='btn btn-success btn-xs'>
                              <span className="glyphicon glyphicon-arrow-up"></span>
                          </button>&nbsp;&nbsp;
                          <button onClick= {(event) => this.upvote(post, "downVote")}
                              className='btn btn-danger btn-xs'>
                              <span className="glyphicon glyphicon-arrow-down"></span>
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
        </div>
        );
    }
}

//maps redux state to component props
function mapStateToProps(state, ownProps) {
  const posts = state.posts;
  const category = state.category;

  if (posts.length > 0) {
    return {
      posts: posts,
      category:category
    }
  } else {
    return {
      posts: [],
      category:category
    }
  }
}

//map dispatch method to a specific props
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
