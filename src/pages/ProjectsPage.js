import React, {useEffect, useState} from 'react';
import {Head, Loading, NavForPages, SingleProject} from '../components';

const ProjectsPage = () => {
    const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
    const AIRTABLE_URL = process.env.REACT_APP_PRODUCTS_AIRTABLE_URL;

    const [allProjects, setAllProjects] = useState([]);
    const [categories, setCategories] = useState([]);
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

            const allStacks = sortedProjects.flatMap((p) => p.fields.stack);
            const uniqueStacks = ['all', ...new Set(allStacks)];

            setAllProjects(sortedProjects);
            setProjects(sortedProjects);
            setCategories(uniqueStacks);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const updateFilterBtns = (e) => {
        document.querySelectorAll('.category-btn').forEach((btn) => {
            btn.classList.add('unactive');
        });
        e.target.classList.remove('unactive');
        e.target.classList.add('active');
    };

    const filterProjects = (stack, e) => {
        updateFilterBtns(e);
        if (stack === 'all') {
            setProjects(allProjects);
        } else {
            const filtered = allProjects.filter((project) =>
                project.fields.stack.includes(stack)
            );
            setProjects(filtered);
        }
    };

    return (
        <>
            <Head
                title="Jackie - Software Developer"
                description="Collection of my favorite projects built with Spring Boot, React, Redis, and more."
                image="/covers/projects.png"
            />
            <section className="page">
                <NavForPages/>
                <div className="page-center projects-page">
                    <div className="section-title page-title">
                        <h2>
                            my <span>projects</span>
                        </h2>
                        <div className="underline"></div>
                        <p>
                            Here are some of my highlighted projects. Check out all of them on{' '}
                            <a href="https://github.com/nhatcoi">GitHub</a>.
                        </p>
                    </div>

                    <div className="section-center projects-page-center">
                        {loading ? (
                            <Loading/>
                        ) : (
                            <>
                                <Categories categories={categories} filterProjects={filterProjects}/>
                                <Projects projects={projects}/>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

// Category Btns Component
const Categories = ({categories, filterProjects}) => {
    return (
        <div className="category-btn-container">
            {categories.map((category, index) => (
                <button
                    key={index}
                    className={`category-btn btn ${index === 0 ? 'active' : 'unactive'}`}
                    onClick={(e) => filterProjects(category, e)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

// Projects Component
const Projects = ({projects}) => {
    return (
        <div className="projects-container">
            {projects.map((project) => (
                <SingleProject
                    key={project.id}
                    id={project.fields.id}
                    title={project.fields.title}
                    stack={project.fields.stack}
                    imgUrl={project.fields.imgUrl}
                    url={project.fields.url}
                    github={project.fields.github}
                />
            ))}
        </div>
    );
};

export default ProjectsPage;
