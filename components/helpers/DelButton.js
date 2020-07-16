import React from 'react';

export function Close(props) {
  return (
    <button
      className={'backgroundGrey'}
      style={{ width: '100%', height: '100%' }}
    >
      {props.value}
    </button>
  );
}
