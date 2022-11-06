import React from 'react';
import { render, screen } from '@testing-library/react';

import Task from './../Task';

describe('test Task component', () => {
  test('renter task heading', () => {
    render(<Task heading="task" />);
    expect(screen.getByRole('heading')).toHaveTextContent('task');
  });

  test('render heading Not yet completed', () => {
    render(<Task heading="task" />);
  });

  test('render heading Completed', () => {
    render(<Task heading="task" />);
  });

  test('render Not yet completed list', () => {
    render(<Task heading="task" />);
  });

  test('render Completed list', () => {
    render(<Task heading="task" />);
  });

  test('click on not yet completed list item', () => {
    render(<Task heading="task" />);
  });

  test('click on completed list item', () => {
    render(<Task heading="task" />);
  });
});
