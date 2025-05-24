import React from 'react';

const HeaderComponent = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <div>
          <a href='http://localhost:3000' className='navbar-brand'>
            Todo Management
          </a>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;
