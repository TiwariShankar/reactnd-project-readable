//shared between edit and create post
import React from 'react'

const PostList = ({post, updatePostState}) =>
        <div>
          <div className="form-group">
            <input type="text"
                   className="form-control"
                   name="author"
                   value={ post.author }
                   onChange= {(e) => updatePostState(e)}
                   placeholder="Enter your name" />
          </div>
          <br/>
          <div className="form-group">
            <input type="text"
                   className="form-control"
                   name="title"
                   value={ post.title }
                   onChange= {(e) => updatePostState(e)}
                   placeholder="Title" />
          </div>
          <br/>
          <div className="form-group">
            <textarea className="form-control"
                      rows="3" name="body"
                      value={ post.body }
                      onChange= {(e) => updatePostState(e)}
                      placeholder="Content">
            </textarea>
          </div>

        </div>

export default PostList;
