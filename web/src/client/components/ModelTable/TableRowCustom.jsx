import React, { Component } from 'react';
import { TableRow  } from '@platform-ui/table';
import TableCellCustom from "./TableCellCustom.jsx";

class TableRowCustom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, row: {variable, weight, description} } = this.props;
        return (
            <TableRow>
                <TableCellCustom
                    id={id}
                    name={'variable'}
                    value={variable}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                />
                <TableCellCustom
                    id={id}
                    name={'weight'}
                    value={weight}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                />
                <TableCellCustom
                    id={id}
                    name={'description'}
                    value={description}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                />
            </TableRow>
        );
    }
}

export default TableRowCustom;