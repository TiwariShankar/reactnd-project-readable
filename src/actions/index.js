import * as ReadableAPI from '../api/readableAPI';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const GETALL_POST_SUCCESS = 'GETALL_POST_SUCCESS'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS'

export function deletePostSuccess(posts) {
  return {
    type: DELETE_POST_SUCCESS,
    posts
  }
}

export function createPostSuccess(posts) {
  return {
    type: CREATE_POST_SUCCESS,
    posts
  }
}

export function gellAllPostSuccess(posts) {
  return {
    type: GETALL_POST_SUCCESS,
    posts
  }
}

export function updatePostSuccess(posts) {
  return {
    type: UPDATE_POST_SUCCESS,
    posts
  }
}

export function upvotePostSuccess(posts){
  return {
    type: VOTE_POST_SUCCESS,
    posts
  }
}


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
