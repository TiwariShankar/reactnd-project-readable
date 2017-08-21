import * as ReadableAPI from '../api/readableAPI';
import * as types from './actionTypes';

export function commentPostSuccess(comments) {
  return {
    type: types.POST_COMMENT_SUCCESS,
    comments
  }
}

export function deletePostSuccess(posts) {
  return {
    type: types.DELETE_POST_SUCCESS,
    posts
  }
}

export function createPostSuccess(posts) {
  return {
    type: types.CREATE_POST_SUCCESS,
    posts
  }
}

export function gellAllPostSuccess(posts) {
  return {
    type: types.GETALL_POST_SUCCESS,
    posts
  }
}

export function updatePostSuccess(posts) {
  return {
    type: types.UPDATE_POST_SUCCESS,
    posts
  }
}

export function upvotePostSuccess(posts){
  return {
    type: types.VOTE_POST_SUCCESS,
    posts
  }
}

// export function loadCommentSuccess(comments){
//   return {
//     type: LOAD_COUNT_COMMENT_SUCCESS,
//     comments
//   }
// }

export function createPosts(post) {
  return function (dispatch) {
    return ReadableAPI.savePost(post).then(responseData => {
      dispatch(createPostSuccess(responseData));
    }).catch(error => {
      throw(error);
    });
  };
}

export function getAllPosts() {
  return function (dispatch) {
    return ReadableAPI.getAllPost().then(data => {
      dispatch(gellAllPostSuccess(data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updatePosts(post) {
  return function (dispatch) {
    return ReadableAPI.updatePost(post).then(responseData => {
      dispatch(updatePostSuccess(responseData));
    }).catch(error => {
      throw(error);
    });
  };
}


export function deletePosts(post) {
  return function (dispatch) {
    return ReadableAPI.deletePost(post).then(responseData => {
      dispatch(deletePostSuccess(responseData));
    }).catch(error => {
      throw(error);
    });
  };
}


export function votePost(post, status) {
  return function (dispatch) {
    return ReadableAPI.vote(post, status).then(responseData => {
      dispatch(upvotePostSuccess(responseData));
    }).catch(error => {
      throw(error);
    });
  };
}
