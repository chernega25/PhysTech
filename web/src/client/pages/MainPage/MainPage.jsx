import React from 'react';
import styles from './MainPage.css';
import ModelTable from '../../components/ModelTable/ModelTable.jsx';

const MainPage = () => (
    <div className={styles.root}>
        <div className={styles.wrapper}>
            <ModelTable
                disabled={true}
                model={{
                    modelName: 'm019',
                    version: 2
                }}
            />
        </div>
    </div>
);

export default MainPage;
