import React from 'react';
import { Head, NavForPages } from '../components';
import { FaArrowRight } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <>
      <Head
        title={'Jackie - Software Developer'}
        description={`Please find my contact details below. Find me on any of the socials mentioned or send me a direct message via the form below. Alternatively, you can also send me an email and I'll get back to you within 24 hours.`}
      />

      <section className="page">
        {/* navbar */}
        <NavForPages />

        <div className="page-center contact-page">
          {/* title */}
          <div className="section-title page-title">
            <h2>
              <span>contact</span> me
            </h2>
            <div className="underline"></div>
            <p>
              If you'd like to work with me, please fill out the form below — I’ll get back to you within 24 hours.
              <br />
              Alternatively, feel free to email me at{' '}
              <a href="mailto:jackie04.work@outlook.com" title="Email Me">
                jackie04.work@outlook.com
              </a>
            </p>
          </div>

          {/* form */}
          <div className="section-center">
            <form
              className="form"
              action="https://formspree.io/f/xjkyjyrr"
              method="POST"
            >
              <div className="form-center">
                {/* name  */}
                <article>
                  <label htmlFor="name">name</label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    name="Name"
                    placeholder="Name"
                    required
                  />
                </article>
                {/* email */}
                <article>
                  <label htmlFor="email">e-mail</label>
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    name="Email"
                    placeholder="example@mail.com"
                    required
                  />
                </article>
                {/* text area */}
                <article>
                  <label htmlFor="message">how can I help?</label>
                  <br />
                  <textarea
                    name="Message"
                    className="form-control"
                    placeholder="We’re a small startup, and we’re working on something great. Our website is coming soon — stay tuned!"
                    rows="8"
                    required
                  ></textarea>
                </article>
              </div>
              <div className="btn-container">
                <button className="btn submit-btn" type="submit">
                  submit <FaArrowRight className="fa" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
