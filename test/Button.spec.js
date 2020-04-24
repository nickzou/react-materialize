import React from 'react';
import { render } from '@testing-library/react';
import Button from '../src/Button';
import mocker from './helper/new-mocker';

describe('Button', () => {
  test('renders', () => {
    const { container } = render(<Button waves="light">Stuff</Button>);

    expect(container).toMatchSnapshot();
  });

  test('should apply large styles', () => {
    const { getByRole } = render(<Button large>Stuff</Button>);

    expect(getByRole('button').className).toBe('btn-large');
  });

  test('should apply small styles', () => {
    const { getByRole } = render(<Button small>Stuff</Button>);

    expect(getByRole('button').className).toBe('btn-small');
  });

  test('should apply floating styles', () => {
    const { getByRole } = render(<Button floating>Stuff</Button>);

    expect(getByRole('button').className).toBe('btn-floating');
  });

  test('should apply flat styles', () => {
    const { getByRole } = render(<Button flat>Stuff</Button>);

    expect(getByRole('button').className).toBe('btn-flat');
  });

  describe('with a disabled prop', () => {
    test('has disabled class and disabled attribute', () => {
      const { container } = render(<Button disabled>Stuff</Button>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('with a tooltip', () => {
    const tooltipInitMock = jest.fn();
    const tooltipInstanceDestroyMock = jest.fn();
    const tooltipMock = {
      init: (_, options) => {
        tooltipInitMock(options);
        return {
          destroy: tooltipInstanceDestroyMock
        };
      }
    };
    const restore = mocker('Tooltip', tooltipMock);
    const tooltip = 'Hello';
    const tooltipOptions = {
      position: 'top',
      delay: 50
    };

    beforeEach(() => {
      tooltipInitMock.mockClear();
    });

    afterAll(() => {
      restore();
    });

    test('initializes Button with tooltip', () => {
      render(<Button tooltip={tooltip}>Stuff</Button>);

      expect(tooltipInitMock).lastCalledWith({});
    });

    test('initializes Button with tooltip options', () => {
      render(
        <Button tooltip={tooltip} tooltipOptions={tooltipOptions}>
          Stuff
        </Button>
      );

      expect(tooltipInitMock).lastCalledWith(tooltipOptions);
    });
  });

  describe('with fixed action button', () => {
    const fabInitMock = jest.fn();
    const fabInstanceDestroyMock = jest.fn();
    const fabMock = {
      init: (_, options) => {
        fabInitMock(options);
        return {
          destroy: fabInstanceDestroyMock
        };
      }
    };
    const restore = mocker('FloatingActionButton', fabMock);
    const fabOptions = {
      direction: 'left',
      hoverEnabled: false,
      toolbarEnabled: true
    };

    beforeEach(() => {
      fabInitMock.mockClear();
    });

    afterEach(() => {
      restore();
    });

    test('initializes FloatingActionButton instance', () => {
      render(<Button fab={fabOptions} />);

      expect(fabInitMock).lastCalledWith(fabOptions);
    });
  });
});
