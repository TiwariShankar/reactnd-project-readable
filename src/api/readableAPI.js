const api = "http://localhost:5001"

// Generate a unique token for storing your readable data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
   fetch(`${api}/categories`, { headers })
     .then(res => res.json())
     .then(data => data.categories)

// export const savePost(post) {
//   const request = new Request(`${api}/posts`, {
//        method: 'POST',
//        headers: new Headers({ headers}),
//        body: JSON.stringify({ post: post })
//      });
// }

export const savePost = (post) =>
   fetch(`${api}/posts`, {
     method: 'POST',
     headers: headers,
     body: JSON.stringify({ post: post })
   }).then(res => res.json())

export const getAllPost = () =>
  fetch(`${api}/posts`, { headers })
     .then(res => res.json())
