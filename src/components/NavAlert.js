import React from 'react';
import { Link } from 'react-router-dom';

export const NavAlert = () => {
  return (
    <section className="nav-alert">
      <span>
        🚀 Seeking a FullStack Developer? Check out{' '}
          <Link to="/links">my resume</Link> and recent projects! 🚀
      </span>
      <br />
      <span>
        💡 Do you want to build a website or work on a project? <Link to="/contact">Contact me</Link>.
      </span>
    </section>
  );
};
