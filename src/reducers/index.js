//import { combineReducers } from 'redux'
//import {browserHistory} from 'react-router';

import {
  CREATE_POST_SUCCESS,
  GETALL_POST_SUCCESS
} from '../actions'


function posts (state = {}, action) {
  switch (action.type) {
    case CREATE_POST_SUCCESS :
       //browserHistory.push(`/PostsShow/${action.post.id}`)
       return [
         ...state.filter(post => post.id !== action.post.id),
         Object.assign({}, action.post)
       ]
     case GETALL_POST_SUCCESS :
         //browserHistory.push(`/PostsShow/${action.post.id}`)
        console.log("inside reducers:", action.posts);
        //return state.map(post => action.posts);
        return action.posts;
    default :
      return state
  }
}

export default posts;
