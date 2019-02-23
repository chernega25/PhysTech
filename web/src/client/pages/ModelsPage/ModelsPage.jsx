import React from 'react';
import styles from './ModelsPage.css';
import ModelTable from '../../components/ModelTable/ModelTable.jsx';
import Button from '@platform-ui/button';
import Sidebar from '../../containers/Sidebar/Sidebar.jsx';
import {getListOfModels} from "../../actions/getListOfModels";
import {connect} from "react-redux";
import {getModel} from "../../actions/getModel";

class ModelsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exists: true
        }

    }

    componentWillMount() {

        console.log("hey");
        const {
            getListOfModels,
            getModel,
            match,
            listOfModels,
            listOfCurrentModels
        } = this.props;


        getListOfModels();
        if (match.params.name) {
            if (match.params.version) {
                const model = listOfModels.find(x => x.modelName === match.params.name
                                                && x.version === match.params.version);
                if (model) {
                    getModel(model.modelId);
                } else {
                    this.setState({ exists: false })
                }
            } else {
                const model = listOfCurrentModels.find(x => x.modelName === match.params.name);
                if (model) {
                    getModel(model.currentModelId);
                } else {
                    this.setState({ exists: false })
                }
            }
        }
    }

    render() {
        const {
            match,
            listOfCurrentModels
        } = this.props;

        return (
            <div className={styles.root}>
                <Sidebar
                    location
                    components={listOfCurrentModels.map(x => ({
                        component: props => <Button {...props}>{x.modelName}</Button>,
                        path: `/models/${x.modelName}`
                    }))}
                />
                <div className={styles.wrapper}>
                    {this.state.exists ? <ModelTable
                        modelName={match.params.name}
                    /> : "Пошёл нахуй"}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ listOfModels, listOfCurrentModels }) => {
    return { listOfModels, listOfCurrentModels };
};

const mapDispatchToProps = {
    getListOfModels,
    getModel
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelsPage);
