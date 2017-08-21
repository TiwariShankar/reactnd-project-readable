import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function posts(state = initialState.posts, action) {
   switch (action.type) {
     case types.CREATE_POST_SUCCESS:
          return [ ...state.filter(posts => posts.id !== action.posts.id),
                    action.posts
          ]
     case types.GETALL_POST_SUCCESS:
          return (action.posts.filter(post => post.deleted === false));
     case types.UPDATE_POST_SUCCESS:
          return [...state.filter(posts => posts.id !== action.posts.id),
                   action.posts
          ]
     case types.DELETE_POST_SUCCESS:
          const newState = Object.assign([], state);
          const indexOfPostToDelete = state.findIndex(posts => {return posts.id === action.posts.id})
          newState.splice(indexOfPostToDelete, 1);
          return newState
     case types.VOTE_POST_SUCCESS:
          return [ ...state.filter(posts => posts.id !== action.posts.id),
                  action.posts
          ]
     default :
          return state
   }
}
