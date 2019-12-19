import React, { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from './Snackbar';

export default function CustomerTrainingList() {
        const [customers, setCustomers] = useState([]);

        useEffect(() => {
            fetchCustomerData();
        }, [])

        const fetchCustomerData = () => {
            fetch('https://customerrest.herokuapp.com/api/customers')
            .then(responseOne => responseOne.json())
            .then(dataOne => setCustomers(dataOne.content))
        }

        const deleteCustomer = (linkC) => {
            if (window.confirm('Are you sure you want to delete this customer?')) {
                fetch(linkC, {method:'DELETE'})
                .then(respOne => fetchCustomerData())
                .catch(err => console.error(err))
            }

        }

        const saveCustomer = (customer) => {
            if(window.alert('Customer saved!')) {
            fetch('https://customerrest.herokuapp.com/api/customers',
                {method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
            .then(res => fetchCustomerData())
            .catch(err => console.error(err))
            }

        }

        const saveTraining = (training) => {
            fetch('https://customerrest.herokuapp.com/api/trainings',
                {method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(training) 
            })
            .then(res => fetchCustomerData())
            .catch(err => console.error(err))

        }

        const updateCustomer = (customer, link) => {
            fetch(link,
                {method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            })
                .then(resp => fetchCustomerData())
                .catch(err => console.error(err))
        }

        const columnsOne = [
            {
                title: 'Edit',
                render: rowData => <EditCustomer updateCustomer={updateCustomer} customer={rowData}/>
            },            {
                title: 'Delete',
                render: row => <Tooltip title="Delete"><IconButton aria-label="delete" onClick={() => deleteCustomer(row.links[0].href)}><DeleteIcon /></IconButton></Tooltip>
            },            {
                title: 'Firstname',
                field: 'firstname',
            },            {
                title: 'Lastname',
                field: 'lastname'
            },            {
                title: 'Streetaddress',
                field: 'streetaddress'
            },            {
                title: 'Postcode',
                field: 'postcode',
            },            {
                title: 'City',
                field: 'city'
            },            {
                title: 'Email',
                field: 'email'
            },            {
                title: 'Phone',
                field: 'phone'
            },            {
                title: 'Add Training',
                render: row => <AddTraining saveTraining={saveTraining} training={row} trainingCustomer={row.links[0].href}/>
            }
        ]

        return (
            <div>
                <MaterialTable
                 title="Customers"
                 defaultPageSize={5} 
                 filterable={true} 
                 data={customers} 
                 columns={columnsOne}
                 />
                 <AddCustomer saveCustomer={saveCustomer} />
            </div>
        );
}