import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { useHistory } from 'react-router';

const FormMake = () => {
    let history = useHistory();
    const { id } = useParams();
    let i = 1;
    const [formMake, setFormMake] = useState({});
    const [formData, setFormData] = useState([])
    const handleChange = (e, index, type, fieldValue) => {
        const fieldDetails = e.target.value;
        formData[index] = {type:type ,fieldValue:fieldValue, fieldDetails:fieldDetails, }
        setFormData([...formData]);
    };
    useEffect(() => {
        fetch(`https://ancient-woodland-73653.herokuapp.com/formMake/${id}`)
        .then(response => response.json())
        .then(data => {
            setFormMake(data[0]);
        })
    },[id])
        const { handleSubmit, formState: { errors } } = useForm();
        const onSubmit = data => {
            const formDataToStore = {
                FormIdentifier:formMake._id,
                FormName: formMake.FormName,
                FormDataDetails : formData,
            }
           
            fetch('https://ancient-woodland-73653.herokuapp.com/formBuild', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formDataToStore)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    swal({
                        title: "Form Make", text: "Successfully!", icon:
                            "success"
                    }).then(function () {
                        history.push(`/formView/${formMake._id}`)
                    }
                    );
                }
                else {
                    swal({
                        title: "Failed", text: "some error occurred!!", icon:
                            "error"
                    })
                    history.push('/home')
                }
            })
        };
        
      
    return (
        <>
        <NavBar/>
            <div className="card w-50 m-auto mt-5 border-0">
                <form className="border" onSubmit={handleSubmit(onSubmit)}>

                    <div className="card-header">
                        {formMake?.FormName}
                    </div>
                    {formMake?.addedFields?.map((addedField, index) =>
                        <div key={i++}>
                            {
                                addedField.type === 'textarea' &&
                                <div className="form-group p-3" key={i++}>
                                    <label htmlFor="exampleFormControlTextarea1">{addedField.fieldValue}</label>
                                    <textarea className="form-control" onChange={(e) => handleChange(e, index, addedField.type, addedField.fieldValue)} id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            }
                            {
                                addedField.type !== 'textarea' &&
                                <div className="form-group p-3 mt-2" key={i++}>
                                    <label htmlFor={addedField.fieldValue}>{addedField.fieldValue}</label>
                                    <input type={addedField.type} onChange={(e) => handleChange(e, index, addedField.type, addedField.fieldValue)}  className="form-control" id={addedField.fieldValue} />
                                </div>
                            }
                            
                        </div>

                    )}
                    <button type="submit" className="btn btn-success text-white m-3">Submit</button>
                </form>
            </div>
        </>
    );
};

export default FormMake;