import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import "./GenerateForm.css";




const GenerateForm = () => {
    let history = useHistory();
    const [addedInputField, setAddedInputField] = useState([]);

    const addedInput = (type, place) => {
        const generateButton = document.getElementById('generateBtn');
        generateButton.style.display = 'block';
        setAddedInputField([...addedInputField, {
            type: type,
            place: place,
        }])
    };

    const handleChange = (e, index, type) => {
        const fieldValue = e.target.value;
        addedInputField[index] = {type:type, fieldValue:fieldValue}
        setAddedInputField([...addedInputField]);
    };

    const handleRemove = (index) => {
        console.log(addedInputField.length)
        if (addedInputField.length <= 1) {
            const generateButton = document.getElementById('generateBtn');
            generateButton.style.display = 'none';
        }
        addedInputField.splice(index, 1);
        setAddedInputField([...addedInputField]);
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const formInformation = {
            FormName: data.formName,
            addedFields: addedInputField,
        }
        
        fetch('https://ancient-woodland-73653.herokuapp.com/addForm', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formInformation)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    swal({
                        title: "Form Generated", text: "Successfully!", icon:
                            "success"
                    }).then(function () {
                        history.push('/home')
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
            <NavBar />
            <div className="flexContainer">
                <div className="w-75">
                    <form id="resetForm" className="px-5 w-50" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <input type="text" className="form-control w-100"   {...register("formName")} placeholder="Form Name" required />
                            </div>
                            {
                                addedInputField.map((addedInputField, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className=" mt-2 col-md-7 resetInput form-group">
                                                <input type='text'
                                                    onChange={(e) => handleChange(e, index, addedInputField.type)} className="form-control w-100"
                                                    placeholder={addedInputField.place} />
                                            </div>
                                            <div className=" mt-2 col-md-3  form-group">
                                                <button className='btn btn bg-info' style={{ color: 'white' }} onClick={() => handleRemove(index)}>-</button>
                                            </div>

                                        </div>
                                    )
                                }
                                )}

                            <div className="col-md-12 form-group" id="generateBtn" style={{ display: 'none' }}>
                                <button className='mt-3 btn btn' style={{ backgroundColor: 'rgb(113, 186, 88)', color: 'white' }} type="submit">Generate</button>
                            </div>

                        </div>
                    </form>
                </div>
                <div className='w-25'>
                    <button className='btn btn bg-info mb-2' style={{ color: 'white' }} type="button" onClick={(type, place) => addedInput('text', 'Text')}>Text</button>
                    <br />
                    <button className='btn btn bg-info my-2' style={{ color: 'white' }} type="button" onClick={(type, place) => addedInput('number', 'Number')}>Number</button>
                    <br />
                    <button className='btn btn bg-info my-2' style={{ color: 'white' }} type="button" onClick={(type, place) => addedInput('date', 'Date')}>Date</button>
                    <br />
                    <button className='btn btn bg-info my-2' style={{ color: 'white' }} type="button" onClick={(type, place) => addedInput('textarea', 'Text-Area')}>Text Area</button>
                </div>

            </div>
        </>
    );
};

export default GenerateForm;