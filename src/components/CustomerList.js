import React, { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import MaterialTable from 'material-table';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function CustomerTrainingList() {
        const [customers, setCustomers] = useState([]);

        useEffect(() => {
            fetchCustomerData();
        }, []);

        const fetchCustomerData = () => {
            fetch('https://customerrest.herokuapp.com/api/customers')
            .then(responseOne => responseOne.json())
            .then(dataOne => setCustomers(dataOne.content))
        }

        const deleteCustomer = (linkC) => {
            console.log(linkC);
            if (window.confirm('Are you sure you want to delete this customer?')) {
                fetch(linkC, {method:'DELETE'})
                .then(respOne => fetchCustomerData())
                .catch(err => console.error(err))
            }
        }

        const saveCustomer = (customer) => {
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

        const updateCustomer = (customer, link) => {
            fetch(link,
                {method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
                })
                .then(res => fetchCustomerData())
                .thencatch(err => console.error(err))
        }



        const columnsOne = [
            {
                title: 'Edit',
                render: rowData => <EditIcon updateCustomer={updateCustomer} customer={rowData.original}></EditIcon>
            },            {
                title: 'Delete',
                render: row => <DeleteIcon onClick={() => deleteCustomer(row.links[0].href)}></DeleteIcon>
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
            }
        ]

        return (
            <div>
            <AddCustomer saveCustomer={saveCustomer} />
                <MaterialTable
                 title="Customers"
                 defaultPageSize={5} 
                 filterable={true} 
                 data={customers} 
                 columns={columnsOne}
                 />
            </div>
        );
}