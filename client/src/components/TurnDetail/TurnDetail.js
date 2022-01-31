import React from 'react';
import Cookie from 'universal-cookie';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../Style/style.module.css';
// todo: action functions
import { get_turns } from '../../actions/actions';
import { NavLink, useNavigate } from 'react-router-dom';


const TurnDetail = () => {
    const cookies = new Cookie();
    const dispatch = useDispatch();
    const userTurns = useSelector((state) => state.turns);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(get_turns(cookies.get('id')));
    }, []);

    return (
        <div className = {styles.container}>
            <h1 className = {styles.title}>Mis turnos</h1>
            <ul className = {styles.title}>
                {userTurns?.map((t) => (
                    <li key={t.id}>
                        día: {t.dia}:{t.horario} - {t.centro}
                    </li>
                ))}
            </ul>
            <div className={styles.sitioBtn}>
                <NavLink to="/Home">
                <button onClick={() => navigate('/')} className={styles.btn}>Regresar</button>
                </NavLink>
                <NavLink to="/Endpage">
                    <button className={styles.btn}>Salir</button>
                </NavLink>
            </div>
        </div>
    );
};

export default TurnDetail;
