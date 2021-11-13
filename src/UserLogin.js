import React, { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";

function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [formErrors,setFormErrors] = useState({'email':'email cannot be blank'})
    const { user, handleUser } = props;

    const errors={}

    // console.log('log',localStorage.getItem('user'));
    const runValidations=()=>{
        if(email.trim().length===0){
            errors['email']='email cannot be blank'
        }else if(!validator.isEmail(email)){
            errors['email']='invalid email format'
        }
    }
    
    useEffect(()=>{
        if(localStorage.getItem('user')){
            props.history.push('/dashboard')
        }
    },[])

    const handleChange = e => {
        setEmail(e.target.value);
    };
    
    const handleSubmit = e => {
        e.preventDefault()
        runValidations()
        console.log('errors',errors);

        if(Object.keys(errors).length===0){
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then((response)=>{
                    const result=response.data
                    if(result.hasOwnProperty('errors')){
                        alert(result.errors)
                    }else{
                        const person=result.find((ele)=>{
                            return ele.email.toLowerCase() === email.toLowerCase()
                        })
                        handleUser(person)
                        localStorage.setItem('user',JSON.stringify(person))
                    }
                    
                    // console.log(JSON.stringify(person))
                })
                .catch((err)=>{
                    alert(err.message)
                })
        }else{
            setFormErrors(errors)
            alert(`There are following errors:
            ${Boolean(errors['email'])? errors['email'] : ''}`)
        }
        
        props.history.push('/dashboard');
    };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' onChange={handleChange} placeholder='enter email' />
                {email.length===0 && <span>{formErrors['email']}</span>}
                <br/>
                <input type='submit' value='Login' className="btn btn-success"/>
            </form>

        </div>
    );
}

export default UserLogin;