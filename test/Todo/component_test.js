import React from 'react';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import sinon from 'sinon';
import {shallow,mount} from 'enzyme';

import {Todo} from 'app/components';
import TextInput from 'app/components/todo/TextInput';

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

    it('should render correctly',() => {
        assert.exists(wrapper.find('Header').props().onTodoAdd);
        const mainSectionProps = wrapper.find('MainSection').props();

        assert.deepEqual(mainSectionProps.todoItems,props.todoItems);
        assert.deepEqual(mainSectionProps.todoActions,props.todoActions);
        assert.strictEqual(mainSectionProps.todoShow,props.todoShow);
        assert.isNumber(mainSectionProps.selectedItems);
        assert.isFunction(mainSectionProps.onClearSelected);
        assert.isFunction(mainSectionProps.onCompletedAll);
    });

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
    });
    
});

describe( '<TextInput/>',() => {
    let props = {
        newTodo: true,
        onSave: sinon.spy(),
        placeholder: '输入待办事项'
    };
    const wrapper = mount(<TextInput {...props}/>);

    it('should render correctly',() => {
        assert.strictEqual(wrapper.find('input').props().placeholder,'输入待办事项');
        assert.strictEqual(wrapper.find('button').text(),'+');
    });

    it('calls componentDidMount',() => {
        sinon.spy(TextInput.prototype,'componentDidMount');
        mount(<TextInput {...props} />);
        assert.isTrue(TextInput.prototype.componentDidMount.calledOnce);
    });

    it('event logical test',() => {
        wrapper.setState({value: 'test'});
        assert.strictEqual(wrapper.find('input').props().value,'test');

        wrapper.find('input').simulate('blur');
        assert.isFalse(wrapper.props().onSave.calledOnce);

        wrapper.find('button').simulate('click');
        assert.isTrue(wrapper.props().onSave.calledOnce);
        assert.strictEqual(wrapper.state().value,'');
    });
});
