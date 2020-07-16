import React, { Component } from 'react';
import DropZoneImg from './DropZoneImg';
import Select from 'react-select';
import MaskedInput from 'react-maskedinput'

const optionsDimension = [
  { value: 'month', label: 'в мес.' },
  { value: 'year', label: 'в год' },
  { value: 'metermonth', label: 'кв.м в мес' },
  { value: 'meteryear', label: 'кв.м в год' },
];

const optionsInOut = [
  { value: 'in', label: 'Включены' },
  { value: 'out', label: 'Не включены' },
]; 

function Input(props) {
  return (
    <div style = {{color:'#8B909E', fontWeight:'bold'}}>
      <label>{props.placeholder}</label>
      <input
        {...props}
        type={ props.type || 'text' }
        className={'searchLocation'}
      />
    </div>
  );
}
export default class RightPane extends Component {
  constructor() {
    super();
    this.state = {
      rentalName: '',
      rentalArea: '',
      rentalPayment: '',
      dimension: 'month',
    };
  }
  _onSubmit = (e) => {
    e.preventDefault();
    const { rentalName, rentalArea, rentalPayment, dimension} = this.state;
    if (this.props.onHandleSubmit({ rentalName, rentalArea, rentalPayment, dimension})) {
      this.props.closeModal();
    }
  }
  _onChange(e) {
    const { name, value } = e.target;
    const stateChange = {};
    stateChange[name] = value;
    this.setState(stateChange);
  }
  onChangeSelect = (val, name) => {
    let setState = {};
    setState[name] = null;
    if(val) {
      setState[name] = val.value;
      this.setState(setState);
    } 
  }
  render() {
    const { rentalName, rentalArea, rentalPayment, dimension } = this.state;
    const func = (e) => { this._onChange(e); };
    return (
      <div
        className = {''}
      > 
         <div className = 'pam'>
          <div className={'boxBasic pal'}>
            <span>
              <h4 style = {{float:'left'}} className='man pan'>Добавить Арендатора</h4>
              <button 
                className = {'pointer h4'} 
                onClick={this.props.closeModal} 
                style = {{float: 'right', border: 'none', background: 'transparent', color: '#ccc' }}>X
              </button>
              <div style = {{clear:'both'}}></div>
            </span>
            <hr style = {{color:'#8B909E'}} />
            <div className='row mtl'>
              <div>
                <Input name={'rentalName'} value={rentalName} onChange={func} placeholder={'Наименование Арендатора'} />
              </div>
              <div>
                <Input name={'rentalArea'} value={rentalArea} onChange={func} placeholder={'Площадь(кв.м)'} type='number'/>
              </div>
            </div>
            <div>
              <div>
                <Input name={'rentalPayment'} value={rentalPayment} onChange={func} placeholder={'Стоимость Аренды'} type='number' />
              </div>
              <div>
                <span style = {{color:'#8B909E',fontWeight:'bold'}}>Размерность</span>
                <Select 
                  name={'dimension'} 
                  claerable={false} 
                  searchable={false} 
                  value={dimension} 
                  options={optionsDimension} 
                  onChange={(value) => this.onChangeSelect(value, 'dimension')} 
                  placeholder={'Размерность'} 
                />
              </div>  
            </div>
            <br />
            <DropZoneImg />
            <br />
            <button
              className={'mts searchLocation typeReversed borderRadius backgroundBright'}
              type={'button'}
              onClick={this._onSubmit}
            >
              <span style = {{fontWeight: 'bold'}}>Submit</span>
            </button>
          </div>
        </div>
      </div>

    );
  }
}
