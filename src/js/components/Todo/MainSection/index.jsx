import React from 'react';
import styles from './index.scss';

import { Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import TodoItem from './TodoItem';
import Footer from './Footer';

class MainSection extends React.Component {
    constructor(props) {
        super(props);
    }

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
                    }) }
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
        )
    }
}

export default createForm()(MainSection);