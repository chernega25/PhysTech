import React, { Component } from 'react';
import Table, { TableHeader, TableHeaderCell, TableRow, TableCell } from '@platform-ui/table';
import Input from '@tinkoff-ui/input';
import Group from '@platform-ui/group';
import Button from '@platform-ui/button';

class VariablesTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            descriptionName: props.descriptionName,
            variableName: props.variableName
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }

    handleChange(name) {
        return (value) =>
            this.setState({
                isEditing: true,
                [name]: value
            })
    }

    handleSave() {
        this.props.onSave(this.props.id, {
            'variableName': this.state.variableName,
            'descriptionName': this.state.descriptionName
        });
        this.setState({
            isEditing: false
        })
    }

    handleCancel() {
        if (this.props.isNew) {
            this.props.deleteLastRow()
        } else {
            this.setState({
                isEditing: false,
                descriptionName: this.props.descriptionName
            })
        }
    }

    render() {
        const { id, onSave, isNew } = this.props;
        const { variableName, descriptionName, isEditing } = this.state;
        return (<TableRow>
                    <TableCell textAlign='center'>
                        <Input
                            value={variableName}
                            disabled={!isNew}
                            onChange={this.handleChange('variableName')}
                        />
                    </TableCell>
                    <TableCell>
                        <Input
                            name={'descriptionName_'+this.props.id}
                            value={descriptionName}
                            onChange={this.handleChange('descriptionName')}
                            disabled={this.props.disabled}
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
                </TableRow>
        );
    }
}

export default VariablesTableRow;