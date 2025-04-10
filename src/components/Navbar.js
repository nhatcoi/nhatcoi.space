import React from 'react';
import NavLinks from './NavLinks';
import ToggleTheme from './ToggleTheme';
import Logo from './Logo';
import { FaBars } from 'react-icons/fa';
import { AppContext } from '../context';

export const Navbar = () => {
  const { scrolled, openSidebar } = React.useContext(AppContext);

  return (
    <nav className={`${scrolled ? 'nav-fixed' : ''}`}>
      <div className="nav-center">
        {/* nav-header */}
        <div className="nav-header">
          <Logo />
          <button className="nav-btn" onClick={openSidebar} aria-label="menu">
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <NavLinks />
        </ul>
        <ToggleTheme />
      </div>
    </nav>
  );
};
