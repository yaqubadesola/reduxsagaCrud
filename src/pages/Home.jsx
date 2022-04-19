import React,{useEffect}from 'react'
import { 
            MDBTable, 
            MDBTableBody, 
            MDBTableHead, 
            MDBTooltip,
            MDBSpinner, 
            MDBBtn, 
            MDBIcon 
        } from 'mdb-react-ui-kit';
import {useDispatch, useSelector} from 'react-redux'
import {loadUsersStart, deleteUserStart} from '../redux/actions' 
import {Link, useParams} from 'react-router-dom'
import { toast } from 'react-toastify'

function Home() {
const dispatch = useDispatch();
const {users, loading, error} = useSelector(state => state.users)
useEffect(() => {
    console.log("processs ", process.env.REACT_APP_ENDPOINT)
    dispatch(loadUsersStart())
  }, [])

useEffect(() =>{ error && toast.error(error)}, [error])


const spinLoader = (isloading) => {
    if(isloading){
        return(
        <MDBSpinner className='justify-content-center'>
            <span className='visually-hidden justify-content-center'>Loading</span>
        </MDBSpinner>
        )   
    }else{
        return ""
    }
}

const handleDelete = (userId) => {
    //    
    if(window.confirm("Are you sure you actually wanted to delete the User")){
        dispatch(deleteUserStart(userId))
        toast.success("User Deleted Successfully")
    }
    
}

 //presenting display table
 const tabularData = ( users) => {
    let first = 0;
    let newUsers = [];
    users.forEach( user => {
        if(user.id > first){
            newUsers.unshift(user)
            first++
        }
    })
    
    const data = newUsers.map((user,index) => {
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td style={{width:"20%", justifyContent:'center'}}>
                        <MDBBtn className='m-1' tag='a' color='none' onClick = {() => handleDelete(user.id) }>
                            <MDBTooltip title="Delete User" tag='a'>
                                <MDBIcon fas icon="trash" style={{color:"#dd4b39"}} size='lg'/>
                            </MDBTooltip>
                        </MDBBtn>&nbsp;&nbsp;
                        <Link to={`/AddEdit/${user.id}`}>{" "}
                            <MDBTooltip title="Edit User" tag='a'>
                                <MDBIcon fas icon="pen" style={{color:"#55acee", marginBottom:"10px"}} size='lg'/>
                            </MDBTooltip>
                        </Link>&nbsp;&nbsp;
                        <Link to={`/ViewUser/${user.id}`}>{" "}
                            <MDBTooltip title="View User" tag='a'>
                                <MDBIcon fas icon="eye" style={{color: "blue", marginBottom:"10px"}} size='lg'/>
                            </MDBTooltip>
                        </Link>
                        </td>
                    </tr>
                )
            }

    ) 
    
    return data
 }

  return (
    <div style={{marginTop:"20px",padding:"0px 150px"}} >
     {users? 
        <MDBTable>
        <MDBTableHead>
            {spinLoader(loading)}
            <tr>
                <th colSpan={6}>
                <Link to="/addEdit">
                        <MDBTooltip title="Add new User" tag='a'>
                            <MDBIcon fas icon="plus" style={{color:"#55acee", marginBottom:"10px"}} size='lg'/>
                        </MDBTooltip>
                </Link>

                </th>
               
            </tr>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>
                    Action
                </th>
            </tr>
        </MDBTableHead>
        <MDBTableBody>
        {tabularData(users)}
        </MDBTableBody>
        </MDBTable>
        :
        <h2 style={{textAlign:"center"}}> No record(s) found</h2>
        }
 </div>
  )
}

export default Home