const api = "http://localhost:5001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

export const getAllCategories = () =>
   fetch(`${api}/categories`, { headers })
     .then(res => res.json())
     .then(data => data.categories)


export const savePost = (post) =>
   fetch(`${api}/posts`, {
     method: 'POST',
     headers: headers,
     body: JSON.stringify(post)
   }).then(res => res.json())


export const getAllPost = () =>
  fetch(`${api}/posts`, { headers })
     .then(res => res.json())


export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
     .then(res => res.json())


export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(post)
  }).then(res => res.json())


export const deletePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify(post)
  })
  .then(res => res.json())
  .catch(error => {
      return error;
    });
