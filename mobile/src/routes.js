import { createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/login';
import Main from './pages/main';

export default createAppContainer(
    //cria uma navegação entre as routas sem interação visual
    createSwitchNavigator({
        Login,
        Main,
    })
);