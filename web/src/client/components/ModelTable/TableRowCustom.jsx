import React, { Component } from 'react';
import { TableRow, TableCell } from '@platform-ui/table';
import TableCellCustom from "./TableCellCustom.jsx";
import Button from '@platform-ui/button';

class TableRowCustom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, row: {variableName, coefficient, defaultValue} } = this.props;
        return (
            <TableRow>
                <TableCellCustom
                    id={id}
                    name={'variableName'}
                    value={variableName}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                />
                <TableCellCustom
                    id={id}
                    name={'coefficient'}
                    value={coefficient}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                />
                <TableCellCustom
                    id={id}
                    name={'defaultValue'}
                    value={defaultValue}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                />
                <TableCell>
                    <Button
                        theme='secondary'
                        round
                        size='m'
                        disabled={this.props.disabled}
                        onClick={this.props.onDeleteRow}
                    >
                        -
                    </Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default TableRowCustom;