const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateContactInput(data) {
  let errors = {};

  data.fname = !isEmpty(data.fname) ? data.fname : '';
  data.lname = !isEmpty(data.lname) ? data.lname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.website = !isEmpty(data.website) ? data.website : '';
  data.subject = !isEmpty(data.subject) ? data.subject : '';
  data.message = !isEmpty(data.message) ? data.message : '';

  if (!Validator.isLength(data.fname, { min: 2, max: 30 })) {
    errors.fname = 'First Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.fname)) {
    errors.fname = 'Name field is required';
  }

  if (!Validator.isLength(data.lname, { min: 2, max: 30 })) {
    errors.lname = 'Last Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.lname)) {
    errors.lname = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.website)) {
    errors.website = 'Wbsite field is required';
  }

  if (!Validator.isLength(data.website, { min: 6, max: 30 })) {
    errors.website = 'Website must be at least 6 characters';
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = 'Subject field is required';
  }

  if (!Validator.isLength(data.subject, { min: 6, max: 30 })) {
    errors.subject = 'Subject must be at least 6 characters';
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = 'Message field is required';
  }

  if (!Validator.isLength(data.message, { min: 6, max: 500 })) {
    errors.message = 'Message must be at least 6 characters';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
