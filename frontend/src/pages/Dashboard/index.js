import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

const Dashboard = () => {
  const [ spots, setSpots ] = useState([]);

  useEffect(() => {

    const loadUserSpots = async() => {
      const user_id = localStorage.getItem('UserID');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });
      setSpots( response.data );
    }    

    loadUserSpots();
  }, []);

  const renderSpot = spot => (
    <li key={spot._id}>
      <header className="thumbnail" style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
      <strong>{spot.company}</strong>
      <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
    </li>
  );

  return (
    <>
      <ul className="spot-list">

        {  
          spots.map(spot => renderSpot(spot))
        }

      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
};

export default Dashboard;