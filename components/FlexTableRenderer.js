import React, { Component, PureComponent} from 'react';
import { Cell } from 'fixed-data-table';

const K_KEY_COLUMN_RENTAL_NAME = 'rentalName';
const K_KEY_COLUMN_RENTAL_AREA = 'rentalArea';
const K_KEY_COLUMN_RENTAL_PAYMENT = 'rentalPayment';
const K_KEY_COLUMN_DIMENSION = 'dimension';
const K_KEY_COLUMN_CLOSE = 'close';

function renderHeader(header) {
  return (
    <Cell>
      {header}
    </Cell>
  );
}

const columns = [
  {
    columnKey: K_KEY_COLUMN_RENTAL_NAME,
    header: renderHeader('Арендатор'),
  },
  {
    columnKey: K_KEY_COLUMN_RENTAL_AREA,
    header: renderHeader('Арендуемая площадь'),
  },
  {
    columnKey: K_KEY_COLUMN_RENTAL_PAYMENT,
    header: renderHeader('Ставка аренды'),
  },
  {
    columnKey: K_KEY_COLUMN_DIMENSION,
    header: renderHeader('Размерность'),
  },
  {
    columnKey: K_KEY_COLUMN_CLOSE,
    header: renderHeader('DEL'),
  },
];

function RenderColumnInput(props) {
  const {cellData, onChange} = props;
  return (
    <input
      type={'text'}
      className={'plm'}
      style={{ width: '100%', height: '100%', fontWeight: 'bold', border: 'none', background: 'transparent' }}
      value={cellData}
      onChange={onChange}
    />
  );
}
function RenderColumnInputNumber(props) {
  const {cellData, onChange} = props;
  return (
    <input
      type={'number'}
      className={'plm'}
      style={{ width: '100%', height: '100%', fontWeight: 'bold', border: 'none', background: 'transparent' }}
      value={cellData}
      onChange={onChange}
    />
  );
}


function RenderColumnClose(props) {
  const {cellData} = props;
  return (
    <button
      className={'backgroundGrey'}
      style={{ width: '100%', height: '100%', color: '#ff4500', border: 'none' }}
    >
      {cellData}
    </button>
  );
}

export { columns };

export function cellRenderer(columnKey, cellData, onChange) {
  const props = {columnKey, cellData, onChange };
  switch (columnKey) {
    case K_KEY_COLUMN_RENTAL_NAME:
    case K_KEY_COLUMN_DIMENSION:
      return <RenderColumnInput {...props} />;
    case K_KEY_COLUMN_RENTAL_AREA:
    case K_KEY_COLUMN_RENTAL_PAYMENT:
      return <RenderColumnInputNumber {...props} />;
    case K_KEY_COLUMN_CLOSE:
      return <RenderColumnClose {...props} />;
    default:
      return (
        <div>{ cellData ? 'Hello world!' : '' }</div>
      );
  }
}