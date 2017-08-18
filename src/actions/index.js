import * as ReadableAPI from '../api/readableAPI';

export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'

export function createPostSuccess(result) {
  return {
    type: CREATE_POST_SUCCESS,
    result
  }
}

export function createPosts(post) {
  return function (dispatch) {
    return ReadableAPI.savePost(post).then(responseData => {
      //dispatch(createPostSuccess(responseData));
      console.log(responseData);
      //return responseData;
    }).catch(error => {
      throw(error);
    });
  };
}
