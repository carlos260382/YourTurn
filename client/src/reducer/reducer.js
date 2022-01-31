// !joel
import { SET_USER, GET_TURNS, GET_TURN_DETAIL } from '../actions/actions';

const initialState = {
    user: false,
    turns: [],
    DetailTurn: [],
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_USER) {
        return {
            ...state,
            user: true,
        };
    }

    if (action.type === GET_TURNS) {
        return {
            ...state,
            turns: action.payload,
        };
    }

    if (action.type === GET_TURN_DETAIL) {
        return {
            ...state,
            DetailTurn: action.payload,
        };
    }

    return state;
}
