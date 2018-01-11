import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          // JSX- field.input is an object. ... allows us to access its propreties in the component's props
          {...field.input}
          type="text"
          className="form-control"
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // after form is 'handled' by redux-form, it then calls our own defined function
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="title"
            label="Title"
            component={this.renderField}
          />
          <Field
            name="categories"
            label="Categories"
            component={this.renderField}
          />
          <Field
            name="content"
            label="Post Content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}


// called by **redux-form** automatically during form's life cycle
function validate(values) {

  // console.log(values) -> { title: 'aaa', categories: 'aaa', content:'aaa' }
  const errors = {};

  // Validate inputs from values object
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }

  // If errors is empty, reduxForm assumes form is ok to submit
  // If errors has any propertis, redux form assumes form is invalid
  return errors;
}


// reduxForm here, adds handleSubmit and other functions
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);


// redux form field states -> pristine(init), touched, invalid
