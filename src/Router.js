import { createStackNavigator } from 'react-navigation';

import LoginPage from './pages/LoginPage';
import SeriesPage from './pages/SeriesPage';
import SerieFormPage from './pages/SerieFormPage';
import SerieDetailPage from './pages/SerieDetailPage';

export default createStackNavigator({
    
    'Login': {
        screen: LoginPage,
        navigationOptions: {
            title: 'Bem Vindo'
        }
    },
    'Main': {
        screen: SeriesPage
    },
    
    'SerieDetail': {
        screen: SerieDetailPage,
        navigationOptions: ({ navigation }) => {
            return {
                title: navigation.state.params.serie.title
            }
        }
    },
    'SerieForm': {
        screen: SerieFormPage,
        navigationOptions: ({ navigation }) => {
            if (navigation.state.params && navigation.state.params.serieToEdit)
                return {
                    title: navigation.state.params.serieToEdit.title
                }


            return {
                title: "Nova Série"
            }
        }
    },
}, {

    navigationOptions: {
        title: "Series",
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#6ca2f7'
        },
        headerTitleStyle: {
            fontSize: 24
        }
    }

});