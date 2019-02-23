import React, { Component } from 'react';
import { TableCell  } from '@platform-ui/table';
import Input from '@tinkoff-ui/input';

class TableCellCustom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, value, name } = this.props;
        return (
                <TableCell>
                    <Input
                        name={name + '_' + id}
                        value={value}
                        disabled={this.props.disabled}
                        onChange={this.props.onChange}
                    />
                </TableCell>
        );
    }
}

export default TableCellCustom;