import React from 'react';
import ReactModal from 'react-modal';
import { shallow } from 'enzyme';

import ImagesGrid from '../ImagesGrid';

const image = { largeImageURL: 'large_url', webformatURL: 'test_url', tags: 'tags' };
const images = [
  { ...image, id: 1 },
  { ...image, id: 2 },
];

const props = {
  isLoadding: false,
  error: false,
  images,
};

describe('App', () => {
  beforeEach(jest.clearAllMocks);

  it('should render ImagesGrid properly initially', () => {
    const component = shallow(<ImagesGrid {...props} images={null} />);

    expect(component).toMatchSnapshot();
  });

  it('should render ImagesGrid properly when loading', () => {
    const component = shallow(<ImagesGrid {...props} isLoading />);

    expect(component).toMatchSnapshot();
  });

  it('should render ImagesGrid properly when error', () => {
    const component = shallow(<ImagesGrid {...props} error />);

    expect(component).toMatchSnapshot();
  });

  it('should render ImagesGrid properly when no images found', () => {
    const component = shallow(<ImagesGrid {...props} images={[]} />);

    expect(component).toMatchSnapshot();
  });

  it('should render ImagesGrid properly when images loaded', () => {
    const component = shallow(<ImagesGrid {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('should pass initial props to modal properly', () => {
    const component = shallow(<ImagesGrid {...props} />);
    const modal = component.find(ReactModal);

    expect(modal.prop('className')).toBe('modal');
    expect(modal.prop('overlayClassName')).toBe('overlay');
    expect(modal.prop('isOpen')).toBe(false);
    expect(modal.prop('onRequestClose')).toEqual(expect.any(Function));
    expect(modal.prop('children')).toBe(false);
  });

  it('should render big image in modal on image click', () => {
    const component = shallow(<ImagesGrid {...props} />);

    component.find('div[role="button"]').at(0).simulate('click');
    component.update();

    const modal = component.find(ReactModal);
    expect(modal.prop('isOpen')).toBe(true);
    expect(modal.prop('children')).toMatchSnapshot();
  });

  it('should render big image in modal on image press enter', () => {
    const component = shallow(<ImagesGrid {...props} />);

    component.find('div[role="button"]').at(0).simulate('keyPress', { key: 'Enter' });
    component.update();

    const modal = component.find(ReactModal);
    expect(modal.prop('isOpen')).toBe(true);
    expect(modal.prop('children')).toMatchSnapshot();
  });

  it('should not render big image in modal on image press not enter', () => {
    const component = shallow(<ImagesGrid {...props} />);

    component.find('div[role="button"]').at(0).simulate('keyPress', { key: 'Shift' });
    component.update();

    const modal = component.find(ReactModal);
    expect(modal.prop('isOpen')).toBe(false);
    expect(modal.prop('children')).toBe(false);
  });
});
