import React from 'react';
import { shallow } from 'enzyme';

import SearchBox from '../SearchBox';

const props = {
  fullScreen: true,
  onSubmit: jest.fn(),
};

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render SearchBox properly', () => {
    const component = shallow(<SearchBox {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('should render SearchBox properly when images loaded', () => {
    const component = shallow(<SearchBox {...props} fullScreen={false} />);

    expect(component).toMatchSnapshot();
  });

  it('should call onSubmit with entered text when user submits query', () => {
    const value = 'some query';
    const component = shallow(<SearchBox {...props} />);
    const input = component.find('input');

    input.simulate('change', { target: { value } });

    const form = component.find('form');
    form.simulate('submit', { preventDefault: () => {} });

    expect(props.onSubmit).toHaveBeenCalledWith(value);
  });
});
