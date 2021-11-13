import React,{useState,useEffect} from "react";
import NavBar from "./NavBar";


const App=(props)=>{
  const [userLoggedIn,setUserLoggedIn]=useState(false)
  const handleAuth=()=>{
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      handleAuth()
    }
  },[])
  
  return (
    // <div>
    <div className='container' >
      <NavBar />
    </div>
  )
}

export default App;
