# simple-image-cropper

![alt text](https://github.com/gopendrajangir/simple-image-cropper/blob/main/simple-image-cropper.png)

simple-image-cropper is a customizable ReactJS library for cropping some specific part of an image by zooming and and selecting specific portion of image.

## Installation

```bash
npm install simple-image-cropper
```
## Usage

simple-image-cropper is a customizable library so you can apply your own styles on specific parts of this tool. simple-image-cropper uses a higher order component function called <b>useCropper</b> which makes it possible to apply custom design on it.

### Imports

```javascript
import { useCropper, Avatar, ZoomSlider } from 'simple-image-cropper';
```

### Basic Example

```javascript
const Cropper = useCropper(({ avatarProps, zoomSliderProps, onSave, onCancel }) => {
  return (
    <div>
      <Avatar avatarProps={avatarProps} />
      <ZoomSlider zoomSliderProps={zoomSliderProps} />
      <button type="button" onClick={onCancel}>Cancel</button>
      <button type="button" onClick={onSave}>Save</button>
    </div>
   );
});

class App extends React.Component() {
  constructor(props){
    ...
  }
  onSave(url) {
    ...
  }
  onCancel() {
    ...
  }
  render() {
    returns (
      <Cropper
        width={200}
        height={200}
        url={imageUrl}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    )
  }
}
```

#### useCropper()
useCropper is a higher order component function which provides all the necessary props required by the Avatar and ZoomSlider component and by the cancel and save button and returns a Cropper Component.

```javascript
const Cropper = useCropper(({ avatarProps, zoomSliderProps, onSave, onCancel }) => {
  return ...
}); // returns Croppper Component
```
<b>Note:</b> useCropper returns a Cropper Component which renders our image cropper.

***

#### Avatar
Avatar component is responsible for showing image with zooming and dragging features.

```javascript
<Avatar avatarProps={avatarProps} />
```
<b>Note:</b> avatarProps is provided by useCropper function's single object argument's property.

```javascript
<Avatar className="avatar" style={{borderRadius: "100%"}} avatarProps={avatarProps}/>
```
<b>Note:</b> Avatar component also accepts style and className props.

***

#### ZoomSlider
ZoomSlider component is responsible for showing range slider for zoom.

```javascript
<ZoomSlider zoomSliderProps={zoomSliderProps} />
```
<b>Note:</b> zoomSliderProps is provided by useCropper function's single object argument's property.

```javascript
<ZoomSlider className="zoom-slider" style={{marginTop: "10px"}} zoomSliderProps={zoomSliderProps} />
```
<b>Note:</b> ZoomSlider component also accepts style and className props.

***

#### Cropper
Cropper component is responsible for render our image cropper. Cropper Component is returned from useCropper function.
<br>
Cropper component accepts 5 arguments:

| Prop          | Type                    | Required  |
| ------------- |:-----------------------:| ---------:|
| width         | number                  | true      |
| height        | number                  | true      |
| url           | image url or base64 url | true      |
| onSave        | function                | true      |
| onCancel      | function                | false     |

##### width : number
width is the width of the Avatar component. Required.

##### height : number
height is the height of the AvatarComponent. Required.

##### url: string
url is the online image url or base64 url. Required.
<br>
<b>Note:</b> If you are using file type input for image you will need to read file using [fileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) api to convert it into data url.

##### onSave: function
onSave prop accepts a function which is passed to a button through useCropper function and is called when this button is clicked. Function passed to this prop is called with a url argument which is the base64 url of cropped part of image. Required.

##### onCancel: function
onCancel prop accepts a function which is passed to a button through useCropper function and is called when this button is clicked. Not Required.
