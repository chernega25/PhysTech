import React, { Component } from 'react';
import Button from '@platform-ui/button';
import Table, { TableHeader, TableHeaderCell, TableRow, TableCell } from '@platform-ui/table';
import VariablesTableRow from './VariablesTableRow.jsx';

let variables_mock = [
    {variableName: 'name', descriptionName:'Приветики, описание переменных', isNew: false},
    {variableName: 'age', descriptionName:'Приветики, мое имя Наташка', isNew: false}];

class VariablesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variableList: variables_mock
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleAddRow = this.handleAddRow.bind(this);
        this.handleDeleteLastRow = this.handleDeleteLastRow.bind(this);
    }

    handleSave(id, fields) {
        this.setState(({ variableList }) => ({
            variableList: [
                ...variableList.slice(0, id),
                {
                    ...variableList[id],
                    ...fields,
                    isNew: false
                },
                ...variableList.slice(id + 1)
            ]
        }));
    }

    handleAddRow() {
        this.setState(({ variableList }) => ({
            variableList: [
                ...variableList,
                {variableName: '', descriptionName: '', isNew: true}
            ]
        }));
    }

    handleDeleteLastRow() {
        this.setState(({ variableList }) => ({
            variableList: [
                ...variableList.slice(0, variableList.length-1)
            ]
        }));
    }

    render() {
        console.log(this.state.variableList)
        return (
            <div>
                <Table>
                    <TableHeader>
                        {['Переменная', 'Описание'].map((name, i) =>
                            (<TableHeaderCell key={i} textAlign='center'>
                                {name}
                            </TableHeaderCell>)
                        )}
                    </TableHeader>
                    {this.state.variableList.map(({ variableName, descriptionName, isNew }, rowIndex) =>
                        (<VariablesTableRow
                            id={rowIndex}
                            key={rowIndex}
                            variableName={variableName}
                            descriptionName={descriptionName}
                            onSave={this.handleSave}
                            isNew={isNew}
                            deleteLastRow={this.handleDeleteLastRow}
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
                                +
                            </Button>
                        </TableCell>
                    </TableRow>
                </Table>
            </div>
        );
    }
}

export default VariablesTable;