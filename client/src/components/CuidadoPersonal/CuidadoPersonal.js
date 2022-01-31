import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import styles from '../Style/style.module.css';
import logo from '../../Image/logo.png';
import Calendario from '../Calendario/Calendario';
// todo: cookies
import Cookie from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';

const CuidadoPersonal = () => {
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
                <img src={logo} alt="description" className={styles.logo} />
            </div>

            <h2 className={styles.title}>Servicio de Cuidado Personal</h2>
            <div className={styles.form}>
                <Calendario />
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

export default CuidadoPersonal;
