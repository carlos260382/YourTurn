import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../Style/LandingPage.module.css';
import logo from '../../Image/logo.png';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { loginWithRedirect, user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/Home');
        }
        console.log("effect")
    });

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
            <button onClick={() => loginWithRedirect()} className={styles.btn}>Ingresar</button>
            <NavLink to="/Register">
                <button className={styles.btn}>Registrarte</button>
            </NavLink>
        </div>
    );
};

export default Login;
