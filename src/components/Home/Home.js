import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import MaterialTable from 'material-table';
import GenerateForm from '../GenerateForm/GenerateForm';
import {Link} from '@material-ui/core';

const Home = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        fetch('https://ancient-woodland-73653.herokuapp.com/forms')
            .then(response => response.json())
            .then(data => {
                setForms(data)
            })
    }, []);
    const columns = [
        { title: "ID", render: rowData => rowData.tableData.id + 1, headerStyle: { fontWeight: 'bold', fontSize: 16 } },
        {
            title: 'NAME', field: 'FormName',render: rowData => <Link href={`/forms/${rowData._id}`}>{rowData.FormName}</Link>, cellStyle: { fontSize: 16, textAlign: 'left' }, headerStyle: { fontWeight: 'bold', fontSize: 16,
            
        }
        },

    ];
    
    



    return (
        <>
            <NavBar />
            <div className="mt-5 w-75 m-auto">
                <MaterialTable
                    title="Form List"
                    columns={columns}
                    data={forms}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}
                    components={{
                        Action: props => (
                            
                            <div className="">
                                <Link className="mx-5 btn btn bg-success text-white"  href={`formView/${props.data._id}`}>Reports</Link>
                            </div>
                        ),
                    }}
                    options={{
                        actionsColumnIndex: -1
                    }}
                   
                    
                />
            </div>

        </>
    );
};

export default Home;