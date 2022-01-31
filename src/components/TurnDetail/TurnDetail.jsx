import React from 'react';
import Cookie from 'universal-cookie';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// todo: action functions
import { get_turns } from '../../actions/actions';

const TurnDetail = () => {
    const cookies = new Cookie();
    const dispatch = useDispatch();
    const userTurns = useSelector((state) => state.turns);

    useEffect(() => {
        dispatch(get_turns(cookies.get('id')));
    }, []);

    return (
        <div>
            <h1>Mis turnos</h1>
            <ul>
                {userTurns?.map((t) => (
                    <li key={t.id}>
                        día: {t.dia}:{t.horario} - {t.centro}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TurnDetail;
