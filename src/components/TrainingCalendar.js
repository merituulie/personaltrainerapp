import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function TrainingCalendar() {
    const [eventsList, setEventsList] = useState([]);

    useEffect(() => {
        fetchTrainingData();
    }, []);

    const fetchTrainingData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setEventsList(data.links))
    }

    const views = [
        {
            headers: {
                center: 'timeGridDay, dayGridWeek, dayGridMonth'
            },
            views: {
                timeGridDay: {
                    type: 'imeGridDay'
                },
                dayGridweek: {
                    type: 'dayGridWeek'
                },
                dayGridMonth: {
                    type: 'dayGridMonth'
                }
            }
        }
    ];

    return(
        <div>
            <FullCalendar views={views} defaultView="dayGridMonth" plugins={[ dayGridPlugin, timeGridPlugin ]} events={[ eventsList ]} />
        </div>
    );
}