//import { combineReducers } from 'redux'

import {
  CREATE_POST_SUCCESS
} from '../actions'


function posts (state = {}, action) {
  console.log(action);
  const {post} = action;

  switch (action.type) {
    case CREATE_POST_SUCCESS :
      return {
        ...state,
        valueToPass: post,
      }
    default :
      return state
  }
}

export default posts;
