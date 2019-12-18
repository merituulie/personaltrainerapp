import React, { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import MaterialTable from 'material-table';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';
import AddTraining from './AddTraining';

export default function CustomerTrainingList() {
        const [trainings, setTrainings] = useState([]);
        const [customer, setCustomer] = useState({
            firstname: '', lastname: '', streetaddress: '', postcode: '', phone: '', city: '', email: ''   
        });

        useEffect(() => {
            fetchTrainingData();
        }, []);

        const fetchTrainingData = () => {
            fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(responseTwo => responseTwo.json())
            .then(dataTwo => setTrainings(dataTwo.content))
        }

       const fetchCustomerName = (linkCustomer) => {
           console.log(linkCustomer)
            fetch(linkCustomer)
            .then(respCustomer => respCustomer.json())
            .then(data => setCustomer(data.content))
            .catch(error => console.error(error))
            console.log(customer);
            return <p>{customer.firstname}</p>
        }

        const deleteTraining = (link) => {
            if (window.confirm('Are you sure you want to delete this training?')) {
                fetch(link, {method:'DELETE'})
                .then(respTwo => fetchTrainingData())
                .catch(error => console.error(error))
            }
        }

        const columnsTwo = [
            {
                title: 'Delete',
                render: rowData => <DeleteIcon onClick={() => deleteTraining(rowData.links[0].href)}></DeleteIcon>
                
            },           {
                title: 'Date',
                field: 'date',
                render: rowdate => <Moment format="DD/MM/YYYY">{rowdate.date}</Moment>
            },            {
                width: 50,
                title: 'Duration',
                field: 'duration'
            },            {
                title: 'Activity',
                field: 'activity'
            },          {
                title: 'Customer',
                render: row => fetchCustomerName(row.links[2].href)
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