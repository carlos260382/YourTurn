import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Style/Home.module.css';
import logo from '../../Image/logo.png';
import cuidadoPersonal from '../../Image/cuidadoPersonal.png';
import salud from '../../Image/salud.png';
import veterinaria from '../../Image/veterinaria.png';
//todo: cookies
import Cookie from 'universal-cookie';

export default function PaginaEleccion() {
    const dispatch = useDispatch();
    const userTurns = useSelector((state) => state.turns);

    const navigate = useNavigate();
    const cookies = new Cookie();

    const [user, setUser] = useState({
        name: cookies.get('name'),
        email: cookies.get('email'),
        dni: cookies.get('dni'),
    });

    useEffect(() => {
        if (!cookies.get('name')) {
            navigate('/Login');
        }
    }, []);

    const logOut = () => {
        cookies.remove('name');
        cookies.remove('email');
        cookies.remove('dni');
        cookies.remove('id');
        cookies.remove('token');
        navigate('/Login');
    };

    return (
        <div className={styles.container}>
            <img src={logo} className={styles.logo} />
            <h1 className={styles.title}>
                Encuentra el servicio que deseas y agenda tu turno
            </h1>

            <div
                className="profile"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h4>Bienvenido {user?.name}!</h4>
                <button onClick={logOut}>logout</button>
            </div>

            <div className={styles.conteSer}>
                <div className={styles.cuidado}>
                    <NavLink to="/cuidadoPersonal">
                        <img
                            src={cuidadoPersonal}
                            className={styles.imgCuidado}
                        />
                        <h3 className={styles.textImg}>Cuidado Personal</h3>
                    </NavLink>
                </div>

                <div className={styles.salud}>
                    <NavLink to="/ServicioSalud">
                        <img src={salud} className={styles.imgSalud} />
                        <h3 className={styles.textImg}>Servicios de Salud</h3>
                    </NavLink>
                </div>

                <div className={styles.veterinaria}>
                    <NavLink to="/Veterinaria">
                        <img
                            src={veterinaria}
                            className={styles.imgVeterinaria}
                        />
                        <h3 className={styles.textImg}>
                            Servicios de Veterinaria
                        </h3>
                    </NavLink>
                </div>
            </div>
            <div  className={styles.sitioBtn}>
                <NavLink to="/turns">
                    <button className={styles.btn}>Regresar</button>
                </NavLink>
                
            </div>
        </div>
    );
}
