import {
  POST_COMMENT_SUCCESS,
  LOAD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS
} from '../actions'

import initialState from './initialState';

export default function comments(state = initialState.comments, action) {
   switch (action.type) {
     case LOAD_COMMENT_SUCCESS:
          return (action.comments.filter(comment => comment.deleted === false));
     case POST_COMMENT_SUCCESS:
          return [ ...state.filter(comments => comments.id !== action.comments.id),
                    action.comments
          ]
     case DELETE_COMMENT_SUCCESS:
         const newState = Object.assign([], state);
         const indexOfCommentToDelete = state.findIndex(comments => {return comments.id === action.comments.id})
         newState.splice(indexOfCommentToDelete, 1);
         return newState
     default :
          return state
   }
}
