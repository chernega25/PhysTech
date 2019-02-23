import React from 'react';
import styles from './MainPage.css';
import Button from '@platform-ui/button';
import Sidebar from '../../containers/Sidebar/Sidebar.jsx';

const MainPage = ({location}) => (
    <div className={styles.root}>
        <div> Main </div>
        <Sidebar
            location
            components={[
                {
                    component: props => <Button {...props}>1</Button>,
                    path: '/models/1'
                },
                {
                    component: props => <Button {...props}>2</Button>,
                    path: '/models/2'
                },
                {
                    component: props => <Button {...props}>3</Button>,
                    path: '/models/3'
                }
            ]}
        />
    </div>
);

export default MainPage;
