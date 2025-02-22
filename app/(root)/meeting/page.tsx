import React from 'react';

const MeetingPage: React.FC<{ params: { id: string } }> = ({ params }) => {
    return (
        <div>
            Meeting Room : #{params.id}
        </div>
    );
};

export default MeetingPage;