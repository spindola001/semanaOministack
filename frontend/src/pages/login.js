import React, { useState } from 'react';
import './login.css';

import api from '../services/api';

import Logo from '../assets/logo.svg';

export default function Login({ history }){
    const [username, setUsername] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs', {
            username,
        }); 

        const { _id } = response.data;

        console.log(response);

        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={Logo} alt="TinDev"/>
                <input 
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">ENVIAR</button>
            </form>
        </div>
    );
}