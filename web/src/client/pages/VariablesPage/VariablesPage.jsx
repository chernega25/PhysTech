import React from 'react';
import styles from './VariablesPage.css';
import VariablesTable from '../../components/VariablesTable/VariablesTable.jsx';

const VariablesPage = () => (
    <div className={styles.root}>
        <div className={styles.wrapper}>
            <VariablesTable />
        </div>
    </div>
);

export default VariablesPage;
