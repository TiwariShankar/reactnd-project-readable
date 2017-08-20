import {
  CREATE_POST_SUCCESS,
  GETALL_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  VOTE_POST_SUCCESS
} from '../actions'

import initialState from './initialState';

function posts (state = initialState.posts, action) {
  switch (action.type) {
     case CREATE_POST_SUCCESS:
           return [ ...state.filter(posts => posts.id !== action.posts.id),
                    action.posts
           ]
     case GETALL_POST_SUCCESS:
          return (action.posts.filter(post => post.deleted === false));
     case UPDATE_POST_SUCCESS:
          return [...state.filter(posts => posts.id !== action.posts.id),
                   action.posts
          ]
     case DELETE_POST_SUCCESS:
         const newState = Object.assign([], state);
         const indexOfPostToDelete = state.findIndex(posts => {return posts.id === action.posts.id})
         newState.splice(indexOfPostToDelete, 1);
         return newState
     case VOTE_POST_SUCCESS:
         return [ ...state.filter(posts => posts.id !== action.posts.id),
                  action.posts
         ]
     default :
          return state
  }
}

export default posts;
