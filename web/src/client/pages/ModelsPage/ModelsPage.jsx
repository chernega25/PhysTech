import React from 'react';
import styles from './ModelsPage.css';
import ModelTable from '../../components/ModelTable/ModelTable.jsx';
import Button from '@platform-ui/button';
import Sidebar from '../../containers/Sidebar/Sidebar.jsx';

const ModelsPage = ({ match }) => (
    <div className={styles.root}>
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
        <div className={styles.wrapper}>
            <ModelTable
                modelName={match.params.name}
            />
        </div>
    </div>
);

export default ModelsPage;
