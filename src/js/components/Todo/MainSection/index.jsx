import React from 'react';
import propTypes from 'prop-types';
import { Switch } from 'antd-mobile';
import { createForm } from 'rc-form';

import styles from './index.scss';
import TodoItem from './TodoItem';
import Footer from './Footer';

class MainSection extends React.Component {
    render() {
        const {
            todoItems,
            todoActions,
            todoShow,
            selectedItems,
            onClearSelected,
            onCompletedAll
        } = this.props;
        const { getFieldProps } = this.props.form;
        return (
            <div className={styles.root}>
                <Switch
                    {...getFieldProps('switch1', {
                        initialValue: todoItems.length === selectedItems && todoItems.length > 0,
                        valuePropName: 'checked'
                    })}
                    onChange={() => onCompletedAll()}
                    className={styles.toggle}
                />
                <ul className={styles.items}>
                    {todoItems.map(item => (
                        <TodoItem
                            key={item.id}
                            todo={item}
                            {...todoActions}
                        />
                    ))}
                </ul>
                <Footer
                    {...todoActions}
                    todoShow={todoShow}
                    selectedItems={selectedItems}
                    onClearSelected={onClearSelected}
                />
            </div>
        );
    }
}

MainSection.propTypes = {
    todoItems: propTypes.arrayOf(propTypes.object),
    todoActions: propTypes.object.isRequried,
    todoShow: propTypes.string.isRequired,
    selectedItems: propTypes.number.isRequired,
    onClearSelected: propTypes.func.isRequired,
    onCompletedAll: propTypes.func.isRequired
};

export default createForm()(MainSection);
