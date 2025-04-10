import React from 'react';
import { Link } from 'react-router-dom';

export const NavAlert = () => {
  return (
    <section className="nav-alert">
      <span>
        🚀 Seeking a FullStack Developer? Check out{' '}
          <Link to="/links">my resume</Link> and recent projects! 🚀
      </span>
    </section>
  );
};
