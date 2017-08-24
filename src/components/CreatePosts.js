//create page
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/postActions';

class CreatePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        body: '',
        author: '',
        timestamp: '',
        id: '',
        category:'react'
      }
    };
    this.updatePostState = this.updatePostState.bind(this);
  }

  static propTypes = {
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.actions.loadCategory();
  }

  updatePostState = (event) => {
    const field = event.target.name;
    const post = this.state.post;
    post[field] = event.target.value;
    this.setState(post);
  }

  savePost = (event) => {
    event.preventDefault();
    const post = this.state.post;
    console.log(post);

    if(post['title'] === "" || post['body'] === "" || post['author'] === ""){
      alert("please enter the details");
    }else{
      var timestamp = new Date().getTime() / 1000;
      post['timestamp'] = timestamp;
      const uuidv1 = require('uuid/v1');
      post['id'] = uuidv1();;
      this.setState(post);
      //console.log(this.state);

      this.props.actions.createPosts(this.state.post);
      this.props.history.push("/");
    }
  }

  render() {
    const categories = this.props.category;

    return (
      <div>
        <nav className='navbar navbar-inverse navbar-fixed-top'>
            <div className="col-md-2 col-md-offset-5">
               <Link to="/">
                   <h2 style={{color:"orange", fontSize:"20pt"}}> Readable App
                   </h2>
               </Link>
            </div>
        </nav>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <br/><br/><br/>
            <form onSubmit={ (event) => this.savePost(event) }>
              <h2 style={{color:"lightblue", fontSize:"18pt"}}>Create Post </h2>
              <br/>
                <select name="category" onChange={this.updatePostState}
                  id="category" style={{width:"50%"}} className="form-control">
                  {categories.length > 0 && categories.map((data, i) => (
                      <option key={ i } value={ data.name }>
                        { data.path }
                      </option>
                    )) }
                </select>
              <br/>
               <PostList post={this.state.post} updatePostState={this.updatePostState}/>
              <br/>
              <button className="btn btn-default" type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
      );
  }
}


function mapStateToProps(state, ownProps) {
  const category = state.category;
  if (category.length > 0) {
    return {
      category:category
    }
  } else {
    return {
      category:[]
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePosts);
