import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import newId from '../utils/newid';
//import { savePost } from '../actions/index.js'
import {bindActionCreators} from 'redux';
import * as courseActions from '../actions/index';

class CreatePosts extends Component{
  constructor(props) {
    super(props);
    this.state = {
      post:{
          title: '',
          body: '',
          owner: '',
          timestamp: '',
          id: ''
        }
    };
    this.updatePostState = this.updatePostState.bind(this);
  }

  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  componentDidMount() {
    var timestamp = new Date();
    const post = this.state.post;
    post['timestamp'] = timestamp;
    post['id'] = this.id

    this.setState({post: post});
  }

  componentWillMount() {
      this.id = newId();
  }

  updatePostState = (event) => {
    const field = event.target.name;
    const post = this.state.post;
    post[field] = event.target.value;
    this.setState({post: post});
  }

  savePost = (event) => {
    event.preventDefault();
    console.log(this.state.post);
    //this.props.savePost(this.state.post);
    this.props.actions.createPost(this.state.post)
  }

  render(){
    const {categories} = this.props;

    return(
      <div className="row">
          <div>
            <Col xs={4} sm={4}>
              <h2>Readble App</h2>
              <br/>
              <input id={this.id} type="hidden" />
              <form onSubmit={(event) => this.savePost(event)}>
                  <FormGroup controlId="formControlsSelect">
                     <ControlLabel>Categories</ControlLabel>
                     <FormControl componentClass="select" placeholder="Categories">
                         {categories.map((data, i) => (
                             <option key={i} value={data.path}>{data.path}</option>
                           ))
                         }
                     </FormControl>
                  </FormGroup>
                  <br/>

                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                     type="text"
                     name="owner"
                     value={this.state.post.owner}
                     onChange={this.updatePostState}
                     placeholder="Enter your name"
                   />
                   <br/>

                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                     type="text"
                     name="title"
                     value={this.state.post.title}
                     onChange={this.updatePostState}
                     placeholder="Title"
                   />
                  <br/>

                  <FormGroup controlId="formControlsTextarea">
                   <ControlLabel>body</ControlLabel>
                   <FormControl
                     componentClass="textarea"
                     name="body"
                     value={this.state.post.body}
                     onChange={this.updatePostState}
                     placeholder="Content" />
                  </FormGroup>

                  <Button type="submit" bsStyle='success'>Submit</Button>
              </form>
            </Col>
          </div>
      </div>
    );
  }
}

//export default CreatePosts;
function mapStateToProps(state, ownProps) {
   return {
     post: state.post
   }
}

function mapDispatchToProps (dispatch) {
  return {
   actions: bindActionCreators(courseActions, dispatch)
 };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePosts);
