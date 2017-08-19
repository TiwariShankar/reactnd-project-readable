import {
  CREATE_POST_SUCCESS,
  GETALL_POST_SUCCESS,
  UPDATE_POST_SUCCESS
} from '../actions'
import initialState from './initialState';


function posts (state = initialState.posts, action) {
  switch (action.type) {
     case CREATE_POST_SUCCESS :
       return [...state,
         Object.assign({}, action.posts)
       ]
     case GETALL_POST_SUCCESS :
       return [...state,
         Object.assign({}, action.posts)
       ]
     case UPDATE_POST_SUCCESS:
       return [...state,
         Object.assign({}, action.posts)
       ]
    default :
      return state
  }
}

export default posts;
