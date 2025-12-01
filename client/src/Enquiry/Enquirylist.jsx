import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { toast } from 'react-toastify';
import axios from 'axios';


function Enquirylist({data,getAlldata,Swal,setFormdata}) {
    let deleteData=(id)=>{
        Swal.fire({
            title:"Do you want to Delete?",
            showDenyButton:true,
            showCancelButton:true,
            confirmButtonText:"Delete"
        }).then((result)=>{
            if(result.isConfirmed){
                axios.delete(`${import.meta.env.VITE_SERVER_URL}/enquiry/delete/${id}`).then(()=>{
                    toast.success("Data Deleted")
                    getAlldata()
                })
            }else if(result.isDenied){
                Swal.fire("Not deleted")
            }
        })
    }
    let editrow=(id)=>{
        axios.get(`${import.meta.env.VITE_SERVER_URL}/enquiry/single/${id}`).then((res)=>{
            let data=res.data;
            setFormdata(data.enquiry)
        })
    } 
  return (
    <div>
        <div>
            <div className="overflow-x-auto bg-gray-200 p-4 rounded-md ml-3">
                <h2 className='text-[20px] font-bold'>Enquiry List</h2>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>S.No</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Email</TableHeadCell>
                            <TableHeadCell>Phone</TableHeadCell>
                            <TableHeadCell>
                                <span >Edit</span>
                            </TableHeadCell>
                            <TableHeadCell>
                                <span >Delete</span>
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>



                    <TableBody className="divide-y">
                        {
                            data.length>= 1?
                                data.map((item, index) => {
                                    return (
                                        <TableRow key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800' >
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.phone}</TableCell>
                                            <TableCell>
                                                <button onClick={()=>deleteData(item._id)} className='bg-red-500 text-white px-4 py-2 rounded-md'>Delete</button>
                                            </TableCell>
                                            <TableCell>
                                                <button onClick={()=>editrow(item._id)} className='bg-blue-500 text-white px-4 py-2 rounded-md'
                                                >Edit</button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                                :
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className='text-center' colSpan={7}>No Data Found</TableCell>
                                </TableRow>

                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
  )
}

export default Enquirylist