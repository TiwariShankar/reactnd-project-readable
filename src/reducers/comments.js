import {
  POST_COMMENT_SUCCESS,
  LOAD_COMMENT_SUCCESS
} from '../actions'

import initialState from './initialState';

export default function comments(state = initialState.comments, action) {
   switch (action.type) {
     case LOAD_COMMENT_SUCCESS:
          return (action.comments.filter(comment => comment.deleted === false));
     case POST_COMMENT_SUCCESS:
          console.log(state, action.comments);
          return [ ...state.filter(comments => comments.id !== action.comments.id),
                    action.comments
          ]
     default :
          return state
   }
}
