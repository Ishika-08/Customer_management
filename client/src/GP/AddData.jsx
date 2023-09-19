import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateUser(){

    const [Mailboxes, setMailBox] = useState()
    const [DocsURL, setDocsUrl] = useState()
    const [Title, setTitle] = useState()
    const [EmailID, setEmailId] = useState()
    const [Status, setStatus] = useState()
    const [Site, setSite] = useState()
    const [Requirements, setRequirement] = useState()
    const [DF, setDf] = useState()

    const navigate = useNavigate()


    const Submit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3000/Add", {Mailboxes, DocsURL, Title, EmailID, Status, Site, Requirements, DF})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }



    return (
        <>
           <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                    <form onSubmit={Submit}>
                        <h2>Add User</h2>
                        <div className='mb-2'>
                            <label htmlFor=''>Mailbox</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setMailBox(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Docs URL</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setDocsUrl(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Title</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>EmailID</label>
                            <input type='email' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setEmailId(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Status</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setStatus(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Site</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setSite(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Requirements</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setRequirement(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>DF</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setDf(e.target.value)}
                            />
                        </div>
                        <button className='btn btn-success'>Submit</button>
                    </form>
                </div>
           </div>
        </>
    )
}

export default CreateUser