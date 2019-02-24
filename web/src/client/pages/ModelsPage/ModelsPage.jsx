import React from 'react';
import styles from './ModelsPage.css';
import Models from '../../containers/Models/Models.jsx';
import Button from '@platform-ui/button';
import Sidebar from '../../containers/Sidebar/Sidebar.jsx';
import { getListOfModels } from "../../actions/getListOfModels";
import { connect } from "react-redux";
import { getModel } from "../../actions/getModel";
import {withRouter} from 'react-router-dom';


class ModelsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modelId: "",
            exists: false
        }
    }

    componentWillMount() {

        const {
            getListOfModels,
            getModel,
            match,
            listOfModels,
            listOfCurrentModels,
            history
        } = this.props;


        getListOfModels();

        if (match.params.name) {
            console.log(match.params.name);
            if (match.params.version) {
                console.log(match.params.version);
                console.log(listOfModels);
                const model = listOfModels.find(x => x.modelName === match.params.name
                    && x.version.toString() === match.params.version);

                console.log(model);
                if (model) {
                    this.setState({modelId: model.id});
                    this.setState({exists: true})
                }
            } else {
                const model = listOfCurrentModels.find(x => x.modelName === match.params.name);

                if (model) {
                    this.setState({modelId: model.currentModelId});
                    this.setState({exists: true})
                }
            }
        }

    }


    render() {
        const {
            listOfCurrentModels
        } = this.props;
        console.log(listOfCurrentModels);

        return (
            <div className={styles.root}>
                <Models
                    history={this.props.history}
                    modelId={this.state.modelId}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ data: { listOfModels, listOfCurrentModels }}) =>
    ({ listOfModels, listOfCurrentModels });

const mapDispatchToProps = {
    getListOfModels,
    getModel
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModelsPage));
