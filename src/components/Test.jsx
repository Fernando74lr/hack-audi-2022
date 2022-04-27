import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLoginEmailPassword, startLogout, startRegisterWithEmailPasswordName } from '../actions/auth';
import { toastSW } from '../helpers/sweetAlert2';

export const Test = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const btnRegister = () => {
        // dispatch(startRegisterWithEmailPasswordName(email, password, name));
        toastSW('success', 'Testing..');
    };

    const btnLogin = () => {
        dispatch(startLoginEmailPassword(email, password));
    };

    const btnLogout = () => {
        dispatch(startLogout());
    };

    return (
        <div className="App">
            <h2>TEST</h2>

            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
            />
            <br />
            <button onClick={btnRegister}>REGISTER</button>
            <button onClick={btnLogin}>LOGIN</button>
            <button onClick={btnLogout}>LOGOUT</button>
        </div>
    );
}