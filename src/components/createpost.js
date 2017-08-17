import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, ControlLabel, Col, Button } from 'react-bootstrap';

class createpost extends Component{

  static propTypes = {
    categories: PropTypes.array.isRequired
  }

  render(){
    const {categories} = this.props;
    console.log(categories);
    return(
      <div className="row">
          <div>
            <Col xs={4} sm={4}>
              <h2>Readble App</h2>
              <br/>
              <form>
                 <ControlLabel>Title</ControlLabel>
                  <FormControl
                    type="text"
                    //value={this.state.value}
                    placeholder="Title"
                    //onChange={this.handleChange}
                  />
                  <br/>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Categories</ControlLabel>
                    <FormControl componentClass="select" placeholder="Categories">
                      <option value="select">select</option>
                    </FormControl>
                  </FormGroup>
                  <br/>
                  <FormGroup controlId="formControlsTextarea">
                   <ControlLabel>Content</ControlLabel>
                   <FormControl componentClass="textarea" placeholder="Content" />
                  </FormGroup>

                  <Button type="submit" bsStyle='success'>
                   Submit
                  </Button>
              </form>
            </Col>
          </div>
      </div>
    );
  }
}

export default createpost;
