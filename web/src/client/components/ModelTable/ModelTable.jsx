import React, { Component } from 'react';
import Text from '@platform-ui/text';
import TableCustom from './TableCustom.jsx';
import Select from 'react-select';
import styles from './ModelTable.css'
import {updateObjectFactory} from "../../actions/updateObjectFactory";
import { connect } from "react-redux";

class ModelTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variableList: props.model.variableList,
            modelId: props.model.modelId
        }
    }

    // handleSave = (variableList) => {
    //     this.setState({ variableList: variableList });
    //     updateObjectFactory("change", "Model")({
    //         modelId: this.props.model.modelId,
    //         modelName: this.props.model.modelName,
    //         variableList: variableList
    //     });
    // };

    render() {
        const {
            model = {},
            versions = {},
            handleChangeVersion
        } = this.props;
        console.log(model);
        const shoudUpdate = model.modelId !== this.state.modelId;
        if (shoudUpdate) {
            this.setState({
                variableList: model.variableList,
                modelId: model.modelId
            })
        }
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
                    variableList={this.state.variableList}
                    shoudUpdate={shoudUpdate}
                    onSave={(variableList) => {
                            this.setState({ variableList: variableList });
                            console.log("ЖОПА");
                            console.log(this.props.model);
                            this.props.action({
                                modelId: this.props.model.modelId,
                                modelName: this.props.model.modelName,
                                variableList: variableList
                            });
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    action: updateObjectFactory("change", "Model")
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelTable);