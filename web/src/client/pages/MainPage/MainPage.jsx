import React from 'react';
import styles from './MainPage.css';
import ModelTable from '../../components/ModelTable/ModelTable.jsx';

const MainPage = () => (
    <div className={styles.root}>
        <ModelTable disabled={false} />
    </div>
);

export default MainPage;
