import React, { Component } from 'react'
import { connect } from 'react-redux'

import Form from '../components/Form'

const App = ({
  objects,
  onUpdate,
}) => {
  return <div>
    <Form onUpdate={onUpdate} objects={objects}/>
  </div>;
}

export default connect((state, ownProps) => {
  return {
    objects: state.objects,
  };
}, (dispatch) => {
  return {
    onUpdate: (object) => {
      dispatch({
        type: 'update',
        payload: object,
      });
    }
  };
})(App);
