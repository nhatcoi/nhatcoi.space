import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaGithub,
    FaShareSquare,
    FaAngleDown,
    FaAngleUp,
} from 'react-icons/fa';
import { Loading } from '.';


export const Projects = () => {
    const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
    const AIRTABLE_URL = process.env.REACT_APP_FEATURE_PRODUCTS_AIRTABLE_URL;


    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await fetch(AIRTABLE_URL, {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            const data = await res.json();
            const sortedProjects = data.records.sort((a, b) =>
                a.fields.title.localeCompare(b.fields.title)
            );
            console.log("sortedProjects", sortedProjects);
            setProjects(sortedProjects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // jsx
    return (
        <section className="section projects" id="projects">
            {/* title */}
            <div className="section-title">
                <h2>
                    latest <span>works</span>
                </h2>
                <div className="underline"></div>
            </div>

            {/* projects-center */}
            <div className="section-center projects-center">
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {projects.map((project) => (
                            <SingleProject
                                key={project.id}
                                {...project.fields}
                                recordId={project.id}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* all projects btn */}
            <div className="btn-container">
                <Link to="/projects" className="btn">
                    view more <FaShareSquare className="fa" />
                </Link>
            </div>
        </section>
    );
};

const SingleProject = ({
                           imgUrl,
                           title,
                           desc,
                           stack = [],
                           url,
                           github,
                           isClientWork = false,
                       }) => {
    const [showDesc, setShowDesc] = useState(false);

    // Clean up desc if needed (optional enhancement)
    const cleanDesc = desc?.startsWith("desc: ")
        ? desc.replace(/^desc:\s*['"]?/, "").replace(/['"]?,$/, "")
        : desc;

    return (
        <article className="project">
            {/* image */}
            <div className="project-img">
                <img
                    src={imgUrl}
                    alt={title}
                    className="project-image"
                    loading="lazy"
                />
            </div>
            <div className="project-details">
                {/* info */}
                <div className="project-info">
                    <h3 className="project-title">{title}</h3>

                    <button
                        className="project-text-toggle"
                        onClick={() => setShowDesc(!showDesc)}
                    >
                        Description{' '}
                        {showDesc ? (
                            <FaAngleUp className="fa" />
                        ) : (
                            <FaAngleDown className="fa" />
                        )}
                    </button>

                    <p className={`project-text ${showDesc ? 'show-project-text' : ''}`}>
                        {cleanDesc}
                    </p>

                    <div className="project-tools">
                        {stack.map((item, index) => (
                            <span key={index}>{item}</span>
                        ))}
                    </div>
                </div>

                {/* footer */}
                <div className="project-footer">
                    <a href={url} target="_blank" rel="noreferrer" title="Live Site">
                        <strong>
                            <FaShareSquare className="fa" /> <span>live site</span>
                        </strong>
                    </a>
                    {!isClientWork && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noreferrer"
                            title="GitHub Code"
                        >
                            <FaGithub className="fa" /> <span>source code</span>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};
