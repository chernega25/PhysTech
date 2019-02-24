import ModelsPage from './client/pages/ModelsPage/ModelsPage.jsx';
import VariablesPage from './client/pages/VariablesPage/VariablesPage.jsx';
import AnalyticsPage from './client/pages/AnalyticsPage/AnalyticsPage.jsx';
import LoginPage from './client/pages/LoginPage/LoginPage.jsx';
import Main from './client/pages/MainPage/MainPage.jsx';
import Models from './client/containers/Models/Models.jsx';

const matchConfig = [

    // {
    //     path: '/models/:name/:version',
    //     component: Models
    // },
    // {
    //     path: '/models/:name',
    //     component: Models
    // },
    {
        path: '/models',
        component: Models
    },
    {
        path: '/variables',
        component: VariablesPage,
        exact: false
    },
    {
        path: '/analytics',
        component: AnalyticsPage,
        exact: false
    },
    {
        path: '/login',
        component: LoginPage,
        exact: false
    },
    {
        path: '/',
        component: Main,
        exact: false
    }
];

export default matchConfig;
