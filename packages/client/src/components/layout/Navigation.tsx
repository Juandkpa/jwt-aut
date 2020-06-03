import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export const Navigation : React.FC<Props> = () =>{
    return (
        <header>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/Bye">Bye</Link>
            </div>
        </header>
    )
}