import React, { Component } from 'react';
import Title from '@platform-ui/text';
import TableCustom from './TableCustom.jsx';

let mock = [{variableName: 'name', coefficient: '0.3', defaultValue: '0.1'},
            {variableName: 'age', coefficient: '0.7', defaultValue: '0.2'}];

class ModelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variableList: this.getDataFromModel(props),
            disabled: true
        }
        this.handleSave = this.handleSave.bind(this)
    }

    getDataFromModel({ model }) {
        return mock
    }

    handleSave(variableList) {
        this.setState({ variableList: variableList })
    }

    render() {
        const { model } = this.props;
        return (
            <div>
                <Title>
                    Модель {model.modelName}, версия {model.version}
                </Title>
                <TableCustom
                    variableList={this.state.variableList}
                    onSave={this.handleSave}
                />
            </div>
        );
    }
}

export default ModelTable;