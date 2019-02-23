import React, { Component } from 'react';
import Table, { TableHeader, TableHeaderCell  } from '@platform-ui/table';
import TableRowCustom from './TableRowCustom.jsx'
import Group from '@platform-ui/group';
import Button from '@platform-ui/button';

let mock = [{variableName: 'name', coefficient: '0.3', defaultValue: '0.1'},
            {variableName: 'age', coefficient: '0.7', defaultValue: '0.2'}];

class ModelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                ...props.model,
                variableList: this.getDataFromModel(props)
            },
            disabled: props.disabled
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    getDataFromModel({model}) {
        return mock
    }

    handleInputChange(value, name) {
        const [column, row] = name.split('_');
        this.setState(({ model }) => ({
            model: {
                ...model,
                variableList: [
                    ...model.variableList.slice(0, +row),
                    {
                        ...model.variableList[+row],
                        [column]: value,
                    },
                    ...model.variableList.slice((+row) + 1)
                ]
            }
        }));
    }

    handleStatus(status) {
        return () => this.setState({ disabled: status })
    }

    render() {
        const { model } = this.state;
        return (
            <div>
                Модель {model.modelName}, версия {model.version}
                <Table>
                    <TableHeader>
                        <TableHeaderCell>
                            Переменная
                        </TableHeaderCell>
                        <TableHeaderCell textAlign="center">
                            Вес
                        </TableHeaderCell>
                        <TableHeaderCell textAlign="right">
                            Описание
                        </TableHeaderCell>
                    </TableHeader>
                    {model.variableList.map((row, id) =>
                        (<TableRowCustom
                            row={row}
                            id={id}
                            disabled={this.state.disabled}
                            onChange={this.handleInputChange}
                        />))
                    }
                </Table>
                <Group wide theme="outline" size="s">
                    <Button onClick={this.handleStatus(true)}>
                        Просмотр
                    </Button>
                    <Button onClick={this.handleStatus(false)}>
                        Редактирование
                    </Button>
                </Group>
            </div>
        );
    }
}

export default ModelTable;