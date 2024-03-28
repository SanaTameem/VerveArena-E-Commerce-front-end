import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <FontAwesomeIcon
        className="hamburger"
        icon={faBars}
        style={{ color: '#ffffff' }}
        onClick={toggleSidebar}
      />
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">Clothing</li>
            <li className="nav-item">Footwear</li>
            <li className="nav-item">Bags</li>
            <li className="nav-item">Accessories</li>
            <li className="nav-item">Mobile Accessories</li>
            <li className="nav-item">Skin Care</li>
            <li className="nav-item">Beauty</li>
            <li className="nav-item">Fragnance</li>
            <li className="nav-item">Gifting </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
