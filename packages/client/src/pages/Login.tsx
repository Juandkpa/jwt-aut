import React, { useState } from 'react';
import { useLoginMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();

    return (
        <form onSubmit={async e => {
            e.preventDefault();
            await login({
                variables: {
                    email,
                    password
                }
            });
            history.push('/');
        }}>
            <div>
                <input
                    value={email}
                    placeholder="email"
                    onChange={ e=> {setEmail(e.target.value)}}
                />
            </div>
            <div>
                <input
                    value={password}
                    placeholder="password"
                    onChange={ e=> {setPassword(e.target.value)}}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}