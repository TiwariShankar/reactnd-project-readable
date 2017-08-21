import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function comments(state = initialState.comments, action) {
   switch (action.type) {
     case types.LOAD_COMMENT_SUCCESS:
          return (action.comments.filter(comment => comment.deleted === false));
     case types.POST_COMMENT_SUCCESS:
          return [ ...state.filter(comments => comments.id !== action.comments.id),
                    action.comments
          ]
     case types.DELETE_COMMENT_SUCCESS:
         const newState = Object.assign([], state);
         const indexOfCommentToDelete = state.findIndex(comments => {return comments.id === action.comments.id})
         newState.splice(indexOfCommentToDelete, 1);
         return newState
     case types.UDPATE_COMMENT_SUCCESS:
         return [...state.filter(comments => comments.id !== action.comments.id),
                  action.comments
         ]
     case types.VOTE_COMMENT_SUCCESS:
          return [ ...state.filter(comments => comments.id !== action.comments.id),
                  action.comments
          ]
     default :
          return state
   }
}
