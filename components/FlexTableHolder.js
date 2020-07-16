import React, { Component } from 'react';
import { Table, Column, ColumnGroup, Cell } from 'fixed-data-table';
import TextCell from './helpers/TextCell';
import LinkCell from './helpers/LinkCell';
import { Close } from './helpers/DelButton';
import RenderColumnInputCheckBox from './RenderColumnInputCheckBox'
 
export default class FlexTableHolder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { rowGetter, columns, cellRenderer, ...other } = this.props;
    return (
      <Table
        {...other}
      >
        { columns.map((c, index) => ( <Column key={index} cell={cellRenderer} {...c} /> ) ) }
      </Table>
    );
  }
}
