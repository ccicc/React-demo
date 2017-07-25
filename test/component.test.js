import React from 'react';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import sinon from 'sinon';
import {shallow,mount} from 'enzyme';

import {
    FooterNav,
    Timer
} from './../src/js/components';

describe('测试 Components',() => {

    describe('<FooterNav />',() => {
        const wrapper = mount(<FooterNav/>);
        
        it('should render correctly',() => {
            assert.strictEqual(wrapper.hasClass('fixed-bottom'),true);
            assert.strictEqual(wrapper.children('NavLink').length,4);
            assert.strictEqual(wrapper.childAt(0).props().onlyActiveOnIndex,true);
            wrapper.children('NavLink').forEach((node) => {
                assert.exists(node.props().pathUrl);
                assert.exists(node.props().linkName);
                assert.exists(node.props().iconName);
                assert.strictEqual(node.children().length,2);
                assert.strictEqual(node.childAt(0).name(),'i');
                assert.strictEqual(node.childAt(1).name(),'span');
            });
        });
    });


    describe('<Timer />',() => {
        const props = {
            seconds: 0,
            status: 'stopped',
            onStart: sinon.spy(),
            onStop: sinon.spy(),
            onReset: sinon.spy()
        };
        const wrapper = mount(<Timer {...props}/>);

        it('should render correctly',() => {
            assert.strictEqual(wrapper.children().length,4);
            assert.strictEqual(wrapper.childAt(0).text(),'00:00stopped');

            const types = wrapper.children().map((node) => node.name());
            const texts = wrapper.children('button').map((node) => node.text());
            assert.deepEqual(types,['p','button','button','button']);
            assert.deepEqual(texts,['开始','停止','重置']);
        });

        it('click on the logical test',() => {
            const btns = wrapper.find('button');
            btns.at(0).simulate('click');
            assert.isTrue(wrapper.props().onStart.calledOnce);

            btns.at(1).simulate('click');
            assert.isFalse(wrapper.props().onStop.calledOnce);
            wrapper.setProps({status: 'staring'});
            btns.at(1).simulate('click');
            assert.isTrue(wrapper.props().onStop.calledOnce);

            btns.at(2).simulate('click');
            assert.isTrue(wrapper.props().onReset.calledOnce);
        });
    });
});