import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => {
    return {
        type: SET_FIELD,
        field,
        value
    }
}

export const SERIE_SAVED = 'SERIE_SAVED';
const serieSave = () => ({
    type: SERIE_SAVED
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
    type: RESET_FORM
});

export const saveSerie = serie => {
    const {currentUser} = firebase.auth();

    return async dispatch => {
        try{
            const db = firebase.database();

            if (serie.id) { //edicao
                await 
                    db.ref(`/users/${currentUser.uid}/series/${serie.id}`)
                    .set(serie)
            } else { //insercao
                await db.ref(`/users/${currentUser.uid}/series`)
                    .push(serie)
            }
            
            
            dispatch(serieSave());
        } catch (e) {
            console.error('Erro no firebase.', e);
        }
    }
    
}