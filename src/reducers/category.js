import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function comments(state = initialState.categories, action) {
   switch (action.type) {
     case types.CATEGORY_LOAD_SUCCESS:
          //console.log("action.category", action);
          return (action.category);
    //  case types.POST_CATEGORY_SUCCESS:
    //       return action.category;
     default :
          return state
   }
}
