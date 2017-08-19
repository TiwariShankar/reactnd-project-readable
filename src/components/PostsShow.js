import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    static propTypes = {
      posts: PropTypes.array.isRequired
    }

    getDate = (timestamp) => {
      const date = new Date(timestamp*1000);
      const hours = date.getHours();
      return hours
    }

    render() {
        const posts = this.props.posts;
        return (
         <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
               {posts.map((post, i) => (
                 <div key={i}>
                     <Link to={"/post/:post.id"}>{post.title}</Link>
                     <div>
                        <span>{post.voteScore} points</span>&nbsp;
                        <span>by {post.author} </span>&nbsp;
                        <span>{this.getDate(post.timestamp)} hours ago</span>
                     </div>
                     <br/>
                 </div>
               ))}
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
      posts: [{id: '', timestamp: '', author: '', body: '', category: '', title: '',
              voteScore: '', deleted: ''}]
    }
  }
}

export default connect(mapStateToProps)(PostsShow);
