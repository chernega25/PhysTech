import React, { Component } from 'react';
import Table, { TableHeader, TableHeaderCell, TableRow, TableCell } from '@platform-ui/table';
import Text from '@platform-ui/text';
import VariablesTableCell from "./VariablesTableCell.jsx";

class VariablesTableRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { variableName, descriptionName, id, onSave } = this.props;
        return (<TableRow>
                    <TableCell textAlign='center'>
                        <Text size={18}>{variableName}</Text>
                    </TableCell>
                    <VariablesTableCell
                        id={id}
                        value={descriptionName}
                        onSave={onSave}
                    />
                </TableRow>
        );
    }
}

export default VariablesTableRow;