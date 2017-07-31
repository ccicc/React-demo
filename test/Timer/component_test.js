import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import {assert} from 'chai';
import {shallow,mount} from 'enzyme';

import {Timer} from 'app/components';


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
