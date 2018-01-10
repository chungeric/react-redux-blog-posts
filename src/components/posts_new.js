import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';



class PostsNew extends Component {
  renderField(field) {
    return (
      <div className="form-group">
      <label>{field.label}</label>
        <input
          // JSX- field.input is an object. ... allows us to access its propreties in the component's props
          {...field.input}
          type="text"
          className="form-control"
        />
      </div>
    )
  }



  render() {
    return (
      <div>
        <form>
          <Field
            name="title"
            label="Title"
            component={this.renderField}
          />
          <Field
            name="tags"
            label="Tags"
            component={this.renderField}
          />
          <Field
            name="content"
            label="Post Content"
            component={this.renderField}
          />
        </form>
      </div>
    );
  }
}



export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew);
