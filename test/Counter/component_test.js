import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { Counter } from 'app/components';


describe('<Counter/>', () => {
    const props = {
        sum: 0,
        timeout: 3,
        asyncBool: false,
        onIncrement: sinon.spy(),
        onDecrement: sinon.spy(),
        onAsyncIncrement: sinon.spy()
    };
    const root = mount(<Counter {...props}/>);
    const wrapper = root.childAt(0);

    it('should render correctly', () => {
        assert.strictEqual(wrapper.name(), 'div');

        const types = wrapper.children().map(node => node.type());
        assert.deepEqual(types, [ 'h1', 'div', 'div', 'div' ]);
            
        assert.strictEqual(wrapper.find('h1').text(), '0');
        assert.deepEqual(wrapper.childAt(1).find('button').map(node => node.text()), [ '+', '-' ]);
        assert.strictEqual(wrapper.childAt(2).find('button').text(), '偶数+1');
        assert.strictEqual(wrapper.childAt(3).find('button').text(), '3秒后+1');
    });

    it('click on the logical test', () => {
        wrapper.childAt(1).find('button').map(node => node.simulate('click'));
        assert.isTrue(root.prop('onIncrement').calledOnce);
        assert.isTrue(root.prop('onDecrement').calledOnce);

        wrapper.childAt(2).find('button').simulate('click');
        assert.isTrue(root.prop('onIncrement').calledTwice);
        root.setProps({ sum: 1 });
        wrapper.childAt(2).find('button').simulate('click');
        assert.isFalse(root.prop('onIncrement').calledThrice);

        wrapper.childAt(3).find('button').simulate('click');
        assert.isTrue(root.prop('onAsyncIncrement').calledOnce);
    });
});
