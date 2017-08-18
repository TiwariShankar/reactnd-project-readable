import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';

class CreatePosts extends Component{
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      owner: '',
      timestamp: ''
    }
  }

  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  handleTitleChange = (title) => {
     if(title){
       this.setState({title})
     }else{
       this.setState({title:''})
     }
  }

  handleContentChange = (body) => {
    if(body){
      this.setState({body})
    }else{
      this.setState({body:''})
    }
  }

  handleNameChange = (owner) => {
    if(owner){
      this.setState({owner})
    }else{
      this.setState({owner:''})
    }
  }

  postData = (event) => {
    event.preventDefault();
    console.log('A content was submitted: ' + this.state.body);
    var timestamp = new Date()
    this.setState({timestamp})
  }

  render(){
    const {categories} = this.props;
    return(
      <div className="row">
          <div>
            <Col xs={4} sm={4}>
              <h2>Readble App</h2>
              <br/>
              <form onSubmit={(event) => this.postData(event)}>
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
                     value={this.state.username}
                     onChange={(event) => this.handleNameChange(event.target.value)}
                     placeholder="Enter your name"
                   />
                   <br/>

                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                     type="text"
                     value={this.state.title}
                     onChange={(event) => this.handleTitleChange(event.target.value)}
                     placeholder="Title"
                   />
                  <br/>

                  <FormGroup controlId="formControlsTextarea">
                   <ControlLabel>body</ControlLabel>
                   <FormControl
                     componentClass="textarea"
                     value={this.state.body}
                     onChange={(event) => this.handleContentChange(event.target.value)}
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

export default CreatePosts;
