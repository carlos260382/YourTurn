import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Style/LandingPage.module.css';
import logo from '../../Image/logo.png';


const Login = () => {


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
            <NavLink to="/Login">
            <button  className={styles.btn}>Ingresar</button>
            </NavLink>
            <NavLink to="/Register">
                <button className={styles.btn}>Registrarte</button>
            </NavLink>
        </div>
    );
};

export default Login;
