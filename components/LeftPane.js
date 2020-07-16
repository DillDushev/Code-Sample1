import React, { Component } from 'react';
import { render } from 'react-dom';
import FlexTable from './FlexTable';

const Immutable = require('immutable');

export default class LeftPane extends Component {
  constructor(props) {
    super(props);
    this.width = 0;
    this.columnsWidth = null;
  }
  componentDidMount() {
    const width = $('#input').width() + 22;
    this.width = width;
    const columnsWidth = [
      Math.floor(width * 0.2),
      Math.floor(width * 0.2),
      Math.floor(width * 0.2),
      Math.floor(width * 0.2),
      width - ( 4*Math.floor(width * 0.2)),
    ];
    this.columnsWidth = columnsWidth;
    this._renderTable(this.props.tableData, columnsWidth);
  }
  componentWillReceiveProps(nextProps) { 
    //console.log('next', nextProps.tableData);
    //console.log('this', this.props.tableData);
    const next = Immutable.fromJS(nextProps.tableData);
    const current = Immutable.fromJS(this.props.tableData);
    if (!Immutable.is(next, current)) {
      this._renderTable(nextProps.tableData, this.columnsWidth);
    }
  }
  _renderTable = (data, columnsWidth) => {
    const table = (
      <FlexTable
        width={this.width}
        tableData={data}
        onChange={this.props.onChange}
        getColumnIndex={this.props.getColumnIndex}
        onRowDelete={this.props.onRowDelete}
        columnsWidth={columnsWidth}
      />
    );
    render(table, document.getElementById('table'));
  }
  _onChange = (e) => {
    const { value } = e.target;
    this.props.onHandleInput(value);
  }
  render() {
    const { inputValue } = this.props;
    return (
      <div className={'mal'}>
        <input
          type={'text'}
          id={'input'}
          value={inputValue}
          className={'searchLocation'}
          onChange={this._onChange}
        />
        <button
            className={'mtl mbs searchLocation typeReversed borderRadius backgroundSalade'}
            type={'button'}
            onClick={this.props.onModal}
          >
            <span style = {{ fontWeight: 'bold' }}>+ Арендатор</span>
        </button>
        <div id={'table'} />
      </div>
    );
  }
}

