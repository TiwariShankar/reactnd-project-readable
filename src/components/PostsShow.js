import React,{Component} from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PostsShow extends Component {
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
   const statePosts = Object.assign([], state.posts);
   console.log(statePosts);
   return {
    statePosts
   };
}

export default connect(mapStateToProps ,null)(PostsShow);
