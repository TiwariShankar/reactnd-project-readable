import * as ReadableAPI from '../api/readableAPI';
import * as types from './actionTypes';

export function voteCommentSuccess(comments){
  return {
    type: types.VOTE_COMMENT_SUCCESS,
    comments
  }
}

export function commentPostSuccess(comments) {
  return {
    type: types.POST_COMMENT_SUCCESS,
    comments
  }
}

export function udpateCommentSuccess(comments){
  return {
    type: types.UDPATE_COMMENT_SUCCESS,
    comments
  }
}

export function deleteCommentSuccess(comments){
  return {
    type: types.DELETE_COMMENT_SUCCESS,
    comments
  }
}

export function loadCommentSuccess(comments){
  return {
    type: types.LOAD_COMMENT_SUCCESS,
    comments
  }
}


export function postComments(comments) {
  return function (dispatch) {
    return ReadableAPI.saveComment(comments).then(responseData => {
      dispatch(commentPostSuccess(responseData));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadComments(postId) {
  return function (dispatch) {
    return ReadableAPI.loadComment(postId).then(responseData => {
      dispatch(loadCommentSuccess(responseData));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteComment(data) {
  return function (dispatch) {
    return ReadableAPI.deleteComment(data).then(responseData => {
      dispatch(deleteCommentSuccess(responseData));
    }).catch(error => {
      throw(error);
    });
  };
}

export function editComment(data) {
  return function (dispatch) {
    return ReadableAPI.udpateComment(data).then(responseData => {
      dispatch(udpateCommentSuccess(responseData));
    }).catch(error => {
      throw(error);
    });
  };
}

export function voteComment(data, status){
  return function (dispatch) {
    return ReadableAPI.votingComment(data, status).then(responseData => {
      dispatch(voteCommentSuccess(responseData));
    }).catch(error => {
      throw(error);
    });
  };
}
