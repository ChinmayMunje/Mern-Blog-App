import React, { useState } from 'react'
import Seat from './Seat';

const Seatbooking = () => {
    const [seats, setSeats] = useState(new Array(100).fill(false));

    const handleSeatClick = (id, isBooked) => {
        const updatedSeats = [...seats];
        updatedSeats[id] = isBooked;
        setSeats(updatedSeats);
    };

    const availableSeatsCount = seats.filter((isBooked) => !isBooked).length;
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Conference Hall Seat Booking</h1>
            <div className="flex flex-wrap">
                {seats.map((isBooked, index) => (
                    <Seat key={index} id={index} isBooked={isBooked} onClick={handleSeatClick} />
                ))}
            </div>
            <p className="mt-4">Available Seats: {availableSeatsCount}</p>
        </div>
    )
}

export default Seatbooking