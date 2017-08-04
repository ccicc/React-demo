import React from 'react';

import { ListView, RefreshControl } from 'antd-mobile';

import styles from './index.scss';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            refreshing: false
        };
    }

    componentDidMount() {
        if (this.props.items.length <= 0) {
            this.manuallyRefresh = true;
            setTimeout(() => this.setState({ refreshing: true }), 10);
        } else {
            setTimeout(() =>
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.props.items),
                    refreshing: false,
                }), 10
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items && !this.props.error) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.items),
                refreshing: false,
            });
        }
    }

    onRefresh = () => {
        if (!this.manuallyRefresh) {
            this.setState({
                refreshing: true
            });
        } else {
            this.manuallyRefresh = false;
        }
        this.props.onRequestPosts();
    }

    render() {
        const renderFooter = () => (
            <div className={styles.footer}>
                {
                    this.props.lastUpdate &&
                    <span>最后更新于: {this.props.lastUpdate}</span>
                }
            </div>
        );

        const renderSeparator = (sectionID, rowID) => (
            <div className={styles.separator} key={`${sectionID}-${rowID}`} />
        );

        const renderItem = (rowData) => {
            return (
                <div className={styles.wrapper} key={rowData.id}>
                    <div
                        key={rowData.id}
                        className={styles.item}
                    >
                        <img
                            className={styles.avatar}
                            src={rowData.avatar_url}
                            alt={rowData.login}
                        />
                        <div className={styles.content}>
                            <p>昵称: {rowData.login}</p>
                            <p>
                                我的: <a href={rowData.html_url} className={styles.link}>GitHub</a>
                            </p>
                            <p>
                                我的粉丝: {rowData.following}
                            </p>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div>
                {
                    this.props.error
                        ?
                        <div className={styles.error}>
                            {this.props.error.message}
                            <p>请求失败，请重试</p>
                        </div>
                        :
                        <ListView
                            style={{
                                height: document.documentElement.clientHeight,
                            }}
                            dataSource={this.state.dataSource}
                            renderFooter={renderFooter}
                            renderRow={renderItem}
                            renderSeparator={renderSeparator}
                            className="am-list"
                            initialListSize={7}
                            pageSize={5}
                            scrollRenderAheadDistance={200}
                            scrollEventThrottle={10}
                            scrollerOptions={{ scrollbars: true }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                        />
                }
            </div>
        );
    }
}

export default Posts;
