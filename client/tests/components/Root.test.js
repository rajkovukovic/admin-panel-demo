import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';

import ServerListPage from '../../src/components/pages/ServerListPage';

configure({ adapter: new Adapter() });

describe('ServerListPage Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ServerListPage />);
  });

  it('should exist', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should have one heading', () => {
    expect(wrapper.find('.MainHeaderHeading').type()).toEqual('h1');
  });
});
