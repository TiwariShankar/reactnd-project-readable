import React,{Component} from 'react';
import * as ReadableAPI from '../api/readableAPI';
import { bindActionCreators } from 'redux';
import * as commentActions from '../actions/commentActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DisplayComment extends Component {
  constructor(props) {
   super(props);
   this.state = {
     comment:{
       id:'',
       body:'',
       timestamp:'',
       parentId:''
      }
   }
  }

  componentDidMount() {
      const commentId = this.props.match.params.id;
      const comment = this.state.comment;
      ReadableAPI.getComment(commentId).then((commentData) => {
        comment['id'] = commentData['id']
        comment['body'] = commentData['body']
        comment['parentId'] = commentData['parentId']
        this.setState({comment});
      });
  }

  updateComment = (event) => {
    const comment = this.state.comment;
    comment['body'] = event.target.value;
    this.setState({comment});
  }

  editComment = (event) => {
    event.preventDefault();

    var timestamp = new Date().getTime() / 1000;
    const comment = this.state.comment;
    comment['timestamp'] = timestamp;
    this.setState({comment});
    const parentId = this.state.comment.parentId;

    this.props.actions.editComment(this.state.comment);
    this.props.history.push(`/posts/${parentId}/comments`);
  }

  deleteComment = (data) => {
      this.props.actions.deleteComment(data);
      const parentId = this.state.comment.parentId;
      this.props.history.push(`/posts/${parentId}/comments`);
  }

  render() {
      const comment = this.state.comment;
      return (
        <div>
          <div className="container">
              <nav className='navbar navbar-inverse navbar-fixed-top'>
                  <div className="col-md-2 col-md-offset-5">
                     <Link to={`/posts/${ comment.parentId }/comments`}>
                         <h2 style={{color:"orange", fontSize:"20pt"}}> Readable App
                         </h2>
                     </Link>
                  </div>
              </nav>
              <div className="row">
                <div className="col-md-6 col-md-offset-3">
                 <br/><br/><br/><br/>
                 <h3>Comment</h3>
                 <br/>
                 <div className="form-group">
                    <textarea className="form-control"
                              rows="3" name="body"
                              value={ comment.body }
                              onChange= {(e) => this.updateComment(e)}
                              placeholder="Content">
                    </textarea>
                    <br/><br/>
                    <button onClick={ (event) => this.editComment(event) }
                            className="btn btn-default"
                            type="submit">Save</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className='btn btn-default'
                            onClick= {(event) => this.deleteComment(comment)}>
                        Delete
                    </button>
                  </div>
                </div>
              </div>
          </div>
       </div>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(DisplayComment);
