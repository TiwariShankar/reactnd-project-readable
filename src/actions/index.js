export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'

export function CreatePostSuccess(post) {
  return {
    type: CREATE_POST_SUCCESS,
    post 
  }
}
