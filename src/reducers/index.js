import { combineReducers } from 'redux'

import {
  CREATE_POST_SUCCESS
} from '../actions'


function posts (state = {}, action) {
  console.log(action);

  switch (action.type) {
    case CREATE_POST_SUCCESS :

      return {
        ...state,
        valueToPass: action.post,
      }
    default :
      return state
  }
}

export default combineReducers({
  posts
})
