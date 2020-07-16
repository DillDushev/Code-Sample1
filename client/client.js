import React, { Component } from 'react';
import {render} from 'react-dom';
import update from 'react-addons-update';
import LeftPane from '../components/LeftPane';
import RightPane from '../components/RightPane';

const {Table, Column, Cell} = require('fixed-data-table');

const colDef = [
  'input',
  'firstName',
  'lastName',
  'email',
  'close',
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      sortColumnIndex: -1,
      modalDialog: false,
      data: [
        { rentalName: 'Rylan', rentalArea: 300, rentalPayment: 1000, dimension: 'month'},
        { rentalName: 'Kamelia', rentalArea: 300, rentalPayment: 1000, dimension: 'month'},
        { rentalName: 'Eestevan', rentalArea: 300, rentalPayment: 1000, dimension: 'year'},
        { rentalName: 'Filorence', rentalArea: 300, rentalPayment: 1000000, dimension: 'month'},
        { rentalName: 'Bressa', rentalArea: 900, rentalPayment: 1000000, dimension: 'month'},
        { rentalName: 'Nylan', rentalArea: 400, rentalPayment: 1000000, dimension: 'year'},
        { rentalName: 'melia', rentalArea: 30, rentalPayment: 1000000, dimension: 'year'},
        { rentalName: 'Stevan', rentalArea: 30, rentalPayment: 1000000, dimension: 'year'},
        { rentalName: 'Florence', rentalArea: 100, rentalPayment: 1000000, dimension: 'year'},
        { rentalName: 'Mressa', rentalArea: 30, rentalPayment: 1000000, dimension: 'month'},
        { rentalName: 'Lan', rentalArea: 500, rentalPayment: 1000000, dimension: 'month'},
        { rentalName: 'Elia', rentalArea: 200, rentalPayment: 1000000, dimension: 'year'},
        { rentalName: 'Estevan', rentalArea: 100, rentalPayment: 1000000, dimension: 'month' },
        { rentalName: 'Olga', rentalArea: 500, rentalPayment: 1000000, dimension: 'year'},
        { rentalName: 'Tressa', rentalArea: 800, rentalPayment: 1000000, dimension: 'month'},
        { rentalName: 'Rylan', rentalArea: 300, rentalPayment: 1000000, dimension: 'year'},
        { rentalName: 'Lia', rentalArea: 3000, rentalPayment: 1000000, dimension: 'month'},
      ],
    };
    this.dataDisplayed = null;
  }
  sorting = (a, b) => {
    const columnIndex = this.state.sortColumnIndex;
    if (columnIndex > -1 && columnIndex < colDef.length - 1) {
      const key = colDef[columnIndex];
      const A = (typeof a[key] === 'number') ? a[key] : a[key].toLowerCase();
      const B = (typeof a[key] === 'number') ? a[key] : b[key].toLowerCase();
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
    }
    return 0;
  }
  _onModal = () => {
    if(!this.state.modalDialog) {
      this.setState({ modalDialog: true });
    }
  }
  _closeModal = () => {
    this.setState({ modalDialog: false });
  }
  _onHandleSubmit = (row) => {
    const { rentalName, rentalArea, rentalPayment, dimension } = row;
    if (this.state.data.findIndex(d =>
        d.rentalName === rentalName && d.rentalArea === rentalArea && d.rentalPayment === rentalPayment) === -1) {
      const newData = this.state.data.slice();
      newData.push({ rentalName, rentalArea, rentalPayment, dimension });
      this.setState({ data: newData });
      return 1;
    }
    return 0;
  }
  _onHandleInput = (value) => {
    this.setState({ inputValue: value });
  }
  _onHandleInputTable = (val, rowIndex, columnKey) => {
    let column = {};
    const { data } = this.state;
    column[columnKey] = val;
    
    const updatedData = update(data[rowIndex], { $merge: column });
    const newData = update(data, {
      $splice: [[rowIndex, 1, updatedData]]
    });
    this.setState({ data: newData });
  }
  _getColumnIndex = (col) => {
    if (col > 0  && col < colDef.length - 1 && col !== this.state.sortColumnIndex) {
      this.setState({ sortColumnIndex: col });
    }
  }
  _onRowDelete = (rowIndex) => {
    console.log('_onRowDelete', rowIndex);
    if (this.dataDisplayed !== null) {
      console.log(this.dataDisplayed);
      const { rentalName, rentalArea, rentalPayment, dimension } = this.dataDisplayed[rowIndex];
      const index = this.state.data.findIndex(d =>
        d.rentalName === rentalName && d.rentalArea === rentalArea && d.rentalPayment === rentalPayment&&
        d.dimension === dimension);
      const arr = this.state.data.slice();
      const head = arr.slice(0, index);
      const tail = arr.slice(index + 1);
      const newData = head.concat(tail);
      this.setState({ data: newData });
    }
  }
  render() {
    const { data, inputValue } = this.state;
    this.dataDisplayed = data.slice();
    return (
      <div>
        <div className={'container row'}>
          <div className={'splitPaneLeft'}>
            <LeftPane
              inputValue={inputValue}
              tableData={this.dataDisplayed}
              onHandleInput={this._onHandleInput}
              getColumnIndex={this._getColumnIndex}
              onRowDelete={this._onRowDelete}
              onChange={this._onHandleInputTable}
              onModal={this._onModal} 
            />
          </div>
          }
          <div className='splitPaneRight'>
            <RightPane 
              onHandleSubmit={this._onHandleSubmit}
              closeModal={this._closeModal}
            />
          </div>
        </div>
      </div>
    );
  }
}
const app = window.document.getElementById('app');
render(<App />, app);




