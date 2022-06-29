import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { citysInterface } from '../../../interface/citysInterface';

interface Props {
  item: citysInterface;
  onUpdate: (item: citysInterface) => void;
}

export function InputGroupComponent({ item, onUpdate }: Props) {
  const [cityName, setCity] = useState(item.cityName);
  const [state, setState] = useState(item.state);

  useEffect(() => {
    onUpdate({ ...item, cityName, state });
  }, [cityName, state]);

  return (
    <Row key={item.id} className={"justify-content-between my-2"}>
      <div className='form-group col-md-6 col-12 '>
        <label htmlFor='city'>Cidade</label>
        <input
          type='text'
          id='city'
          value={cityName}
          onChange={e => setCity(e.target.value)}
          placeholder='Coloque nome da cidade'
          className='form-control'
        />
      </div>
      <div className='form-group col-md-6 col-12 mt-md-0 mt-3'>
        <label htmlFor='state'>Estado</label>
        <input
          type='text'
          id='state'
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder='Coloque nome da cidade'
          className='form-control'
        />
      </div>
    </Row>
  );
}