import React, { useState } from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import styles from '../Style/style.module.css';
import logo from '../../Image/logo.png';
import Calendario1 from '../Calendario/Calendario1';
import Cookie from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';


const ServicioSalud = () => {
    const cookies = new Cookie();
    const userTurns = useSelector((state) => state.turns);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: cookies.get('name'),
        email: cookies.get('email'),
        dni: cookies.get('dni'),
    });

    const [turn, setTurn] = useState({
        dni: cookies.get('dni'),
        centro: '',
        dia: '',
        horario: '',
    });

    const handleUser = (e) => {
        setTurn({
            ...turn,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(
            `http://localhost:3001/turn/${cookies.get('email')}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(turn),
            }
        );

        const data = await res.json();
        console.log(data);
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img
                    src={logo}
                    alt="description of image"
                    className={styles.logo}
                />
            </div>

            <h2 className={styles.title}>Servicios de Salud</h2>
            <div className={styles.form}>
                <Calendario1 />
            </div>

            <div className={styles.sitioBtn}>
                <NavLink to="/turns">
                <button onClick={() => navigate('/')} className={styles.btn}>Ver Turnos</button>
                </NavLink>
                <NavLink to="/Home">
                    <button className={styles.btn}>Regresar</button>
                </NavLink>
            </div>
        </div>
    );
};
export default ServicioSalud;
