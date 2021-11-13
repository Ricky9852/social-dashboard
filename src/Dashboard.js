import React,{useEffect, useState} from "react";
import axios from "axios";

const Dashboard=props=>{
    let {user,handleUser}=props
    const [posts,setPosts]=useState([])
    // console.log(JSON.parse(localStorage.getItem('posts')));
    // console.log('dash',localStorage.getItem('user'));
    // console.log(user);
    useEffect(()=>{
        if(localStorage.getItem('user')){
            const result=JSON.parse(localStorage.getItem('user'))
            handleUser(result)
        }
    },[])
    useEffect(()=>{
        if(Object.keys(user).length===0){
            props.history.push('/')
        }
        // console.log(JSON.parse(localStorage.getItem('posts')));
        // if(localStorage.getItem('posts')){
        //     const result=JSON.parse(localStorage.getItem('posts'))
        //     if(result.userId===user.id){
        //         setPosts(result)
        //     }
        // }
        if(Object.keys(user).length !==0){
            axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                .then((response)=>{
                    const result=response.data
                    // if(user.id===result.userId){
                        localStorage.setItem('posts',JSON.stringify(result))
                        setPosts(result)
                    // }
                })
                .catch((err)=>{
                    alert(err.message)
                })
        }
    },[user])
    const handleLogout=e=>{
        const res=window.confirm('Do you want to logout')
        if(res===true){
            alert('successfullly logged out')
            localStorage.clear()
            props.history.push('/')
        }
    }
    return (
        <div>
            <span className='row'>
                        <h1 className="col-md-1">Dashboard</h1>
                        <div className="col-md-10"></div>
                        <button type="button" className="col-md-1 btn btn-danger" onClick={handleLogout}>Logout</button>
                        
                    </span>
            {Object.keys(user).length!==0 && (
                <div>
                    
                    
                    <div className='row'>
                        <span className='col-md-6'>
                            <div className="card text-dark bg-light mb-3" >
                                    <div className="card-header"><h3>Name : {user.name}</h3></div>
                                    <div className="card-body">
                                        {user.company && <p className="card-text">Phone : {user.phone}</p>}
                                        {user.company && <p className="card-text">Email : {user.email}</p>}
                                    </div>
                            </div>
                        </span>
                        <span className='col-md-6'>
                        <div className="card text-dark bg-light mb-3" >
                                <div className="card-header"><h3>Company</h3></div>
                                <div className="card-body">
                                    {user.company && <p className="card-text">Company Name : {user.company.name}</p>}
                                    {user.company && <p className="card-text">Catchphrase : {user.company.catchPhrase}</p>}
                                </div>
                        </div>
                        </span>
                    </div>
                    {Object.keys(posts).length!==0 && 
                        <div>
                            {posts.map((post)=>{
                                return <div key={post.id} className="card text-dark bg-light mb-3" >
                                <div className="card-header"><h4>Title : {post.title}</h4></div>
                                <div className="card-body">
                                  <p className="card-text">{post.body}</p>
                                </div>
                              </div>
                            })}
                        </div>
                    }
                </div>
            )}
            
        </div>
    )
}

export default Dashboard;