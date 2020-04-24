import React from 'react';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import Autocomplete from '../src/Autocomplete';
import mocker from './helper/new-mocker';

describe('<Autocomplete />', () => {
  const autocompleteInitMock = jest.fn();
  const data = {
    Apple: null,
    Microsoft: null,
    Google: 'http://placehold.it/250x250',
    'Apple Inc': null
  };
  const componentId = 'testAutocompleteId';

  let wrapper;

  beforeEach(() => {
    autocompleteInitMock.mockClear();
  });

  test('renders', () => {
    const { container } = render(
      <Autocomplete title="Test Title" id={componentId} options={{ data }} />
    );

    expect(container).toMatchSnapshot();
  });

  test('handles layout classes', () => {
    const { container } = render(<Autocomplete s={4} m={6} />);

    expect(container).toMatchSnapshot();
  });

  test('renders placeholder', () => {
    const { getByPlaceholderText } = render(
      <Autocomplete placeholder="Name" />
    );

    expect(getByPlaceholderText('Name')).toBeTruthy();
  });

  describe('initialises', () => {
    const autocompleteInstanceDestroyMock = jest.fn();
    const autocompleteMock = {
      init: (_, options) => {
        autocompleteInitMock(options);
        return {
          destroy: autocompleteInstanceDestroyMock
        };
      }
    };

    mocker('Autocomplete', autocompleteMock);

    beforeEach(() => {
      autocompleteInitMock.mockClear();
      autocompleteInstanceDestroyMock.mockClear();
    });

    test('calls Autocomplete', () => {
      render(<Autocomplete />);
      expect(autocompleteInitMock).lastCalledWith({
        data: {},
        limit: Infinity,
        minLength: 1,
        onAutocomplete: null,
        sortFunction: null
      });
    });
  });

  describe('with new data', () => {
    test('reinitializes', () => {
      const { rerender } = render(<Autocomplete />);

      rerender(<Autocomplete options={{ data: { foo: 'bar' } }} />);

      expect(autocompleteInitMock).lastCalledWith({
        data: {
          foo: 'bar'
        }
      });
    });
  });
});
