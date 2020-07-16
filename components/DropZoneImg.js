import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export default class DropzoneImg extends Component {
  constructor() {
    super();
    this.state = { file: [] };
  }

  onDrop = (acceptedFile) => {
    this.setState({ file: acceptedFile });
  }
  onOpenClick = () => {
    this.dropzone.open();
  }
  render() {
    return (
      <div className={'mtl'}>
        <span>Image</span>
        <Dropzone
          ref={(node) => { this.dropzone = node; }}
          onDrop={this.onDrop}
          multiple={false}
          accept={'image/*'}
          className={'imgUploadArea'}
        >
          <div>
            {
              this.state.file.length > 0 ? <div>
                <div>{this.state.file.map(file => <img key={file} width={'100%'} src={file.preview} /> )}</div>
              </div> : null
            }
          </div>
        </Dropzone>
      </div>
    );
  }
}
