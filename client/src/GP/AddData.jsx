import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function CreateUser(){
    //for contents table
    const [Mailboxes, setMailBox] = useState()
    const [DocsURL, setDocsUrl] = useState()
    const [Title, setTitle] = useState()
    const [Email, setEmailId] = useState()
    const [Status, setStatus] = useState()
    const [Site, setSite] = useState()
    const [Requirements, setRequirement] = useState()
    const [DF, setDF] = useState()

    //for all website tables [4H, CT, Can, FAO, FP, SC, T+, TH, TW, VE]
    //email, df, status
    const [DA, setDA] = useState()
    const [Website, setWebsite] = useState()
    const [Contacted, setContacted] = useState()
    const [Topic, setTopic] = useState()
    const [LTE, setLTE] = useState()
    const [AnchorText, setAnchorText] = useState()
    const [PublishLink, setPublishLink] = useState()
    const [SS, setSS] = useState()

    //for topics2 table

    //for database table

    //for accounts table

    const navigate = useNavigate()
    let html

    const {table} = useParams()


    const Submit = (e)=>{
        e.preventDefault();
        if( table === "H4" || table === "CT" ||table === "Can" ||table === "FAO" ||table === "FP" ||table === "SC" ||table === "T+" ||table === "TH" ||table === "TW" ||table === "VE" ){
            axios.post("http://localhost:3000/Add/" + table, {DA, Website, Email, Contacted, DF, Topic, LTE, AnchorText, PublishLink, Status, SS})
            .then(result => {
                console.log(result)
                navigate('/GP')
            })
            .catch(err => console.log(err))
        }

        else if(table === "Contents" || table==="ExtraContents"){
        axios.post("http://localhost:3000/Add/" + table, {Mailboxes, DocsURL, Title, Email, Status, Site, Requirements, DF})
            .then(result => {
                console.log(result)
                navigate('/GP')
            })
            .catch(err => console.log(err))
        }
    }   

    if( table === "H4" || table === "CT" ||table === "Can" ||table === "FAO" ||table === "FP" ||table === "SC" ||table === "T+" ||table === "TH" ||table === "TW" ||table === "VE" ){
    html = (
        <>
           <div className='d-flex p-5 bg-primary justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                    <form onSubmit={Submit}>
                        <h2>Add User to {table}</h2>
                        <div className='mb-2'>
                            <label htmlFor=''>DA</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setDA(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>DF</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setDF(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>SS</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setSS(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Email ID</label>
                            <input type='email' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setEmailId(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Website</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setWebsite(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Contacted</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setContacted(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Topic</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setTopic(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>LTE</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setLTE(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>AnchorText</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setAnchorText(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>PublishLink</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setPublishLink(e.target.value)}
                            />
                        </div><div className='mb-2'>
                            <label htmlFor=''>Status</label>
                            <input type='text' placeholder='Enter Name' className='form-control'
                                onChange =  {(e) => setStatus(e.target.value)}
                            />
                        </div>
                        <button className='btn btn-success'>Submit</button>
                    </form>
                </div>
           </div>
        </>
    )
    }

    else if(table === "Contents" || table === "ExtraContents"){
        html = (
            <>
               <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                    <div className='w-50 bg-white rounded p-3'>
                        <form onSubmit={Submit}>
                            <h2>Add User</h2>
                            <div className='mb-2'>
                                <label htmlFor=''>Mailboxes</label>
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
                                <label htmlFor=''>Email ID</label>
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
                                    onChange =  {(e) => setDF(e.target.value)}
                                />
                            </div>
                            <button className='btn btn-success'>Submit</button>
                        </form>
                    </div>
               </div>
            </>
        )
    }

    return html
}


export default CreateUser