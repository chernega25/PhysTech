import React, { Component } from 'react';
import Text from '@platform-ui/text';
import TableCustom from './TableCustom.jsx';
import Select from 'react-select';
import styles from './ModelTable.css'

let mock = [{variableName: 'name', coefficient: '0.3', defaultValue: '0.1'},
            {variableName: 'age', coefficient: '0.7', defaultValue: '0.2'}];

const options_mock = [
    { value: '1', label: 'v1' },
    { value: '2', label: 'v2' },
    { value: '3', label: 'v3' }
];

class ModelTable extends Component {
    constructor(props) {
        super(props);
        this.getDataByModelName = this.getDataByModelName.bind(this)
        this.getVersionsByModelName = this.getVersionsByModelName.bind(this)
        this.state = {
            variableList: this.getDataByModelName(props.modelName),
            disabled: true,
            selectedVersion: this.getVersionsByModelName(props.modelName)
        }
        this.handleSave = this.handleSave.bind(this);
        this.handleChangeVersion = this.handleChangeVersion.bind(this);
    }

    getDataByModelName(modelName) {
        return mock
    }

    getVersionsByModelName(modelName) {
        return options_mock
    }

    handleChangeVersion = (selectedVersion) => {
        this.setState({ selectedVersion });
    }

    handleSave(variableList) {
        this.setState({ variableList: variableList })
    }

    render() {
        const { modelName } = this.props;
        return (
            <div className={styles.header}>
                <div className={styles.left}>
                    <Text size={24}>
                        Модель {modelName}
                    </Text>
                </div>
                <div className={styles.right}>
                    <Select
                        value={this.state.selectedVersion}
                        options={options_mock}
                        onChange={this.handleChangeVersion}
                    />
                </div>
                <TableCustom
                    variableList={this.state.variableList}
                    onSave={this.handleSave}
                />
            </div>
        );
    }
}

export default ModelTable;