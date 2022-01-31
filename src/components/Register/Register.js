import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../Style/style.module.css';
import logo from '../../Image/logo.png';
// todo: cookies
import Cookie from 'universal-cookie';

const Register = () => {
    const navigate = useNavigate();
    const cookies = new Cookie();

    const [user, setUser] = useState({
        name: '',
        dni: '',
        email: '',
        password: '',
        rol: false,
    });

    const handleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3001/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();
        console.log(data);
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

            <h2 className={styles.title}>Crea tu cuenta!</h2>

            <div className={styles.form}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ingrese nombre completo"
                        onChange={handleUser}
                    />
                </div>
                <div>
                    <label>DNI:</label>
                    <input
                        type="text"
                        name="dni"
                        placeholder="Ingrese su DNI"
                        onChange={handleUser}
                    />
                </div>
                <div>
                    <select onChange={handleUser} name="rol">
                        <option value="all">Selecciona tu Rol:</option>
                        <option value="all">Administracion</option>
                        <option value="all">Cliente</option>
                    </select>
                </div>
                <div>
                    <label>Nombre del Centro: </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Solo si es administrador"
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Ingrese su email"
                        onChange={handleUser}
                    />
                </div>
                <div>
                    <label>Crea tu contraseña</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleUser}
                    />
                </div>
            </div>
            <button className={styles.btnEnvio} onClick={handleSubmit}>
                Enviar
            </button>
            <NavLink to="/">
                <button className={styles.btn}>Regresar</button>
            </NavLink>

            <NavLink to="/Login">
                <button className={styles.btn}>Iniciar Session</button>
            </NavLink>
        </div>
    );
};
export default Register;
