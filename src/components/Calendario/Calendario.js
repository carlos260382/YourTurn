import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTurn, setTurn } from '../../actions/actions';
// cookies
import Cookie from 'universal-cookie';

const Calendario = () => {
    const cookies = new Cookie();

    var hoy = new Date();
    var horario =
        hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

    const [turn, setturn] = useState({
        dni: cookies.get('dni'),
        centro: '',
        dia: '',
        horario: horario,
    });

    const handleChange = (e) => {
        setturn({
            ...turn,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await fetch(
            `http://localhost:3001/turn/${cookies.get('email')}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: cookies.get('token'),
                },
                body: JSON.stringify(turn),
            }
        );
        const data = await res.json();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <select name="centro" onChange={handleChange}>
                    <option value="centro1">centro1</option>
                    <option value="centro2">centro2</option>
                    <option value="centro3">centro3</option>
                </select>
            </div>

            <div>
                <label>Selecciona la Fecha</label>
                <input type="date" name="dia" onChange={handleChange} />
            </div>

            <div>
                <label>Selecciona la Hora</label>

                <select name="horario" onChange={handleChange}>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:30 AM">12:30 PM</option>
                    <option value="14:00 AM">14:00 PM</option>
                </select>
            </div>
            <input type="submit" value="Enviar Turno" />
        </form>
    );
};

export default Calendario;
