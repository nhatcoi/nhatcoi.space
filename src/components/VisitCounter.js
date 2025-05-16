import React, { useState, useEffect } from 'react';

const VisitCounter = () => {
    const [visitCount, setVisitCount] = useState(0);
    const [recordId, setRecordId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
    const AIRTABLE_URL = process.env.REACT_APP_VISITOR_AIRTABLE_URL;

    const fetchCurrentCounter = async () => {
        try {
            const res = await fetch(AIRTABLE_URL, {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            const data = await res.json();
            const record = data.records[0];
            return {
                recordId: record.id,
                currentCount: record.fields.counter
            };
        } catch (error) {
            console.error("Error fetching visitor counter:", error);
            throw error;
        }
    };

    const updateCounter = async (recordId, newCount) => {
        try {
            const updateRes = await fetch(`${AIRTABLE_URL}/${recordId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fields: {
                        counter: newCount,
                    },
                }),
            });
            const updatedData = await updateRes.json();
            return updatedData.fields.counter;
        } catch (error) {
            console.error("Error updating visitor counter:", error);
            throw error;
        }
    };

    const fetchAndUpdateCounter = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const { recordId, currentCount } = await fetchCurrentCounter();

            const newCount = Number(currentCount) + 1;
            const updatedCount = await updateCounter(recordId, newCount);

            setVisitCount(updatedCount);
            setRecordId(recordId);
        } catch (error) {
            console.error("Error in fetchAndUpdateCounter:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAndUpdateCounter();

        const intervalId = setInterval(() => {
            fetchCurrentCounter().then(({ currentCount }) => {
                setVisitCount(currentCount);
            }).catch(error => {
                console.error("Error in periodic fetch:", error);
            });
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="visit-counter">
            <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Visitors: {visitCount}
                {isLoading && <span> (Updating...)</span>}
            </p>
        </div>
    );
};

export default VisitCounter;