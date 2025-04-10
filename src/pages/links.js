import React, { useState, useEffect } from 'react';
import { Head, Loading, NavForPages } from '../components';
import aboutImg from '../images/about/about-img.PNG';

const Links = () => {
  const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
  const AIRTABLE_URL = process.env.REACT_APP_RESOURCES_AIRTABLE_URL;

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      const res = await fetch(AIRTABLE_URL, {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      });
      const data = await res.json();

      const sortedResources = data.records.sort(
          (a, b) => a.fields.order - b.fields.order
      );

      setResources(sortedResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
      <>
        <Head
            title={'Jackie - Software Developer'}
            description={'Jackie - Software Developer'}
            image={'/covers/resources.png'}
        />

        <div className="page links-page">
          <NavForPages />

          <section className="section">
            <article className="links-info">
              <div className="links-page-img">
                <img src={aboutImg} alt="Jackie" className="links-page-image" />
              </div>
              <h4>Jackie</h4>
              <p>@jackie</p>
            </article>

            <article className="section-center links-page-center">
              <h4>Developer | Freelancer</h4>

              {loading ? (
                  <Loading />
              ) : (
                  <>
                    {resources.map(({ id, fields }) => {
                      const {
                        title,
                        iconUrl,
                        text,
                        url,
                        isLatest,
                        hideField,
                      } = fields;

                      return (
                          <a
                              href={url}
                              className={`
                        btn links-page-btn 
                        ${isLatest ? 'latest-link' : ''}
                        ${hideField ? 'hide-link' : ''}
                      `}
                              title={title}
                              key={id}
                              target="_blank"
                              rel="noreferrer"
                          >
                            {text}
                            <img src={iconUrl} alt="icon" />
                          </a>
                      );
                    })}
                  </>
              )}
            </article>
          </section>
        </div>
      </>
  );
};

export default Links;
