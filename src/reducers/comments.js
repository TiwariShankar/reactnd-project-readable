import {
  POST_COMMENT_SUCCESS
} from '../actions'

import initialState from './initialState';

export default function comments(state = initialState.comments, action) {
   switch (action.type) {
     case POST_COMMENT_SUCCESS:
          return [ ...state.filter(comments => comments.id !== action.comments.id),
                    action.comments
          ]
     default :
          return state
   }
}
