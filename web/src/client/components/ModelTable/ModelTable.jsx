import React, { Component } from 'react';
import Text from '@platform-ui/text';
import TableCustom from './TableCustom.jsx';
import Select from 'react-select';
import styles from './ModelTable.css'

class ModelTable extends Component {
    constructor(props) {
        super(props);
    }

    handleSave = (variableList) => {
        this.setState({ variableList: variableList })
    };

    render() {
        const {
            model = {},
            versions = {},
            handleChangeVersion
        } = this.props;
        console.log(model);
        return (
            <div className={styles.header}>
                <div className={styles.left}>
                    <Text size={24}>
                        Модель {model.modelName}
                    </Text>
                </div>
                <div className={styles.right}>
                    <Select
                        value={`${model.version}`}
                        options={versions}
                        onChange={handleChangeVersion}
                    />
                </div>
                <TableCustom
                    variableList={model.variableList}
                    onSave={this.handleSave}
                />
            </div>
        );
    }
}

export default ModelTable;