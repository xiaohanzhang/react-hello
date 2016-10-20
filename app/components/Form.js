import _ from 'lodash'
import React, { Component } from 'react'

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: this.props.objects,
    };

    _.bindAll(this, ['handleChange', 'handleUpdate', 'submit']);

    this.debounceSubmit = _.debounce(this.submit, 2000);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      objects: this.props.objects,
    });
  }

  handleChange(object, field) {
    const id = object.id;
    return (e) => {
      const value = _.get(e, 'target.value', e);
      this.setState({
        objects: _.merge({}, this.state.objects, {
          [id]: {
            [field]: value,
          },
        }),
      });
      this.debounceSubmit();
    };
  }

  handleUpdate(object, field) {
    return () => {
      this.debounceSubmit();
    }
  }

  submit() {
    const {
      objects, onUpdate
    } = this.props;

    _.each(this.state.objects, (obj) => {
      if (!_.isEqual(obj, objects[obj.id])) {
        onUpdate(obj);
      }
    });
  }

  render() {
    const {
      objects,
    } = this.state;

    const controls = _.map([{
      object: objects.foo,
      field: 'a',
    }, {
      object: objects.foo,
      field: 'b',
    }, {
      object: objects.bar,
      field: 'a',
    }], ({
      object, field,
    }, key) => {
      return <input 
        key={key}
        onChange={this.handleChange(object, field)}
        onBlur={this.debounceSubmit}
      />
    });
    return <div>
      {controls}
    </div>;
  }
}


