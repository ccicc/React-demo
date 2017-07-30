import React from 'react';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import sinon from 'sinon';
import {shallow,mount} from 'enzyme';

import {
    FooterNav,
    Timer,
    Counter
} from 'app/components';

describe('test Components',() => {

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


    describe('<Counter/>',() => {
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

        it('should render coorretly',() => {
            assert.strictEqual(wrapper.name(),'div');

            const types = wrapper.children().map(node => node.type());
            assert.deepEqual(types,['h1','div','div','div']);
            
            assert.strictEqual(wrapper.find('h1').text(),'0');
            assert.deepEqual(wrapper.childAt(1).find('button').map(node => node.text()),['+','-']);
            assert.strictEqual(wrapper.childAt(2).find('button').text(),'偶数+1');
            assert.strictEqual(wrapper.childAt(3).find('button').text(),'3秒后+1');
        });

        it('click on the logical test',() => {
            wrapper.childAt(1).find('button').map(node => node.simulate('click'));
            assert.isTrue(root.prop('onIncrement').calledOnce);
            assert.isTrue(root.prop('onDecrement').calledOnce);

            wrapper.childAt(2).find('button').simulate('click');
            assert.isTrue(root.prop('onIncrement').calledTwice);
            root.setProps({sum: 1});
            wrapper.childAt(2).find('button').simulate('click');
            assert.isFalse(root.prop('onIncrement').calledThrice);

            wrapper.childAt(3).find('button').simulate('click');
            assert.isTrue(root.prop('onAsyncIncrement').calledOnce);
        });
    });
});
