import React, { Component } from 'react';
import Table, { TableHeader, TableHeaderCell, TableRow, TableCell } from '@platform-ui/table';
import Input from '@tinkoff-ui/input';
import Group from '@platform-ui/group';
import Button from '@platform-ui/button';

class VariablesTableCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            value: props.value
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }

    handleChange(value) {
        this.setState({
            isEditing: true,
            value: value
        })
    }

    handleSave() {
        // TODO: здесь должно быть сохранение в базу
        this.props.onSave(this.props.id, this.state.value)
        this.setState({
            isEditing: false
        })
    }

    handleCancel() {
        this.setState({
            isEditing: false,
            value: this.props.value
        })
    }

    render() {
        const { value, isEditing } = this.state;
        return (
            <TableCell>
                <Input
                    name={'descriptionName_'+this.props.id}
                    value={value}
                    onChange={this.handleChange}
                />
                {isEditing && <div style={{ marginTop: '5px' }}>
                    <Group wide theme="outline" size="s">
                        <Button
                            theme='secondary'
                            round
                            size='m'
                            onClick={this.handleSave}
                        >
                            Сохр.
                        </Button>
                        <Button
                            theme='secondary'
                            round
                            size='m'
                            onClick={this.handleCancel}
                        >
                            Отм.
                        </Button>
                    </Group>
                </div>}
            </TableCell>

        );
    }
}

export default VariablesTableCell;