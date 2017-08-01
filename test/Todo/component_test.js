import React from 'react';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import sinon from 'sinon';
import {shallow,mount} from 'enzyme';

import {Todo} from 'app/components';
import TextInput from 'app/components/Todo/TextInput';
import Footer from 'app/components/Todo/MainSection/Footer';
import TodoItem from 'app/components/Todo/MainSection/TodoItem';

describe('<Todo/>',() => {
    
    const props = {
        todoShow: 'SHOW_ALL',
        todoItems: [{content: 'hello,wolrd',completed: false, id: 0}],
        todoActions: {
            onTodoAdd: sinon.spy(),
            onTodoDelete: sinon.spy(),
            onTodoEditor: sinon.spy(),
            onTodoCompleted: sinon.spy(),
            onTodoShowAll: sinon.spy(),
            onTodoShowCompleted: sinon.spy(),
            onTodoShowActive: sinon.spy()
        }
    };
    const root = mount(<Todo {...props}/>);
    const wrapper = root.childAt(0);

    describe('<Header/>',() => {
        const header = wrapper.find('Header');

        it('should render correctly',() => {
            assert.strictEqual(header.find('h1').text(),'记事本');
            const textInputProps = header.find('TextInput').props();
            assert.strictEqual(textInputProps.newTodo,true);
            assert.strictEqual(textInputProps.placeholder,'输入待办事项');
            assert.isFunction(textInputProps.onSave);
        });
        it('if length of text greater than 0 should call onTodoAdd',() => {
            const textInput = header.find('TextInput');
            textInput.props().onSave('');
            assert.strictEqual(header.props().onTodoAdd.callCount,0);
            textInput.props().onSave('test');
            assert.strictEqual(header.props().onTodoAdd.callCount,1);
        });
    });

    describe('<MainSection/>',() => {
        const mainSection = wrapper.find('MainSection');

        it('should render correctly',() => {
            const names = mainSection.children().map(node => node.name());
            assert.deepEqual(names,['Switch','ul','Footer']);
            assert.strictEqual(
                mainSection.find('TodoItem').length,
                mainSection.props().todoItems.length
            );
        });
        it('event logical test',() => {
            mainSection.props().onCompletedAll();
            assert.strictEqual(
                mainSection.props().todoActions.onTodoCompleted.callCount,
                mainSection.props().todoItems.length
            );

            root.setProps({todoItems: [{content: 'test', completed: true, id: 0}]});
            mainSection.props().onClearSelected();
            assert.strictEqual(
                mainSection.props().todoActions.onTodoDelete.callCount,
                mainSection.props().todoItems.length
            );
        });
    });

});


describe('<TextInput>',() => {
    let props = {
        newTodo:true,
        onSave: sinon.spy(),
        placeholder: '输入待办事项'
    };
    let wrapper = mount(<TextInput {...props} />);
    
    it('calls componentDidMount',() => {
        sinon.spy(TextInput.prototype,'componentDidMount');
        mount(<TextInput {...props} />);
        assert.isTrue(TextInput.prototype.componentDidMount.calledOnce);
    });

    it('the TextInput under Header should be rendered correctly',() => {
        let types = wrapper.children().map(node => node.name());
        let text = wrapper.children().map(node => node.text());
        assert.deepEqual(types,['input','button']);
        assert.deepEqual(text,['','+']);
        assert.strictEqual(wrapper.find('input').props().placeholder,'输入待办事项');
    });

    it('The TextInput event logic test for Header',() => {
        wrapper.find('button').simulate('click');
        assert.isTrue(wrapper.props().onSave.calledOnce);

        wrapper.setState({value: 'test'});
        assert.strictEqual(wrapper.find('input').props().value,'test');

        wrapper.find('input').simulate('blur');
        assert.isFalse(wrapper.props().onSave.calledTwice);
    });

    it('The TextInput under TodoItem should be rendered correctly',() => {
        props = {
            newTodo: false,
            onSave: sinon.spy(),
            text: 'test'
        };
        wrapper = mount(<TextInput {...props} />);
        assert.strictEqual(wrapper.children().length,1);
        assert.strictEqual(
            wrapper.find('input').props().value,
            'test'
        );
    });

    it('The TextInput event logic test for TodoItem',() => {
        wrapper.find('input').simulate('blur');
        assert.isTrue(wrapper.props().onSave.calledOnce);
    });

});


