import React from 'react';
import './welcome.css';
const Welcome = () => {
  return (
    <div className='main'>
      <div className='text'>
        <h1>Welcome to LogsCart Review</h1>
        <h3>Review our services and give us your valuable feedback</h3>
        <div className='sign-btn'>
          <a href="/login" className='green'>LOGIN</a>
          <a href='/register' className='blue'>REGISTER</a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
