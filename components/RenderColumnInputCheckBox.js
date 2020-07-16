import React, { Component } from 'react';

export default class RenderColumnInputCheckBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked:props.data
    }
  }
  onChangeCheckBox(e) {
    this.setState({checked:e.target.checked});
  }
  render() {
    console.log(this.props.cellData)
    return(
      <div>
        <input  type = 'checkbox' 
          className = 'mls'
          checked = { this.state.checked } 
          onChange = { this.onChangeCheckBox.bind(this) }
        />
      </div>
		);
	}
}