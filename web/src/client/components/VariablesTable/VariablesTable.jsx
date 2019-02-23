import React, { Component } from 'react';
import Button from '@platform-ui/button';
import Table, { TableHeader, TableHeaderCell, TableRow, TableCell } from '@platform-ui/table';
import VariablesTableRow from './VariablesTableRow.jsx';

let variables_mock = [
    {variableName: 'name', descriptionName:'Приветики, описание переменных'},
    {variableName: 'age', descriptionName:'Приветики, мое имя Наташка'}];

class VariablesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variableList: variables_mock
        };
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(id, value) {
        this.setState(({ variableList }) => ({
            variableList: [
                ...variableList.slice(0, id),
                {
                    ...variableList[id],
                    'descriptionName': value,
                },
                ...variableList.slice(id + 1)
            ]
        }));
    }

    render() {
        return (
            <div>
                <Table>
                    <TableHeader>
                        {['Переменная', 'Описание'].map((name) =>
                            (<TableHeaderCell textAlign='center'>
                                {name}
                            </TableHeaderCell>)
                        )}
                    </TableHeader>
                    {this.state.variableList.map(({ variableName, descriptionName }, rowIndex) =>
                        (<VariablesTableRow
                            id={rowIndex}
                            variableName={variableName}
                            descriptionName={descriptionName}
                            onSave={this.handleSave}
                        />))
                    }
                    <TableRow>
                        <TableCell>
                            <Button
                                theme='secondary'
                                round
                                size='m'
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