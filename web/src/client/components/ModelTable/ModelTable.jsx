import React, { Component } from 'react';
import Table, { TableHeader, TableHeaderCell, TableRow, TableCell } from '@platform-ui/table';
import TableRowCustom from './TableRowCustom.jsx'
import Group from '@platform-ui/group';
import Button from '@platform-ui/button';
import Title from '@platform-ui/text';
// import Plus from '@platform-ui/iconsPack/interface/16/Plus'

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
            disabled: true
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleAddRow = this.handleAddRow.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
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

    handleEdit() {
        this.setState({ disabled: false })
    }

    handleAddRow() {
        this.setState(({ model }) => ({
            model: {
                ...model,
                variableList: [
                    ...model.variableList,
                    {variableName: '', coefficient: '', defaultValue: '0.1'}
                ]
            }
        }));
    }

    render() {
        const { model, disabled } = this.state;
        return (
            <div>
                <Title>
                    Модель {model.modelName}, версия {model.version}
                </Title>
                <Table>
                    <TableHeader>
                        <TableHeaderCell>
                            Переменная
                        </TableHeaderCell>
                        <TableHeaderCell textAlign="center">
                            Вес
                        </TableHeaderCell>
                        <TableHeaderCell textAlign="right">
                            Значение по умолчанию
                        </TableHeaderCell>
                    </TableHeader>
                    {model.variableList.map((row, id) =>
                        (<TableRowCustom
                            row={row}
                            id={id}
                            disabled={disabled}
                            onChange={this.handleInputChange}
                        />))
                    }
                    <TableRow>
                        <TableCell>
                            <Button
                                theme='secondary'
                                round
                                size='m'
                                onClick={this.handleAddRow}
                                >
                            Плюс
                            </Button>
                        </TableCell>
                    </TableRow>
                </Table>
                <Group wide theme="outline" size="s">
                    <Button
                        theme='secondary'
                        onClick={this.handleEdit}
                        size='m'
                        disabled={!disabled}
                    >
                        Редактирование
                    </Button>
                    <Button disabled={disabled}>
                        Отмена
                    </Button>
                    <Button disabled={disabled}>
                        Сохранение
                    </Button>
                </Group>
            </div>
        );
    }
}

export default ModelTable;