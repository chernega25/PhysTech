import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Button from '@platform-ui/button';

import styles from './Sidebar.css';
import {setHistory} from "../../actions/setHistory";
import {connect} from "react-redux";
import {getListOfModels} from "../../actions/getListOfModels";


class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.hadleClick = this.hadleClick.bind(this);
        this.isActive = this.isActive.bind(this);
    }

    hadleClick(path) {
        return () =>  {
            console.log(path);
            this.props.history.push(`${path}`);
            this.props.setHistory(path);

        };
    }

    isActive(path) {
        const activePath = this.props.location.pathname.split('/');
        const renderPath = path.split('/');

        return renderPath[renderPath.length -1] === activePath[activePath.length - 1]
    }

    componentWillMount() {
        this.props.getListOfModels();
    }

    render() {
        const {
            listOfCurrentModels
        } = this.props;

        const components = listOfCurrentModels ? listOfCurrentModels.map(x => ({
            component: props => <Button {...props} wide>{x.modelName}</Button>,
            path: `/models/${x.modelName}/${x.version}`
        })) : [];

        return (
            <div className={styles.sidebar}>
                <ul>
                    {components.map(({
                        component: Item,
                        path
                    }, index) => {
                        return (
                            <li key={index}>
                                {/* <div className={`${styles.icon} ${styles.active}`}/> */}
                                {/* {this.isActive(path)} */}
                                <Item onClick={this.hadleClick(path)} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

}

const mapStateToProps = ({ data: { listOfModels, listOfCurrentModels }}) =>
    ({ listOfModels, listOfCurrentModels });

const mapDispatchToProps = {
    setHistory,
    getListOfModels
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));