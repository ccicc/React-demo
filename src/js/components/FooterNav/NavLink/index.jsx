import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router';
import styles from './index.scss';

export default class NavLink extends React.Component {
    render() {
        const { linkName, pathUrl, iconName, activeName, ...rest } = this.props;
        return (
            <Link
                {...rest}
                to={pathUrl}
                activeClassName={activeName}
                className={styles.root}
            >
                <i className={`${styles.icon} ${iconName}`} />
                <span className={styles.text}>{linkName}</span>
            </Link>
        );
    }
}

NavLink.propTypes = {
    linkName: propTypes.string.isRequired,
    pathUrl: propTypes.string.isRequired,
    iconName: propTypes.string.isRequired,
    activeName: propTypes.string,
    onlyActiveOnIndex: propTypes.oneOfType([propTypes.string, propTypes.bool])
};
