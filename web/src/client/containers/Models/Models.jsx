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
            exists: false
        };


    }
    //
    // componentWillMount() {
    //
    //     const {
    //         getModel,
    //         listOfModels,
    //         listOfCurrentModels,
    //         history,
    //         newHistory,
    //         location
    //     } = this.props;
    //
    //     // console.log(`Name ${name}`);
    //     // console.log(`Var ${version}`);
    //     console.log(history);
    //     console.log(newHistory);
    //
    //     const p = location.pathname.split("/");
    //     const name = p[2];
    //     const version = p[3];
    //     console.log(p);
    //     console.log(name);
    //     console.log(version);
    //
    //     if (name) {
    //         console.log(name);
    //         if (version) {
    //             console.log(version);
    //             console.log(listOfModels);
    //             const model = listOfModels.find(x => x.modelName === name
    //                 && x.version.toString() === version);
    //
    //             console.log(model);
    //             if (model) {
    //                 getModel(model.id);
    //             }
    //         } else {
    //             const model = listOfCurrentModels.find(x => x.modelName === name);
    //
    //             if (model) {
    //                 getModel(model.currentModelId);
    //             }
    //         }
    //     }
    //
    // }

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
            getModel,
            listOfModels,
            listOfCurrentModels,
            history,
            newHistory,
            location,
            model,
            family
        } = this.props;

        // console.log(`Name ${name}`);
        // console.log(`Var ${version}`);

        const p = location.pathname.split("/");
        const name = p[2];
        const version = p[3];
        console.log(p);
        console.log(name);
        console.log(version);

        if (name) {
            console.log(name);
            if (version) {
                if (!model || model.modelName !== name || model.version.toString() !== version) {

                    console.log(version);
                    console.log(listOfModels);
                    const model = listOfModels.find(x => x.modelName === name
                        && x.version.toString() === version);

                    console.log(model);
                    if (model) {
                        getModel(model.id);
                    }
                }
            } else {
                if (!model || model.modelName !== name) {
                    const model = listOfCurrentModels.find(x => x.modelName === name);

                    if (model) {
                        getModel(model.currentModelId);
                    }
                }
            }

        }


        console.log(model);

        return (
                <div className={styles.wrapper}>
                    {model && family ? <ModelTable
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
    getModel
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Models));
