import React, { Component } from 'react';
import { TableRow  } from '@platform-ui/table';
import TableCellCustom from "./TableCellCustom.jsx";

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
            </TableRow>
        );
    }
}

export default TableRowCustom;