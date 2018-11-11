import firebase from 'firebase';
import {Alert} from 'react-native';

export const SET_SERIES = "SET_SERIES";
const setSeries = series => ({
    type: SET_SERIES,
    series
});


export const SET_WHOLE_SERIE = "SET_WHOLE_SERIE";
export const setWholeSerie = serie => ({
    type: SET_WHOLE_SERIE,
    serie
})

export const watchSeries = () => {
    // return dispatch => {
    //     dispatch(setSeries({}))
    // }
    const {currentUser} = firebase.auth();

    return dispatch => {
        try{
            firebase
                .database()
                .ref(`/users/${currentUser.uid}/series`)
                .on('value', snapshot => {
                    dispatch(setSeries(snapshot.val()))
                });
        } catch (e) {
            console.error('Erro no firebase.', e);
        }
    }
}

export const deleteSerie = serie => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Deletar',
                `Deseja deletar a serie ${serie.title}`,
                [{
                    text: 'Não',
                    onPress: () => resolve(false),
                    style: 'cancel'
                },{
                    text: 'Sim',
                    onPress: async () => {    

                        const {currentUser} = firebase.auth();

                        try{
                            await firebase
                                .database()
                                .ref(`/users/${currentUser.uid}/series/${serie.id}`)
                                .remove();

                            resolve(true);
                        } catch (e) {
                            reject(e);
                        }
                    }
                }],
                {cancelable: false}
            )
            
        });
    }
}