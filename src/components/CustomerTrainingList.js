import React, { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import MaterialTable from 'material-table';
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CustomerTrainingList() {
        const [customers, setCustomers] = useState([]);
        const [trainings, setTrainings] = useState([]);

        useEffect(() => {
            fetchCustomerData();
            fetchTrainingData();
        }, []);

        const fetchCustomerData = () => {
            fetch('https://customerrest.herokuapp.com/api/customers')
            .then(responseOne => responseOne.json())
            .then(dataOne => setCustomers(dataOne.content))
        }

        const fetchTrainingData = () => {
            fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(responseTwo => responseTwo.json())
            .then(dataTwo => setTrainings(dataTwo.content))
        }

        const deleteCustomer = (linkC) => {
            console.log(linkC);
            if (window.confirm('Are you sure you want to delete this customer?')) {
                fetch(linkC, {method:'DELETE'})
                .then(respOne => fetchCustomerData())
                .then(fetchTrainingData())
                .catch(err => console.error(err))
            }
        }

        const deleteTraining = (link) => {
            if (window.confirm('Are you sure you want to delete this training?')) {
                fetch(link, {method:'DELETE'})
                .then(respTwo => fetchTrainingData())
                .catch(error => console.error(error))
            }
        }

        const columnsOne = [
            {
                field: 'links[0].href',
                title: 'Delete',
                render: row => <DeleteIcon onClick={() => deleteCustomer(row.value)}></DeleteIcon>
            },
            {
                title: 'Firstname',
                field: 'firstname'
            },            {
                title: 'Lastname',
                field: 'lastname'
            },            {
                title: 'Streetaddress',
                field: 'streetaddress'
            },            {
                title: 'Postcode',
                field: 'postcode'
            },            {
                title: 'City',
                field: 'city'
            },            {
                title: 'Email',
                field: 'email'
            },            {
                title: 'Phone',
                field: 'phone'
            }
        ]

        const columnsTwo = [
            {
                title: 'Delete',
                field: 'links[0].href',
                render: rowData => <DeleteIcon onClick={() => deleteTraining(rowData.value)}></DeleteIcon>
                
            },            {
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
            }
        ]

        return (
            <div>
                <MaterialTable
                 title="Customers"
                 defaultPageSize={5} 
                 filterable={true} 
                 data={customers} 
                 columns={columnsOne} />
                <MaterialTable
                 title="Trainings"
                 defaultPageSize={10}
                 filterable={true}
                 data={trainings}
                 columns={columnsTwo} />
            </div>
        );
}