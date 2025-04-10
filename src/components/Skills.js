import React, { useState, useEffect } from 'react';

export const Skills = () => {
    const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
    const AIRTABLE_URL = process.env.REACT_APP_SKILLS_AIRTABLE_URL;

    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSkills = async () => {
        try {
            const res = await fetch(AIRTABLE_URL, {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            const data = await res.json();

            const sortedSkills = data.records
                .filter((record) => record.fields?.title && record.fields?.icon?.[0]?.url)
                .sort((a, b) => a.fields.id - b.fields.id);

            setSkills(sortedSkills);
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <>
            <div className="skills-title-container">
                <h3 className="skills-title">MY STACK</h3>
                <div className="skills-line"></div>
            </div>

            <div className="skills-center">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    skills.map((skill) => {
                        const { id, title, icon } = skill.fields;
                        const imageUrl = icon?.[0]?.url;

                        return (
                            <article key={skill.id} className="skill" title={title}>
                                <img src={imageUrl} alt={title} className="skill-icon" />
                            </article>
                        );
                    })
                )}
            </div>
        </>
    );
};
