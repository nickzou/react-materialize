import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from '../src/Breadcrumb';

describe('<Breadcrumb />', () => {
  test('renders', () => {
    const { container } = render(
      <Breadcrumb cols={6} className="blue">
        <a href="#">Home</a>
        <a href="#">Login</a>
      </Breadcrumb>
    );

    expect(container).toMatchSnapshot();
  });
});
