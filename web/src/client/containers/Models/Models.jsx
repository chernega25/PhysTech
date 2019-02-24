import React from 'react';
import styles from './Models.css';
import ModelTable from '../../components/ModelTable/ModelTable.jsx';
import { getListOfModels } from "../../actions/getListOfModels";
import { connect } from "react-redux";
import { getModel } from "../../actions/getModel";
import {withRouter} from 'react-router-dom';


class Models extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // exists: false
        };


    }

    componentWillMount() {

        const {
            getListOfModels,
            getModel,
            match,
            listOfModels,
            listOfCurrentModels,
            history,
            newHistory
        } = this.props;

        console.log(`Name ${match.params.name}`);
        console.log(`Var ${match.params.version}`);
        console.log(history);
        console.log(newHistory);


        getModel(this.props.modelId);
        // getListOfModels();
        //
        // if (match.params.name) {
        //     console.log(match.params.name);
        //     if (match.params.version) {
        //         console.log(match.params.version);
        //         console.log(listOfModels);
        //         const model = listOfModels.find(x => x.modelName === match.params.name
        //             && x.version.toString() === match.params.version);
        //
        //         console.log(model);
        //         if (model && !this.state.exists) {
        //             getModel(model.id);
        //             this.setState({exists: true})
        //         }
        //     } else {
        //         const model = listOfCurrentModels.find(x => x.modelName === match.params.name);
        //
        //         if (model && !this.state.exists) {
        //             getModel(model.currentModelId);
        //             this.setState({exists: true})
        //         }
        //     }
        // }

    }

    // componentWillMount() {
    //     this.componentUp()
    // }
    //
    //
    // // componentWillUpdate() {
    // //     this.componentUp()
    // // }

    render() {
        const {
            listOfCurrentModels,
            model,
            family,
            newHistory
        } = this.props;
        console.log(listOfCurrentModels);
        console.log(`HISTORY ${newHistory}`);

        return (
                <div className={styles.wrapper}>
                    {this.state.exists && model && family ? <ModelTable
                        newHistory={newHistory}
                        model={model}
                        versions={family.map(x => ({ value: `${x.version}`, label: `v${x.version}` }))}
                        handleChangeVersion={version => this.props.history.push(`/models/${model.modelName}/${version.value}`)}
                    /> : "Пошёл нахуй"}
                </div>
        )
    }
}

const mapStateToProps = ({ data: { listOfModels, listOfCurrentModels, model, family, history }}) =>
    ({ listOfModels, listOfCurrentModels, model, family, newHistory: history });

const mapDispatchToProps = {
    getListOfModels,
    getModel
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Models));
