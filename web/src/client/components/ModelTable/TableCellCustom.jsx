import React, { Component } from 'react';
import { TableCell  } from '@platform-ui/table';
import Input from '@tinkoff-ui/input';

class TableCellCustom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, value, name, disabled, onChange } = this.props;
        return (
                <TableCell>
                    <Input
                        name={name + '_' + id}
                        value={value}
                        disabled={disabled}
                        onChange={onChange}
                    />
                </TableCell>
        );
    }
}

export default TableCellCustom;