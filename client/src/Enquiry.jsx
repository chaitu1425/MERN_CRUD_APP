import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Label, Button, TextInput } from 'flowbite-react'
import Enquirylist from './Enquiry/Enquirylist';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2'


const Enquiry = () => {
    // const userId = "userid" 
    // const chey = "chaitu"

    let [enquiryList, setEnquiryList] = useState([])

    let [formdata, setFormdata] = useState({
        name: '',
        email: '',
        phone: '',
        _id: ''
    })

    let saveEnquiry = (e) => {
        e.preventDefault();

        // let formData= {
        //     name:e.target.name.value,
        //     email:e.target.email.value,
        //     phone:e.target.phone.value
        // }

        if (formdata._id) {
            //update
            axios.put(`${import.meta.env.VITE_SERVER_URL}/api/enquiry/update/${formdata._id}`, formdata).then(() => {
                // console.log(res.data)
                toast.success("Enquiry Updated   Successfully")
                setFormdata({
                    name: '',
                    email: '',
                    phone: '',
                    _id: ''
                })
                getAlldata()
            })
        } else {
            axios.post(`${import.meta.env.VITE_SERVER_URL}/api/enquiry/insert`, formdata).then(() => {
                // console.log(res.data)
                toast.success("Enquiry Saved Successfully")
                setFormdata({
                    name: '',
                    email: '',
                    phone: ''
                })
                getAlldata()
            })
        }

    }

    let getAlldata = () => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/enquiry/getdata`).then((res) => {
            return res.data
        })
            .then((finaldata) => {
                if (finaldata.status) {
                    setEnquiryList(finaldata.enquiry)
                }
            })

    }

    let getvalue = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value
        let oldData = { ...formdata }

        oldData[inputName] = inputValue;
        setFormdata(oldData)
    }

    useEffect(() => {
        getAlldata()
    }, [])



    return (
        <div>
            <ToastContainer />
            <h1 className='font-bold py-6 text-[40px] text-center'> User Enquiry</h1>
            <div className='grid grid-cols-[30%_auto] gap-2'>
                <div className='bg-gray-200 p-4 rounded-md ml-3'>
                    <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
                    <form action='' onSubmit={saveEnquiry}>
                        <div className='py-1 text-black'>
                            <Label className='dark:text-black' htmlFor='name' value="Your Name">Name </Label>
                            <TextInput type='text' name='name' value={formdata.name} onChange={getvalue} placeholder='Enter your Name' required />
                        </div>
                        <div className='py-1'>
                            <Label className='dark:text-black' htmlFor='email' value='Your Email'>Email</Label>
                            <TextInput type='email' name='email' value={formdata.email} onChange={getvalue} placeholder='Enter your mail' required />
                        </div>
                        <div className='py-1'>
                            <Label className='dark:text-black' htmlFor='phone' value='Enter Phone'>Phone</Label>
                            <TextInput type='phone' name='phone' value={formdata.phone} onChange={getvalue} placeholder='Enter your phone' required />
                        </div>
                        <div className='py-5'>
                            <Button type='submit' className='w-[100%]'>
                                {formdata._id ? 'Update' : 'Save'}</Button>
                        </div>
                    </form>
                </div>
                <Enquirylist data={enquiryList} getAlldata={getAlldata} Swal={Swal} setFormdata={setFormdata} />
            </div>
        </div>
    )
}

export default Enquiry
