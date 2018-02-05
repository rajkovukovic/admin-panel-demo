import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Label from './Label';

/* eslint-disable */

export default class Button extends Component {
  // 
  static propTypes = {
    onPress:      PropTypes.func,
    text:         PropTypes.string,
    style:        PropTypes.object,
    textStyle:    PropTypes.object,
    imageSource:  PropTypes.string,
    imageStyle:   PropTypes.object,
    isLoading:    PropTypes.bool,
    loadingColor: PropTypes.string,
    error:        PropTypes.string,
  }

  static defaultPorps = {
    imageSource:  '',
    imageStyle:   {},
    isLoading:    false,
    loadingColor: '',
    error:        '',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isLoading,
      error,
      text,
      style,
      className,
      ...restProps
    } = this.props;
    return (
      <div
        style={style || {
          marginTop:    24,
          marginBottom: 32,
        }}
        className={className}
      >
        { (isLoading)
          ?
            <div style={{
              width:  36,
              margin: '0 auto -3px',
            }}>
              <CircularProgress
                style={{
                  marginRight: -36,
                }}
                color="#EEEEEE"
                mode="determinate"
                value={100}
                size={36}
                thickness={3}
              />
              <CircularProgress
                mode="indeterminate"
                size={36}
                thickness={3}
              />
            </div>
          :
            <RaisedButton {...restProps} />
        }
        { error && (
          <Label
            style={{ marginTop: 8 }}
          >
            {error}
          </Label>)
        }
      </div>
    );
  }
}
