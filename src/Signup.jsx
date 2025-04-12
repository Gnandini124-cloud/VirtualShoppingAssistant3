import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Shop.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    axios.post('http://localhost:3001/register', { name, email, password })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage(response.data.message); 
        setTimeout(() => navigate('/login'), 2000); 
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name</strong></label>
            <input type="text" placeholder="Enter Name" autoComplete="off" name="name" className="form-control rounded-0" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder="Enter Password" autoComplete="off" name="password" className="form-control rounded-0" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
        </form>
        <p>Already Have an Account?</p>
        <Link to='/login' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
      </div>
    </div>
  );
}

export default Signup;