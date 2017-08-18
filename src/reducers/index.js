import { combineReducers } from 'redux'

import {
  ADD_POST
} from '../actions'

function posts (state = {}, action) {
  switch (action.type) {
    case ADD_POST :
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
    default :
      return state
  }
}

export default combineReducers({
  posts
})
