import React, { useState } from "react";
import { Link,Route,withRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserLogin from "./UserLogin";

const NavBar=props=>{
    const [user,setUser]=useState({})
    const handleUser=ele=>{
        setUser(ele)
    }
    return (
        <div>
            {/* <Link to='/'>login</Link> */}
            {/* <Link to='/dashboard'>dashboard</Link> */}
            {/* <Route path='/' component={UserLogin} exact={true}/> */}
            {/* <Route path='/dashboard' component={Dashboard} exact={true}/> */}
            <Route path='/' exact={true} render={(props)=>{
                return <UserLogin
                        {...props}
                        user={user}
                        handleUser={handleUser}
                    />
            }}/>
            <Route path='/dashboard' exact={true} render={(props)=>{
                return <Dashboard
                        {...props}
                        user={user}
                        handleUser={handleUser}
                    />
            }}/>
        </div>
    )
}

const WrapperComponent=withRouter(NavBar)
export default WrapperComponent;