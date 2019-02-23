import React, { Component } from 'react';
import Table, { TableHeader, TableHeaderCell  } from '@platform-ui/table';
import styles from './ModelTable.css';
import TableRowCustom from './TableRowCustom.jsx'

let items = [{variable: 'name', weight: '0.3', description: 'client\'s name'},
    {variable: 'age', weight: '0.7', description: 'client\'s age'}];

class ModelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: items
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(value, name) {
        const [column, row] = name.split('_');
        this.setState(({list}) => ({
            list: [
                ...list.slice(0,+row),
                {
                    ...list[+row],
                    [column]: value,
                },
                ...list.slice((+row)+1)
            ]
        }));
    }

    render() {
        const { list } = this.state;
        return (
            <div className={styles.wrapper}>
                <Table>
                    <TableHeader>
                        <TableHeaderCell>
                            Переменная
                        </TableHeaderCell>
                        <TableHeaderCell textAlign="center">
                            Вес
                        </TableHeaderCell>
                        <TableHeaderCell textAlign="right">
                            Описание
                        </TableHeaderCell>
                    </TableHeader>
                    {list.map((row, id) =>
                        (<TableRowCustom
                            row={row}
                            id={id}
                            disabled={this.props.disabled}
                            onChange={this.handleInputChange}
                        />))
                    }
                </Table>
            </div>
        );
    }
}

export default ModelTable;