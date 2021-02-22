import React from 'react';

const TodayDate = () => {

    const date = new Date();
    const formatDate = (date.getDate() < 10 ? 0 : "") + date.getDate() + "/" + (date.getMonth() + 1 < 10 ? 0 : "") + (date.getMonth() + 1);

    return (
        <div className="my-4">
            Date d'aujourd'hui : <strong>{formatDate}</strong>     
        </div>
    )
    
}

export default TodayDate;