import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"

function InputField({ label, type, placeholder, value, onChange }) {
  return (
    <div className='mb-2'>
      <label htmlFor=''>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className='form-control'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Update() {
    const {id} = useParams()
    const navigate = useNavigate()

  const [formData, setFormData] = useState({});


  useEffect(()=>{
    axios.get('http://localhost:3000/content/update/' + id)
    .then(result => {
        console.log(result.data)
      setFormData(result.data)
    })
    .catch(err => console.log(err))
  }, [])
 


  const handleChange = (fieldName, fieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = () => {
   axios.put('http://localhost:3000/content/update/' + id, formData)
   .then(navigate('/GP'))
   .catch(err => console.log(err))
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Update</h2>
          <InputField
            label='Mailboxes'
            type='text'
            placeholder='Enter Name'
            value={formData.Mailboxes || ""}
            onChange={(e) => handleChange('Mailboxes', e.target.value)}
            name='Mailboxes'
            />

            <InputField
            label='Docs URL'
            type='text'
            placeholder='Enter Name'
            value={formData.DocsURL || ""}
            onChange={(e) => handleChange('DocsURL', e.target.value)}
            name='DocsURL'
            />

            <InputField
            label='Title'
            type='text'
            placeholder='Enter Name'
            value={formData.Title || ""}
            onChange={(e) => handleChange('Title', e.target.value)}
            name='Title'
            />

            <InputField
            label='Email ID'
            type='email'
            placeholder='Enter Name'
            value={formData.Email || ""}
            onChange={(e) => handleChange('Email', e.target.value)}
            name='Email'
            />

            <InputField
            label='Status'
            type='text'
            placeholder='Enter Name'
            value={formData.Status || ""}
            onChange={(e) => handleChange('Status', e.target.value)}
            name='Status'
            />

            <InputField
            label='Site'
            type='text'
            placeholder='Enter Name'
            value={formData.Site || ""}
            onChange={(e) => handleChange('Site', e.target.value)}
            name='Site'
            />

            <InputField
            label='Requirements'
            type='text'
            placeholder='Enter Name'
            value={formData.Requirements || ""}
            onChange={(e) => handleChange('Requirements', e.target.value)}
            name='Requirements'
            />

            <InputField
            label='DF'
            type='text'
            placeholder='Enter Name'
            value={formData.DF || ""}
            onChange={(e) => handleChange('DF', e.target.value)}
            name='DF'
            />

          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
