import React from 'react';
import {Modal} from 'antd-mobile';
import styles from './index.scss';


const filters = {
    'SHOW_ALL': '全部',
    'SHOW_COMPLETED':'已完成',
    'SHOW_ACTIVE': '未完成'
};
class Footer extends React.Component{
    constructor(props){
        super(props);
    }

    renderFilters = (filter,actionCreators) => {
        const title = filters[filter];
        const todoShow = this.props.todoShow;
        return (
            <li>
                <a 
                    href="javascript:void(0);"
                    onClick = {() => actionCreators()}
                    className={filter === todoShow ? styles.selected : null}
                >{title}</a>
            </li>
        )
    }

    render(){
        const {
                onTodoShowAll,
                onTodoShowCompleted,
                onTodoShowActive,
                selectedItems,
                onClearSelected
            } = this.props;
        return(
            <div className={styles.root}>
                <span className={styles.count}>已选择{selectedItems}个任务</span>
                <ul className={styles.filters}>
                    {this.renderFilters('SHOW_ALL',onTodoShowAll)}
                    {this.renderFilters('SHOW_COMPLETED',onTodoShowCompleted)}
                    {this.renderFilters('SHOW_ACTIVE',onTodoShowActive)}
                </ul>
                <button 
                    className={styles.clearBtn}
                    onClick={
                        () => Modal.alert('确定要删除吗？',`共选中了${selectedItems}个任务`,[
                            {text: '取消'},
                            {text: '确定',onPress: () => onClearSelected()}
                        ])
                    }
                    disabled = {selectedItems < 1}
                >清除选中的任务</button>
            </div>
        )
    }
}

export default Footer;