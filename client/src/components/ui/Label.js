import React from 'react';
// import PropTypes from 'prop-types';

/* eslint-disable */

const defaultStyle = {
  fontSize:   12,
  lineHeight: '12px',
  color:      'rgb(244, 67, 54)',
}
const style = {
}

const Label = (props) => (
  <div
    style={{
      ...defaultStyle,
      ...props.style,
    }}
  >
    {props.children}
  </div>
);

export default Label;
