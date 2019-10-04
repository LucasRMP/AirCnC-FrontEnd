import React, { useState, useMemo } from 'react';

import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

const New = ({ history }) => {

  const [ thumbnail, setThumbnail] = useState(null);
  const [ company, setCompany ] = useState('');
  const [ techs, setTechs ]     = useState('');
  const [ price, setPrice ]     = useState('');

  const preview = useMemo(() => thumbnail ? URL.createObjectURL(thumbnail) : null, [thumbnail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('UserID');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, { 
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>

      <label 
        id="thumbnail-input" 
        style={{ backgroundImage: `url(${preview})`}}
        className={ thumbnail ? "has-thumbnail" : "" }
      >
        <input type="file" onChange={ e => setThumbnail(e.target.files[0]) } />
        <img src={camera} alt="Select img"/>
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input 
        id="company"
        type="text"
        placeholder="Sua impresa"
        value={company}
        onChange={ (e) => setCompany(e.target.value) }
      />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgula)</span></label>
      <input 
        id="techs"
        type="text"
        placeholder="Tecnologia que usam"
        value={techs}
        onChange={ (e) => setTechs(e.target.value) }
      />

      <label htmlFor="price">VALOR DA DIARIA * <span>(em branco para gratuito)</span></label>
      <input 
        id="price"
        type="text"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={ (e) => setPrice(e.target.value) }
      />

      <button type="submit" className="btn">Cadastrar novo spot</button>

    </form>
  )
};

export default New;