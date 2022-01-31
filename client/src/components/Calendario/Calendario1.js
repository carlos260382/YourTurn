import React, { useState, useEffect } from 'react';
import Cookie from 'universal-cookie';

const CalendarioSalud = () => {
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
                    <option value="Medicina General">Medicina General</option>
                    <option value="Odontología">Odontología</option>
                    <option value="Radiología">Radiología</option>
                </select>
            </div>

            <div>
                <label>Selecciona la Fecha</label>
                <input type="date" name="dia" onChange={handleChange} />
            </div>

            <div>
                <label>Selecciona la Hora</label>
                <select name="horario" onChange={handleChange}>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="15:00 PM">15:00 PM</option>
                    <option value="16:00 PM">16:00 PM</option>
                    <option value="17:00 PM">17:00 PM</option>
                    <option value="18:00 PM">18:00 PM</option>
                </select>
               
            </div>
            <input type="submit" value="Enviar Turno" />
        </form>
    );
};

export default CalendarioSalud;
