
import { MDBBtn, MDBInput, MDBValidation } from 'mdb-react-ui-kit';
import React,{useState, useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createUserStart, loadUsersStart,updateUserStart } from '../redux/actions';
import { toast } from 'react-toastify';


const initialState = {
    name:       "",
    email:      "",
    phone:       "",
    address:    ""
}



function AddEdit() {
   
    const [formValue, setFormValue] = useState(initialState)
    const [editUserFlag, setEditUserFlag] = useState(false)
    const {name, email, phone, address } = formValue;

    const dispatch = useDispatch()
    const {users} = useSelector((state) => state.users)
    const {id} = useParams()
    const navigate = useNavigate()

useEffect(() => {
  if(id){
    setEditUserFlag(true)
    const editRecs = users.find((user) => user.id === Number(id))
    setFormValue({...editRecs})
  }else{
    setEditUserFlag(false)
    setFormValue({...initialState})
  }
  
 
}, [id])


    const handleSubmit = (e) => {
        e.preventDefault();
        if(name && email && phone && address){
          
            if (editUserFlag){
                dispatch(updateUserStart({userInfo: {id, formValue}})) 
                setEditUserFlag(false)
                toast.success('User Updated successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() => navigate('/'), 500)
                }
                else{                    
                    dispatch(createUserStart(formValue));
                    toast.success('User Added successfully!', {
                        position: "top-right",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                     setTimeout(() => navigate('/'), 500)
                }  
           


        }

    }
    const onInputChange = (e) => {
            const {name, value} = e.target
            setFormValue({...formValue, [name]:value})
    }
  return (
    <MDBValidation className='row g-3' style={{marginTop:"100px"}} noValidate onSubmit={handleSubmit}> 
    <p className='fs-2 fw-bold' style={{textAlign:"center", margin:"0 auto"}}> {editUserFlag? "Edit User's Detail" : "Add User's Detail" }</p>
    <div
        style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"
        }}
    >
        <MDBInput 

            value={name || ""}
            name="name"
            validationTooltip
            type="text"
            onChange={onInputChange}
            required
            label="Name"
            id='validationTooltip01'
            validation="Please Provide a name"
            invalid

        /><br/>
        <MDBInput 

            value={email || ""}
            name="email"
            validationTooltip
            type="text"
            onChange={onInputChange}
            required
            id='validationTooltip02'
            label="Email"
            validation="Please Provide an email"
            invalid

        /><br/>
          <MDBInput 

            value={phone || ""}
            name="phone"
            validationTooltip
            type="number"
            onChange={onInputChange}
            required
            label="Phone"
            id='validationTooltip03'
            validation="Please Provide a phone"
            invalid

        /><br/>
          <MDBInput 

            value={address || ""}
            name="address"
            validationTooltip
            id='validationTooltip0'
            type="text"
            onChange={onInputChange}
            required
            label="Address"
            validation="Please Provide a address"
            invalid   

            />
            <br/>
            <div className="col-12" style={{textAlign:"center", margin:"0 auto"}}>
                <MDBBtn style={{marginRight:'10px'}} type="submit">
                    {editUserFlag? "Update" : "Add" }
                </MDBBtn>
                <MDBBtn onClick={() => navigate('/')} color="danger">
                    Go Back
                </MDBBtn>
            </div>
    </div>
        
    </MDBValidation>
  )
}

export default AddEdit