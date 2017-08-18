import * as ReadableAPI from '../api/readableAPI';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const GETALL_POST_SUCCESS = 'GETALL_POST_SUCCESS'


export function createPostSuccess(result) {
  return {
    type: CREATE_POST_SUCCESS,
    result
  }
}

export function gellAllPostSuccess(posts) {
  return {
    type: GETALL_POST_SUCCESS,
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
      console.log("inside action gellAllPostSuccess", data);
    }).catch(error => {
      throw(error);
    });
  };
}
