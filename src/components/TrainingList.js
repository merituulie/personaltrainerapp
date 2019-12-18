import React, { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import MaterialTable from 'material-table';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CustomerTrainingList() {
        const [trainings, setTrainings] = useState([]);

        useEffect(() => {
            fetchTrainingData();
        }, []);

        const fetchTrainingData = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(responseTwo => responseTwo.json())
            .then(dataTwo => setTrainings(dataTwo))
        }

        const deleteTraining = (id) => {
            const link = 'https://customerrest.herokuapp.com/api/trainings/' + id;
            console.log(link);
            if (window.confirm('Are you sure you want to delete this training?')) {
                fetch(link, {method:'DELETE'})
                .then(respTwo => fetchTrainingData())
                .catch(error => console.error(error))
            }
        }

        const columnsTwo = [
            {
                title: 'Delete',
                render: rowData => <DeleteIcon onClick={() => deleteTraining(rowData.id)}></DeleteIcon>
                
            },           {
                title: 'Date',
                field: 'date',
                render: rowdate => <Moment format="DD/MM/YYYY">{rowdate.date}</Moment>
            },            {
                title: 'Duration',
                field: 'duration'
            },            {
                title: 'Activity',
                field: 'activity'
            },          {
                title: 'Customer',
                field: 'customer.firstname'
            },          {
                title: '',
                field: 'customer.lastname'
            }
        ]

        return (
            <div>
                <MaterialTable
                title='Trainings'
                defaultPageSize={10}
                filterable={true}
                data={trainings}
                columns={columnsTwo} />
            </div>
        );
}