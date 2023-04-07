import { generateSearchPath, fetchImages } from '../helpers';

process.env.REACT_APP_PIXABAY_API_KEY = 'key';

global.fetch = jest.fn();

it('generateSearchPath should generate path properly', () => {
  const generatedPath = generateSearchPath('query');

  expect(generatedPath).toBe('https://pixabay.com/api/?key=key&q=query&image_type=photo&pretty=true');
});

it('fetchImages should call fetch with generated url', () => {
  fetchImages('query');

  expect(fetch).toHaveBeenCalledWith(generateSearchPath('query'));
});
