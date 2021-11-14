import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    async function handleLogin(e) {

        e.preventDefault();

        try{
            const response = await api.post('/login', {email,password})
            localStorage.setItem('token', response.data.token);

            navigate('/schedules') 
        }catch (err) {
            alert('Falha no login, tente novamente')
        }
    }

    return (
        <div className="container text-center">
            <form className="form-signin" onSubmit={handleLogin}>
                <h2>Ahfeed</h2>
                <h4>Cerimônias inteligentes</h4>
                <label htmlFor="inputEmail" className="sr-only">Email</label>
                <input 
                    type="email" 
                    id="inputEmail" 
                    className="form-control my-2" 
                    placeholder="Email" 
                    required autoFocus 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                />
                <label htmlFor="inputPassword" className="sr-only">Senha</label>
                <input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control" 
                    placeholder="Senha" required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                />
                <div className="checkbox mb-3">
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
                <p className="mt-5 mb-3 text-muted">&copy; Ahfeed-2021</p>
            </form>
        </div>
    ); 

}

export default Login;
