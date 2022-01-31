import axios from 'axios';
import Cookie from 'universal-cookie';
const cookies = new Cookie();

export const SET_USER = 'SET_USER';
export const GET_TURNS = 'GET_TURNS';
export const GET_TURN_DETAIL = 'GET_TURN_DETAIL';

export const set_user = (id_user, token) => {
    return async function (dispatch) {
        const res = await fetch(`http://localhost:3001/user/${id_user}`, {
            headers: {
                authorization: token,
            },
        });
        const user = await res.json();
        const { id, name, email, dni } = user;

        cookies.set('id', id, { path: '/' });
        cookies.set('name', name, { path: '/' });
        cookies.set('email', email, { path: '/' });
        cookies.set('dni', dni, { path: '/' });
        cookies.set('token', token, { path: '/' });

        dispatch({
            type: SET_USER,
        });
    };
};

export const get_turns = (userId) => {
    return async function (dispatch) {
        const res = await fetch(`http://localhost:3001/user/${userId}`, {
            headers: { authorization: cookies.get('token') },
        });

        const { turns } = await res.json();
        dispatch({
            type: GET_TURNS,
            payload: turns,
        });
    };
};

// !carlos
export function getTurn() {
    return async function (dispatch) {
        try {
            let resul = await axios.get(`http://localhost:3001/turn`);
            return dispatch({
                type: GET_TURNS,
                payload: resul.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

// !carlos
export const setTurn = (turn) => {
    return async function () {
        try {
            let resul = await axios.post('http://localhost:3001/turn', turn);
            if (resul) alert(resul.data);
        } catch (error) {
            console.log(error);
        }
    };
};

// !carlos
export function getTurnDetail(id) {
    return function (dispatch) {
        axios
            .get(`http://localhost:3001/turn/${id}`)
            .then((response) => {
                return dispatch({
                    type: GET_TURN_DETAIL,
                    payload: response.data,
                });
            })
            .catch((datos) => console.error(datos));
    };
}
