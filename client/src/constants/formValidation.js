export const validateEmail = (email) => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/* eslint-disable */

export default function(values, requiredFields) {
  const errors = {};
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if ( values.email && !validateEmail(values.email) ) {
    errors.email = 'Invalid email address';
  }
  if ( values.password && values.password.length < 10 ) {
    errors.password = 'Must be at least 10 characters';
  }
  if ( !errors.retypePassword && values.password !== values.retypePassword ) {
    errors.retypePassword = `Passwords don't match`;
  }
  return errors;
}
