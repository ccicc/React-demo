import React from 'react';

import styles from './index.scss';
import TodoItem from './TodoItem';
import Footer from './Footer';

class MainSection extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {
            todoItems,
            todoActions,
            todoShow,
            selectedItems,
            onClearSelected
        } = this.props;
        return (
            <div>
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
                    todoShow = {todoShow}
                    selectedItems = {selectedItems}
                    onClearSelected = {onClearSelected}
                />
            </div>
        )
    }
}

export default MainSection;