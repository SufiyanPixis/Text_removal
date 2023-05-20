import React, { useState } from 'react';
import './Headers.css';
import {
  Container,
  Navbar,  
  NavbarBrand,
} from 'reactstrap';

function Headers() { 

  return (
    <div>
      <Navbar id='my-navbar'>
        <Container>
          <div className="d-flex align-items-center">
            <NavbarBrand href = "/">
              <img  
                
                alt="logo"
                src="https://pixis.ai/wp-content/uploads/2023/02/logo.svg"
                style={{
                  position: 'absolute',
                  left: '3%',
                  transform: 'translateX(-50%)', 
                  right: '1%',
                  transform: 'translateY(-45%)',
                  width: 120 
                }}  
              />
            </NavbarBrand>
            <span className="App-Heading">Text Removal app</span>
          </div>
        </Container>
      </Navbar>
    </div>
  );
  
}

export default Headers;