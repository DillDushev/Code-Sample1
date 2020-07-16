
import React, { Component } from 'react';
import FlexTableHolder from './FlexTableHolder';
import { cellRenderer, columns } from './FlexTableRenderer'; 

export default class FlexTable extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this); 
    this.blur = this.blur.bind(this);
    const K_MAX_VISIBLE_ROWS = 100;
    this.currentRowIndex = null;
    this.inScroll = false;
    this.mousePosX = null;
    this.mousePosY = null; 
    this.columns = columns.map((c, index) => ({ ...c, width: props.columnsWidth[index] }));
    this.rowYPositions = Array
      .from(Array(K_MAX_VISIBLE_ROWS).keys())
      .map(() => ({ rowIndex: -1, rowYTop: -1000, rowYBottom: -1000 }));
  }
  _onKeyDown = (event) => {
    if (event.keyCode === 46 && this.currentRowIndex !== null) {
      this.props.onRowDelete(this.currentRowIndex);
    }
  }
  componentWillReceiveProps(nextProps) {
    
  }
  focus() {
    this.node.focus();
  }
  blur() {
    this.node.blur();
  }
  _getRowObjectAt = (i) => {
    if (i === 0) return null;
    return this.props.getRowObjectAt(i);
  }
  _onMouseMove = (event) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    this.mousePosX = event.clientX - targetRect.left;
    this.mousePosY = event.clientY - targetRect.top;
  }
  _onMouseEnter = (e) => {
    e.preventDefault();
    this.focus();
  }
  _onMouseLeave = (e) => {
    e.preventDefault();
    this.blur();
  }
  _cellRenderer = ({ rowIndex, ...props }) => {
    //console.log('_cellRenderer');
    const { columnKey } = props;
    const cellData = this.props.tableData[rowIndex][columnKey];
    if (typeof cellData !== 'undefined') {
        const onChange = (e) => {
          let value = null;
          value = e.target.value;
          this.props.onChange(value, rowIndex, columnKey);
        };
        return cellRenderer(columnKey, cellData, onChange);
    }
    return cellRenderer(columnKey, 'X');
  }
  _onRowMouseEnter = (e, rowIndex) => {
    if (rowIndex !== this.currentRowIndex) {
      this._onRowMouseLeave();
      this.currentRowIndex = rowIndex;
    }
  }
  _onRowMouseLeave = () => {
    if (this.currentRowIndex !== null) {
      this.currentRowIndex = null;
    }
  }
  _onRowClick = (e) => {
    let columnIndex = -1;
    e.preventDefault();
    const w = this.props.columnsWidth;
    var sum = w.reduce(function(a, b) {
      return a + b;
    }, 0);
    console.log('onRowClick', sum);
    if (this.mousePosX < w[0]) {
      columnIndex = 0;
    } else if (this.mousePosX < w[0] + w[1]) {
      columnIndex = 1;
    } else if (this.mousePosX < w[0] + w[1] + w[2]) {
      columnIndex = 2;
    } else if (this.mousePosX < w[0] + w[1] + w[2] + w[3]) {
      columnIndex = 3;
    } else if (this.mousePosX < sum && this.mousePosX > sum - w[w.length-2]){
      columnIndex = w.length-2;

      if (this.currentRowIndex !== null) {
        this.props.onRowDelete(this.currentRowIndex);
      }
    }
    this.props.getColumnIndex(columnIndex);
  }
  render() {
    console.log('render FlexTable')
    return (
      <div
        id={'tableWrap'}
        ref={(node) => { this.node = node; }}
        tabIndex={'0'}
        className={'pointer'}
        onMouseMove={this._onMouseMove}
        onMouseLeave={this._onMouseLeave}
        onMouseEnter={this._onMouseEnter}
        onKeyDown={this._onKeyDown}
      >
        <FlexTableHolder
          rowGetter={this._getRowObjectAt}
          onRowMouseEnter={this._onRowMouseEnter}
          onRowMouseLeave={this._onRowMouseLeave}
          onRowClick={this._onRowClick}
          onScroll={this._onTableScrollChange}
          cellRenderer={this._cellRenderer} 
          rowHeight={50}
          headerHeight={50}
          width={this.props.width}
          columns={this.columns}
          maxHeight={500}
          rowsCount={this.props.tableData.length}
          tableData={this.props.tableData}
        />
      </div>
    );
  }
}

