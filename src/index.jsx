import React from 'react';
import PropTypes from 'prop-types'

export { default as Avatar } from './Avatar';
export { default as ZoomSlider } from './ZoomSlider';

export function useCropper(cb) {
  class Cropper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        left: 0,
        top: 0,
        zoom: 1,
        dimensions: {
          imageWidth: "auto",
          imageHeight: "auto"
        }
      }

      this.imageRef = React.createRef();
      this.canvasRef = React.createRef();
      this.hiddenCanvasRef = React.createRef();
      this.onZoomValueChange = this.onZoomValueChange.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.handleMove = this.handleMove.bind(this);
      this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
      const image = this.imageRef.current;

      image.onload = function () {
        const { width: offsetWidth, height: offsetHeight } = image.getBoundingClientRect();
        const { width, height } = this.props;

        let imageWidth, imageHeight;
        let left = 0;
        let top = 0;

        if (offsetWidth < offsetHeight) {
          imageWidth = width;
          imageHeight = (offsetHeight * imageWidth) / offsetWidth;
          if (imageHeight < height) {
            imageHeight = height;
            imageWidth = (offsetWidth * imageHeight) / offsetHeight;
          }
          top = -1 * (imageHeight - height) / 2;
        } else if (offsetHeight < offsetWidth) {
          imageHeight = height;
          imageWidth = (offsetWidth * imageHeight) / offsetHeight;
          if (imageWidth < width) {
            imageWidth = width;
            imageHeight = (offsetHeight * imageWidth) / offsetWidth;
          }
          left = -1 * (imageWidth - width) / 2;
        } else {
          imageWidth = width;
          imageHeight = height;
        }

        this.setState({
          left, top,
          dimensions: {
            imageWidth,
            imageHeight
          }
        });
      }
      image.onload = image.onload.bind(this);
    }

    onZoomValueChange(e) {
      const newZoomValue = e.target.value;

      const { height, width, url } = this.props;
      const { zoom, left, top, dimensions } = this.state;
      const { imageWidth, imageHeight } = dimensions;

      let newLeft = -1 * (((Math.abs(left) + width / 2) * 100 / (imageWidth * zoom)) * (imageWidth * newZoomValue) / 100 - width / 2);
      let newTop = -1 * (((Math.abs(top) + height / 2) * 100 / (imageHeight * zoom)) * (imageHeight * newZoomValue) / 100 - height / 2);

      if (newLeft > 0) {
        newLeft = 0;
      }
      if (newTop > 0) {
        newTop = 0;
      }
      if (Math.abs(newLeft) > Math.abs(imageWidth * newZoomValue - width)) {
        newLeft = -1 * (imageWidth * newZoomValue - width);
      }
      if (Math.abs(newTop) > Math.abs(imageHeight * newZoomValue - height)) {
        newTop = -1 * (imageHeight * newZoomValue - height);
      }
      this.setState({ zoom: newZoomValue, left: newLeft, top: newTop });
    }

    onSave() {
      const { height, width, url } = this.props;
      const { left, top } = this.state;

      const imageObj = new Image();
      imageObj.src = url;
      imageObj.setAttribute('crossorigin', "anonymous");

      imageObj.onload = function () {

        const canvas = this.canvasRef.current;
        const context = canvas.getContext('2d');

        const { width: sourceWidth, height: sourceHeight } = canvas.getBoundingClientRect();

        context.drawImage(imageObj, 0, 0, sourceWidth, sourceHeight);

        const hiddenCanvas = this.hiddenCanvasRef.current;
        const hiddenContext = hiddenCanvas.getContext('2d');

        hiddenContext.drawImage(canvas, Math.abs(left), Math.abs(top), width, height, 0, 0, width, height);

        this.props.onSave(hiddenCanvas.toDataURL());
      }

      imageObj.onload = imageObj.onload.bind(this);
    }

    handleMove(e) {
      const { left, top, zoom, dimensions } = this.state;
      const { width, height } = this.props;
      const { imageWidth, imageHeight } = dimensions;
      const directionX = e.movementX;
      const directionY = e.movementY;

      let newLeft = left + directionX;
      let newTop = top + directionY;

      if (newLeft > 0) {
        newLeft = 0;
      } else if (Math.abs(newLeft) > (imageWidth * zoom - width)) {
        newLeft = -1 * (imageWidth * zoom - width);
      }

      if (newTop > 0) {
        newTop = 0;
      } else if (Math.abs(newTop) > (imageHeight * zoom - height)) {
        newTop = -1 * (imageHeight * zoom - height);
      }

      this.setState({ left: newLeft, top: newTop });
    }

    onMouseDown(e) {
      e.target.addEventListener('mousemove', this.handleMove);

      const removeEventHandler = () => {
        e.target.removeEventListener('mousemove', this.handleMove);
        document.removeEventListener('mouseup', removeEventHandler);
      }

      document.addEventListener('mouseup', removeEventHandler);
    }

    render() {

      const { top, left, zoom, dimensions } = this.state;
      const { url, width, height } = this.props;

      const avatarProps = {
        top, left, zoom, dimensions, url, width, height, imageRef: this.imageRef,
        canvasRef: this.canvasRef,
        hiddenCanvasRef: this.hiddenCanvasRef,
        onMouseDown: this.onMouseDown
      }

      const zoomSliderProps = {
        zoom,
        onZoomValueChange: this.onZoomValueChange
      }

      return (
        cb({ avatarProps, zoomSliderProps, onSave: this.onSave, onCancel: this.props.onCancel })
      )
    }
  }

  Cropper.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  }

  return Cropper;
}
