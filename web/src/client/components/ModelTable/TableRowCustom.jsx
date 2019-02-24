import React, { Component } from 'react';
import { TableRow, TableCell } from '@platform-ui/table';
import TableCellCustom from "./TableCellCustom.jsx";
import Button from '@platform-ui/button';

class TableRowCustom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, row } = this.props;
        const row_arr = Object.keys(row).map(function(key) {
            return [key, row[key]];
        });
        return (
            <TableRow>
                {row_arr.map(([name, value], i) =>
                    (<TableCellCustom
                        id={id}
                        key={i}
                        name={name}
                        value={value}
                        disabled={this.props.disabled}
                        onChange={this.props.onChange}
                    />)
                )}
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