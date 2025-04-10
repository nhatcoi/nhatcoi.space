import React from 'react';
import aboutImg from '../images/about/about-img.PNG';
import { Skills } from './Skills';

export const About = () => {
  // const [age, setAge] = React.useState(20);
  //
  // React.useEffect(() => {
  //   setAge(
  //     Math.floor((new Date() - new Date('200').getTime()) / 3.15576e10)
  //   );
  // }, []);
  //
  return (
    <section id="about" className="section about">
      <div className="section-title">
        <h2>
          <span>about</span> me
        </h2>
        <div className="underline"></div>
      </div>

      <div className="section-center about-center">
        {/* about-img  */}
        <article>
          <div className="about-img">
            <img
              src={aboutImg}
              alt="Jackie"
              className="about-image"
              loading="lazy"
            />
          </div>
        </article>

        <article className="about-info">
          <p>
            {/* text */}
            I'm <strong>Nhat Nguyen </strong> aka Jackie, a <span>{20}</span> year old
            , a Software Engineer with a deep passion for full stack development.
            I mostly work with <strong>Java</strong>, <strong>Spring Boot</strong>,
            and I'm also getting comfortable with modern frontend tools like
            with <strong>Reactjs</strong>, <strong>Angular</strong>.{' '}
            <br />
            <br />
            Occasionally, I work as a <strong>
              Freelance Web Developer
            </strong>{' '}
            where I deliver highly optimized websites to my clients and help
            them scale their businesses digitally. I also run a&nbsp;&nbsp;
            <a
              href="https://youtube.com/@nhatcoi037"
              target="_blank"
              rel="noreferrer"
              title="Nhat Coi - My YouTube Channel"
            >
              YouTube channel
            </a>
            &nbsp; where I frequently post dev-related content.
            <br />
            <br />
            When I’m not coding, I enjoy going on trips and outdoor adventures with my close friends&nbsp;&nbsp;
            <a
                href="https://www.tiktok.com/@oggeeeeee_?lang=vi-VN"
                target="_blank"
                rel="noreferrer"
                title="OggyTeam - My Team"
            >
              OggyTeam
            </a>.
            These moments recharge my energy and inspire me to build with even more creativity.
          </p>

          {/* stack */}
          <Skills />
        </article>
      </div>
    </section>
  );
};
