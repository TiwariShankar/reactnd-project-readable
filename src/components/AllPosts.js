//Front page shows list of all posts
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as postActions from '../actions/postActions';
import _ from 'lodash';
import PostShow from './PostShow';

class AllPosts extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sortBy:''
      };
      this.getDate = this.getDate.bind(this);
      this.upvote = this.upvote.bind(this);
      this.showComments = this.showComments.bind(this);
      this.handleAddPost = this.handleAddPost.bind(this);
    }

    static propTypes = {
      posts: PropTypes.array.isRequired,
    }

    componentDidMount() {
      this.props.loadCategory();
    }

    getDate = (timestamp) => {
      const date = new Date(timestamp*1000);
      const hours = date.getHours();
      return hours;
    }

    upvote = (post, status) => {
      this.props.votePost(post, status);
    }

    handleAddPost = (e) => {
       e.preventDefault()
       this.props.history.push('/create');
    }

    showComments = (postId) => {
       this.props.history.push(`/posts/${ postId }/comments`);
    }

    handleDropdownCategory = (evtKey) => {
      const category = evtKey.target.value;
      this.props.getPostCategory(category);
      this.props.history.push(`/category/${ category }`);
    }

    handleSort = (evtKey) => {
       const sortBy = evtKey.target.value;
       this.setState({sortBy});
    }

    getSelected = (name) => {
      return name === this.props.match.params.category;
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
        var posts;

        if(this.state.sortBy !== ''){
          if(this.state.sortBy === 'Time'){
            posts =  _.sortBy(data, 'timestamp').reverse();
          }else{posts =  _.sortBy(data, 'voteScore').reverse();}
        }else{
          posts =  _.sortBy(data, 'voteScore').reverse();
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
                  style = {{width:"50%"}}
                  onChange = {this.handleDropdownCategory.bind(this)}>
                  {category.map((category, i) =>
                   <option key={i} selected={this.getSelected(category.name)} value={category.name}>{category.name}</option>
                  )}
                </select><br/>

                <h3>Sort by </h3>
                <select className="form-control" style={{width:"50%"}}
                   onChange = {this.handleSort.bind(this)}>
                   <option> Score </option>
                   <option> Time </option>
                </select>

                <br/><br/><br/>

                <PostShow posts = {posts}
                      getDate = {this.getDate}
                      loadCountsComment = {this.loadCountsComment}
                      upvote = {this.upvote}
                      showComments = {this.showComments}
                      handleAddPost = {this.handleAddPost}
                />
              </div>
             </div>
            </div>
        </div>
        );
    }
}


//maps redux state to component props
function mapStateToProps({posts, category}) {
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

export default connect(mapStateToProps, postActions)(AllPosts);
