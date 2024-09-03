import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModerationPage = () => {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/actions/?status=pending');
                setActions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching actions:', error);
                setLoading(false);
            }
        };

        fetchActions();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.post(`http://localhost:8000/api/actions/${id}/approve/`);
            setActions(actions.filter(action => action.id !== id));
            console.log(`Action with id ${id} approved`);
        } catch (error) {
            console.error('Error approving action:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:8000/api/actions/${id}/reject/`);
            setActions(actions.filter(action => action.id !== id));
            console.log(`Action with id ${id} rejected`);
        } catch (error) {
            console.error('Error rejecting action:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Moderation Page</h1>
            <ul>
                {actions.map(action => (
                    <li key={action.id}>
                        {action.description} {/* Предполагается, что у действия есть описание */}
                        <button onClick={() => handleApprove(action.id)}>Approve</button>
                        <button onClick={() => handleReject(action.id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModerationPage;
