import React, { Component } from 'react';
import Table, { TableHeader, TableHeaderCell, TableRow, TableCell } from '@platform-ui/table';
import TableRowCustom from './TableRowCustom.jsx'
import Group from '@platform-ui/group';
import Button from '@platform-ui/button';
// import Plus from '@platform-ui/iconsPack/interface/16/Plus'

class TableCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variableList: props.variableList,
            disabled: true
        }
    }

    handleInputChange = (value, name) => {
        const [column, row] = name.split('_');
        this.setState(({ variableList }) => ({
            variableList: [
                ...variableList.slice(0, +row),
                {
                    ...variableList[+row],
                    [column]: value,
                },
                ...variableList.slice((+row) + 1)
            ]
        }));
    }

    handleEdit = () =>
        this.setState({ disabled: false })

    handleCancel = () =>
        this.setState({
            variableList: this.props.variableList,
            disabled: true
        })

    handleAddRow = () =>
        this.setState(({ variableList }) => ({
            variableList: [
                ...variableList,
                {variableName: '', coefficient: '', defaultValue: '0.1'}
            ]
        }));

    handleSave = () => {
        this.props.onSave(this.state.variableList);
        this.setState({
            disabled: true
        })
    }

    handleDeleteRow(id) {
        return () => {
            this.setState(({ variableList }) => ({
                variableList: [
                    ...variableList.slice(0, id),
                    ...variableList.slice(id + 1)
                ]
            }));
        }
    }

    render() {
        const { variableList, disabled } = this.state;
        return (
            <div>
                <Table>
                    <TableHeader>
                        {['Переменная', 'Вес', 'Значение по умолчанию'].map((name, i) =>
                            (<TableHeaderCell key={i} textAlign='center'>
                                {name}
                            </TableHeaderCell>)
                        )}
                    </TableHeader>
                    {variableList.map((row, id) =>
                        (<TableRowCustom
                            row={row}
                            id={id}
                            key={id}
                            disabled={disabled}
                            onChange={this.handleInputChange}
                            onDeleteRow={this.handleDeleteRow(id)}
                        />))
                    }
                    <TableRow>
                        <TableCell>
                            <Button
                                theme='secondary'
                                round
                                size='m'
                                onClick={this.handleAddRow}
                                disabled={disabled}
                            >
                                +
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
                    <Button
                        disabled={disabled}
                        onClick={this.handleCancel}
                    >
                        Отмена
                    </Button>
                    <Button
                        disabled={disabled}
                        onClick={this.handleSave}
                    >
                        Сохранение
                    </Button>
                </Group>
            </div>
        );
    }
}

export default TableCustom;