import React,{Component} from 'react';
import * as ReadableAPI from '../api/readableAPI';
import { Link } from 'react-router-dom';

export default class ListComment extends Component {
   constructor(props) {
    super(props);
    this.state = {
      post: {
        id: '',
        title: '',
        body: '',
        author: '',
        timestamp: '',
        voteScore: '',
        deleted: ''
      },
      comment: ''
    }
  }

   componentDidMount() {
    const postId = this.props.match.params.id;
    const post = this.state.post;
    ReadableAPI.getPost(postId).then((postData) => {
      post['id'] = postData['id']
      post['title'] = postData['title']
      post['body'] = postData['body']
      post['author'] = postData['author']
      post['timestamp'] = postData['timestamp']
      post['voteScore'] = postData['voteScore']
      post['deleted'] = postData['deleted']
      this.setState({post});
    });
   }

   updateCommentState = () => {

   }

   render() {
        const post = this.state.post;
        return (
          <div>
           <div className="container">
            <div className="row">
               <br/>
              <div className="col-md-6 col-md-offset-3">
                 <Link to={`/posts/${ post.id }`}><p style={{fontSize:"22px"}}>{post.title}</p></Link>
                 <br/>
                 <textarea className="form-control"
                           rows="3" name="Comment"
                           value={ this.state.comment }
                           placeholder="Comment">
                 </textarea><br/>
                 <button onClick={(event) => this.updateCommentState(post.id)}
                         className="btn btn-default btn-xs"> Add Comment</button>
              </div>
            </div>
           </div>
          </div>
        );
    }
}
