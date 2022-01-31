import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../Style/style.module.css';
import logo from '../../Image/logo.png';
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
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ingrese nombre completo"
                        onChange={handleUser}
                    />
                </div>
                <div>
                    <select>
                        <option value="all">Seleccionar:</option>
                        <option value="all">Administracion</option>
                        <option value="all">Cliente</option>
                    </select>
                </div>
                <div>
                    <label>Dni</label>
                    <input
                        type="text"
                        name="dni"
                        onChange={handleUser}
                        placeholder="Ingrese su Dni"
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={handleUser}
                        placeholder="Ingrese su Email"
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="text"
                        name="password"
                        onChange={handleUser}
                        placeholder="Ingrese su Contraseña"
                    />
                </div>
                <div>
                    <label>Confimar contraseña</label>
                    <input
                        type="text"
                        name="password"
                        onChange={handleUser}
                        placeholder="Confirme su Contraseña"
                    />
                </div>
            </div>
            <button className={styles.btnEnvio} onClick={handleSubmit}>
                Enviar
            </button>
            <NavLink to="/">
                <button className={styles.btn}>Regresar</button>
            </NavLink>
        </div>
    );
};
export default Register;
