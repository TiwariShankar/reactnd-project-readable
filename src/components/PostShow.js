//shows list of posts for allposts
import React from 'react'
import { divStyle, titleStyle, dateStyle, hrStyle, addPostStyle} from '../styles/styles';
import { Link } from 'react-router-dom';

const PostShow = ({posts, getDate, upvote, showComments, handleAddPost}) =>
        <div>
        <button onClick={handleAddPost} style={addPostStyle}
          className="btn btn-default btn-lg">
          <span className="glyphicon glyphicon-plus"></span>&nbsp;
        </button>
        {posts.length > 0 && posts.map((post, i) => (
          <div key={i}>
              <Link to={`/${ post.category }/${ post.id }`}><p style={titleStyle}>{post.title}</p></Link>
              <div style={divStyle}>
                 <span>{post.voteScore} points</span>&nbsp;
                 <span>by {post.author} </span>&nbsp;
                 <span style={dateStyle}>{getDate(post.timestamp)} hours ago</span>
                 &nbsp;&nbsp;&nbsp;&nbsp;
                 <button onClick= {(event) => upvote(post, "upVote")}
                     className='btn btn-success btn-xs'>
                     <span className="glyphicon glyphicon-arrow-up"></span>
                 </button>&nbsp;&nbsp;
                 <button onClick= {(event) => upvote(post, "downVote")}
                     className='btn btn-danger btn-xs'>
                     <span className="glyphicon glyphicon-arrow-down"></span>
                 </button>
                 &nbsp;&nbsp;
                 <button onClick={(event) => showComments(post.id)} className="btn btn-info btn-xs"> Comments</button>
              </div>
              <hr style={hrStyle}/>
              <br/><br/><br/>

          </div>
        ))}

        </div>

export default PostShow;
