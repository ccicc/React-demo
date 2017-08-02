import React from 'react';
import styles from './index.scss';

import NavLink from './NavLink';

export default class FooterNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={`${styles.root} ver-center fixed-bottom`}>
                <NavLink
                    pathUrl="/"
                    linkName="简单"
                    iconName="icon-clouds"
                    activeName={styles.iconOne}
                    onlyActiveOnIndex
                />
                <NavLink
                    pathUrl="/general"
                    linkName="一般"
                    iconName="icon-flag"
                    activeName={styles.iconTwo}
                />
                <NavLink
                    pathUrl="/complex"
                    linkName="复杂"
                    iconName="icon-warning"
                    activeName={styles.iconThree}
                />
                <NavLink
                    pathUrl="/async"
                    linkName="异步"
                    iconName="icon-neutral-face"
                    activeName={styles.iconFour}
                />
            </div>
        );
    }
};
