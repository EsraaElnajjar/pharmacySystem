import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../Login/Login.css';
import 'bootstrap/dist/css/bootstrap.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/auth/login', {
        email,
        password
      });
      console.log('Login successful:', response);
      localStorage.setItem('userName', response.data.name);
      alert('Login successfully');
      navigate('/Home', { state: { userName: response.data.name } });
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to log in. Please try again.');
    }
  };
  

  return (
    <div className="container">
      <div className="card">
        <div className="card-image">	
        </div>
        <form className="card-form" onSubmit={handleSubmit}>
			
				<h3 className='tit'>تسجيل الدخول للصيدلية المركزية</h3>
			
          <div className="input">
            <input 
              type="text" 
              className="input-field" 
              placeholder="البريد الالكترونى" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <input 
              type="password" 
              className="input-field" 
              placeholder="كلمة المرور" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="action">
            <button type="submit" className="action-button">تسجيل الدخول</button>
          </div>
        </form>
        
      </div>
    </div>
  );
}

export default Login;
