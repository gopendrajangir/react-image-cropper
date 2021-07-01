import React from 'react';
import PropTypes from 'prop-types';

function ZoomSlider({ zoomSliderProps, style, className }) {
  const { zoom, onZoomValueChange } = zoomSliderProps;
  return <input style={{ ...style }} className={className} type="range" name="range" min="1" max="10" value={zoom} step=".1" onChange={onZoomValueChange} />;
}

ZoomSlider.defaultProps = {
  style: {}
}

ZoomSlider.propTypes = {
  zoomSliderProps: PropTypes.object.isRequired
}

export default ZoomSlider;