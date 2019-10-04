import React, { useState } from 'react';

import api from '../../services/api';

const Login = ({ history }) => {

  const [ email, setEmail ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post('/sessions', { email });
    const user_id = response.data.user._id;
    localStorage.setItem('UserID', user_id);

    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereca <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input type="email" 
                id="email" 
                placeholder="Seu melhor email"
                onChange={ e => setEmail(e.target.value) }
        />
        <button type="submit" className="btn">Entrar</button>
      </form>
    </>
  )
};

export default Login;