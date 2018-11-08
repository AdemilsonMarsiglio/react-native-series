import { createStackNavigator } from 'react-navigation';

import LoginPage from './pages/LoginPage';
import SeriesPage from './pages/SeriesPage';
import SerieFormPage from './pages/SerieFormPage';
import SerieDetailPage from './pages/SerieDetailPage';

export default createStackNavigator({
    'SerieForm': {
        screen: SerieFormPage,
        navigationOptions: "Nova Série"
    },
    'Main': {
        screen: SeriesPage
    },
    'Login': {
        screen: LoginPage,
        navigationOptions: {
            title: 'Bem Vindo'
        }
    },
    'SerieDetail': {
        screen: SerieDetailPage,
        navigationOptions: ({ navigation }) => {
            return {
                title: navigation.state.params.serie.title
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