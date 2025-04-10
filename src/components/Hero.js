import React from 'react';
import heroImg from '../images/hero/hero-img.svg';
import { AppContext } from '../context';
import { FaCode, FaEnvelope } from 'react-icons/fa';

export const Hero = () => {
  // function from context
  const { smoothScroll } = React.useContext(AppContext);

  // jsx
  return (
    <header id="home">
      <div className="banner">
        <div className="banner-container section-center">
          {/* hero-info */}
          <article className="hero-info">
            <h1 id="my-name">
              hey,<span> i'm Jackie</span>
            </h1>
            <p>
              Full-Stack Web Developer Intern with a strong passion for building
              scalable and efficient web applications. I'm currently pursuing a
              degree in SE at PKA University. My long-term goal
              is to become a skilled Software Architect, designing robust and
              maintainable systems that solve real-world problems.
            </p>
            <div className="hero-btn-container">
              <a
                href="#projects"
                className="btn hero-btn"
                onClick={(e) => smoothScroll(e)}
                title="My Latest Works"
              >
                projects <FaCode className="fa" />
              </a>
              <a
                href="mailto:jackie04.work@outlook.com"
                className="btn hero-btn"
                title="Email Me Now"
              >
                contact <FaEnvelope className="fa" />
              </a>
            </div>
          </article>

          {/* hero-image */}
          <article className="hero-img">
            <img src={heroImg} alt="Hero" className="hero-image" />
          </article>
        </div>
      </div>
    </header>
  );
};
