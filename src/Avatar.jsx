import React from 'react';
import PropTypes from 'prop-types';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { avatarProps, style, className } = this.props;
    const { width, height, left, top, zoom, url, onMouseDown, dimensions, imageRef, canvasRef, hiddenCanvasRef } = avatarProps;
    const { imageWidth, imageHeight } = dimensions;

    return (
      <div
        className={className}
        style={{
          position: "relative",
          overflow: "hidden",
          width: `${width}px`,
          height: `${height}px`,
          cursor: 'move',
          ...style
        }}
      >
        <canvas
          width={`${imageWidth === "auto" ? "auto" : imageWidth * zoom + "px"}`}
          height={`${imageHeight === "auto" ? "auto" : imageHeight * zoom + "px"}`}
          ref={canvasRef}
          style={{
            position: "absolute",
            top: `${top}px`,
            left: `${left}px`,
          }}
        ></canvas>
        <canvas
          width={width}
          height={height}
          ref={hiddenCanvasRef}
          style={{ position: "absolute" }}></canvas>

        <img src={url}
          ref={imageRef}
          style={{
            position: "absolute",
            width: `${imageWidth === "auto" ? "auto" : imageWidth * zoom + "px"}`,
            height: `${imageHeight === "auto" ? "auto" : imageHeight * zoom + "px"}`,
            left: `${left}px`,
            top: `${top}px`,
          }}

          onMouseDown={onMouseDown}

          onDragStart={(e) => {
            e.preventDefault()
          }}
        />
      </div>
    )
  }
}

Avatar.defaultProps = {
  style: {}
}

Avatar.propTypes = {
  avatarProps: PropTypes.object.isRequired
}

export default Avatar;