import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import ImagesGrid from '../components/ImagesGrid';
import SearchBox from '../components/SearchBox';
import * as helpers from '../helpers';

const data = { hits: [{ id: 1, webformatURL: 'test_url', tags: 'tags' }] };

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

  it('should pass right props to inner components initially', () => {
    const component = shallow(<App />);
    const Search = component.find(SearchBox);
    const Grid = component.find(ImagesGrid);

    expect(Search.prop('fullScreen')).toBeTruthy();
    expect(Search.prop('onSubmit')).toEqual(expect.any(Function));

    expect(Grid.prop('images')).toBe(null);
    expect(Grid.prop('isLoading')).toBeFalsy();
    expect(Grid.prop('error')).toBeFalsy();
  });

  it('should pass right props to inner components after images loaded', async () => {
    const component = shallow(<App />);
    const Search = component.find(SearchBox);

    Search.props().onSubmit('query');
    component.update();

    const PendingGrid = component.find(ImagesGrid);
    expect(PendingGrid.prop('isLoading')).toBeTruthy();

    await Search.props().onSubmit('query');
    component.update();

    const UpdatedSearch = component.find(SearchBox);
    const UpdatedGrid = component.find(ImagesGrid);

    expect(UpdatedSearch.prop('fullScreen')).toBeFalsy();

    expect(UpdatedGrid.prop('images')).toEqual(data.hits);
    expect(UpdatedGrid.prop('isLoading')).toBeFalsy();
    expect(UpdatedGrid.prop('error')).toBeFalsy();
  });

  it('should not refetch if query was not changed', async () => {
    const component = shallow(<App />);

    await component.find(SearchBox).prop('onSubmit')('query');
    helpers.fetchImages.mockClear();
    await component.find(SearchBox).prop('onSubmit')('query');

    expect(helpers.fetchImages).not.toHaveBeenCalled();
  });

  it('should pass error to inner component after images load failed', async () => {
    helpers.fetchImages.mockImplementation(jest.fn(Promise.reject));

    const component = shallow(<App />);
    const Search = component.find(SearchBox);

    await Search.props().onSubmit('query');
    component.update();

    const UpdatedGrid = component.find(ImagesGrid);
    expect(UpdatedGrid.prop('isLoading')).toBeFalsy();
    expect(UpdatedGrid.prop('error')).toBeTruthy();
  });
});
