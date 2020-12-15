import React, { Component } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { RootState } from '../../Interfaces/interfaces';

interface ProtectedRouteProps {
    component: Component
}

const ProtectedRoute = (props: ProtectedRouteProps) => {

    const Component = props.component
    const isLogged = useSelector((state: RootState) => state.isLogged);

    return (
            // {isLogged ? <h3>You are now logged in</h3> : <h3>Click to log in</h3>}
            <div></div>
    );
}

export default ProtectedRoute;