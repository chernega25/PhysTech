import React, { Component } from 'react';
import Text from '@platform-ui/text';
import TableCustom from './TableCustom.jsx';
import Select from 'react-select';
import styles from './ModelTable.css'
import StepperCustom from "../../containers/Stepper/Stepper.jsx";

class ModelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkingStatus: props.checkingStatus
        }
    }

    handleSave = (variableList) => {
        this.setState({
            variableList: variableList,
            checkingStatus: 0
        })
    };

    render() {
        const {
            model = {},
            versions = {},
            handleChangeVersion
        } = this.props;
        console.log(model);
        return (
            <div className={styles.header}>
                <div className={styles.left}>
                    <Text size={24}>
                        Модель {model.modelName}
                    </Text>
                </div>
                <div className={styles.right}>
                    <Select
                        value={{ value: `${model.version}`, label: `v${model.version}` }}
                        options={versions}
                        onChange={handleChangeVersion}
                    />
                </div>
                <TableCustom
                    variableList={model.variableList}
                    onSave={this.handleSave}
                />
                {this.state.checkingStatus >= 0 && <StepperCustom isPending={true}/>}
            </div>
        );
    }
}

export default ModelTable;