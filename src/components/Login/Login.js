import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../Style/style.module.css';
import logo from '../../Image/logo.png';
//todo: cookies
import Cookie from 'universal-cookie';

// todo: redux functions
import { useDispatch, useSelector } from 'react-redux';

// todo: actions functions
import { set_user } from '../../actions/actions';

// !componente
const Login = () => {
    const cookies = new Cookie();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, setLogin] = useState({ email: '', password: '' });

    const handleLogin = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            });

            const data = await res.json();
            if (data.token) {
                dispatch(set_user(data.id_user, data.token));
                navigate('/Home');
                console.log(data.message);
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (cookies.get('name')) {
            navigate('/Home');
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img
                    src={logo}
                    alt="description of image"
                    className={styles.logo}
                />
            </div>

            <h1 className={styles.title}>Acá puedes ingresar</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleLogin}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleLogin}
                />
                <input type="submit" value="iniciar" />
            </form>

            <NavLink to="/Home">
                <button className={styles.btnHome}>Home</button>
            </NavLink>
            <NavLink to="/Register">
                <button className={styles.btn}>registrarse</button>
            </NavLink>
        </div>
    );
};

export default Login;
