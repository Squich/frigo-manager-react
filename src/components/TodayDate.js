import React from 'react';

const TodayDate = () => {
    
    const date = new Date();
    const dayNum = date.getDate();
    const dayName = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"][date.getDay()];
    const monthName = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"][date.getMonth()];
    const formatDate =  `${dayName}. ${dayNum} ${monthName}`;

    return (
        <span>
            {formatDate}    
        </span>
    )
    
}

export default TodayDate;