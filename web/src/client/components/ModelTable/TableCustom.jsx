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
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleAddRow = this.handleAddRow.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleInputChange(value, name) {
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

    handleEdit() {
        this.setState({ disabled: false })
    }

    handleCancel() {
        this.setState({
            variableList: this.props.variableList,
            disabled: true
        })
    }

    handleAddRow() {
        this.setState(({ variableList }) => ({
            variableList: [
                ...variableList,
                {variableName: '', coefficient: '', defaultValue: '0.1'}
            ]
        }));
    }

    handleSave() {
        this.props.onSave(this.state.variableList);
        this.setState({
            disabled: true
        })
    }

    render() {
        const { variableList, disabled } = this.state;
        return (
            <div>
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
                    {variableList.map((row, id) =>
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
                                disabled={disabled}
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