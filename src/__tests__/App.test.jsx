import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

jest.mock('../helpers', () => ({
  fetchImages: jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ hits: [{ id: 1, webformatURL: 'test_url', tags: 'tags' }] }),
  })),
}));

describe('App', () => {
  beforeEach(jest.clearAllMocks);

  it('should render App properly', () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();
  });
});
