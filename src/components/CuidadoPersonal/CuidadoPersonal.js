// !joel
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Style/style.module.css';
import logo from '../../Image/logo.png';
import Calendario from '../Calendario/Calendario';
// todo: cookies
import Cookie from 'universal-cookie';

const CuidadoPersonal = () => {
    const cookies = new Cookie();

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
    //este no esta terminado del todo, porque queria modificarlo cuando apliquemos css
    //renderizo todo
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="description" className={styles.logo} />
            </div>

            <h2 className={styles.title}>Servicio de Cuidado Personal</h2>
            <div className={styles.formulario}>
                <Calendario />
            </div>

            <div className={styles.sitioBtn}>
                <NavLink to="/Home">
                    <button className={styles.btn}>Regresar</button>
                </NavLink>
            </div>
        </div>
    );
};

export default CuidadoPersonal;
