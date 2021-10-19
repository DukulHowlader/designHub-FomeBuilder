import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const FormView = () => {
    const [formView, setFormView] = useState([]);
    const { key } = useParams();

    useEffect(() => {
        fetch(`https://ancient-woodland-73653.herokuapp.com/formView/${key}`)
            .then(response => response.json())
            .then(data => {
                setFormView(data)

            })
    }, [key]);

    console.log(formView)

    return (
        <>
            <NavBar />
            <div className="mt-5 w-75 m-auto card">
                <div className="card-header">
                    {formView[0]?.FormName}
                </div>
                <div className="card-body">

                    <div class="input-group mb-3 w-25 ms-auto">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
                        </div>
                        <input type="text" class="form-control" ar/>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                {formView[0]?.FormDataDetails?.map((header, index) =>
                                    <th key={index}>{header.fieldValue}</th>
                                )}

                            </tr>
                        </thead>
                        <tbody>
                            {
                                formView?.map((form, index) =>
                                    <tr key={index}>
                                        {form.FormDataDetails?.map(details =>
                                            <td>{details.fieldDetails}</td>
                                        )}
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
};

export default FormView;