import ModelsPage from './client/pages/ModelsPage/ModelsPage.jsx';
import VariablesPage from './client/pages/VariablesPage/VariablesPage.jsx';
import AnalyticsPage from './client/pages/AnalyticsPage/AnalyticsPage.jsx';
import LoginPage from './client/pages/LoginPage/LoginPage.jsx';
import Main from './client/pages/MainPage/MainPage.jsx';

const matchConfig = [

    {
        path: '/models',
        component: ModelsPage,
        exact: false
    },
    {
        path: '/models/:name',
        component: ModelsPage,
        exact: false
    },
    {
        path: '/variables',
        component: VariablesPage,
        exact: false
    },
    {
        path: '/analitics',
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
