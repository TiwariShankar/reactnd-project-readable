import { combineReducers } from 'redux';
import posts from '../reducers/posts';
import comments from '../reducers/comments';
import category from '../reducers/category'

export default combineReducers({
  posts,
  comments,
  category
})