describe('<Footer/>',() => {
    const props = {
        onTodoShowAll: sinon.spy(),
        onTodoShowCompleted: sinon.spy(),
        onTodoShowActive: sinon.spy(),
        selectedItems: 0,
        onClearSelected: sinon.spy()
    };
    const wrapper = mount(<Footer {...props} />);

    it('should render correctly',() => {
        const types = wrapper.children().map(node => node.type());
        assert.deepEqual(types,['span','ul','button']);
        assert.strictEqual(wrapper.find('span').text(),`已选择${props.selectedItems}个任务`);
        assert.strictEqual(wrapper.find('button').text(),'清除选中的任务');
        const filters = wrapper.find('a').map(node => node.text());
        assert.deepEqual(filters,['全部','已完成','未完成']);
    });

    it('event logical test',() => {
        wrapper.find('a').at(0).simulate('click');
        assert.isTrue(wrapper.props().onTodoShowAll.calledOnce);
        wrapper.find('a').at(1).simulate('click');
        assert.isTrue(wrapper.props().onTodoShowCompleted.calledOnce);
        wrapper.find('a').at(2).simulate('click');
        assert.isTrue(wrapper.props().onTodoShowActive.calledOnce);
    });
});


describe('<TodoItem/>',() => {
    const props = {
        todo: {content: 'hello,world',completed: false, id: 0},
        onTodoCompleted: sinon.spy(),
        onTodoDelete: sinon.spy(),
        onTodoAdd: sinon.spy(),
        onTodoEditor: sinon.spy()
    };
    const wrapper = mount(<TodoItem {...props} />);
    it('calls the life cycle',() => {
        sinon.spy(TodoItem.prototype,'componentDidMount');
        sinon.spy(TodoItem.prototype,'componentDidUpdate');
        mount(<TodoItem {...props} />);
        assert.isTrue(TodoItem.prototype.componentDidMount.calledOnce);
        wrapper.setState({btnsShow: true});
        assert.isTrue(TodoItem.prototype.componentDidUpdate.calledOnce);
    });

    it('should render correctly',() => {
        let element = wrapper.childAt(0).childAt(0);
        const types = element.children().map(node => node.name());
        assert.deepEqual(types,['input','label','CSSTransitionGroup']);
        assert.strictEqual(wrapper.find('label').at(0).text(),'hello,world');
        
        wrapper.setState({btnsShow: true});
        assert.deepEqual(
            wrapper.find('button').map(node => node.text()),
            ['删除','编辑','取消']
        );

        wrapper.setState({editorBool: true});
        assert.exists(wrapper.find('TextInput'));
    });

    it('event logical test',() => {

        wrapper.setState({editorBool: true});
        wrapper.find('TextInput').props().onSave('test');
        assert.isTrue(wrapper.props().onTodoEditor.calledOnce);

        wrapper.setState({editorBool: true});
        wrapper.find('TextInput').props().onSave('');
        assert.isTrue(wrapper.props().onTodoDelete.calledOnce);
        assert.isFalse(wrapper.state().editorBool);

        wrapper.find('label').simulate('click');
        assert.isTrue(wrapper.props().onTodoCompleted.calledOnce);

        wrapper.setState({btnsShow: true});
        wrapper.find('button').at(0).simulate('click');
        assert.isTrue(wrapper.props().onTodoDelete.calledTwice);

        wrapper.setState({btnsShow: true});
        wrapper.find('button').at(1).simulate('click');
        assert.isTrue(wrapper.state().editorBool);

        wrapper.setState({btnsShow: true,editorBool: false});
        wrapper.find('button').at(2).simulate('click');
        assert.isFalse(wrapper.state().btnsShow);
    });
});
