import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizePercentageForDisplay } from '../../helpers/misc';

/* eslint-disable */


class CircularProgress extends Component {
  static propTypes = {
    value:     PropTypes.number,
    size:      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lineWidth: PropTypes.number,
    color:     PropTypes.string,
    style:     PropTypes.object,
    children:  PropTypes.element,
  }

  static defaultProps = {
    value:     0, // range 0..100
    size:      50,
    lineWidth: 3,
    color:     '#777777',
    style:     {},
    children:  undefined,
  }

  render() {
    const {
      value, size, lineWidth, color, style, children, ...restProps
    } = this.props;
    if (children) {
      throw new Error('Children will be discarded');
    }
    const sizeNumber = parseInt(size);
    const r = sizeNumber / 2 - lineWidth / 2;
    const valueInt = value;
    const valueFractionInt = Math.floor((valueInt % 1) * 100);
    const valueFraction = valueFractionInt < 10 ? `0${valueFractionInt}` : `${valueFractionInt}`
    const graphicNormalizedValue = normalizePercentageForDisplay(value / 100);
    return (
      <div
        {...restProps}
        style={{
          ...style,
          width:  typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
        }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <circle
            cx={sizeNumber/2}
            cy={sizeNumber/2}
            r={sizeNumber/2}
            fill="#FFFFFF"
          />
          <circle
            cx={sizeNumber/2}
            cy={sizeNumber/2}
            r={sizeNumber/2}
            fill={color}
            style={{
              opacity: 0.05
            }}
          />
          <circle
            cx={sizeNumber/2}
            cy={sizeNumber/2}
            r={r}
            stroke={color}
            fill="none"
            strokeWidth={lineWidth * 0.5}
            style={{
              opacity: 0.2
            }}
          />
          <circle
            cx={sizeNumber/2}
            cy={sizeNumber/2}
            r={r}
            stroke={color}
            fill="none"
            strokeWidth={lineWidth}
            strokeDasharray={[2 * r * Math.PI * graphicNormalizedValue, 7 * r]}
            style={{
              transformOrigin: `${sizeNumber/2}px ${sizeNumber/2}px`,
              transform: `rotate(-90deg)`,
              transition: `stroke-dasharray 0.2s ease-out`
            }}
          />
        </svg>
        <span className="ServerListNodePieChartText">
          <span className="ServerListNodePieChartText-Big">
            {Math.floor(valueInt)}.
          </span>
          <span className="ServerListNodePieChartText-Small">
            {valueFraction}
          </span>
          <span className="ServerListNodePieChartText-Small">
            %
          </span>
        </span> 
      </div>
    )
  }
};

export default CircularProgress;
