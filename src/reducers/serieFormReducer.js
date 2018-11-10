import {SET_FIELD, SERIE_SAVED, SET_WHOLE_SERIE, RESET_FORM} from '../actions'

const INITIAL_STATE = {
    // id: null,
    title: "",
    gender: "comedy",
    rate: 0,
    img: "",
    description: "",
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_FIELD:
            return Object.assign({}, state, {[action.field]: action.value});
        case SERIE_SAVED:
        case RESET_FORM:
            return INITIAL_STATE;
        case SET_WHOLE_SERIE:
            return action.serie;
        default:
            return state;
    }
}