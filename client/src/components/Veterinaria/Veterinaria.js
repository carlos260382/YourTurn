import React, { useState } from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import styles from '../Style/style.module.css';
import logo from '../../Image/logo.png';
import Calendario2 from '../Calendario/Calendario2';
import Cookie from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';

const Veterinaria = () => {
    const userTurns = useSelector((state) => state.turns);
    const cookies = new Cookie();
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

        const res = await fetch('http://localhost:3001/turn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turn),
        });

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
            <h2 className={styles.title}>Servicios de Veterinaria</h2>
            <div className={styles.form}>
                <Calendario2 />
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
export default Veterinaria;
