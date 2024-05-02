import React, { useState } from 'react'

const Seat = ({ id, onClick }) => {
    const [isBooked, setIsBooked] = useState(false);

    const handleClick = () => {
        setIsBooked(!isBooked);
        onClick(id, !isBooked);
    };

    return (
        <div
            className={`seat ${isBooked ? 'bg-red-500' : 'bg-green-500'} hover:bg-gray-400 cursor-pointer flex rounded-md flex-row m-2 px-2`} 
            onClick={handleClick}
        >
            {id}
        </div>
    );
};

export default Seat;