import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Moment from 'react-moment';

export default function TrainingCalendar() {
    const [eventsList, setEventsList] = useState([]);

    useEffect(() => {
        fetchTrainingData();
    }, [])

    const fetchTrainingData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(responseTwo => responseTwo.json())
        .then(dataTwo => setEventsList(dataTwo))

        console.log([eventsList]);
    }

    return(
        <div>
            <Calendar
            events={[eventsList]}
            />
        </div>
    );
}