export const ADD_POST = 'ADD_POST'

export function addPost({ id, title, body, owner, category, timestamp }) {
  return {
    type: ADD_POST,
    id,
    title,
    body,
    owner,
    category,
    timestamp
  }
}
