import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import styles from './Sidebar.css';


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
        };
    }

    isActive(path) {
        const activePath = this.props.location.pathname.split('/');
        const renderPath = path.split('/');

        return renderPath[renderPath.length -1] === activePath[activePath.length - 1]
    }
    
    render() {
        const {
            components = []
        } = this.props;

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

export default withRouter(Sidebar);