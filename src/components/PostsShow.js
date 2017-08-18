import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PostsShow extends Component {
    static propTypes = {
      posts: PropTypes.array.isRequired
    }

    render() {
        // const {posts} = this.props;
        // console.log(posts);
        return (
            <div className="class-name">

            </div>
        );
    }
}

//maps redux state to component props
function mapStateToProps(state, ownProps) {
   console.log(state.posts);
   return {
    posts: state.posts
   };
}

export default connect(mapStateToProps)(PostsShow);
